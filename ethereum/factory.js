import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xb297090186D1d313938bBC53b3E24349C1a68Fc6'
    //'0x4755a8A64ef3EDbe160f132319E5cC72dE3D58D5'
    //'0x5474faB2CcC30F21C554Ae139d8017eDFC10f899'
    //'0x5CBf69e84908eeA94b216B3028958E41D128F0b9'
);//    先前已經部署好的合約地址 

export default instance;