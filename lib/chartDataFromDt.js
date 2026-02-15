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

const darkTheme = {
  COLOR_BACKGROUND: "transparent",
  POINTS_COLOR: "#e8e4df",
  TEXT_COLOR: "#e8e4df",
  CIRCLE_COLOR: "#3a3a5c",
  LINE_COLOR: "#3a3a5c",
  CUSPS_FONT_COLOR: "#8a8aa0",
  SYMBOL_AXIS_FONT_COLOR: "#c4b8d4",
  PLANET_COLORS: {
    Sun: "#d4a574",
    Moon: "#c4b8d4",
    Mercury: "#c4b870",
    Venus: "#6a9e6a",
    Mars: "#c47a7a",
    Jupiter: "#7a7acc",
    Saturn: "#a08060",
    Uranus: "#6a9e9e",
    Neptune: "#6a9e7a",
    Pluto: "#b070b0",
    Chiron: "#a08060",
    Lilith: "#b070b0",
    NNode: "#9070b0",
  },
  // Desaturated element colors for dark bg
  COLOR_ARIES: "#a0503a",
  COLOR_TAURUS: "#7a6040",
  COLOR_GEMINI: "#5a8090",
  COLOR_CANCER: "#3a7a50",
  COLOR_LEO: "#a0503a",
  COLOR_VIRGO: "#7a6040",
  COLOR_LIBRA: "#5a8090",
  COLOR_SCORPIO: "#3a7a50",
  COLOR_SAGITTARIUS: "#a0503a",
  COLOR_CAPRICORN: "#7a6040",
  COLOR_AQUARIUS: "#5a8090",
  COLOR_PISCES: "#3a7a50",
  COLORS_SIGNS_FILL: [],
};

export default function chartDataFromDt(dt, latitude = 40.0, longitude = -70.0, natalDt, natalLatitude, natalLongitude) {
  const el = document.getElementById("chart");
  if (el) el.innerHTML = "";

  const size = Math.max(el ? el.clientWidth : 800, 500);
  const chart = new Astro.Chart("chart", size, size, darkTheme);

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
