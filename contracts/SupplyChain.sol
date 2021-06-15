pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

contract SupplyChain {
   
    uint public _p_id =0;
    uint public _u_id =0;
    uint public _t_id=0;

    address _owner;
     struct product {

        string _product_name;
        uint   _product_cost;
        string _product_specs;
        string _product_manufacturer;
        uint256 _product_date;
        string _product_zipcode;
        string _product_address;
        string _product_location;
      
    }

    struct Location {

         uint _product_id;
         string zipcode;
         string currentAddr;
         string locType;// wareshouse, seller, transit
       

    }

    struct track_product {
      
        uint _product_id;
        uint _owner_id;
        address _product_owner;
        uint _timeStamp;
        Location location;

    }


    event AddProduct(uint _product_id, string zipcode, string currentAddr, string locType);

    mapping(uint => address) prodToOwnerMapping; //prod to owner mapping

    mapping(uint => Location[]) tracks;

    mapping(uint => Location) currentLocation; //product current location..

    mapping(uint => product) public products; // prod id and product mapping.

    mapping(address => uint256[]) userToProdIDs;

    constructor() public {
       
        _owner = msg.sender;

        Location memory loc1 = Location(121, "_zipcode1", "_currentAddr1", "_locType1");
        Location memory loc2 = Location(122, "_zipcode2", "_currentAddr2", "_locType2");

        tracks[101].push(loc1);
        tracks[101].push(loc2);

        currentLocation[101] = loc1;

    }

    function newProduct(string memory name ,uint p_cost ,string memory p_specs ,string memory manufacturer, string memory _zipcode, string memory _addr,
                        string memory _locType) public returns (uint) {
   
            uint product_id = _p_id++;
           
            products[product_id]._product_name = name;
            products[product_id]._product_cost = p_cost;
            products[product_id]._product_specs =p_specs;
            products[product_id]._product_manufacturer =manufacturer;
            products[product_id]._product_date = now;
            products[product_id]._product_zipcode =_zipcode;
            products[product_id]._product_address =_addr;
            products[product_id]._product_location = _locType; //assuming product owner enter the product.

            prodToOwnerMapping[product_id] == msg.sender;

            Location memory currentLoc = Location(product_id, _zipcode, _addr, _locType);
            currentLocation[product_id] = currentLoc;
            tracks[product_id].push(currentLoc);

            emit AddProduct(product_id, _zipcode,  _addr,  _locType);

            userToProdIDs[msg.sender].push(product_id);

            return product_id;

    }

    
    function getProduct_details(uint prod_id) public view returns (product memory) {
     
            require(prodToOwnerMapping[prod_id] == msg.sender);
            require(_owner == msg.sender);
            
            return products[prod_id];

    }


    function getRecentProductLocation(uint _pId) public view returns(uint, string memory, string memory, string memory) {
            
           // require(prodToOwnerMapping[_pId] == msg.sender);
            //require(_owner == msg.sender);
            return (currentLocation[_pId]._product_id, currentLocation[_pId].zipcode, currentLocation[_pId].currentAddr,  currentLocation[_pId].locType) ;     
    }
    
   
   function getAllProductLocation(uint _pId) public view returns(Location[] memory) {

          //  require(prodToOwnerMapping[_pId] == msg.sender);
            //require(_owner == msg.sender);
            return tracks[_pId];
            //  return (currentLocation[_pId]._product_id, currentLocation[_pId].zipcode, currentLocation[_pId].currentAddr,  currentLocation[_pId].locType) ;     
    }

    function getAllProductIDs() public view returns(uint256[] memory) {

        return  userToProdIDs[msg.sender];

    }

    function updateProductLocation(uint _pId, string memory _zipcode, string memory _currentAddr, string _locType) public returns(uint) {

        Location memory _updatedLoc = Location(_pId, _zipcode, _currentAddr, _locType);
        
        tracks[_pId].push(_updatedLoc);

        currentLocation[_pId] = _updatedLoc;

        return _pId;
    }
    
    function putPorductID() public returns(uint256) { //temp...
                _p_id = _p_id + 1;
                userToProdIDs[msg.sender].push(_p_id);
                return _p_id;  
    }
}