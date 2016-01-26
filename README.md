# dOTP
##decentralized One Time Passwords

_Don't use me, I'm very new, untested and more of a prototype of an idea than a functional system_

### Details

Based on the NaCL encryption library from Daniel Bernstein, it uses public key encryption to build a challenge and response system for creating One Time Passwords (OTP)

Unlike typical One Time Passwords where a secret is shared between the two parties, dOTP only requires that the 'challenger' know the user's public key. The challenger then creates a random One Time Password and encrypts it with the public key of the recipient. This is then displayed to the user as a QR code which can be scanned and decrypted with a mobile app to reveal the One Time Password

Android/iOS Demo can be found at [mdp/dAuth](https://github.com/mdp/dAuth)

### Example use for SSH Two Factor

Setup: This assumes that we have the [dotp CLI](https://github.com/mdp/go-dotp) installed on the server and SSH setup for enforcing two factor.

From our terminal it looks like this:
![Terminal two factor](/mdp/dotp/raw/master/sshTwoFactor.gif)

And using the iOS app looks like this:
![iOS app](/mdp/dotp/raw/master/dAuthScan.gif)


#### Basic steps to using dOTP

1. Launch the mobile app and create a new keypair if you don't already have one.
2. Export your public key and give it to the authenticating server (Can be [scanned via your laptops webcam](https://mdp.github.io/dotp/scan/?redir=https%3A%2F%2Fmdp.github.io%2Fdotp%2Fdemo%2F%23%2F%3F))
3. When logging into the authentication server, the server will encode a One Time Password and encrypt with the users public key. A QR Code will then be displayed for the user to scan with the mobile app. [Example](https://mdp.github.io/dotp/demo/#/BPAkh9cmVnQYwJN5QCmoysNp89355PfNyDfApBWmuMQZL?_k=6y3749)
4. The mobile app will decrypt the message and display it to the user as a One Time Password.
5. The user will login using the displayed password.

#### Encoding a Challenge into a QRCode

Challenges are meant to be encoded as a QR Code and scanned by the authenticating user. They have the following format (Value[byte size]):

Base58Encode(Version[1]|PublicKeyFirstByte[1]|ChallengersPublicKey[32]|Box[...])

Broken down:

- Version: Currently at 0, allows the challenge protocol to change as needed
- PublicKeyFirstByte: Lets the client narrow down keys to attempt, but doesn't give away the authenticators public key
- ChallengersPublicKey: the 32 byte public key of the challenger. Should be from a new keypair each time
- Box: the NaCL cipher text, variable size

In JavaScript it looks like this:

```javascript
function(recPubKeyFirstByte, challengerPub, box) {
  var challenge = new Uint8Array(1+1+32+box.length)
  challenge[0] = VERSION
  challenge[6] = recPubKeyFirstByte
  challenge.set(challengerPub, 31)
  challenge.set(box, 63)
  return Base58.encode(challenge)
}
```

##### Cryptography behind dOTP

The basics are as follows:
- NaCL [crypto box](https://nacl.cr.yp.to/box.html) function used to encrypt the OTP, passed the following values
  - The OTP we are encrypting for the recipient/authenticator
  - Nonce consisting of 24 '0' bytes __Must generate a new KeyPair for each authentication__
  - Public Key of the recipient/authenticator
  - Challengers secret key __Must be a newly generated secret each time we encrypt due to the reused nonce__

`NaCl.crypto_box(otp, nonce[24 bytes], publicKey[32 bytes], ChallengerSecretKey[32 bytes])`

###### Why set the Nonce to a static value?

Nonce reuse is dangerous anytime a value is encrypted with the same KeyPair. In our case we ALWAYS use a new randomly generated KeyPair for each authentication.

There's little benefit the server reusing the same keypair for each authentication. Although we can verify that the same server has signed the key, it's impossible to verify the sender is actually who they say they are.

dOTP assumes the following:
- The QRCode is displayed via a secure channel (HTTPS/SSH)
- The Challenge QRCode does not prove that the sender displaying the QRCode is the same person that signed it. If an attacker can insert themselves in the middle of the authentication they can simply intercept the users entry of the OTP and proxy it to the original sender. It's therefore imperative that this only be used over an already secure channel!
- It's primary use will be terminal based authentication where a smaller barcode is prefered.

