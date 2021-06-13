var express = require('express');
var app = express();
var path = require('path');
const Web3 = require('web3');
const url = require('url');


app.listen(8081, () => console.log("Server running..."));

app.get('/', async(req, res) =>{
    console.log('home');
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/product', async(req, res) =>{
    console.log('product');
    res.sendFile(path.join(__dirname + '/addProduct.html'));
});


app.get('/events', async(req, res) =>{
    console.log('events');
    res.sendFile(path.join(__dirname + '/Events.html'));
	
 });


app.put('/v1/product/put', async(req, res) =>{
    console.log('add product');
   
	
 });

app.get('v1/events/get', async(req, res) =>{
    console.log('all events');
 
	
 });

app.get('v1/event/get', async(req, res) =>{
    console.log('latest event');
 
	
 });