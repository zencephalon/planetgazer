import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

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
  }, [router]);

  return (
    <div className="app-container">
      <Head>
        <title>Enso Astrology</title>
        <meta name="description" content="Minimalist horoscope charts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="brand">
        <h1>ENSO</h1>
        <div className="tagline">celestial cartography</div>
      </header>
      <Chart />
    </div>
  );
};

export default Home;
