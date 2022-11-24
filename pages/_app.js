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

      <ul class="menu">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/bets">View Bets</Link></li>
        <li><Link href="/api/fauna/bets/create">Create Bet</Link></li>
        <li><Link href="/api/fauna/bets/fetch-all">View Bets <i>(json)</i></Link></li>
      </ul>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};