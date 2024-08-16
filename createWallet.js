const Wallet = require('ethereumjs-wallet');

// Tạo một ví mới
const wallet = Wallet.generate();

// In địa chỉ của ví
console.log('Địa chỉ của ví:', wallet.getAddressString());

// In private key của ví
console.log('Private key của ví:', wallet.getPrivateKeyString());
