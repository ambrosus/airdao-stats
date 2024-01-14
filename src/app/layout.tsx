import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import DataProvider from '@/contexts/data/provider';
import '@/assets/css/globals.css';
import 'overlayscrollbars/overlayscrollbars.css';
import Web3ReactConfig from '@/components/shared/web3-config';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AirDAO | Network Statistics',
  description: 'AirDAO Network Status',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://code.highcharts.com/maps/highmaps.js" />
        <Script src="https://code.highcharts.com/mapdata/index.js" />
        <Script src="https://code.highcharts.com/modules/marker-clusters.js" />
        <Script src="https://code.highcharts.com/modules/coloraxis.js" />
        <Script src="https://code.highcharts.com/maps/modules/accessibility.js" />
      </head>
      <body className={inter.variable}>
        <Web3ReactConfig>
          <DataProvider>{children}</DataProvider>
        </Web3ReactConfig>
      </body>
    </html>
  );
}
