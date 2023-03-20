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
