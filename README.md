# dOTP
##decentralized One Time Passwords

_Don't use me, I'm very new, untested and more of a prototype of an idea than a functional system_

### Details

Based on the NaCL encryption library from Daniel Bernstein, it uses public key encryption to build a challenge and response system for creating One Time Passwords (OTP)

Unlike typical One Time Passwords where a secret is shared between the two parties, dOTP only requires that the 'challenger' know the user's public key. The challenger then creates a random One Time Password and encrypts it with the public key of the recipient. This is then displayed to the user as a QR code which can be scanned and decrypted with a mobile app to reveal the One Time Password

Android/iOS Demo included in the repo.

#### Basic steps to using dOTP

1. Launch the mobile app and create a new keypair if you don't already have one.
2. Export your public key and give it to the authenticating server (Can be [scanned via your laptops webcam](https://mdp.github.io/dotp/scan/?redir=https%3A%2F%2Fmdp.github.io%2Fdotp%2Fdemo%2F%23%2F%3F))
3. When logging into the authentication server, the server will encode a One Time Password and encrypt with the users public key. A QR Code will then be displayed for the user to scan with the mobile app. [Example](https://mdp.github.io/dotp/demo/#/BPAkh9cmVnQYwJN5QCmoysNp89355PfNyDfApBWmuMQZL?_k=6y3749)
4. The mobile app will decrypt the message and display it to the user as a One Time Password.
5. The user will login using the displayed password.

#### Encoding a Challenge into a QRCode

Challenges are meant to be encoded as a QR Code and scanned by the authenticating user. They have the following format (Value[byte size]):

Base58Encode(Version[1]|ExpiresAt[5]|PublicKeyFirstByte[1]|Nonce[24]|ChallengersPublicKey[32]|Box[...])

Broken down:

- Version: Currently at 0, allows the challenge protocol to change as needed
- ExpiresAs: Unix timestamp in seconds. 40 bits, works past 2106, but fits in a Javascript double
- PublicKeyFirstByte: Lets the client narrow down keys to attempt, but doesn't give away the authenticators public key
- Nonce: the 24 byte nonce used in NaCL
- ChallengersPublicKey: the 32 byte public key of the challenger. Needed to decrypt the ciphertext
- Box: the NaCL cipher text, variable size

In JavaScript it looks like this:

```javascript
function(expiresAt, recPubKeyFirstByte, nonce, challengerPub, box) {
  var challenge = new Uint8Array(1+5+1+24+32+box.length)
  var expiresAtArr = intTo5Bytes(expiresAt)
  challenge[0] = VERSION
  challenge.set(expiresAtArr, 1)
  challenge[6] = recPubKeyFirstByte
  challenge.set(nonce, 7)
  challenge.set(challengerPub, 31)
  challenge.set(box, 63)
  return Base58.encode(challenge)
}
```
