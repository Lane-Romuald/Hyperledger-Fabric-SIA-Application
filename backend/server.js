/*
 * Lane Romuald. All Rights Reserved.
 *
 * laneromuald@gmail.com
 */


const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const axios=require('axios');
const bodyParser = require('body-parser');


// Middleware for parsing request bodies into JSON
app.use(bodyParser.json());

const hostname = '0.0.0.0';
const port = process.env.PORT || '3000';
const ip = 'Your IP adresse';



// Some Variables
ID_user="";
Password_user="";

IID_user="";
IPassword_user="";

ID_capteur="";
ID_actionneur=0;


const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./utils/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./utils/AppUtil.js');
const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'smartaicc';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'Your Organisation User ID';

// Define the folder containing static files
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static('frontend'))

// Read the key and certificate files
const credentials = {
// Read the private key file
	key: fs.readFileSync('./certs/tls.key'),
	// Read the certificate file
	cert: fs.readFileSync('./certs/tls.crt'),
	ca: fs.readFileSync('./certs/rootCA.pem'),  
	};
// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Client IP: ${clientIp}`);
    next();
});

// Main route to serve your main HTML page, for example


function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}


/*OUR SERVER ROUTINES*/

//Home page
app.get('/sai', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

//User login page
app.get('/sai/acces', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Retrieve connection parameters for testing
app.post('/sai/connexions', async function (req, res) {
	
				console.log('\n--> Connection data : ');
				console.log(req.body.id);
				console.log(req.body.password);
				ID_user = req.body.id;
				Password_user=req.body.password;
				try {
				const f=await axios.get('https://Your_IP_Adresse:3000/sai/connexion');
			} catch (error) {
				console.error(error);
			}
		});

//Connection parameter validation
app.get('/sai/connexion', async function (req, res) {
	
    try {
		const ccp = buildCCPOrg1();
		const caClient = buildCAClient(FabricCAServices, ccp, 'Your_CA_container, e.g : ca.org1.sia.com');
		const wallet = await buildWallet(Wallets, walletPath);
		await enrollAdmin(caClient, wallet, mspOrg1);
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
		const gateway = new Gateway();
		await gateway.connect(ccp, {
			wallet,
			identity: org1UserId,
		});
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chaincodeName);
		console.log('\n--> Evaluate Transaction: OwnerConnexion');
		result = await contract.evaluateTransaction('OwnerConnexion', ID_user);
		console.log(`*** Result: ${prettyJSONString(result.toString())}`);
		datax=prettyJSONString(result.toString());
		const jsonObject = JSON.parse(datax);
		// Extract values
		const id_p = jsonObject.ID_p;
		const pwd_p = jsonObject.PWD_p;

		// Display values
		console.log(id_p);
		console.log(pwd_p);

	
		res.json(datax);
			// Disconnect from the gateway.
			await gateway.disconnect();

} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        
    }
});

//Connection authorisation
app.get('/sai/login', async function (req, res) {
		
	login="OK"
	console.log("login page");
	res.json(login);
			
	});

// User registration
app.post('/sai/inscription', async function (req, res) {
    try {  

		const ccp = buildCCPOrg1();
		const caClient = buildCAClient(FabricCAServices, ccp, 'Your_CA_container, e.g : ca.org1.sia.com');
		const wallet = await buildWallet(Wallets, walletPath);
		await enrollAdmin(caClient, wallet, mspOrg1);
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
		const gateway = new Gateway();
		await gateway.connect(ccp, {
			wallet,
			identity: org1UserId,
		});
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chaincodeName);
			console.log('\n--> Transaction Registration : New user');
			console.log(req.body.username);
			console.log(req.body.password);
			result = await contract.submitTransaction('OwnerInscription', req.body.username, req.body.password);
			console.log('Successful registration !!');
			IID_user=req.body.username;
			IPassword_user=req.body.password;
			try {
				const f=await axios.get('https://Your_IP_Adresse:3000/sai/login');
			} catch (error) {
				console.error(error);
			}
			
			await gateway.disconnect();

	} catch (error) {
        console.error(`Registration transaction failed : ${error}`);
    }});

// User registration page
app.get('/sai/register', (req, res) => {
		res.sendFile(path.join(__dirname, 'views', 'inscription.html'));
	});

// Crop presentation page
app.get('/sai/culture', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'culture.html'));
});

// Monitoring table presentation page
app.get('/sai/surveillance', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tdb.html'));
});

// Sensor management routine
app.get('/sai/capteur', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sensors.html'));
});

// Sensor data update routine
app.post('/sai/datasensor/', async function (req, res) {
    try { 
		const ccp = buildCCPOrg1();
		const caClient = buildCAClient(FabricCAServices, ccp, 'Your_CA_container, e.g : ca.org1.sia.com');
		const wallet = await buildWallet(Wallets, walletPath);
		await enrollAdmin(caClient, wallet, mspOrg1);
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
		const gateway = new Gateway();
		await gateway.connect(ccp, {
			wallet,
			identity: org1UserId,
		});
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chaincodeName);
			console.log('\n--> Submit Transaction:UpdateBlockSensorAsset, update asset with ID, Propriétaire,culture,HS, TS, TA, HR, PP, QP');
			result = await contract.submitTransaction('UpdateBlockSensorAsset', req.body.ID_bc, req.body.ID_pbc,req.body.Culture_bc,req.body.HS, req.body.TS, req.body.TA, req.body.HR,req.body.PP,req.body.QP);
			console.log('Sensor update');
			ID_capteur=req.body.ID_bc;
			await gateway.disconnect();

	} catch (error) {
        console.error(`Error updating sensor values: ${error}`);
      
    }});

// Routine for reading the parameters of a sensor asset
app.get('/sai/datasensorid', async function (req, res) {
	
		try {
			const ccp = buildCCPOrg1();
			const caClient = buildCAClient(FabricCAServices, ccp, 'Your_CA_container, e.g : ca.org1.sia.com');
			const wallet = await buildWallet(Wallets, walletPath);
			await enrollAdmin(caClient, wallet, mspOrg1);
			await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
			const gateway = new Gateway();
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
			});
			const network = await gateway.getNetwork(channelName);
			const contract = network.getContract(chaincodeName);
			console.log('\n--> Evaluate Transaction: ReadBlocksensorAsset');
			result = await contract.evaluateTransaction('ReadBlocksensorAsset', ID_capteur);
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);
			datax=prettyJSONString(result)
			res.json(datax);
				// Disconnect from the gateway.
				await gateway.disconnect();
	
	} catch (error) {
			console.error(`Failed to evaluate transaction: ${error}`);
			res.status(500).json({error: error});
			
		}
	});

// Actuator management routine
app.get('/sai/actionneur', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'actuators.html'));
});

// Routine for presenting the manual actuator control page
app.get('/sai/controle', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'controle.html'));
});

// Routine for reading the parameters of an actuator asset
app.get('/sai/dataactuatorid', async function (req, res) {
	
		try {
			const ccp = buildCCPOrg1();
			const caClient = buildCAClient(FabricCAServices, ccp, 'Your_CA_container, e.g : ca.org1.sia.com');
			const wallet = await buildWallet(Wallets, walletPath);
			await enrollAdmin(caClient, wallet, mspOrg1);
			await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
			const gateway = new Gateway();
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
			});
			const network = await gateway.getNetwork(channelName);
			const contract = network.getContract(chaincodeName);
			console.log('\n--> Evaluate Transaction: ReadBlockactuatorAsset');
			result = await contract.evaluateTransaction('ReadBlockactuatorAsset', "Bloc_actioneur_0");
			console.log(`*** Result: ${prettyJSONString(result.toString())}`);
			datax=prettyJSONString(result)
			res.json(datax);
				// Disconnect from the gateway.
				await gateway.disconnect();
	
	} catch (error) {
			console.error(`Failed to evaluate transaction: ${error}`);
			res.status(500).json({error: error});
			
		}
	});

// Manual actuator control routine
app.post('/sai/manuelle/', async function (req, res) {
	try { 
		const ccp = buildCCPOrg1();
		const caClient = buildCAClient(FabricCAServices, ccp, 'Your_CA_container, e.g : ca.org1.sia.com');
		const wallet = await buildWallet(Wallets, walletPath);
		await enrollAdmin(caClient, wallet, mspOrg1);
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
		const gateway = new Gateway();
		await gateway.connect(ccp, {
			wallet,
			identity: org1UserId,
		});
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chaincodeName);
			console.log('\n--> Submit Transaction:UpdateBlockActuatorAsset');
			result = await contract.submitTransaction('UpdateBlockActuatorAsset', req.body.ID_ba, req.body.ID_pba,req.body.Culture_ba,req.body.Etat);
			console.log('Actuator status update');
			ID_actionneur=req.body.Etat;
			
			console.log(req.body.ID_ba);
			console.log(req.body.ID_pba);
			console.log(req.body.Culture_ba);
			console.log(req.body.Etat);
			
			await gateway.disconnect();
			
			} catch (error) {
				console.error(`Update error Actuator status: ${error}`);
			
			}
	});

// Read routine to retrieve actuator status
app.get('/value', (req, res) => {
		const value = ID_actionneur; // The value you wish to return
		
		res.json({ value: value });
	  });
	
const httpsServer = https.createServer(credentials,app);	
httpsServer.listen(port ,ip,() => {
	console.log(`Listening to requests on https://${ip}:${port}`);
  });



  