var ethers = require('ethers');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;



// The ERC-20 ABI
var abi = [
  "function balanceOf(address owner) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];
// Connect to the Ethereum mainnet
var provider = ethers.getDefaultProvider('homestead');
// Load our wallet and connect to the provider
var wallet = new ethers.Wallet(privateKey, provider);
// Connect to "Pi Day N00b token" Contract (ERC-20 compliant)
var address = "0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7"; //DAI contract
var contract = new ethers.Contract(address, abi, wallet);
// Listen for Transfer events (triggered after the transaction)
contract.ontransfer = function(from, to, amount) {
    var text = ethers.utils.formatEther(amount);
    console.log("Transfer");
    console.log("  From:   ", from);
    console.log("  To:     ", to);
    console.log("  Amount: ", text);
    // Transfer
    //  From:   0x59DEa134510ebce4a0c7146595dc8A61Eb9D0D79
    //  To:     0x851b9167B7cbf772D38eFaf89705b35022880A07
    //  Amount: 1.0
}
// Get the balance of the wallet before the transfer
contract.balanceOf(wallet.address).then(function(balance) {
    var text = ethers.utils.formatEther(balance);
    console.log("Balance Before:", text);
    // Balance Before: 3.141592653589793238
})
// Transfer 1.0 token to another address (we have 18 decimals)
var targetAddress = "0x1240aef350dfd24d885cd07d2f0b4180a8ed811f"; //pool_dai
var amount = ethers.utils.parseUnits('1.0', 18);
contract.transfer(targetAddress, amount).then(function(tx) {
    // Show the pending transaction
    console.log(tx);
    // {
    //     hash: 0x820cc57bc7...0dbe181ba1,
    //     gasPrice: BigNumber("0x2540be400"),
    //     gasLimit: BigNumber("0x16e360"),
    //     value: BigNumber("0x0"),
    //     data: "0xa9059cbb" +
    //           "000000000000000000000000851b9167" +
    //           "b7cbf772d38efaf89705b35022880a07" +
    //           "00000000000000000000000000000000" +
    //           "00000000000000000de0b6b3a7640000",
    //     to: "0x334eec1482109Bd802D9e72A447848de3bCc1063",
    //     v: 37,
    //     r: "0x3fce72962a...a19b611de2",
    //     s: "0x16f9b70010...0b67a5d396",
    //     chainId: 1
    //     from: "0x59DEa134510ebce4a0c7146595dc8A61Eb9D0D79"
    // }
    // Wait until the transaction is mined...
    return tx.wait();
}).then(function(tx) {
    console.log('Mined Transaction in block: ', tx.blockNumber);
    // Get the balance of the wallet after the transfer
    contract.balanceOf(wallet.address).then(function(balance) {
        var text = ethers.utils.formatUnits(balance, 18);
        console.log("Balance After:", text);
        // Balance After: 2.141592653589793238
    })
});
/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/
