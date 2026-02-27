"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import React from "react";
import { ROUTE_META, DEFAULT_META } from "../../lib/seo/metadata";

type Meta = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
};

const Seo: React.FC = () => {
  const path = usePathname() || "/";
  const meta: Meta = (ROUTE_META[path] as Meta) || DEFAULT_META;

  // Ensure a fully qualified URL for OG tags if site base is known via env
  const siteBase = (process.env.NEXT_PUBLIC_SITE_BASE_URL || "");
  const fullUrl = siteBase ? siteBase.replace(/\/$/, "") + path : path;
  const image = meta.image || "/pcell.webp";

  const kw = meta.keywords?.length ? meta.keywords!.join(", ") : undefined;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {kw ? <meta name="keywords" content={kw} /> : null}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Seo;
