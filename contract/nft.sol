pragma solidity >=0.4.17;

contract RPS{
    
    struct card{
        uint256 cardtype; //1: Rock , 2: Paper, 3 : Scissors  
        uint256 value;
    }
    
    mapping (address => mapping(uint256 => mapping(uint256 => card)))public player;
    
    mapping (address => mapping(uint256 => mapping(uint256=>uint256)))public playersTokenCount; 
    
    mapping(uint256 => mapping(uint256 => address)) public approval;
    
    mapping(uint256 => mapping(uint256 => address)) public tokenOwners; 
    mapping(address=>mapping(uint256=> string)) allDetails;
    
    mapping (address => mapping(uint256 => uint256[])) public ownToken; // return which tokenid does owner has
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

    
    uint256 public tokenId = 0; 
    //uint256 public totalCount =0;
    address contractowner;
    address gameContractAddress;
    uint256 public currentSeason =1;
    
    function RPS (address contractAddress) public {
        contractowner = msg.sender;
        gameContractAddress = contractAddress;
    }

    function setGameContractAddress (address contractAddress) public payable{
        require(msg.sender == contractowner);
        gameContractAddress = contractAddress;
    }
    
    function changeSeason()public payable onlyOwner{
        currentSeason+=1;
    }
    modifier onlyOwner () {
        require(msg.sender == contractowner);
        _;
    }
 
    function createToken (address playeraddress ,uint256 cardtype ,uint256 _value ) public payable {
        /* It will create the token at contractowner address */
        require(msg.sender == contractowner || msg.sender == gameContractAddress);
        player[playeraddress][currentSeason][++tokenId].cardtype = cardtype;
        player[playeraddress][currentSeason][tokenId].value = _value;
        ownToken[playeraddress][currentSeason].push(tokenId);
        playersTokenCount[playeraddress][currentSeason][cardtype]+=1;
        string memory tempTok ="";
        string memory tempVal ="";
        string memory tempTyp ="";
        string memory fnl="";
        tempTyp = uintToString(cardtype);
        tempVal = uintToString(_value);
        tempTok = uintToString(tokenId);
        fnl = string(abi.encodePacked(tempTok,"!", tempTyp , "!" , tempVal));
        allDetails[playeraddress][currentSeason] = string(abi.encodePacked(allDetails[playeraddress][currentSeason] , "@" , fnl));
        
         
        tokenOwners[currentSeason][tokenId]=playeraddress;
       
    }
    
    function burn (uint256 _tokenId) public {
        
        require(msg.sender != address(0));
        transfer( address(0), _tokenId);
        
    }
     
    function uintToString(uint v) public returns (string) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        return string(s);
    }
    
    function returnAllDetails(address _user) public view returns(string){
        return allDetails[_user][currentSeason];
    }
    

    function tokenDetails (uint256 _tokenId) public view returns(uint256,uint256){
        /* Function to return the type of the token and its value*/
        require(tokenOwners[currentSeason][_tokenId] != address(0), "Not a valid token");
        address _address = tokenOwners[currentSeason][_tokenId];
        return ((player[_address][currentSeason][_tokenId].cardtype), player[_address][currentSeason][_tokenId].value);
    }
    
    function returnOwnedToken (address owner) public view returns(uint256[]){
        return ownToken[owner][currentSeason];
    }
    
    function returnTokenCount (address _address, uint256 typ, bool _totalcount) public view returns (uint256) {
        /* Function to return the total count of the token*/
        if(_totalcount == true) {
            uint256 count = playersTokenCount[_address][currentSeason][1]+ playersTokenCount[_address][currentSeason][2]+playersTokenCount[_address][currentSeason][3];
            return count;
        }
        else {
            return playersTokenCount[_address][currentSeason][typ] ;
        }
        
    }
    
    function approve(address _to, uint256 _tokenId) public returns(bool) {
        /* It will approve the token to be transfer*/
        address owner = ownerOf(_tokenId);
        require(_to != owner);
        require (msg.sender == owner);
        //require(contractowner == owner);
    
        
        approval[currentSeason][_tokenId] = _to;
        return true;
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address) {
         /* Function to return the owneraddress of the token*/ 
        address owner = tokenOwners[currentSeason][_tokenId];
        require(owner != address(0));
        return owner;
    }

    function transfer (address _to, uint256 _tokenId) public payable {
        require(tokenOwners[currentSeason][_tokenId] == msg.sender);
        address token_address = ownerOf(_tokenId);
        uint256 token_type = player[token_address][currentSeason][_tokenId].cardtype;
        
        tokenOwners[currentSeason][_tokenId]=_to;
        player[_to][currentSeason][_tokenId].cardtype = player[msg.sender][currentSeason][_tokenId].cardtype;
        player[_to][currentSeason][_tokenId].value = player[msg.sender][currentSeason][_tokenId].value;
        playersTokenCount[_to][currentSeason][token_type]+=1;
        playersTokenCount[msg.sender][currentSeason][token_type]-=1;
        for(uint256 i=0; i < ownToken[msg.sender][currentSeason].length ; i++){
            if( ownToken[msg.sender][currentSeason][i] == _tokenId){
                ownToken[msg.sender][currentSeason][i]=0;
                break;
            }
        }
        ownToken[_to][currentSeason].push(_tokenId);
        delete(player[msg.sender][currentSeason][_tokenId]);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public payable{
        /* Function is used for transferring the token and its ownership from contractowner in both caes when burn is call and when call from market place */
        //require(tokenOwners[_tokenId] == _from);
        require(approval[currentSeason][_tokenId] == msg.sender);
        address token_address = ownerOf(_tokenId);
        uint256 token_type = player[token_address][currentSeason][_tokenId].cardtype;
        
        tokenOwners[currentSeason][_tokenId]=_to;
        player[_to][currentSeason][_tokenId].cardtype = player[_from][currentSeason][_tokenId].cardtype;
        player[_to][currentSeason][_tokenId].value = player[_from][currentSeason][_tokenId].value;
        playersTokenCount[_to][currentSeason][token_type]+=1;
        playersTokenCount[_from][currentSeason][token_type]-=1;
        for(uint256 i=0; i < ownToken[_from][currentSeason].length ; i++){
            if( ownToken[_from][currentSeason][i] == _tokenId){
                ownToken[_from][currentSeason][i]=0;
                break;
            }
        }
        ownToken[_to][currentSeason].push(_tokenId);
        delete(player[_from][currentSeason][_tokenId]);
        
    }
    function returnSeason() public view returns(uint256){
    return currentSeason;
}
}

