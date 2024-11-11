import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei, parseEther } from "viem";
import {
  contractName,
  tokenName,
  tokenSymbol,
} from "../ignition/modules/TestToken20";
import abi from "../abi/contracts/TestToken20.sol/TestToken20.json";
describe(contractName, function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  const MINT_AMOUNT = parseEther("5000000");
  const MINT_DURATION = 4 * 60 * 60; // 4 hours in seconds
  async function deployContractFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract(contractName, [
      tokenName,
      tokenSymbol,
    ]);

    const publicClient = await hre.viem.getPublicClient();
    return {
      contract,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("base", function () {
    it("info", async function () {
      const { publicClient, contract } = await deployContractFixture();
      // const params = {
      //   address: contract.address,
      //   abi,
      // };
      // const [name, symbol] = (
      //   await publicClient.multicall({
      //     contracts: [
      //       {
      //         ...params,
      //         functionName: "name",
      //       },
      //       {
      //         ...params,
      //         functionName: "symbol",
      //       },
      //     ],
      //   })
      // ).map((v) => v.result);

      const [name, symbol] = await Promise.all([
        publicClient.readContract({
          address: contract.address,
          abi,
          functionName: "name",
        }),
        publicClient.readContract({
          address: contract.address,
          abi,
          functionName: "symbol",
        }),
      ]);
      expect(name).to.equal(tokenName);
      expect(symbol).to.equal(tokenSymbol);
    });
  });
  describe("mint", function () {
    it("success and already mint", async function () {
      const { owner, contract } = await deployContractFixture();
      await contract.write.mint();
      const [finalBalance, mintAmount] = await Promise.all([
        contract.read.balanceOf([owner.account.address]),
        contract.read.mintAmount(),
      ]);
      expect(finalBalance).to.equal(mintAmount);
      await expect(contract.write.mint()).to.be.rejectedWith(
        "Address has already minted"
      );
    });
    it("ended", async function () {
      const { contract } = await deployContractFixture();
      const lockTime = (await time.latest()) + 4 * 60 * 60;
      await time.increaseTo(lockTime);
      await expect(contract.write.mint()).to.be.rejectedWith(
        "Minting period has ended"
      );
    });
  });
});
