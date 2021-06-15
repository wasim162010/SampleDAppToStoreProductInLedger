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

app.get('/v1/page/product', async(req, res) =>{
    console.log('product');
    res.sendFile(path.join(__dirname + '/addProduct.html'));
});


app.get('/v1/page/location', async(req, res) =>{
    console.log('location');
    res.sendFile(path.join(__dirname + '/trackLocation.html'));
	
 });

app.get('/v1/page/welcome', async(req, res) =>{
  console.log('welcome');
  res.sendFile(path.join(__dirname + '/welcome.html'));

});


app.get('/v1/page/location/update', async(req, res) =>{
  
  console.log('update location');
  res.sendFile(path.join(__dirname + '/updateLocation.html'));

});


app.post('/v1/product/post', async(req, res) =>{
    console.log('add product');
    // console.log(req.query.name);
    // console.log(req.query.cost);
    // console.log(req.query.specs);
    // console.log(req.query.manufacturer);
    // console.log(req.query.zipcode);
    // console.log(req.query.address);
    // console.log(req.query.location);

    var resp = await saveProduct(req.query.name, req.query.cost, req.query.specs, req.query.manufacturer, req.query.zipcode, 
                        req.query.address, req.query.location);
    if(resp > 0) {
        res.send("Product  "+ resp + " has been added" );
    } else {
        res.send("Issue in adding product" );
    }
 });


app.post('/v1/location/post', async(req, res) =>{
  
    console.log('update location of product');
    console.log(req.query._prod_Id);
    console.log(req.query.zipcode);
    console.log(req.query.address);
    console.log(req.query.location);
  

    var resp = await updateProductLocation(req.query._prod_Id, req.query.zipcode, req.query.address, req.query.location);
    
    if(resp > 0) {
        res.send("Location of Product  "+ resp + " has been added" );
    } else {
        res.send("Issue in updating product location" );
    }

});


app.get('/v1/ids/get', async(req, res) =>{
    var pId= await getAllProductIDs()
    res.send(pId);

 });

app.get('/v1/locations/get', async(req, res) =>{
   
    var locs =  await getAllLocationsVal(req.query._prod_Id);
    res.send(locs);

 });


app.get('/v1/location/get', async(req, res) =>{
  console.log('most recent location');
  console.log(req.query._prod_Id);
  var loc = await getCurrentLocation(req.query._prod_Id);
  res.send(loc);
});

function formulateResponse(loc) {
  var locDetail=""
  for (const key in loc) {
    // console.log(`${key}: ${user[key]}`);
    var prodID= " Product id :" + loc[key]
  }

}



///web3.js code
//pointing to ganache
const web3 = new Web3("http://127.0.0.1:7545")
 
 //**NOTE** 'address' value should be changed to the address of the account which sends the transaction */
const address = '0x181f92EeEabB05Dc04F0C2cbD70753f9ddCa576A' 
const abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_product_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "zipcode",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "currentAddr",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "locType",
				"type": "string"
			}
		],
		"name": "AddProduct",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_p_id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_t_id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_u_id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllProductIDs",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pId",
				"type": "uint256"
			}
		],
		"name": "getAllProductLocation",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "_product_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "zipcode",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "currentAddr",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "locType",
						"type": "string"
					}
				],
				"internalType": "struct SupplyChain.Location[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "prod_id",
				"type": "uint256"
			}
		],
		"name": "getProduct_details",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "_product_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_product_cost",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "_product_specs",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_product_manufacturer",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_product_date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "_product_zipcode",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_product_address",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_product_location",
						"type": "string"
					}
				],
				"internalType": "struct SupplyChain.product",
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pId",
				"type": "uint256"
			}
		],
		"name": "getRecentProductLocation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "p_cost",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "p_specs",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "manufacturer",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_zipcode",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_addr",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_locType",
				"type": "string"
			}
		],
		"name": "newProduct",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "string",
				"name": "_product_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_product_cost",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_product_specs",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_product_manufacturer",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_product_date",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_product_zipcode",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_product_address",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_product_location",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "putPorductID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_zipcode",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_currentAddr",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_locType",
				"type": "string"
			}
		],
		"name": "updateProductLocation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contAddr = '0xb8dB0CE12F28198cFA573Ef9Ad5a8f862DfdB425' //0xb8dB0CE12F28198cFA573Ef9Ad5a8f862DfdB425
const contract = new web3.eth.Contract(abi, contAddr)

async function saveProduct(name, cost, specs, manufacturer, zipcode, address, location) {

    var resp = await contract.methods.newProduct(name, cost, specs, manufacturer, zipcode, address, location).send({from:address});
    return resp;

}


async function getCurrentLocation(product_id) {
    
    console.log("Calling getCurrentLocation")
    var val="";
   
    await contract.methods.getRecentProductLocation(product_id).call(  //working
            (err, result) => {
            var prodID = "Product ID: " + result[0] + ". Current location zipcode:  " + result[1] + ". Current address:  " + result[2] +  ". Location type:  " + result[3] 
            val = prodID
                           /*
                Result { '0': '1', '1': '560076', '2': 'bangalore', '3': 'buyer' }
                1
                560076
                bangalore
                buyer
                            */
            })

    return val;
} 


async function getAllLocationsVal(product_id) {
    var val=0;
    await contract.methods.getAllProductLocation(product_id).call(  
            (err, result) => {       
            val = result;

            }
        )
    return val;
} 

async function getAllProductIDs() {
    var val=0;
    await contract.methods.getAllProductIDs().call(
            (err, result) => {
            val = result
          }
        )
    return val;
} 


async function updateProductLocation(_prod_Id, zipcode, address, _locType) {
    
  console.log("updateProductLocation");

  var resp = await contract.methods.updateProductLocation(_prod_Id, zipcode, address, _locType).send({from:address});
  return resp;

} 