"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Highcharts from "./inithighchart"; // Pastikan path benar

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

export default function ChartComponent({ chartOptions }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMapChart = chartOptions.chart?.map !== undefined;

  return (
    <div
      className={`mt-6 bg-white p-5 shadow rounded-lg flex-grow max-w-full overflow-x-auto ${
        isMapChart ? "h-[800px]" : "h-auto"
      }`}
    >
      {isClient ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          constructorType={isMapChart ? "mapChart" : "chart"}
        />
      ) : (
        <p>Loading Chart...</p>
      )}
    </div>
  );
}

