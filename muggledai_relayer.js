const http = require('http');
var ethers = require('ethers');
var utils = require('ethers').utils;

const hostname = '127.0.0.1';
const port = 3000;

let defaultProvider = ethers.getDefaultProvider('kovan');

let xDaiURL = "https://dai.poa.network";
let xDaiProvider = new ethers.providers.JsonRpcProvider(xDaiURL);

var wallet_main = new ethers.Wallet(privateKey_main, defaultProvider);
let transaction = {
    nonce: 0,
    gasLimit: 21000,
    gasPrice: utils.bigNumberify("20000000000"),

    to: "0xc715b6dd0fffce00878e435c1e729d03e99306e4",
    // ... or supports ENS names
    // to: "ricmoo.firefly.eth",

    value: utils.parseEther("0.002"),
    data: "0x",

    // This ensures the transaction cannot be replayed on different networks
    chainId: ethers.utils.getNetwork('kovan').chainId
}

let signPromise = wallet_main.sign(transaction)

signPromise.then((signedTransaction) => {

    console.log(signedTransaction);
    // "0xf86c808504a817c8008252089488a5c2d9919e46f883eb62f7b8dd9d0cc45bc2
    //    90880de0b6b3a76400008025a05e766fa4bbb395108dc250ec66c2f88355d240
    //    acdc47ab5dfaad46bcf63f2a34a05b2cb6290fd8ff801d07f6767df63c1c3da7
    //    a7b83b53cd6cea3d3075ef9597d5"

    // This can now be sent to the Ethereum network
    //let provider = ethers.getDefaultProvider()
    defaultProvider.sendTransaction(signedTransaction).then((tx) => {

        console.log(tx);
        // {
        //    // These will match the above values (excluded properties are zero)
        //    "nonce", "gasLimit", "gasPrice", "to", "value", "data", "chainId"
        //
        //    // These will now be present
        //    "from", "hash", "r", "s", "v"
        //  }
        // Hash:
    });
})

/*
const DAI_contract="0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7";
const DAI_abi=
[
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  }
]
*/
let main_address = "0xff42dd4e6996a8bb9c0338281b3b9cc414e393b1";
let old_bal = "old";
//xDai Liquidity
function refresh() {
  xDaiProvider.getBalance(main_address).then((balance) => {

      // balance is a BigNumber (in wei); format is as a sting (in ether)
      let etherString = ethers.utils.formatEther(balance);

      if(etherString!=old_bal)
      {
        console.log("XDAI Balance: " + etherString);
        old_bal = etherString;
        let transaction = {
            nonce: 0,
            gasLimit: 21000,
            gasPrice: utils.bigNumberify("20000000000"),

            to: "0xc715b6dd0fffce00878e435c1e729d03e99306e4",
            // ... or supports ENS names
            // to: "ricmoo.firefly.eth",

            value: utils.parseEther(etherString-old_bal),
            data: "0x",

            // This ensures the transaction cannot be replayed on different networks
            chainId: ethers.utils.getNetwork('kovan').chainId
            let signPromise = wallet_main.sign(transaction)

            signPromise.then((signedTransaction) => {

                console.log(signedTransaction);
                // "0xf86c808504a817c8008252089488a5c2d9919e46f883eb62f7b8dd9d0cc45bc2
                //    90880de0b6b3a76400008025a05e766fa4bbb395108dc250ec66c2f88355d240
                //    acdc47ab5dfaad46bcf63f2a34a05b2cb6290fd8ff801d07f6767df63c1c3da7
                //    a7b83b53cd6cea3d3075ef9597d5"

                // This can now be sent to the Ethereum network
                //let provider = ethers.getDefaultProvider()
                defaultProvider.sendTransaction(signedTransaction).then((tx) => {

                    console.log(tx);
                    // {
                    //    // These will match the above values (excluded properties are zero)
                    //    "nonce", "gasLimit", "gasPrice", "to", "value", "data", "chainId"
                    //
                    //    // These will now be present
                    //    "from", "hash", "r", "s", "v"
                    //  }
                    // Hash:
                });
            })
      }

      setTimeout(refresh, 5000);
  });
}
setTimeout(refresh, 5000);

let old_bal = "old";
//xDai Liquidity
function refresh() {
  xDaiProvider.getBalance(main_address).then((balance) => {

      // balance is a BigNumber (in wei); format is as a sting (in ether)
      let etherString = ethers.utils.formatEther(balance);

      if(etherString!=old_bal2)
      {
        console.log("DAI Balance: " + etherString);
        old_bal = etherString;
        let transaction = {
            nonce: 0,
            gasLimit: 21000,
            gasPrice: utils.bigNumberify("20000000000"),

            to: "0xc715b6dd0fffce00878e435c1e729d03e99306e4",
            // ... or supports ENS names
            // to: "ricmoo.firefly.eth",

            value: utils.parseEther(etherString-old_bal),
            data: "0x",

            // This ensures the transaction cannot be replayed on different networks
            chainId: ethers.utils.getNetwork('kovan').chainId;
            let signPromise = wallet_main.sign(transaction)

            signPromise.then((signedTransaction) => {

                console.log(signedTransaction);
                // "0xf86c808504a817c8008252089488a5c2d9919e46f883eb62f7b8dd9d0cc45bc2
                //    90880de0b6b3a76400008025a05e766fa4bbb395108dc250ec66c2f88355d240
                //    acdc47ab5dfaad46bcf63f2a34a05b2cb6290fd8ff801d07f6767df63c1c3da7
                //    a7b83b53cd6cea3d3075ef9597d5"

                // This can now be sent to the Ethereum network
                //let provider = ethers.getDefaultProvider()
                defaultProvider.sendTransaction(signedTransaction).then((tx) => {

                    console.log(tx);
                    // {
                    //    // These will match the above values (excluded properties are zero)
                    //    "nonce", "gasLimit", "gasPrice", "to", "value", "data", "chainId"
                    //
                    //    // These will now be present
                    //    "from", "hash", "r", "s", "v"
                    //  }
                    // Hash:
                });
            })
      }

      setTimeout(refresh, 5000);
  });
}
setTimeout(refresh, 5000);
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
