import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Image from "next/image";

import Chart from "~/c/ControlledChart";
import { DateTime } from "luxon";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.time);
    if (!router.query.time) {
      router.push(`/?time=${DateTime.now().toISO()}`, undefined, {
        shallow: true,
      });
    }
    // Always do navigations after the first render
  }, [router]);

  return (
    <div>
      <Head>
        <title>Planet Gazer</title>
        <meta name="description" content="Fastest horoscope on the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chart />
    </div>
  );
};

export default Home;
