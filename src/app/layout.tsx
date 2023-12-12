import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DataProvider from '@/contexts/data/provider';
import '@/assets/css/globals.css';
import Web3ReactConfig from '@/components/shared/web3-config';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Airdao Network Statistics',
  description: 'Ambrosus Network Status',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <Script src="https://code.highcharts.com/modules/coloraxis.js" /> */}
        {/* <Script src="https://code.highcharts.com/maps/highmaps.js" /> */}
        {/* <Script src="https://code.jquery.com/jquery-3.6.0.min.js" /> */}
        <Script src="https://code.highcharts.com/maps/highmaps.js" />
        <Script src="https://code.highcharts.com/maps/modules/map.js" />
        <Script src="https://code.highcharts.com/mapdata/index.js" />
        <Script src="https://code.highcharts.com/modules/marker-clusters.js" />
        {/* <Script src="./proj4.js" />
        <Script src="./nodemaps.js" /> */}
      </head>
      <body className={inter.variable}>
        <Web3ReactConfig>
          <DataProvider>{children}</DataProvider>
        </Web3ReactConfig>
        <ToastContainer transition={Slide} autoClose={3000} />
      </body>
    </html>
  );
}
