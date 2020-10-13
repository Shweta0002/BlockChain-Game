var TX = require('ethereumjs-tx');
const Web3 = require('web3')
//const web3 = new Web3('')
var providerURL = "https://rinkeby.infura.io/v3/e72daeeafa5f4e8cae0110b45fed3645"
const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));

var gameContractAddress = '0x9Ffc06cc4d565B77ebCeF768D99B997Ad36c4870'
var nftContractAddress = '0xf20FDBBcF06e532823dD6C1b0Fa0ee39C848Dc6E'
var starsContractAddress = '0x1b83d8074e1cAd12dbCB5E2AdCde52fCaD4b1f14'
//Game interface
const interface = [{"constant":true,"inputs":[],"name":"stars","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"tokenID1","type":"uint256"},{"name":"tokenID2","type":"uint256"},{"name":"status","type":"bool"}],"name":"clearTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"nft_add","type":"address"}],"name":"set_nft_address","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token_add","type":"address"}],"name":"set_token_address","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nft","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"setValue","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"TotalCards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"player1","type":"address"},{"name":"player2","type":"address"},{"name":"token1","type":"uint256"},{"name":"token2","type":"uint256"}],"name":"playGame","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingScissor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingPaper","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"card1","type":"uint256"},{"name":"card2","type":"uint256"}],"name":"decide","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_stars","type":"uint256"}],"name":"setStars","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"setToken","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_of","type":"address"}],"name":"showStars","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"starCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"player","type":"address"}],"name":"signUp","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"NoOfTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"cardDetails","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"},{"name":"_count","type":"uint256"}],"name":"blockStars","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingRock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var game = new web3.eth.Contract((interface) , gameContractAddress); //deployed address 


//NFT interface
const interface_nft =  [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"tokenOwners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"setGameContractAddress","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"ownToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"returnSeason","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"playersTokenCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"approval","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"typ","type":"uint256"},{"name":"_totalcount","type":"bool"}],"name":"returnTokenCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentSeason","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"changeSeason","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"returnOwnedToken","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"playeraddress","type":"address"},{"name":"cardtype","type":"uint256"},{"name":"_value","type":"uint256"}],"name":"createToken","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"player","outputs":[{"name":"cardtype","type":"uint256"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenDetails","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"contractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":true,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"}];
var nft = new web3.eth.Contract((interface_nft) , nftContractAddress);


//Stars interface 
const interface_stars = 
[
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
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
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
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
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
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
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
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
		"name": "gameContractAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
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
				"name": "_newaddress",
				"type": "address"
			}
		],
		"name": "changeowner",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
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
				"name": "request",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
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
		"name": "returnSeason",
		"outputs": [
			{
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
		"name": "ownerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
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
				"name": "_reduceSupply",
				"type": "uint256"
			}
		],
		"name": "DecreaseSupply",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "currentSeason",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "changeSeason",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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
				"name": "_newSupply",
				"type": "uint256"
			}
		],
		"name": "IncreaseSupply",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_initialSupply",
				"type": "uint256"
			},
			{
				"name": "_gameContractAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
];

var star = new web3.eth.Contract(interface_stars, starsContractAddress);


//////////////////////////////////////////////////////////////////////////////////////////////////////////ACCOUNTS USED////////////

const account1  = '0x273C249b8bE25a88aDe9ec182655Af6ae263C58a'
const account2  = '0xF7C17c02428CcC44a35725DfDe473cCA2c4393ff'
const account3  = '0xf158F22ec9ef60A64F83Cf2BD59F6b5554E9caC4'
const account4 = '0x63580a35A6B6Da5c13c1Bf9c62C51FbCe64c806F';




const privateKey1 = new  Buffer.from('d126dd29ecae53e923d3b59b2e4b8281b447bd18bd81dc4e9890fd559f1525fb' , 'hex');
const privateKey2 = new  Buffer.from('60d4a93d45c1b890b340db0fbc9ce48afedcee22f71433812828e5c8e8f7774c' , 'hex');
const privateKey3 = new  Buffer.from('1d74031771cabab38b07d31937bdcf279c712f0e2f358c1072bc0cf27898e004' , 'hex');
const privateKey4 = new Buffer.from('7958cb545ad3be8ad142a8f632c7c7cc5c8bc18bdd098f69998ee026e4fa525a' , 'hex');


//////////////////////////////////////////////////////////transcation function for game////////////////////////////////////////////
async function runCode(data , account , privateKey,  deployedAddress){
        
        var count = await web3.eth.getTransactionCount(account); 
		//console.log(count);
        var Price =  await web3.eth.getGasPrice();
        
       
        var txData = {

                nonce: web3.utils.toHex(count),
                

                gasLimit: web3.utils.toHex(2500000),
                
                gasPrice: web3.utils.toHex(Price * 1.40),
                
                to: deployedAddress,                    
       
                from: account,  
                
                data: data
        
        };
                
        var run_code = new TX(txData, {'chain': 'rinkeby'});
        
        run_code.sign(privateKey); //change here 
        
        const serialisedrun_code = run_code.serialize().toString('hex');
        
        const result = await  web3.eth.sendSignedTransaction('0x' + serialisedrun_code);
        console.log(result);
      
};




//////////////////////////////////////////////////////////////////////////////interact with game functions //////////////////////////////////////////
async function setNftAddress(_nftAddress , account , privateKey , deployedAddress){    ///function to link nft with game contract ///not to be used, it's already set
        try{
                var data = game.methods.set_nft_address(_nftAddress).encodeABI();
                await runCode(data , account , privateKey , deployedAddress);
        }
        catch{
                throw{message: "ERROR: cann't set nft contract address"};
        }
        
}
async function setERC20Contractaddress(starContract_address ,  account , privateKey , deployedAddress){ ///function to link stars conttract with game contract //not to be used , already set
        try{
                var data = game.methods.set_token_address(starContract_address).encodeABI();
                await runCode(data , account , privateKey , deployedAddress);
        }
        catch{
                throw{message: "ERROR: cann't set token contract address"};
        }
         
}

async function setStars(_stars ,account , privateKey , deployedAddress ){ //////set initial stars to be  given to player, not to be used already set
        try{
                var data = game.methods.setStars(_stars).encodeABI();
                await runCode(data , account , privateKey , deployedAddress);
        }
        catch{
                throw{message: "ERROR: cann't set star ammount"};
        }        
}
async function setValue(_value , account , privateKey , deployedAddress){///////set initial card value to be supplied to player , already set not to be used
        try{
                var data = game.methods.setValue(_value).encodeABI();
                await runCode(data , account , privateKey , deployedAddress);
        }
        catch{
                throw{message: "ERROR: cann't set value of each nft"};
        }
        
}
async function setToken(_amount , account , privateKey , deployedAddress){   ////set token count (supply_ not be used already set)
        try{
                var data = await game.methods.setToken(_amount).encodeABI();
                await runCode(data , account , privateKey , deployedAddress);
        }
        catch{
                throw{message: "ERROR: cann't set token ammount"};
        }
}
async function signUP(player , account , privateKey , deployedAddress){ //// takes 4 argumets for signup , account of player  
        try{																//// , account, private key to be used for transaction and game contract addresss
                var data = await game.methods.signUp(player).encodeABI(); 
                await runCode(data , account , privateKey , deployedAddress); 
        }
        catch{
                throw{message: "ERROR: cann't signup"};
        }
}		
							
async function totalCards( _of ){ //// argument : address returns : total cards given account address is holding
        try{
                var data = await game.methods.TotalCards(_of).call();
                //run_code(data);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "ERROR: cann't show total cards this account is holding"};
        }
}

async function showStars(_of){   //  argument: address returns : total stars given account is holding
        try{
                var data = await game.methods.showStars(_of).call(); 
                //run_code(data);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "ERROR: cann't show how many stars this address is holding "};
        }
}
async function remainingRock(_of){/////argument : address   returns: total rock cards of account
        try{
                var data= await game.methods.remainingRock(player);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "rock doesn't exist"};

        }   

}
async function remainingPaper(_of){//////argumets : address    returns: totak paper cards of account
        try{
                var data= await game.methods.remainingPaper(player);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "rock doesn't exist"};

        }   

}

async function remainingScissor(_of){ //////arguments: address  return: total scissor cards account is holding
        try{
                var data= await game.methods.remainingScissor(player);
                console.log(data);
                return data;
        }
        catch{
                throw{message: "rock doesn't exist"};

        }   

}
async function cardDetails(address , of){
	const val =await  game.methods.cardDetails(address , of).send({from:account1});
	console.log(val);
	await runCode(data , account1 , privateKey1 , gameContractAddress);
}


///////////////////////////////////////////////////////////////////nft functions//////////////////////////////////////////////////////////
     
      async function burn(tokenId , account , privateKey , deployedAddress){  ///burns the card , and card will no longer be accessible 
         try{
                 let cardDelete = await nft.methods.burn(tokenId).encodeABI();
                 await runCode(cardDelete , account , privateKey , deployedAddress);
         }
          catch (e){
                throw{ message : "Token not burn"};
          }
       }
       
       async function details(tokeId){ ////argument : tokenID   returns: card type ie rock . paper or scissor and card value
        try{
                var cardType;
                cardType = await nft.methods.tokenDetails(tokeId).call();
                //It will return both type and value both respectively 
                //transaction(trx);
                console.log(cardType);
                return (cardType);
        }
        catch (e) {
                 throw{ message : "Token details not given"};
        }
	  } 
	  async function allDetailsOfOwnedTokens(address){ //////////////return all token details along with owned tokn by any address //argument: address of user
			try{
				var details = await nft.methods.returnAllDetails(address).call();
				console.log(details);
				return (details);
			}
			catch (e){
				throw{ message : "Token details not found"};
			}
		}
      
      async function returnOwnedToken(_address){ //// argument : address   returns : array of Ids given account address is holding
        try{
                let tokenList = await nft.methods.returnOwnedToken(_address).call();
                console.log(tokenList);
                return owner;
        }
        catch(e){
                throw{message : "Owner not returned"};
        }
      }
      
   
       async function ownerOf(tokeId){////argument : tokenId    returns: account address of the owner of given tokenID
         try{
                let cardOwner = await nft.methods.ownerOf(tokeId).call();
				//transaction(trx);
				console.log(cardOwner);
                return cardOwner;
         }
         catch (e){
                throw{ message : "Does not return owner"};
         }
      }
	  
async function tokenCreate(_address, tokenType, tokenValue ,account , privateKey , deployedAddress  ){
		try{
		let creation = await nft.methods.createToken (_address, tokenType, tokenValue).encodeABI();
		runCode(creation,account , privateKey , deployedAddress );
		}
		catch (e){
		  throw{ message : "Token not created"};
		}
}
      async function transfer(_address,tokeId , account , privateKey , deployedAddress){/////trasnfer token from self to other account
        try{
                let transfer = await nft.methods.transfer(_address,tokeId).encodeABI();
                await runCode(transfer , account , privateKey , deployedAddress);
        }
        catch(e){
          throw{ message : "Transfer not successfull"};
        }
      }
      
      async function safeTransferFrom(_address, __address, tokenId , account , privateKey , deployedAddress){/////transfer token from other account to someone else account // requires approval
        try{
                let transfer = await nft.methods.safeTransferFrom(_address, __address, tokenId).encodeABI();
                await runCode(transfer , account , privateKey , deployedAddress);
        }
        catch(e){
          throw{message : "Transfer not successfull"};
        }
      }    
///////////////////////////////////////////////////////////stars contract functions/////////////////////////////////

async function Transfer(_to,value, account , privateKey , deployedAddress){ ///transfer stars from self to other
	try{
				var data = await star.methods.transfer(_to,value).encodeABI();
				console.log(data);
                await runCode(data , account , privateKey , deployedAddress);
        }catch(err){
	        throw{ message : "ERROR : Token not transferred using transfer"};
}
}

async function TransferFrom(_from,_to,value , account , privateKey , deployedAddress){////transfer stars from other to someone else account ///approval needed 
        try{
                 var Transferred = await star.methods.transferFrom(_from,_to,value).encodeABI();
                await runCode(Transferred , account , privateKey , deployedAddress);
        }
        catch(err){
                throw{ message : "ERROR : Token not transferred using transferFrom"};
        }
}

async function getbalance(_address){ //// argument: address returns : total stars account is holding
	try{
                var balance = await star.methods.balanceOf(_address).call();
                console.log(balance);
                return balance;
        }catch(err){
                throw{ message : "ERROR : Balance not retrieved"};
        }
}
async function approve(address , amount , account ,privateKey , deployedAddress){
	try{
		var data = await star.methods.approve(address , amount).encodeABI();
		await runCode(data , account , privateKey , deployedAddress);
	}
	catch{
		throw{ message: "ERROR: Unable to approve the user"};
	}
}

async function changeSeason(account , privateKey , deployedAddress){
	try{
		var data = await star.methods.changeSeason().encodeABI();
		await runCode(data , account , privateKey , deployedAddress);
	}
	catch{
		throw{ message: "Error: unable to change the season, are you authorized?"};
	}
}
async function returnCurrentSeason(account , privateKey , deployedAddress){
	try{
		var data = await star.methods.returnSeason().call();
		console.log(data);
		return data;
	}
	catch{
		throw{ message: "Error: unable to process request"};
	}
}

////////////////////////////////////////////////////////////////////////////create new accounts///////////////////////////////////////


const bip39 = require('bip39js');
const ethers = require('ethers');

function getEntropy() {
    return bip39.genEntropy(128);
}

function createAccount() {

    // GENERATE MNEMONIC
    const mnemonic = bip39.genMnemonic(getEntropy());

    // GET PRIVATE KEY
    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    const privateKey = mnemonicWallet.privateKey;

    // GET ADDRESS
    const address = mnemonicWallet.address

    return { address, privateKey, mnemonic };
}

function getAccountFromMnemonic(mnemonic) {

    try {
        if (!bip39.validMnemonic(mnemonic)) {
            error = 'Invalid Mnemonic.'
            return error;
        }
    }
    catch (err) {
        error = 'Invalid Mnemonic.'
        return error;
    }

    //Path for extra accounts
    //path = "m/44'/60'/0'/0/0"

    // Get Private Key
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);
    const privateKey = wallet.privateKey;

    // Get Address
    const address = wallet.address

    return { address, privateKey, mnemonic };

}

function createAccounts(){
	console.log(createAccount());
};

function getAccountByMnemoics(_stringOfMnemonics){
	console.log(getAccountFromMnemonic(_stringOfMnemonics));
};

//console.log(createAccount());
//console.log(getAccountFromMnemonic('season system maze street yellow current clap lion pretty old comic crack'));// Sample Mnemonic

//sample account created

//address: '0xBa97e35fc5D7250199D709d4CBF53Ed32e8aF4B1',
// privateKey: '0xe29db1ed6e8102b672ac0337deca4f81261164909fd869f4ffd0aea64d03706e',
// mnemonic: 'season system maze street yellow current clap lion pretty old comic crack'

///////////////////////////////////////////////////////////////////////call functions here////////////////////////////////////////////////

setNftAddress(nftContractAddress , account1 , privateKey1 , gameContractAddress);
//setERC20Contractaddress(starsContractAddress , account1 , privateKey1 , gameContractAddress);
//setOwner(gameContractAddress , account1 , privateKey1 , gameContractAddress);
//setStars(10 , account1 , privateKey1 , gameContractAddress);
//setToken(3 , account1 , privateKey1 , gameContractAddress);
//setValue(40 , account1 , privateKey1 , gameContractAddress);
//signUP(account2 , account1 , privateKey1 , gameContractAddress);
//showStars(account2 );
//totalCards(account1 , account1 , privateKey1 , gameContractAddress);

//returnOwnedToken('0xD242b543d61b707162D3A18Cc44160050f23318C' , account1 , privateKey1 , nftContractAddress);
//cardDetails(account1 , 5  , account1 , privateKey1  , gameContractAddress);
//details(5 , account1 , privateKey1 , nftContractAddress);
//transfer(gameContractAddress, 500 , account1 , privateKey1 , nftContractAddress);
//owner(5 , account1 , privateKey1 , nftContractAddress);
//clearTokens(5  , 0 , false , account1 , privateKey1, gameContractAddress);
//Transfer(account2 , 10, account1  , privateKey1 , starsContractAddress);
//cardDetails(account1 , 1);
//approve(gameContractAddress , 1000000000 , account1 , priva teKey1 , starsContractAddress);
