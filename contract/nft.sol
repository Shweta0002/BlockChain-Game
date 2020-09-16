pragma solidity >=0.4.17;

contract RPS{
    
    struct card{
        uint256 cardtype; 
        uint256 value;
    }
    
    mapping (address => mapping(uint256 => card))public player;
    
    mapping (address => mapping(uint256=>uint256))public playersTokenCount; 
    
    mapping(uint256 => address) public approval;
    
    mapping(uint256 => address) public tokenOwners; 
    
    mapping (address => uint256[]) public ownToken; // return which tokenid does owner has
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

    
    uint256 public tokenId = 0; 
    //uint256 public totalCount =0;
    address contractowner;
    address gameContractAddress;
    
    function RPS (address contractAddress) public {
        contractowner = msg.sender;
        gameContractAddress = contractAddress;
    }

    function setGameContractAddress (address contractAddress) public payable{
        require(msg.sender == contractowner);
        gameContractAddress = contractAddress;
    }
 
    function createToken (address playeraddress ,uint256 cardtype ,uint256 _value ) public payable {
        /* It will create the token at contractowner address */
        require(msg.sender == contractowner || msg.sender == gameContractAddress);
        player[playeraddress][++tokenId].cardtype = cardtype;
        player[playeraddress][tokenId].value = _value;
        ownToken[playeraddress].push(tokenId);
        playersTokenCount[playeraddress][cardtype]+=1;
         
        tokenOwners[tokenId]=playeraddress;
       
    }
    
    function burn (uint256 _tokenId) public {
        
        require(msg.sender != address(0));
        transfer( address(0), _tokenId);
        
    }
    
    

    function tokenDetails (uint256 _tokenId) public view returns(uint256,uint256){
        /* Function to return the type of the token and its value*/
        require(tokenOwners[_tokenId] != address(0));
        address _address = tokenOwners[_tokenId];
        return ((player[_address][_tokenId].cardtype), player[_address][_tokenId].value);
    }
    
    function returnOwnedToken (address owner) public view returns(uint256[]){
        return ownToken[owner];
    }
    
    function returnTokenCount (address _address, uint256 typ, bool _totalcount) public view returns (uint256) {
        /* Function to return the total count of the token*/
        if(_totalcount == true) {
            uint256 count = playersTokenCount[_address][1]+ playersTokenCount[_address][2]+playersTokenCount[_address][3];
            return count;
        }
        else {
            return playersTokenCount[_address][typ] ;
        }
        
    }
    
    function approve(address _to, uint256 _tokenId) public returns(bool) {
        /* It will approve the token to be transfer*/
        address owner = ownerOf(_tokenId);
        require(_to != owner);
        require (msg.sender == owner);
        //require(contractowner == owner);
    
        
        approval[_tokenId] = _to;
        return true;
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address) {
         /* Function to return the owneraddress of the token*/ 
        address owner = tokenOwners[_tokenId];
        require(owner != address(0));
        return owner;
    }

    function transfer (address _to, uint256 _tokenId) public payable {
        require(tokenOwners[_tokenId] == msg.sender);
        address token_address = ownerOf(_tokenId);
        uint256 token_type = player[token_address][_tokenId].cardtype;
        
        tokenOwners[_tokenId]=_to;
        player[_to][_tokenId].cardtype = player[msg.sender][_tokenId].cardtype;
        player[_to][_tokenId].value = player[msg.sender][_tokenId].value;
        playersTokenCount[_to][token_type]+=1;
        playersTokenCount[msg.sender][token_type]-=1;
        for(uint256 i=0; i < ownToken[msg.sender].length ; i++){
            if( ownToken[msg.sender][i] == _tokenId){
                ownToken[msg.sender][i]=0;
                break;
            }
        }
        ownToken[_to].push(_tokenId);
        delete(player[msg.sender][_tokenId]);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public payable{
        /* Function is used for transferring the token and its ownership from contractowner in both caes when burn is call and when call from market place */
        //require(tokenOwners[_tokenId] == _from);
        require(approval[_tokenId] == msg.sender);
        address token_address = ownerOf(_tokenId);
        uint256 token_type = player[token_address][_tokenId].cardtype;
        
        tokenOwners[_tokenId]=_to;
        player[_to][_tokenId].cardtype = player[_from][_tokenId].cardtype;
        player[_to][_tokenId].value = player[_from][_tokenId].value;
        playersTokenCount[_to][token_type]+=1;
        playersTokenCount[_from][token_type]-=1;
        for(uint256 i=0; i < ownToken[_from].length ; i++){
            if( ownToken[_from][i] == _tokenId){
                ownToken[_from][i]=0;
                break;
            }
        }
        ownToken[_to].push(_tokenId);
        delete(player[_from][_tokenId]);
        
}
}