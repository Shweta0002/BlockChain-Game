var TX = require('ethereumjs-tx');
const Web3 = require('web3')
//const web3 = new Web3('')
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/e72daeeafa5f4e8cae0110b45fed3645"));

const account1  = '0x273C249b8bE25a88aDe9ec182655Af6ae263C58a'
const account2  = '0xF7C17c02428CcC44a35725DfDe473cCA2c4393ff'
const account3  = '0xf158F22ec9ef60A64F83Cf2BD59F6b5554E9caC4'


const privateKey1 = new  Buffer.from('d126dd29ecae53e923d3b59b2e4b8281b447bd18bd81dc4e9890fd559f1525fb' , 'hex');
const privateKey2 = new  Buffer.from('60d4a93d45c1b890b340db0fbc9ce48afedcee22f71433812828e5c8e8f7774c' , 'hex');
const privateKey3 = new  Buffer.from('1d74031771cabab38b07d31937bdcf279c712f0e2f358c1072bc0cf27898e004' , 'hex');

const interface = [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stars","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"nft_add","type":"address"}],"name":"set_nft_address","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"player1","type":"address"},{"name":"player2","type":"address"},{"name":"token1","type":"uint256"},{"name":"token2","type":"uint256"}],"name":"play_game","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token_add","type":"address"}],"name":"set_token_address","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nft","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"setValue","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"TotalCards","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingScissor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingPaper","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"card1","type":"uint256"},{"name":"card2","type":"uint256"}],"name":"decide","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_stars","type":"uint256"}],"name":"setStars","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"setToken","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_of","type":"address"}],"name":"showStars","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"},{"name":"cards","type":"uint256"}],"name":"block_card","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"signup","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"starCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NoOfTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_of","type":"address"}],"name":"remainingRock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
var _interface = new web3.eth.Contract((interface) , '0x5B60C07a6ed3C4a426891be4F6F16B025224b63F');
// const compile = require('./compile');
// const { interface, bytecode} = require('./compile');
async function run_code(data){
        
        var count = await web3.eth.getTransactionCount("0x273C249b8bE25a88aDe9ec182655Af6ae263C58a");

        var Price =  await web3.eth.getGasPrice();
        
       
        var txData = {

        nonce: web3.utils.toHex(count),
        

        gasLimit: web3.utils.toHex(2500000),
        
        gasPrice: web3.utils.toHex(Price * 1.40),
        
        to: '0x5B60C07a6ed3C4a426891be4F6F16B025224b63F',
        
        from: account1,
        
        data: data
        
        };
                
        var transaction = new TX(txData, {'chain': 'rinkeby'});
        
        transaction.sign(privateKey1);
        
        var serialisedTransaction = transaction.serialize().toString('hex');
        
        const result = await  web3.eth.sendSignedTransaction('0x' + serialisedTransaction);
        console.log(result);
      
};
async function nft(_nftAddress){
        try{
                var data = _interface.methods.set_nft_address(_nftAddress).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set nft contract address"};
        }
        
}
async function set_ERC20_Contract_address(starContract_address){
        try{
                var data = _interface.methods.set_token_address(starContract_address).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set token contract address"};
        }
         
}
async function setowner(owner_address){
        try{
                var data = _interface.methods.setOwner(owner_address).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set owner address"};
        }
}
async function setstars(_stars){
        try{
                var data = _interface.methods.setStars(_stars).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set star ammount"};
        }
         
}
async function setvalue(_value){
        try{
                var data = _interface.methods.setValue(_value).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set value of each nft"};
        }
        
}
async function settoken(_amount){
        try{
                var data = await _interface.methods.setToken(_amount).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't set token ammount"};
        }
}
async function signUP(){
        try{
                var data = await _interface.methods.signup().encodeABI(); 
                run_code(data); 
        }
        catch{
                throw{message: "ERROR: cann't signup"};
        }
}
async function showstars(_of){
        try{
                var data = await _interface.methods.showStars(_of).call(); 
                //run_code(data);
                return data;
        }
        catch{
                throw{message: "ERROR: cann't show how many stars this address is holding "};
        }
}
async function totalcards(_of){
        try{
                var data = await _interface.methods.TotalCards(_of).encodeABI();
                run_code(data);
        }
        catch{
                throw{message: "ERROR: cann't show total cards this account is holding"};
        }
}
async function playGame( player1 ,player2 , token1 , token2 ){
        try{
                var data = await _interface.methods.play_game( player1, player2, token1 , token2).encodeABI();
                return run_code(data);
        }
        catch{
                throw{message: "ERROR: unable to process game"};
        }

}

//setvalue(20);
 //settoken(0x047545e01dA85d8b166d8743c838e20f5312b2E3);
 //setowner(0x5B60C07a6ed3C4a426891be4F6F16B025224b63F);
// token();
 //nft(0x9F0A14b16E84B71E5f48CF3B9635ec4F2eC7143E);

// setstars();
//signUP();
//var output= showstars('0xF7C17c02428CcC44a35725DfDe473cCA2c4393ff');
//var output = await playGame('0xF7C17c02428CcC44a35725DfDe473cCA2c4393ff','0xf158F22ec9ef60A64F83Cf2BD59F6b5554E9caC4', 7 , 13);
//console.log(output);
async function run_showstars(){
        try{
        var output= await showstars('0xF7C17c02428CcC44a35725DfDe473cCA2c4393ff');
        console.log(output);
        }
        catch{
                console.log("cant");
        }
}

 run_showstars();