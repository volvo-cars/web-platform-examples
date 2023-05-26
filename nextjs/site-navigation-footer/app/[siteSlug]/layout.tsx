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
import {
  getMarketSite,
  isValidSiteSlug,
  SiteSlug,
} from "@volvo-cars/market-sites";
import { getSiteNavigationPropsForRequest } from "@volvo-cars/site-nav-embed/getSiteNavigationPropsForRequest";
import { SiteNavigationEmbed } from "@volvo-cars/site-nav-embed/SiteNavigationEmbed";
import {
  SiteFooterEmbed,
  getSiteFooterPropsForRequest,
} from "@volvo-cars/site-footer-embed";
import { headers } from "next/headers";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { siteSlug: SiteSlug };
}) {
  const siteSlug =
    isValidSiteSlug(params.siteSlug) && params.siteSlug !== "master"
      ? (params.siteSlug as SiteSlug)
      : "intl";

  const { htmlLanguage, languageDirection } = getMarketSite(siteSlug);

  const headersList = headers();

  const [siteNavProps, siteFooterProps] = await Promise.all([
    getSiteNavigationPropsForRequest(siteSlug, headersList),
    getSiteFooterPropsForRequest(siteSlug, headersList),
  ]);

  return (
    <html lang={htmlLanguage} dir={languageDirection}>
      <head />
      <body>
        {siteNavProps && <SiteNavigationEmbed {...siteNavProps} />}
        {children}
        {siteFooterProps && <SiteFooterEmbed {...siteFooterProps} />}
      </body>
    </html>
  );
}
