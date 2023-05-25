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
