import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x5CBf69e84908eeA94b216B3028958E41D128F0b9'
);//    先前已經部署好的合約地址 

export default instance;