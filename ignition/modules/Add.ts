// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export const contractName = "Add";
const TestToken20Module = buildModule("AddModule", (m) => {
  const add = m.contract(contractName);

  return { add };
});

export default TestToken20Module;
