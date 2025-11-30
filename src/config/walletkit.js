import { Core } from "@walletconnect/core";
import { WalletKit } from "@reown/walletkit";

const projectId = "35c18b84fd9706f0b560fe2ae76bf72c";

// Initialize Core
const core = new Core({
  projectId,
});

// Initialize WalletKit
let walletKit = null;

export const initWalletKit = async () => {
  if (walletKit) return walletKit;

  walletKit = await WalletKit.init({
    core,
    metadata: {
      name: "RaffleDex",
      description: "Transparent, fair, on-chain raffles powered by Celo blockchain",
      url: "https://raffledex.com",
      icons: ["https://raffledex.com/logo.png"],
    },
  });

  return walletKit;
};

export const getWalletKit = () => walletKit;
