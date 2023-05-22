/*
  Copyright 2023 Volvo Car Corporation
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
        http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License. 
*/

import React from "react";
import { isValidSiteSlug, SiteSlug } from "@volvo-cars/market-sites";
import {
  getSiteFooterPropsForRequest,
  SiteFooterEmbed,
  SiteFooterProps,
} from '@volvo-cars/site-footer-embed';
import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class Document extends NextDocument<{
  siteFooterProps: SiteFooterProps
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const { query, req } = ctx;
    const siteSlug =
      isValidSiteSlug(query.siteSlug) && query.siteSlug !== "master"
        ? (query.siteSlug as SiteSlug)
        : "intl";

    const siteFooterProps = await getSiteFooterPropsForRequest(siteSlug, req);

    const initialProps = await NextDocument.getInitialProps(ctx);
    return {
      ...initialProps,
      siteFooterProps
    };
  }

  render() {
    const { siteFooterProps } = this.props;
    return (
      <Html>
        <Head />
        <body>
          {/* should always be outside Main to prevent re-mounting client-side, which would cause it to lose the html coming from the initial page load*/}
          <Main />
          <SiteFooterEmbed {...siteFooterProps} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
