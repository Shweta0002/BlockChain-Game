// SPDX-License-Identifier: MIT
pragma solidity >=0.4.23;

interface NFT {
    function ownerOf(uint256 _tokenId) external view returns (address);

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable;

    function tokenDetails(uint256 _tokenId)
        external
        view
        returns (uint256, uint256);

    function transfer(address, uint256) external payable;

    function createToken(
        address,
        uint256,
        uint256
    ) external payable returns (uint256);
}

interface erc20 {
    function transfer(address, uint256) external view returns (bool);

    function balanceOf(address) external view returns (uint256);

    function transferFrom(
        address,
        address,
        uint256
    ) external payable returns (bool);
}

contract MarketPlace {
    erc20 public stars;

    NFT public nft;

    address public owner_address;

    uint256[] tokenid_added;

    uint256 public available_token_count;

    uint256 public available_star_count;

    mapping(uint256 => token_sell_information) public token_details;

    struct token_sell_information {
        bool is_available;
        address buyer;
        address seller;
    }
    address public __address;

    uint256 totalPool;

    mapping(address => uint256) mappedPool;

    uint256 starsPrice;

    uint256 tokenPrice;

    modifier onlyOwner {
        require(msg.sender == owner_address);
        _;
    }

    constructor() public {
        owner_address = msg.sender;
    }

    function setAddress(address _address) public onlyOwner {
        //set NFT token contract address (ERC721)
        nft = NFT(_address);
    }

    function setErc20Address(address ___address) public onlyOwner {
        // set ERC20 address
        stars = erc20(___address);
    }

    function contractAddress(address maketPlace) public {
        // set market place address
        __address = maketPlace;
    }

    function increaseStarSupply(uint256 value) public payable {
        // only admin will call this function. function is responsible for increasing star count in market place
        require(msg.sender == owner_address, "Only Admin Can Call");
        stars.transferFrom(owner_address, __address, value);
        available_star_count = available_star_count + value;
        totalPool = totalPool + value;
        mappedPool[__address] = value;
    }

    function decreaseStarSupply(uint256 value) public {
        // only admin will call this function. function is responsible for decrease stars count in market place
        require(msg.sender == owner_address, "Only Admin Can Call");
        stars.transfer(owner_address, value);
        available_star_count = available_star_count - value;
        totalPool = totalPool - value;
    }

    function setStarsPrice(uint256 _price) public onlyOwner {
        // this is rresponsible for setting the star price
        starsPrice = _price;
    }

    function setNftPrice(uint256 _price) public onlyOwner {
        // this is rresponsible for setting the nft price
        tokenPrice = _price;
    }

    function showTotalPool() public view returns (uint256) {
        // this will show the total pool size i.e stars available
        return totalPool;
    }

    function BuyStars(address _from, uint256 amount) public payable {
        // this will be call by player who want to buy stars
        require(amount <= mappedPool[_from]);
        require(msg.value >= amount * starsPrice);
        stars.transfer(msg.sender, amount);
        totalPool = totalPool - amount;
        if (amount == mappedPool[_from]) {
            delete (mappedPool[_from]);
        } else {
            mappedPool[_from] -= amount;
        }
    }

    function sellStar(address starOwner, uint256 count) public {
        // sell star
        require(starOwner == msg.sender);
        require(stars.balanceOf(starOwner) >= count);
        stars.transfer(__address, count);
        mappedPool[starOwner] = count;
        totalPool = totalPool + count;
    }

    function increaseTokenSupply(uint256 cardType, uint256 value)
        public
        payable
    {
        require(msg.sender == owner_address, "Only Admin Can Call");
        uint256 tokenid = nft.createToken(__address, cardType, value);
        token_details[tokenid].is_available = true;
        token_details[tokenid].buyer = address(0);
        token_details[tokenid].seller = __address;
        available_token_count++;
    }

    function decreaseTokenSupply(uint256 tokenId) public payable {
        require(msg.sender == owner_address, "Only Admin Can Call");
        nft.transfer(owner_address, tokenId);
        available_token_count--;
        token_details[tokenId].is_available = false;
        token_details[tokenId].buyer = address(0);
        token_details[tokenId].seller = address(0);
    }

    function sellNFT(uint256 _tokenId) public {
        //put tokenid for sell
        require(nft.ownerOf(_tokenId) == msg.sender);
        uint256 present = 0;
        for (uint256 i = 0; i < tokenid_added.length; i++) {
            if (tokenid_added[i] == _tokenId) {
                present = 1;
                break;
            }
        }
        if (present == 0) {
            tokenid_added.push(_tokenId);
        }
        //transfer function should be called after this function

        token_details[_tokenId].is_available = true;
        token_details[_tokenId].seller = msg.sender;
        token_details[_tokenId].buyer = address(0);
        available_token_count++;
    }

    function buyNFT(uint256 _tokenId) public payable {
        address owner;
        owner = nft.ownerOf(_tokenId);
        require(owner == token_details[_tokenId].seller); //checks token owner is the seller of token
        uint256 token_type;
        uint256 value;
        (token_type, value) = nft.tokenDetails(_tokenId);
        require(msg.value >= value); //check given value is greater or equal to token value
        address seller;
        seller = token_details[_tokenId].seller;
        require(seller != address(0));
        nft.transfer(msg.sender, _tokenId);
        token_details[_tokenId].is_available = false;
        token_details[_tokenId].buyer = msg.sender;
        available_token_count--;
    }

    function showAvailableToken()
        public
        view
        returns (uint256[] memory available)
    {
        // returns the array of token present in marketplace
        uint256[] memory available_token_for_sell = new uint256[](
            available_token_count
        );
        uint256 j;
        for (uint256 i = 0; i < tokenid_added.length; i++) {
            if (token_details[tokenid_added[i]].is_available == true) {
                available_token_for_sell[j] = tokenid_added[i];
                j++;
            }
        }
        return available_token_for_sell;
    }
}
