//pragma solidity ^0.4.17;
pragma solidity ^0.4.25;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    // function Campaign(uint minimum, address creator) public {
    //     manager = creator;
    //     minimumContribution = minimum;
    // }
    constructor (uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

}

// pragma solidity ^0.4.17;

// //pragma solidity >=0.7.0 <0.9.0;
// contract CampaignFactory {
//     address[] public deployedCampaigns;
    
//     function createCampaign(uint minimun) public {
//         address newCampaign = new Campaign(minimum, msg.sender);
//         deployedCampaigns.push(newCampaign);
//         }
        
//     function getDeployedCampaigns() public  view returns (address[]) {
//         return deployedCampaigns;
//     }    
// }
// contract Campaign {
//     struct Request {
//         string description;
//         uint value;
//         address recipient;
//         bool complete;
//         uint approvalCount;
//         mapping(address => bool) approvals; //mapping為rederence type 新增時不需要寫入
//     }//struc 與一般變數不同 是存request專用的
    
//     Request[] public Requests;
//     address public manager;
//     uint public minimumContribution;
//     // address[] public approvers; 刪掉改成mapping
//     mapping(address => bool) public approvers;
    
//     modifier restricted() { //放在需要限制的function上
//         require(msg.sender == manager);
//         _;
//     }
    
//     constructor (uint minimum) public {
//         manager = msg.sender;
//         minimumContribution = minimum;
//     }
    
//     function contribute() public payable {
//         require(msg.value > minimunContribution); //檢查大於最小出資金額
        
//         //approvers.push(msg.sender);
//         approvers[msg.sender] = true; //將mapping中原本預設為false的bool轉為true
        
//     }
    
//     function createRequest(string description, uint value, address recipient) 
//         public restricted {
//         Request newRequest = Request({
//             description: description,
//             value: value,
//             recipient: recipient,
//             complete: false,
//             approvalCount: false
//         });
        
//         request.push(newRequest);
//     }
    
//     function approveRequest(uint index) publix {
//         Request storage request = requests[index]; //存起來簡化下面的code 不用重複寫index
        
//         require(approvers[msg.sender]); //確認地址為出資者 true才能過
//         require(!request.approvals[msg.sender]);//確認是否對該request已經投票過 投票過會為true
//         //但require目的是要踢掉他 不能讓他再投  所以改為!讓他吐false  用來排除該出資人
        
//         request.approvals[msg.sender] = true;//確認該request已經投票過 存起來 之後他又要重call這個函式 在第二個require就會被排除
//         request.approvalCount++;//投完的request會往後加 不可回頭
        
//     }

//     //結束請求申請
//     function finalizeRequest(uint index) public restricted {
//         Request storage request = requests[index];
        
        
//         require(request.approvalCount > (approversCount / 2)); //同意票大於總投票人數
//         require(!request.complete);//已經完成要排除 加上!否定
        
//         request.recipient.transfer(request.value);//轉錢
//         request.complete = true;
//     }
    
    
    
    
    
// }