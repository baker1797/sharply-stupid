import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
// import { ThemeProvider } from '@mui/material/Styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBottom from '../components/nav-bottom'
import Container from '@mui/material/Container';
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
        <Component {...pageProps} sx={{mb: 1}} />
      {/* </ThemeProvider> */}

      
        <NavBottom></NavBottom>
      
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};