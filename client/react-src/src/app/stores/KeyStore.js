let dotpCrypt = require('dotp-crypt')
let localStorage = window.localStorage

let _data = {};

class KeyPair {
  constructor(keyPair){
    this.keyPair = keyPair
  }

  hash() {
    return this.keyPair.publicID
  }

  pretty() {
    return this.keyPair.humanName || this.keyPair.publicID.substr(0,12)
  }

  destroy() {
    return localStorage.removeItem(this.keyPair.publicID)
  }

  decrypt(challenge){
    try {
      return new Buffer(dotpCrypt.decryptChallenge(challenge, this.keyPair.secretKey)).toString()
    } catch (e) {
      console.log('Failed to decrypt', e)
      return false
    }
  }
}

exports.decryptChallenge = function(challenge) {
  let key = null
  let result = {}
  let otp = false
  for ( let i = 0; i < localStorage.length; i++ ) {
    key = exports.get(localStorage.key(i))
    otp = key.decrypt(challenge)
    if (otp) break
  }
  return {key: key, otp: otp}
}

function serializeSecretKey(secretKey, humanName) {
  let data = {
    secretKey: dotpCrypt.utils.Base58.encode(secretKey),
    humanName: humanName,
  }
  return JSON.stringify(data)
}

function deserializeToKeyPair(str) {
  let data = JSON.parse(str)
  let secretKey = new Uint8Array(dotpCrypt.utils.Base58.decode(data.secretKey))
  let keyPair = dotpCrypt.nacl.box.keyPair.fromSecretKey(new Uint8Array(secretKey))
  let publicID = dotpCrypt.getPublicID(keyPair.publicKey)
  return {
    secretKey: secretKey,
    publicKey: keyPair.publicKey,
    publicID: publicID,
    humanName: data.humanName,
  }
}

exports.destroyAll = function() {
  for ( let i = localStorage.length; i >= 0; --i ) {
    localStorage.removeItem(localStorage.key(i))
  }
}

exports.destroy = function(publicId) {
  localStorage.removeItem(publicId)
}

exports.create = function(privateKey, name) {
  let keyPair
  let publicID
  try {
    keyPair = dotpCrypt.getKeyPair(privateKey)
    publicID = dotpCrypt.getPublicID(keyPair.publicKey)
    dotpCrypt.getPublicKeyFromPublicID(publicID)
  } catch (e) {
    console.log(e)
  }
  localStorage.setItem(publicID, serializeSecretKey(keyPair.secretKey, name))
}

exports.get = function(publicID) {
  let key = localStorage.getItem(publicID)
  return new KeyPair(deserializeToKeyPair(key))
}

// Returns all the keys we know about
exports.getAll = function(filter) {
  let keys = []
  for ( let i = 0, len = localStorage.length; i < len; ++i ) {
    keys.push(localStorage.getItem(localStorage.key(i)))
  }
  let data = []
  for (let key of keys) {
    let keyPair = deserializeToKeyPair(key)
    if (filter && keyPair.publicKey[0] === filter) {
      data.push(new KeyPair(keyPair))
    } else {
      data.push(new KeyPair(keyPair))
    }
  }
  return data
}

