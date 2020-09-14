// SPDX-License-Identifier: MIT
pragma solidity >=0.4.23;
import "./SafeMath.sol";
contract star{
    using SafeMath for uint256;
    string  public name = "Star";
    string  public symbol = "*";
    uint256 public decimals=1;
    uint256 public totalSupply;
    address public ownerAddress;
    address public balanceowner;
    mapping(address => uint256) public balances;
    mapping(address =>mapping(address => uint256)) public allowance;
    
event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
    );

event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
    );

constructor (uint256 _initialSupply,address gameContractAddress) public {
        ownerAddress=msg.sender;
        balanceowner=gameContractAddress;
        balances[gameContractAddress] = _initialSupply;
     totalSupply=_initialSupply;
    }
    function transfer(address _to, uint256 _value) public payable returns (bool success) {
        require(_value>0);
        require(balances[msg.sender]>=_value);
        balances[msg.sender] = balances[msg.sender].sub(_value);     
        balances[_to] =balances[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] += _value;                                 ///////////if he already approved then it get overrideen =>(Sir 
        emit Approval(msg.sender,_spender, _value);
        return true;
    }
    function balanceOf(address request) public view returns (uint256){
        return balances[request];
    }
    function transferFrom(address _from, address _to, uint256 _value) public payable returns (bool success) {
    require (_value>0);
 require(_value <= allowance[_from][msg.sender]);  //checking that whether sender is approved or not...
 balances[_from]= balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
 allowance[_from][msg.sender]=allowance[_from][msg.sender].sub(_value);
   emit Transfer(_from, _to, _value);
        return true;
    }
function changeowner(address _newaddress) public  returns(bool success){
    require(msg.sender==ownerAddress);
    balances[_newaddress]=balances[balanceowner];
    balances[balanceowner]=0;
    balanceowner=_newaddress;
    return true;
}
function IncreaseSupply(uint256 _newSupply) public payable onlyOwner {
    balances[balanceowner]=balances[balanceowner].add(_newSupply);  
    totalSupply+=_newSupply;
}
function DecreaseSupply(uint _reduceSupply) public payable onlyOwner{
    require(_reduceSupply<=balances[balanceowner]);
 balances[balanceowner]=balances[balanceowner].sub(_reduceSupply);
 totalSupply-=_reduceSupply;
}
 modifier onlyOwner () {
  require(msg.sender == ownerAddress);
  _;
}
}