import { Origin, Horoscope } from "circular-natal-horoscope-js";
import Astro from "~/lib/astrochart.js";

function buildChartData(dt, latitude, longitude) {
  const origin = new Origin({
    year: dt.year,
    month: dt.month - 1, // 0 = January, 11 = December!
    date: dt.day,
    hour: dt.hour,
    minute: dt.minute,
    latitude,
    longitude,
  });

  const horoscope = new Horoscope({
    origin: origin,
  });

  const chartPlanets = Object.assign(
    {},
    ...horoscope.CelestialBodies.all.map((body) => {
      const key = body.key.charAt(0).toUpperCase() + body.key.slice(1);
      return { [key]: [body.ChartPosition.Ecliptic.DecimalDegrees] };
    })
  );

  delete chartPlanets.Sirius;

  const chartCusps = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];

  return {
    planets: chartPlanets,
    cusps: chartCusps,
  };
}

export default function chartDataFromDt(dt, latitude = 40.0, longitude = -70.0, natalDt, natalLatitude, natalLongitude) {
  const el = document.getElementById("chart");
  if (el) el.innerHTML = "";

  const chart = new Astro.Chart("chart", 800, 800, { COLORS_SIGNS_FILL: [] });

  if (natalDt) {
    // Transit mode: natal is radix (inner), current moment is transit (outer)
    const natalData = buildChartData(natalDt, natalLatitude, natalLongitude);
    const momentData = buildChartData(dt, latitude, longitude);
    const radix = chart.radix(natalData);
    const transit = radix.transit(momentData);
    transit.aspects();
  } else {
    // Chart mode: just the moment
    const data = buildChartData(dt, latitude, longitude);
    const radix = chart.radix(data);
    radix.aspects();
  }
}
