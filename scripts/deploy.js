const hre = require('hardhat');

async function main() {
  // Get the contract factory for your contract
  const crud = await hre.ethers.getContractFactory('crud');

  // Deploy the contract
  const crudContract = await crud.deploy();

  // Wait for the deployment to be mined
  await crudContract.deployed();

  // Log the contract address
  console.log('crud deployed to:', crudContract.address);
}

// Handle any errors during the execution of the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
