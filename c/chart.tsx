import React from "react";
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import Astro from "~/lib/astrochart.js";

const CChart: React.FC = (props) => {
  React.useEffect(() => {
    const origin = new Origin({
      year: 2020,
      month: 11, // 0 = January, 11 = December!
      date: 1,
      hour: 16,
      minute: 30,
      latitude: 40.0,
      longitude: -70.0,
    });

    const horoscope = new Horoscope({
      origin: origin,
    });
    console.log(horoscope);

    const chartPlanets = Object.assign(
      {},
      ...horoscope.CelestialBodies.all.map((body) => {
        const key = body.key.charAt(0).toUpperCase() + body.key.slice(1);
        return { [key]: [body.ChartPosition.Ecliptic.DecimalDegrees] };
      })
    );

    const asc = horoscope.Ascendant.ChartPosition.Horizon.DecimalDegrees;
    const desc = (asc + 180) % 360;
    const mc = horoscope.Midheaven.ChartPosition.Horizon.DecimalDegrees;
    const ic =
      (horoscope.Midheaven.ChartPosition.Horizon.DecimalDegrees + 180) % 360;

    const chartCusps = horoscope.Houses.map((cusp) => {
      return cusp.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
    });

    const chart = new Astro.Chart("chart", 800, 800);
    const data = {
      planets: chartPlanets,
      cusps: chartCusps,
    };

    const radix = chart.radix(data);
    radix.addPointsOfInterest({ As: [asc], Mc: [mc], Ds: [desc], Ic: [ic] });
    radix.aspects();
  });

  return (
    <div>
      <div id="chart"></div>
    </div>
  );
};

export default CChart;
