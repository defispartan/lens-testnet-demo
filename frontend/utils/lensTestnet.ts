import { Chain } from "wagmi/chains";

export const lensTestnet: Chain = {
  id: 37111,
  name: "Lens Network Sepolia Testnet",
  nativeCurrency: { name: "GRASS", symbol: "GRASS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lens.dev"],
    },
  },
  blockExplorers: {
    default: {
      name: "Lens Testnet Block Explorer",
      url: "https://block-explorer.testnet.lens.dev",
    },
  },
  contracts: {
    multicall3: {
      address: "0x8A44EDE8a6843a997bC0Cc4659e4dB1Da8f91116",
      blockCreated: 22_325,
    },
  },
};
