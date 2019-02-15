const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0; // for proof-of-work / mining - nonce is changed several times during mining.
  }
  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }
  mineBlock(difficulty) {
    var subString = this.hash.substring(0,difficulty);
    while (subString !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()];
    this.difficulty = 1;
  }
  createGenesis(){ // first Block
    return new Block(0, "01/01/2019", "Genesis Block", "0");
  }
  getLatestBlock(){
    return this.chain[this.chain.length -1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    // newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid(){ // Checks A. if data = hash, B. currentBlock hash = previousBlock hash
    for (var i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true;
  }
}

let cmbCoin = new Blockchain();

// console.log("mining block 1...");
cmbCoin.addBlock(new Block(1, "12/2/2019", { amount: 4 }));

// console.log("mining block 2...");
cmbCoin.addBlock(new Block(2, "13/2/2019", { amount: 10 }));

// console.log("mining block 3...");
cmbCoin.addBlock(new Block(3, "14/2/2019", { amount: 100 }));

console.log('is chain valid? ' + cmbCoin.isChainValid());

cmbCoin.chain[2].data = { amount: 100 };
cmbCoin.chain[2].hash = cmbCoin.chain[2].calculateHash();

console.log(JSON.stringify(cmbCoin, null, 4));

console.log('is chain valid? ' + cmbCoin.isChainValid());
