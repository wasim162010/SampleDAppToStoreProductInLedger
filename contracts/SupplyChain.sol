pragma solidity 0.5.16;

contract supply_Chain {
   
    uint public _p_id =0;
    uint public _u_id =0;
    uint public _t_id=0;

     struct product {
       
        string _product_name;
        uint _product_cost;
        string _product_specs;
        string _product_review;
        address _product_owner;
        uint _manufacture_date;
      
    }

    struct Location {

         uint _product_id;
         string zipcode;
         string currentAddr;
         string locType;// wareshouse, seller, transit
         string coordinates; //gps coordinates

    }

    struct track_product {
      
        uint _product_id;
        uint _owner_id;
        address _product_owner;
        uint _timeStamp;
        Location location;

    }


    mapping(uint => address) prodToOwnerMapping; //prod to owner mapping

    mapping(uint => track_product) public tracks;

    mapping(uint => Location) track_product; //product current location..

    mapping(uint => product) public products; // prod id and product mapping.

    modifier onlyOwner(uint pid) {
        require(msg.sender != products[pid]._product_owner);
         _;
     }
    
    function createParticipant(string memory name ,string memory pass ,address u_add ,string memory utype) public returns (uint){
        // uint user_id = _u_id++;
        // participants[user_id]._userName = name ;
        // participants[user_id]._passWord = pass;
        // participants[user_id]._address = u_add;
        // participants[user_id]._userType = utype;
        
        return 0;//user_id;
    }
    
    function newProduct(string memory name ,uint p_cost ,string memory p_specs ,string memory p_review) public returns (uint) {
   
            uint product_id = _p_id++;
           
            
            products[product_id]._product_name = name;
            products[product_id]._product_cost = p_cost;
            products[product_id]._product_specs =p_specs;
            products[product_id]._product_review =p_review;
            products[product_id]._product_owner = participants[own_id]._address;
            products[product_id]._manufacture_date = now;
            
           
            
            return product_id;

    }

    function updateProduct(uint p_id, string memory name ,uint p_cost ,string memory p_specs ,string memory p_review) public returns (uint) {

            require(prodToOwnerMapping[p_id] == msg.sender);

            products[p_id]._product_name = name;
            products[p_id]._product_cost = p_cost;
            products[p_id]._product_specs =p_specs;
            products[p_id]._product_review =p_review;

            return p_id;
    }

    //function getParticipant(uint p_id) returns (string memory ,address,string memory ) public {
      //  return (participants[p_id]._userName,participants[p_id]._address,participants[p_id]._userType);
   // }


        string _product_name;
        uint _product_cost;
        string _product_specs;
        string _product_review;
        address _product_owner;
        uint _manufacture_date;

    function getProduct_details(uint prod_id) public returns (string memory, uint, string memory, string memory, address, uint ) 
             {
     
        return (products[prod_id]._product_name,
                products[prod_id]._product_cost,  
                products[prod_id]._product_specs,
                products[prod_id]._product_review,
                products[prod_id]._product_owner,
                products[prod_id]._manufacture_date
                );
    }
    
   
  function transferOwnership_product(uint user1_id ,uint user2_id, uint prod_id) onlyOwner(prod_id) public returns(bool) {
         return (false);
    }
   /* function getProduct_track(uint prod_id)  public  returns (track_product[]) {
        
        uint track_len = tracks[prod_id].length;
       string[] memory trcks = new string[](track_len);
       for(uint i=0;i<track_len;i++){
           track_product t = tracks[prod_id][i];
           
           trcks.push(t._product_id+""+t._owner_id+""+t._product_owner+""+t._timeStamp);
       }
       // track_product tk =tracks[prod_id];
         return trcks;
    }*/
    function getProduct_trackindex(uint trck_id)  public  returns (uint,uint,address,uint) {
        
        track_product memory t = tracks[trck_id];
       
         return (t._product_id,t._owner_id,t._product_owner,t._timeStamp);
    }
    
   /* function getProduct_chainLength(uint prod_id) public returns (uint) {
        return tracks.length();
    }*/
    
    function userLogin(uint uid ,string memory  uname ,string memory pass ,string memory utype) public returns (bool){
       
       /*
        if(keccak256(participants[uid]._userType) == keccak256(utype)) {
            if(keccak256(participants[uid]._userName) == keccak256(uname)) {
                if(keccak256(participants[uid]._passWord)==keccak256(pass)) {
                    return (true);
                }
            }
        }
        */
        
        return (false);
    }
}