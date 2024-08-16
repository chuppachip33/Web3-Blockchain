const web3 = require('./infuraConfig');

// Tạo một tài khoản mới
const account = web3.eth.accounts.create();

console.log('Address:', account.address);
console.log('Private Key:', account.privateKey);
