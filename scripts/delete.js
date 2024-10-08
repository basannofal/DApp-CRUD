const { ethers } = require("ethers");

async function checkPendingTransactions() {
    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/bdecc158ccf7458e965fca5ebf11bb9b");

    // Check the latest block
    const latestBlock = await provider.getBlock("pending");

    // Display transactions in the pending block
    console.log("Pending Transactions:");
    latestBlock.transactions.forEach(async (txHash) => {
        const transaction = await provider.getTransaction(txHash);
        console.log(transaction);
    });
}

checkPendingTransactions();
