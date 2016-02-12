# dOTP
##decentralized One Time Passwords

__WARNING__

This code has not been audited or vetted in any way.
I make no guarantees about its security or safety.
This is more of a prototype than a fully baked two factor authentication system.

### Details

Based on the LibSodium(NaCL) encryption library, dOTP uses public key encryption to build a challenge and response system for creating One Time Passwords (OTP)

Unlike typical One Time Passwords where a secret is shared between the two parties, dOTP only requires that the 'challenger' know the user's public key. The challenger then creates a random One Time Password and encrypts it with the public key of the recipient. This is displayed to the recipient as a QR code which the recipient scans and decrypts using a mobile app to reveal the One Time Password

Android/iOS Demo can be found at [mdp/dAuth](https://github.com/mdp/dAuth)

### Example use for SSH Two Factor

Setup: This assumes that we have the [dotp CLI](https://github.com/mdp/go-dotp) installed on the server and SSH setup for enforcing two factor.

From our terminal it looks like this:

![Terminal two factor](https://github.com/mdp/dotp/raw/master/sshTwoFactor.gif)

And using the iOS app looks like this:

![iOS app](https://github.com/mdp/dotp/raw/master/dAuthDemo1.gif)


#### Basic steps to using dOTP

1. Launch the mobile app and create a new keypair if you don't already have one.
2. Export your public key and give it to the authenticating server (Can be [scanned via your laptops webcam](https://mdp.github.io/dotp/scan/?redir=https%3A%2F%2Fmdp.github.io%2Fdotp%2Fdemo%2F%23%2F%3F))
3. When logging into the authentication server, the server will encode a One Time Password and encrypt with the users public key. A QR Code will then be displayed for the user to scan with their mobile app. [Example](https://mdp.github.io/dotp/demo/#/BPAkh9cmVnQYwJN5QCmoysNp89355PfNyDfApBWmuMQZL?_k=6y3749)
4. The mobile app will decrypt the message using public keys matching secret and display the One Time Password along with the name/hostname of the authenticating server
5. The user will login using the displayed password if the name/hostname matches

#### Encoding a Challenge into a QRCode

Challenges are meant to be encoded as a QR Code and scanned by the authenticating user. They have the following format (Value[byte size]):

Base58Encode(Version[1]|PublicKeyFirstByte[1]|SealedBox[...])

Broken down:

- Version: Currently at 0, allows the challenge protocol to change as needed
- PublicKeyFirstByte: Lets the client narrow down keys to attempt, but doesn't give away the authenticators public key
- SealedBox: the libsodium encoded result for `crypto_box_seal`

In JavaScript it looks like this:

```javascript
function(recPubKeyFirstByte, challengerPub, box) {
  var challenge = new Uint8Array(1+1+box.length)
  challenge[0] = VERSION
  challenge[1] = recPubKeyFirstByte
  challenge.set(box, 2)
  return Base58.encode(challenge)
}
```

#### Cryptography behind dOTP

The basics are as follows:
- Libsodium [crypto_box_seal](https://download.libsodium.org/doc/public-key_cryptography/sealed_boxes.html) function used to encrypt the name of the challenger and the OTP, passed the following values
  - The "ChallangerName:OTP" we are encrypting for the recipient/authenticator. eg. "github.com:12345678"
  - Public Key of the recipient/authenticator

`Sodium.crypto_box_seal(otp, publicKey[32 bytes])`

dOTP assumes the following:
- The QRCode is displayed via a secure channel (HTTPS/SSH)
- The Challenge QRCode does not prove that the sender displaying the QRCode is the same person that created it. If an attacker can insert themselves in the middle of the authentication they can simply intercept the users entry of the OTP and proxy it to the original sender. It's therefore imperative that this only be used over an already secure channel!
- Its primary use will be terminal based authentication where a smaller barcode is preferred.

