let dotpCrypt = require('dotp-crypt')
let localStorage = window.localStorage

let _data = {};

class KeyPair {
  constructor(data){
    this.data = data
  }

  get(key) {
    return this.data[key]
  }

  pretty() {
    return this.data.name || this.data.publicID.substr(0,12)
  }

  destroy() {
    return localStorage.removeItem(this.data.publicID)
  }

  decrypt(challenge){
    try {
      return new Buffer(dotpCrypt.decryptChallenge(challenge, this.data.secretKey)).toString()
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

function serialize(secretKey, name) {
  let data = {
    secretKey: dotpCrypt.utils.Base58.encode(secretKey),
    name: name,
    createdAt: Date.now(),
  }
  return JSON.stringify(data)
}

function deserialize(str) {
  let data = JSON.parse(str)
  let secretKey = new Uint8Array(dotpCrypt.utils.Base58.decode(data.secretKey))
  let keyPair = dotpCrypt.nacl.box.keyPair.fromSecretKey(new Uint8Array(secretKey))
  let publicID = dotpCrypt.getPublicID(keyPair.publicKey)
  return {
    secretKey: secretKey,
    publicKey: keyPair.publicKey,
    publicID: publicID,
    name: data.name,
    createdAt: data.createdAt,
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
  localStorage.setItem(publicID, serialize(keyPair.secretKey, name))
}

exports.get = function(publicID) {
  let key = localStorage.getItem(publicID)
  return new KeyPair(deserialize(key))
}

// Returns all the keys we know about
exports.getAll = function(filter) {
  let keys = []
  for ( let i = 0, len = localStorage.length; i < len; ++i ) {
    keys.push(localStorage.getItem(localStorage.key(i)))
  }
  let data = []
  for (let key of keys) {
    let keyPair = deserialize(key)
    if (filter && keyPair.publicKey[0] === filter) {
      data.push(new KeyPair(keyPair))
    } else {
      data.push(new KeyPair(keyPair))
    }
  }
  return data
}

