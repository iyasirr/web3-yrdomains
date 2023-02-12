// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "Yr Domains"
  const SYMBOL = "YRD"

  // Deploy contract
  const YrDomains = await ethers.getContractFactory("YrDomains")
  const yrDomains = await YrDomains.deploy(NAME, SYMBOL)
  await yrDomains.deployed();

  console.log(`Deployed Domain Contract at: ${yrDomains.address}\n`)

  // List 6 domains
  const names = ["eth.yr", "sol.yr", "poly.yr", "bit.yr", "lit.yr", "graph.yr"]
  const costs = [tokens(10), tokens(25), tokens(15), tokens(2.5), tokens(3), tokens(1)]

  for (var i = 0; i < 6; i++) {
    const transaction = await yrDomains.connect(deployer).list(names[i], costs[i])
    await transaction.wait()

    console.log(`Listed Domain ${i + 1}: ${names[i]}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
