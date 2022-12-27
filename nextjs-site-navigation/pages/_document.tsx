import React from "react";
import { isValidSiteSlug, SiteSlug } from "@volvo-cars/market-sites";
import {
  getSiteNavigationPropsForRequest,
  SiteNavigationEmbed,
  SiteNavigationProps,
} from "@volvo-cars/site-nav-embed";
import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class Document extends NextDocument<{
  siteNavProps: SiteNavigationProps;
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const { query, req } = ctx;
    const siteSlug =
      isValidSiteSlug(query.siteSlug) && query.siteSlug !== "master"
        ? (query.siteSlug as SiteSlug)
        : "intl";

    const siteNavProps = await getSiteNavigationPropsForRequest(siteSlug, req);

    const initialProps = await NextDocument.getInitialProps(ctx);
    return {
      ...initialProps,
      siteNavProps,
    };
  }

  render() {
    const { siteNavProps } = this.props;
    return (
      <Html>
        <Head />
        <body>
          {/* should always be outside Main to prevent re-mounting client-side, which would cause it to lose the html coming from the initial page load*/}
          <SiteNavigationEmbed {...siteNavProps} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
