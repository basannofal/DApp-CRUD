require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/bdecc158ccf7458e965fca5ebf11bb9b`, // Use your Infura or Alchemy URL
      accounts: [`89dcdaf4e4232e836c9aef610c9e164bf23bd0dde9d8a4e2b1cf1126b703d691`], // Add the private key prefixed with 0x
    },
  },
};
