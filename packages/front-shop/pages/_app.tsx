import React from 'react';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';
import { theme } from 'theme';
import { AuthProvider } from '@bottle-market/common/auth';
import { StickyProvider } from 'contexts/app/app.provider';
import { SearchProvider } from 'contexts/search/search.provider';
import { HeaderProvider } from 'contexts/header/header.provider';
import { LanguageProvider } from 'contexts/language/language.provider';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'helper/apollo';

import AppLayout from 'containers/LayoutContainer/AppLayout';
import { useDeviceType } from '@bottle-market/common/helpers';
import { CartProvider } from 'contexts/cart/use-cart';

// Language translation files
import localEn from 'data/translation/en.json';
import localEs from 'data/translation/es.json';

// External CSS import here
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/MultiCarousel/MultiCarousel.style.css';
import '@redq/reuse-modal/lib/index.css';
import { GlobalStyle } from 'styled/global.style';
import { parseCookies } from 'helper/parse-cookies';

// Language translation Config
const messages = {
  es: localEs,
  en: localEn,
};

// need to provide types
export default function ExtendedApp({
  Component,
  pageProps,
  userAgent,
  locale,
  query,
}) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const deviceType = useDeviceType(userAgent);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700%7CPoppins:700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <LanguageProvider messages={messages} initLocale={locale}>
          <CartProvider>
            <SearchProvider>
              <HeaderProvider>
                <StickyProvider>
                  <ApolloProvider client={apolloClient}>
                    <AuthProvider
                      domain={process.env.AUTH0_DOMAIN}
                      clientId={process.env.AUTH0_CLIENTID}
                      callback={process.env.AUTH0_CALLBACK}
                    >
                      <>
                        <AppLayout deviceType={deviceType}>
                          <Component {...pageProps} deviceType={deviceType} />
                        </AppLayout>
                        <GlobalStyle />
                      </>
                    </AuthProvider>
                  </ApolloProvider>
                </StickyProvider>
              </HeaderProvider>
            </SearchProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
