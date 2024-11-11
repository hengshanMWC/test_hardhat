import { type HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-abi-exporter";
import "dotenv/config";
import "@nomicfoundation/hardhat-verify";

const ARBISCAN_API_KEY = vars.get("ARBISCAN_API_KEY");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const accounts = PRIVATE_KEY ? PRIVATE_KEY.split(",") : [];
console.log("process.env.INFURA_PROJECT_ID", process.env.INFURA_PROJECT_ID);
console.log("ARBISCAN_API_KEY", ARBISCAN_API_KEY);

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    arbitrumSepolia: {
      url: `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      arbitrumOne: ARBISCAN_API_KEY,
      arbitrumSepolia: ARBISCAN_API_KEY,
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io",
        },
      },
    ],
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true,
  },
};

export default config;
