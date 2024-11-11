// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export const contractName = "TestToken20";
export const tokenName = "abTest";
export const tokenSymbol = "abt";
const TestToken20Module = buildModule("TestToken20Module", (m) => {
  const token20 = m.contract(contractName, [tokenName, tokenSymbol]);

  return { token20 };
});

export default TestToken20Module;
