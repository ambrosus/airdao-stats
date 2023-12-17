// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Header } from '@airdao/ui-library';
import { useWeb3React } from '@web3-react/core';
import {
  useAuthorization,
  useAutoLogin,
} from 'airdao-components-and-tools/hooks';
import {
  metamaskConnector,
  walletconnectConnector,
} from 'airdao-components-and-tools/utils';

import { useIsMounted } from '@/lib/hooks/use-is-mounted';

const readProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_EXPLORER_NETWORK
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState('0');
  const { account } = useWeb3React();
  const isMounted = useIsMounted();

  const { loginMetamask, loginWalletConnect, logout } = useAuthorization(
    metamaskConnector,
    walletconnectConnector
  );
  useAutoLogin(metamaskConnector);

  useEffect(() => {
    getBalance();

    if (readProvider) {
      readProvider.on('block', () => {
        getBalance();
      });
    }
    return () => {
      if (readProvider) {
        readProvider.removeAllListeners('block');
      }
    };
  }, []);

  const getBalance = async () => {
    if (!account) return;

    const bnBalance = await readProvider.getBalance(account);
    const numBalance = ethers.utils.formatEther(bnBalance);
    setBalance((+numBalance).toFixed(2));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-auto pt-28">
      <div className="relative">
        {isMounted && (
          <Header
            loginMetamask={loginMetamask}
            loginWalletConnect={loginWalletConnect}
            account={account}
            disconnect={logout}
            balance={balance}
          />
        )}
      </div>
      <div className="flex flex-col pt-10 pb-10">{children}</div>
    </main>
  );
}
