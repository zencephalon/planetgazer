import { DateTime } from "luxon";
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import Astro from "~/lib/astrochart.js";

export default function chartDataFromDt(dt: DateTime) {
  const origin = new Origin({
    year: dt.year,
    month: dt.month - 1, // 0 = January, 11 = December!
    date: dt.day,
    hour: dt.hour,
    minute: dt.minute,
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

  delete chartPlanets.Sirius;

  const asc = horoscope.Ascendant.ChartPosition.Horizon.DecimalDegrees;
  const desc = (asc + 180) % 360;
  const mc = horoscope.Midheaven.ChartPosition.Horizon.DecimalDegrees;
  const ic =
    (horoscope.Midheaven.ChartPosition.Horizon.DecimalDegrees + 180) % 360;

  // const chartCusps = horoscope.Houses.map((cusp) => {
  //   return cusp.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
  // });
  const chartCusps = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
  console.log({ chartPlanets });

  const data = {
    planets: chartPlanets,
    cusps: chartCusps,
  };

  const chart = new Astro.Chart("chart", 800, 800);
  const radix = chart.radix(data);
  radix.addPointsOfInterest({ As: [asc], Mc: [mc], Ds: [desc], Ic: [ic] });
  radix.aspects();
}
