import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
// import { ThemeProvider } from '@mui/material/Styles';
import CssBaseline from '@mui/material/CssBaseline';
// import theme from '../src/theme';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home Page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* <ThemeProvider theme={theme}> */}
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      {/* </ThemeProvider> */}

      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/bets">View Bets</Link></li>
        <li><Link href="/api/fauna/bets/create">Create Bet</Link></li>
        <li><Link href="/api/fauna/bets/fetch-all">View Bets <i>(json)</i></Link></li>
      </ul>

      <ul>
        <li><a href="https://calc.dynastyprocess.com/">Dynasty Process</a></li>
        <li><a href="https://www.fantasypros.com/2022/11/fantasy-football-rankings-dynasty-trade-value-chart-november-2022-update/">FantasyPros Trade Values (November)</a></li>
        <li><a href="https://www.fantasycalc.com/">Fantasy Calc</a></li>
        <li><a href="https://www.pro-football-reference.com/">Pro Football Reference</a></li>
        <li><a href="https://keeptradecut.com/trade-calculator">Keep, Trade, Cut</a></li>
        <li><a href="https://docs.google.com/spreadsheets/d/1SUPgn5OnJRqnH1XGSCXVCrXJFjel7ZopNdr0DzUoUK8/edit">Rookie Drafts</a></li>
        <li><a href="https://docs.google.com/spreadsheets/d/1wSvofUJjmTkWVFqqFrn7ysENvb_YKpNhvVysagRZ0gQ/edit">Draft Picks &amp; Trades</a></li>
        <li><a href="https://docs.google.com/document/d/1ll74OiubUdQv5pGOyAFbp_jQzYGU2XWM_0tH91SrT0U/edit">JHBC Constitution</a></li>
      </ul>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};