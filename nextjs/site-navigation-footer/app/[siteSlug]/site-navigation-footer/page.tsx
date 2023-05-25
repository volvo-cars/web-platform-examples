import React from "react";
import type { SiteSlug } from "@volvo-cars/market-sites";
import { Metadata } from "next";

export default async function Index({
  params,
}: {
  params: { siteSlug: SiteSlug };
}) {
  const siteSlug = params?.siteSlug;
  return <div>Site Navigation and Footer: {siteSlug}</div>;
}

type Params = {
  params: { siteSlug: SiteSlug };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: params.siteSlug,
  };
}
