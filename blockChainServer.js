'use strict'

const Block = require('./Block')
const UuMChain = require('./UuMChain')
const express = require('express')
const fs = require('fs')
//
// https://appdividend.com/2018/08/22/express-post-request-example-tutorial/
//
const bodyParser = require('body-parser')
// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const difficulty = 5
const persistentChain = './persistentChain.json'
var transactions = function(){
  var transactions = []
  transactions.push('{from: volker, to: taghreed, betrag: €4.50}')
  transactions.push('{from: michael, to: benedikt, betrag: €5.00}')
  transactions.push('{from: taghreed, to: markus, betrag: €0.50}')
  transactions.push('{from: volker, to: taghreed, betrag: €50.50}')
  return transactions
}

var transactonsFromFile = function(){
  // https://stackabuse.com/reading-and-writing-json-files-with-node-js/
  if (fs.existsSync('transactions.json')){
    let rawdata = fs.readFileSync('transactions.json')
    let transactions = JSON.parse(rawdata)
    console.log(JSON.stringify(transactions))
    return transactions
  }else{
    return []
  }
  
}

var readChainFromFile = function(){
  let blockChain = []
  if (fs.existsSync(persistentChain)){
    let rawdata = fs.readFileSync(persistentChain)
    blockChain = JSON.parse(rawdata)
  }
  return blockChain; 
}
var determineDifficulty = function(req){
  var diff = req.query.difficulty !== undefined ? req.query.difficulty : difficulty
  return diff
}

var writeChainToFile = function(chain){
  fs.writeFileSync(persistentChain, JSON.stringify(chain, null, 2))
}

// App
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/chain', (req, res) => {
  var blockChainString = readChainFromFile()
  res.send(blockChainString)
})


app.get('/', (req, res) => {
  
  var diff = determineDifficulty(req)
  console.log('Build BlockChain with difficulty #' + diff)
  var uumChain = new UuMChain(diff)

  var transactions = transactonsFromFile()
  transactions.forEach(element => {
    console.log('transaction: ' + JSON.stringify(element))
	  uumChain.addBlock(element)
  });

 writeChainToFile(uumChain)
 res.send(JSON.stringify(  uumChain))
 console.log('response is written. goodbye...')
});

app.post('/add', (req, res) => {
  console.log('[/add]: ' + JSON.stringify(req.body))
  var data = req.body.data
  var diff = 4 //determineDifficulty(req)
  
  var prevChainObject = readChainFromFile()
  var uumChain2 = new UuMChain(prevChainObject.difficulty)
  uumChain2._chain = prevChainObject._chain
  uumChain2.addBlock(data)
  
  writeChainToFile(uumChain2)
  res.send(JSON.stringify(uumChain2))
});

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
