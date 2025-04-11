// src/lib/initHighcharts.js

import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import HighchartsDrilldown from "highcharts/modules/drilldown";

// Pastikan module hanya di-inject sekali
if (typeof Highcharts?.maps !== "object") {
  HighchartsMap(Highcharts);
  HighchartsDrilldown(Highcharts);
}

export default Highcharts;
