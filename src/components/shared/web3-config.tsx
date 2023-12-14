// @ts-nocheck
'use client';

import { Web3ReactProvider } from '@web3-react/core';

import {
  metamaskConnector,
  metamaskHooks,
  walletconnectConnector,
  walletconnectHooks,
} from 'airdao-components-and-tools/utils';

export default function Web3ReactConfig({ children }: React.PropsWithChildren) {
  const connectors: any = [
    [metamaskConnector, metamaskHooks],
    [walletconnectConnector, walletconnectHooks],
  ];

  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
