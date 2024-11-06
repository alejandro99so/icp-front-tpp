import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import { idlFactory, canisterId } from './declarations/backend';

import { createAppKit } from '@reown/appkit/react';

import { WagmiProvider } from 'wagmi';
import { sepolia, avalancheFuji, mainnet } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = 'a50452ea14ad8c76b61826a78d1b1fd7';

// 2. Create a metadata object - optional
const metadata = {
  name: 'ICP test',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png'],
};

// 3. Set the networks
const networksList = [sepolia, avalancheFuji];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: networksList,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [sepolia, avalancheFuji],
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AgentProvider withProcessEnv>
      <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </WagmiProvider>
      </ActorProvider>
    </AgentProvider>
  </React.StrictMode>,
);
