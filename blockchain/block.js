const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY} = require('../config');

class Block {
    constructor(timestamp, prevHash, hash, data, nonce){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString(){
        return `Block {
            Timestamp: ${this.timestamp}
            Previous Hash: ${this.prevHash.substring(0,10)}
            Hash: ${this.hash.substring(0, 10)}
            Nonce: ${this.nonce}
            Data : ${this.data}
        }`;
    }
    static genesis() {
        return new this('Genesis time', '', 'f38932-hw33', [], 0);
    }

    static mineBlock(prevBlock, data) {
        let hash, timestamp;
        const prevHash = prevBlock.hash;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, prevHash, data, nonce);
        } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new this (timestamp, prevHash, hash, data, nonce);
    }

    static hash(timestamp, prevHash, data, nonce) {
        return SHA256(`${timestamp}${prevHash}${data}${nonce}`).toString();
    }

    static blockHash(block){
        return Block.hash(block.timestamp, block.prevHash, block.data, block.nonce);
    }
}

module.exports = Block;