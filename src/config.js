import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

const projectId = "35c18b84fd9706f0b560fe2ae76bf72c";

// Celo mainnet configuration with reliable RPC endpoints
const celoMainnet = {
  id: 42220,
  name: "Celo",
  nativeSymbol: "CELO",
  shortName: "celo",
  chainId: 42220,
  rpcUrls: {
    public: {
      http: ["https://forno.celo.org"],
      webSocket: ["wss://forno.celo.org/ws"],
    },
  },
  blockExplorerUrls: {
    blockscout: "https://celoscan.io",
  },
};

const networks = [celoMainnet];

const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});
