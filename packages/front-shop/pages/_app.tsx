import React from "react";

import { ThemeProvider } from "styled-components";
import { theme } from "theme";
import { AuthProvider } from "@bottle-market/common";
import { StickyProvider } from "contexts/app/app.provider";
import { SearchProvider } from "contexts/search/search.provider";
import { HeaderProvider } from "contexts/header/header.provider";
import { LanguageProvider } from "contexts/language/language.provider";

import AppLayout from "containers/LayoutContainer/AppLayout";
import { useDeviceType } from "helper/useDeviceType";
import { CartProvider } from "contexts/cart/use-cart";
// Language translation files
import localEn from "data/translation/en.json";
import localEs from "data/translation/es.json";

// External CSS import here
import "rc-drawer/assets/index.css";
import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "react-multi-carousel/lib/styles.css";
import "components/MultiCarousel/MultiCarousel.style.css";
import "@redq/reuse-modal/lib/index.css";
import { GlobalStyle } from "styled/global.style";
import { parseCookies } from "helper/parse-cookies";

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
  const deviceType = useDeviceType(userAgent);

  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider messages={messages} initLocale={locale}>
        <CartProvider>
          <SearchProvider query={query}>
            <HeaderProvider>
              <StickyProvider>
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
              </StickyProvider>
            </HeaderProvider>
          </SearchProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

ExtendedApp.getInitialProps = async (appContext) => {
  const { req, query } = appContext.ctx;
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  const { locale } = parseCookies(req);
  return { userAgent, query, locale };
};
