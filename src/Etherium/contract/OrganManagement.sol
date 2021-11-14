pragma solidity ^0.4.17;

contract OrganChain {
    
    //structures
    struct recipient{
        address patientid;
        address hospitalid;
        string organ;
        string bloodgroup;
        bool matchfound;
        bool exist;                         //to check recipient is already present or not
        bool added;
        
    }
    
    struct donor{
        address donorid;
        address hospitalid;
        string organ;
        string bloodgroup;
        bool matchfound;
        bool exist;                       //to check recipient is already present or not
        bool added;
        
    }
    
    struct Hospital{
        address HospitalId;
        string name;
        bool added;
    }
    
    struct transplant{
        address recipient;
        address donor;
        bool exist;
    }
    
    //global variables
    address[] recipientarr;                 //to get all recipients list
    address[] donorarr;                     //to get all donar list
    address[] transplantarr;                //to get all transplants list
    address[] hospitalarr;
    address public admin;
    
    
    //constructor to initialise admin
    function OrganChain()public{
        admin=msg.sender;
    }
    
    //Mappings
    mapping(address => recipient) public Recipients;
    mapping(address => donor) public Donors;
    mapping(address => transplant) Transplants;
    mapping(address => Hospital) hospital;
    
    //modifier
    
    modifier checkrecipientexist(address addr){
        require(Recipients[addr].added,"recipient already added");
        _;
    }
    
     modifier checkdonorexist(address addr){
        require(Donors[addr].added,"Donar already added");
        _;
    }
    
    modifier checkdonoradded(address addr){
        require(!Donors[addr].added,"Donar not added");
        _;
    }
    modifier checkrecipientadded(address addr){
        require(!Recipients[addr].added,"Donar not added");
        _;
    }
    modifier restricted(){
        require(hospital[msg.sender].added==true);
        _;
    }
    modifier restrictedadmin(){
        require(msg.sender==admin);
        _;
    }
    
    
    //donor functions
    
    function creatRequestDonar(address donorid,
        address hospitalid,
        string memory organ,
        string  memory bloodgroup) 
        public 
    {
            
            Donors[donorid]=donor(donorid,hospitalid,organ,
                                            bloodgroup,false,true,false);
            
    }
    
    function addDonar(address donori) public payable restricted{
            
            Donors[donori].added=true;
            donorarr.push(donori);
            
        }
        
    function getdonor(address donoradd) public  view checkdonoradded(donoradd)
    returns (address,
     string memory,
     string memory,
    bool){
        return(
            Donors[donoradd].donorid,
            Donors[donoradd].organ,
            Donors[donoradd].bloodgroup,
            Donors[donoradd].matchfound);
    }
    
    function getdonorwithtransplant(address donoradd) public checkdonoradded(donoradd) view
    returns (address,
    string memory,
    string memory,
    address) {
        for(uint i=0;i<transplantarr.length;i++)
        {
            if(donoradd==Transplants[transplantarr[i]].donor)
            return(Donors[donoradd].donorid,
            Donors[donoradd].organ,
            Donors[donoradd].bloodgroup,
            
            Transplants[transplantarr[i]].recipient);
        }
    }
    function getDonorcount() public view returns(uint256)
    {
        return(donorarr.length);
    }
    // hospital functions
    
    function creatRequestHospital(address hospitalId,string name) 
    public {
        hospital[hospitalId]=Hospital(hospitalId,name,false);
        hospitalarr.push(hospitalId);
    }
    
    function addHospital(address hospitalId) 
    public payable restrictedadmin
    {
        hospital[hospitalId].added=true;
    }
    function gethospitalcount() public view returns(uint256)
    {
        return(hospitalarr.length);
    }
    
    //recipient functions
    
    function creatRequestRecipient(address patientid,
        address hospitalid,
        string memory organ,
        string memory bloodgroup) public {
            Recipients[patientid] = recipient(patientid,hospitalid,
                                                organ,bloodgroup,false,true,false);
            
        }
    function addrecipient(
        address patientid) public payable restricted{
            Recipients[patientid].added=true;
            recipientarr.push(patientid);
            
    }
        
    function getrecipient(address reciadd) public checkrecipientadded(reciadd) view
    returns(address,
    address,
    string memory,
    string memory){
        return(
            Recipients[reciadd].patientid,
            Recipients[reciadd].hospitalid,
            Recipients[reciadd].organ,
            Recipients[reciadd].bloodgroup);
    }
    
    function getrecipientcount() public view returns(uint256)
    {
        return(recipientarr.length);
    }
    
    
    ////Transplants and all details
    
    function transplantmatch(address recipientad) public
    returns(address) {
        for(uint i=0;i<donorarr.length;i++)
        {
            if( (keccak256(abi.encodePacked((Recipients[recipientad].organ)))==keccak256(abi.encodePacked((Donors[donorarr[i]].organ)))) 
            && (keccak256(abi.encodePacked((Recipients[recipientad].bloodgroup)))==keccak256(abi.encodePacked((Donors[donorarr[i]].bloodgroup))) ))
            {   Transplants[recipientad]=transplant(recipientad,donorarr[i],true);
                transplantarr.push(recipientad);
                Recipients[recipientad].matchfound=true;
                Donors[donorarr[i]].matchfound=true;
                return (donorarr[i]);
            }
        }
    }
    function gettransplantlength()public view returns(uint256){
        return transplantarr.length;
    }
    function gettransplantDetails(uint256 position)public view returns(
        address,
        address
        ){
            return(
                Transplants[transplantarr[position]].recipient,
                Transplants[transplantarr[position]].donor
                );
    }
    
    //patient record
    
    // function EMR(address patientaddr) public view
    // returns (string memory) {
    //     for(uint i=0;i<donorarr.length;i++)
    //     {
    //         if(patientaddr==donorarr[i])
    //         return(Donors[donorarr[i]].EMRhash);
    //     }
    //     for(uint j=0;j<recipientarr.length;j++)
    //     {
    //         if(patientaddr==recipientarr[j])
    //         return(Recipients[recipientarr[j]].EMRhash);
    //     }
    // }
     
}