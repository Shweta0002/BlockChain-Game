pragma solidity ^0.4.17;

interface Interface_stars {
    
    function transfer(address , uint256) payable external returns(bool);
    function transferFrom(address ,address , uint256) payable external returns(bool) ;
    function balanceOf(address)  external view  returns(uint256);
    function approve(address , uint256) external payable  returns(bool);
    
}  


interface NFT{
    function createToken(address , uint256 , uint256)payable external;
    function ownerOf( uint256) external returns(address);
    function tokenDetails(uint256) external returns(uint256,uint256);
    function returnTokenCount(address , uint256 , bool) external returns(uint256);
    function burn(address , uint256) external payable ;
}


contract Game{
    
    function Game () public{
        owner=msg.sender;
       
    }
    Interface_stars public  stars ;
    NFT public nft;
    
    function set_token_address(address token_add) public {
        stars = Interface_stars(token_add);
    }
    function set_nft_address(address nft_add) public{
        nft = NFT(nft_add);
        
    }
    
    
    mapping(address => uint256) allowed;
    mapping(address => bool) is_signup;
    address public manager;
    address public owner;
    
    
    uint256 public value;
    uint256 public NoOfTokens;
    uint256 public starCount; 
   
    
    function _manager() public view returns(address){
        return manager;
    }
    
    
    function setOwner(address _newOwner) public payable{
        require(msg.sender == owner);
        manager = _newOwner;
    }
    
    function setValue(uint256 _value) public payable {
        require(msg.sender==owner);
        value = _value;
        
    }
    function setToken(uint256 _amount) public payable{
         require(msg.sender==owner);
        NoOfTokens = _amount;
    }
    function setStars(uint256 _stars) public payable{
         require(msg.sender==owner);
        starCount = _stars;
    }
    
    
    //assuming 0: rock , 1: paper , 2:scissor
    function signup() public payable returns(bool){
        require(is_signup[msg.sender]==false);
        is_signup[msg.sender] = true;
        
        for(uint256 stones=0; stones< NoOfTokens; stones++){
          nft.createToken(msg.sender, 1 ,value);  
        }
        
        for(uint256 paper =0;  paper < NoOfTokens; paper++){
          nft.createToken(msg.sender, 2 ,value);            
        }
        for(uint256 scissor = 0; scissor< NoOfTokens ; scissor++){
          nft.createToken(msg.sender, 3 ,value);  
        }
        
      return  stars.transfer( msg.sender ,starCount);
    
    }
    
    function play_game(address player1 , address player2 , uint256 token1 , uint256 token2) public payable   returns(uint256){
        block_card(player1 , 1);
        block_card(player2,1);
         require(player1 == nft.ownerOf(token1) && player2 ==nft.ownerOf(token2));
         uint256 card1 ;
         uint256 card2;
         uint256 value1;
         uint256 value2;
         (card1,value1) = nft.tokenDetails(token1);
         (card2 , value2) = nft.tokenDetails(token2);
         uint256 winner = decide(card1 , card2);
         if(winner==0){
             stars.transfer(player1,1);
             stars.transfer(player2 , 1);
         }
         if(winner == 1){
             stars.transfer( player1 , 2 );
             
         }
         if(winner == 2){
             stars.transfer( player2, 2);
             
         }
         //burn tokens after a turn
          nft.burn(player1 , token1);
         nft.burn(player2 , token2);
         return winner;
        
         
}
   
    function decide(uint256 card1 , uint256 card2) public pure returns(uint256){
       
        uint256 winner=0;
        if(card1==card2){
            
        }
        else{
            if( (card1 == 1 && card2 == 3) || (card1 == 2 && card2 == 1) || (card1 == 3 && card2 == 2) ){
                winner = 1;
            }
            else{
                winner = 2;
            }
        }
        
        return winner;
        
    }
    
    function block_card(address _of , uint256 cards) public{
        require(stars.balanceOf(_of)>=1);
        stars.transferFrom(_of , manager , cards);
        
    
        
    }
    function approve(address spender , uint256 _value) public {
        stars.approve(spender , _value);
    }
   
    
  
    
    function TotalCards(address _of) public   returns(uint256){


        return nft.returnTokenCount(_of, 0 , true);
    }
    
    function remainingRock(address _of) public   returns(uint256){
       return nft.returnTokenCount(_of, 1 , false);
    }
    
    function remainingPaper(address _of) public   returns(uint256){
       return nft.returnTokenCount(_of, 2 , false);
    }
    
    function remainingScissor(address _of) public   returns(uint256){
        return nft.returnTokenCount(_of, 3 , false);
    }
    
    
    function showStars(address _of) public view returns(uint256){
        return stars.balanceOf(_of); // call hritik function
    }
    

    
    
}