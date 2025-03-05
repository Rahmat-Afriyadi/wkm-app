"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import Highcharts menggunakan require untuk memastikan tidak ada masalah SSR
const Highcharts = typeof window !== "undefined" ? require("highcharts") : null;
const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

export default function ChartComponent({ chartOptions }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mt-6 bg-white p-5 shadow rounded-lg flex-grow">
      {isClient && Highcharts ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>Loading Chart...</p>
      )}
    </div>
  );
}
