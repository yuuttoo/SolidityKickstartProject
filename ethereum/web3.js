import Web3 from 'web3';

//const web3 = new Web3(windows.web3.currentProvider);//nodejs 不會吃window 會error 所以根據寫condition
let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {//nodejs
    //we are in the broweser and metamask  is running.
    web3 = new Web3(window.web3.currentProvider);
} else { 
    //we are on the server &or user is not running  metamask 
    //we provide ourown provider
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/b1ab7f03218445c8b3299f539e9ac6d7'
    );
    web3 = new Web3(provider);
}


export default web3;

