'use strict'

const sha256 = require('sha256')

module.exports = class Block {
  constructor(data, prevHash) {
    this.id = 0
    this._timestamp = new Date()
    this._data = data
    this._prevHash = prevHash
    this.nonce = 0;
    this._hash = this.calcHash() 
  }

  get hash() {
    return this._hash
  }
  set hash(hash) {
    this._hash = hash
  }
  set timestamp(timestamp) {
    this._timestamp = timestamp
  }
  get timestamp() {
    return this._timestamp
  }

  set data(data) {
    this._data = data
  }
  get data() {
    return this._data
  }

  set prevHash(prevHash) {
    this._prevHash = prevHash
  }
  get prevHash() {
    return this._prevHash
  }

  calcHash() {
    this._hash = sha256(
      this.id + this._prevHash + this._timestamp + this._data + this.nonce
    ).toString()
  }

  mineBlock(difficulty) {
    const builCrit = function(numberOfZeros) {
      console.log('numberofzeros: ' + numberOfZeros)
      var crit = ''
      for (var i = 0; i < numberOfZeros; i++) {
        crit = crit + '0'
      }
      return crit
    }
    var crit = builCrit(difficulty)
    var ok = false

    while (!ok) {
      var comp = this._hash.substring(0, difficulty).localeCompare(crit)
      if (comp === 0) {
        ok = true
        console.log('[block#'+this.id+']: nonce: ' + this.nonce)
      } else {
        this.nonce = this.nonce + 1
        this.calcHash()
        if (this.nonce % 10000 === 0){
          // https://stackoverflow.com/questions/6157497/node-js-printing-to-console-without-a-trailing-newline
          process.stdout.write('.')
        }
      }
    }
    console.log('BLOCK #'+this.id+' MINED: nonce: '+this.nonce+', hash: ' + this._hash)
    return this
  }
}
