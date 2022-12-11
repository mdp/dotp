# dOTP
## decentralized One Time Passwords

__WARNING__

This code has not been audited or vetted in any way.
I make no guarantees about its security or safety.
This is more of a prototype than a fully baked two factor authentication system.

### Details

Based on the LibSodium(NaCL) encryption library, dOTP uses public key encryption to build a challenge and response system for creating One Time Passwords (OTP)

[Android Beta](https://play.google.com/apps/testing/space.atrailing.dauth)

Android/iOS Client Source Code [mdp/dAuth](https://github.com/mdp/dAuth)

#### Design goals

1. Should be completely decentralized. No third parties involved.
  - There are plenty of services that provide a second factor authentication solution. These typically
  are not free and fail if the third party goes down or is compromised.
2. Should rely on public key encryption rather than symmetric
  - The current open standard for OTP relies on a shared key. This means that both the client and the server must keep this key secret. dOTP means you can safely store a users public key in a database without fear that it's exposure will compromise your security or the security of your users.
  - Shared keys means that each client must use a different key for each service. dOTP allows users to share their public key with as many services as they like.
3. Should work on mobile
  - U2F is typically implemented as a hardware USB token, which makes it difficult to use with a mobile device (especially iOS)
4. Should work completely offline
  - You should be able to airgap your mobile authentication device or autheticate when internet is not avaiable.
5. Is usable as a single factor authentication and as an identity
  - U2F must always be paired with an identity. dOTP is in and of itself an identity. (There are pros and cons to this)

### Example use for SSH Two Factor

Setup: This assumes that we have the [dotp CLI](https://github.com/mdp/go-dotp) installed on the server and SSH setup for enforcing two factor.

From our terminal it looks like this:

![Terminal two factor](https://github.com/mdp/dotp/raw/master/sshTwoFactor1.gif)

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
  - The "ChallengerName|OTP" we are encrypting for the recipient/authenticator. eg. "https://github.com|12345678"
  - Public Key of the recipient/authenticator

`Sodium.crypto_box_seal(otp, publicKey[32 bytes])`

__dOTP assumes that the QRCode is displayed via a secure channel (HTTPS/SSH)__

The Challenge QRCode does not prove that the service displaying the QRCode is the same service that created it. The end user must make sure that they are authenticating over a secure channel, and that the challenger name (eg my.ssh.host.com) matches where the challenge code is being displayed.
