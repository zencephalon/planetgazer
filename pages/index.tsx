import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Chart from "~/c/ControlledChart";

const Home: NextPage = () => {
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
