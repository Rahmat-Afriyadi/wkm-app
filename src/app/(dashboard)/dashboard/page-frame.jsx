"use client";
import {
  LockClosedIcon,
  CurrencyDollarIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
const Search = dynamic(() => import("@/components/Search/index"));
import Datepicker from "react-tailwindcss-datepicker";
import { useSession } from "next-auth/react";
import ButttonExportReportTele from "@/components/form/report-tele/form-export";
const ChartComponent = dynamic(() => import("@/components/chart/chart"), {
  ssr: false,
  loading: () => <p className="text-center py-10">Loading chart...</p>,
});
import { generateChartMapKota } from "./jakarta-map";

export default function PageFrame({ children, data, dataWilayah }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [value, setValue] = useState({ startDate: "", endDate: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isDateLoading, setIsDateLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Membership");
  const tableRef = useRef(null);
  
  // Store current scroll position before navigation
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const dataBerminatMembership = Object.values(
    data.data?.data_berminat_membership_per_bulan || {}
  );
  const dataBerminatPA = Object.values(
    data.data?.data_berminat_pa_per_bulan || {}
  );
  const dataBerminatMTR = Object.values(
    data.data?.data_berminat_mtr_per_bulan || {}
  );
  useEffect(() => {
    if (data && dataWilayah && children) {
      setIsLoading(false);
      setIsDateLoading(false);
      if (lastScrollPosition > 0 && !isSearchLoading) {
        setTimeout(() => {
          window.scrollTo(0, lastScrollPosition);
        }, 100);
      }
    }
  }, [data, dataWilayah,children, lastScrollPosition, isSearchLoading]);
  useEffect(() => {
    const query = searchParams.get("search_query");
    const page = searchParams.get("page");
  
    if (query !== null || page !== null) {
      // Save current scroll position before loading
      setLastScrollPosition(window.scrollY);
      setIsSearchLoading(true);
      
      const timeout = setTimeout(() => {
        setIsSearchLoading(false);
        
        if (tableRef.current) {
          setTimeout(() => {
            tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);
  
  const handleValueChange = (newValue) => {
    setValue(newValue);
    setIsDateLoading(true); // ← Aktifkan loading
    const params = new URLSearchParams(searchParams);
    params.set("tgl1", newValue.startDate);
    params.set("tgl2", newValue.endDate);
    replace(`${pathname}?${params}`);
    setValue(newValue);
  };
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    const params = new URLSearchParams(searchParams);
    params.set("category", newCategory);
    replace(`${pathname}?${params}`);
  };
  // console.log("data:", data);
  const calculateChange = (current, previous) => {
    // Pastikan current & previous dalam bentuk angka
    current = Number(current);
    previous = Number(previous);
    if (previous === 0) {
      return {
        percent: current > 0 ? "100.00" : "0.00",
        isIncrease: current > 0,
      };
    }

    const difference = current - previous;
    const percent = ((difference / previous) * 100).toFixed(2);

    return {
      percent: isFinite(percent) ? percent : "0.00", // Cegah Infinity/NaN
      isIncrease: difference >= 0,
    };
  };
  let stats = [];
  const formatNumber = (num) => new Intl.NumberFormat("id-ID").format(Number(num) || 0);
if (selectedCategory === "Membership") {
  stats = [
    {
      id: 1,
      name: "Jumlah Data Call",
      stat: formatNumber(data.data?.jumlah_data_membership),
      before: formatNumber(data.data?.jumlah_data_membership_before),
      icon: SignalIcon,
    },
    {
      id: 2,
      name: "Berminat",
      stat: formatNumber(data.data?.data_berminat_membership),
      before: formatNumber(data.data?.data_berminat_membership_before),
      icon: CurrencyDollarIcon,
      extra: `Cash: ${formatNumber(data.data?.data_berminat_membership_cash)}, Transfer: ${formatNumber(data.data?.data_berminat_membership_transfer)}`,
    },
    {
      id: 3,
      name: "Sukses",
      stat: formatNumber(data.data?.data_sukses_membership),
      before: formatNumber(data.data?.data_sukses_membership_before),
      icon: CurrencyDollarIcon,
    },
    {
      id: 4,
      name: "Prospect",
      stat: formatNumber(data.data?.data_prospect_membership),
      before: formatNumber(data.data?.data_prospect_membership_before),
      icon: SignalIcon,
    },
    {
      id: 5,
      name: "Tidak Berminat",
      stat: formatNumber(data.data?.data_tidak_berminat_membership),
      before: formatNumber(data.data?.data_tidak_berminat_membership_before),
      icon: LockClosedIcon,
    },
    {
      id: 6,
      name: "Pending",
      stat: formatNumber(data.data?.data_pending_membership),
      before: formatNumber(data.data?.data_pending_membership_before),
      icon: LockClosedIcon,
    },
  ];
} else {
  const isPA = selectedCategory === "Asuransi PA";
  stats = [
    {
      id: 2,
      name: "Berminat",
      stat: formatNumber(isPA ? data.data?.data_berminat_pa : data.data?.data_berminat_mtr),
      before: formatNumber(isPA ? data.data?.data_berminat_pa_before : data.data?.data_berminat_mtr_before),
      icon: CurrencyDollarIcon,
    },
    {
      id: 3,
      name: "Sukses",
      stat: formatNumber(isPA ? data.data?.data_sukses_pa : data.data?.data_sukses_mtr),
      before: formatNumber(isPA ? data.data?.data_sukses_pa_before : data.data?.data_sukses_mtr_before),
      icon: CurrencyDollarIcon,
    },
    {
      id: 4,
      name: "Prospect",
      stat: formatNumber(isPA ? data.data?.data_prospect_pa : data.data?.data_prospect_mtr),
      before: formatNumber(isPA ? data.data?.data_prospect_pa_before : data.data?.data_prospect_mtr_before),
      icon: SignalIcon,
    },
    {
      id: 5,
      name: "Tidak Berminat",
      stat: formatNumber(isPA ? data.data?.data_tidak_berminat_pa : data.data?.data_tidak_berminat_mtr),
      before: formatNumber(isPA ? data.data?.data_tidak_berminat_pa_before : data.data?.data_tidak_berminat_mtr_before),
      icon: LockClosedIcon,
    },
    {
      id: 6,
      name: "Pending",
      stat: formatNumber(isPA ? data.data?.data_pending_pa : data.data?.data_pending_mtr),
      before: formatNumber(isPA ? data.data?.data_pending_pa_before : data.data?.data_pending_mtr_before),
      icon: LockClosedIcon,
    },
  ];
}


  const chartPieWithDrilldown = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Data Berminat Produk",
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}",
        },
      },
    },

    series: [
      {
        name: "Kategori",
        colorByPoint: true,
        data: [
          {
            name: "Membership",
            y: data.data?.data_berminat_membership || 0,
            drilldown: "membership",
          },
          {
            name: "PA",
            y: data.data?.data_berminat_pa || 0,
            drilldown: "pa",
          },
          {
            name: "Motor",
            y: data.data?.data_berminat_mtr || 0,
            drilldown: "mtr",
          },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          name: "Membership",
          id: "membership",
          data: [
            ["Basic", data.data?.data_member_basic || 0],
            ["Gold", data.data?.data_member_gold || 0],
            ["Platinum", data.data?.data_member_plat || 0],
            ["Platinum Plus", data.data?.data_member_plat_plus || 0],
          ],
        },
        {
          name: "PA",
          id: "pa",
          data: [
            ["Panda 1", data.data?.data_panda1 || 0],
            ["Panda 2", data.data?.data_panda2 || 0],
            ["Panda 3", data.data?.data_panda3 || 0],
          ],
        },
        {
          name: "Motor",
          id: "mtr",
          data: [
            ["TLO", data.data?.data_tlo || 0],
            ["TLO Plus", data.data?.data_tlo_plus || 0],
            ["Komersial", data.data?.data_komersial || 0],
          ],
        },
      ],
    },
  };

  const chartTs = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Tren Berminat per Bulan",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: {
        text: "Bulan",
      },
    },
    yAxis: {
      title: {
        text: "Jumlah Data",
      },
    },
    series: [
      {
        name: "Membership",
        data: dataBerminatMembership,
        color: "#1E88E5", // Biru
      },
      {
        name: "Asuransi PA",
        data: dataBerminatPA,
        color: "#F57C00", // Oranye
      },
      {
        name: "Asuransi Motor",
        data: dataBerminatMTR,
        color: "#43A047", // Hijau
      },
    ],
  };
  
  if (isLoading || isDateLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="loader mb-2"></div>
          <p className="text-gray-600 text-sm">
            Sedang memuat data...
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label
            htmlFor="range_verifikasi"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Range Periode
          </label>

          <Datepicker
            id={"range_verifikasi"}
            // inputClassName="z-40 max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
            toggleClassName="absolute rounded-r-lg -top-0  right-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name={"range_verifikasi"}
            value={value}
            primaryColor={"amber"}
            onChange={handleValueChange}
          />
        </div>

        {/* 🔹 **Dropdown Kategori** */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Kategori
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="Membership">Membership</option>
            <option value="Asuransi PA">Asuransi PA</option>
            <option value="Asuransi Motor">Asuransi Motor</option>
          </select>
        </div>

        <ButttonExportReportTele
          params={{
            awal_tgl: value.startDate,
            akhir_tgl: value.endDate,
            role: session?.user?.role,
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
        {stats.map((item) => {
          const current = item.stat || 0;
          const previous = item.before || 0;
          const { percent, isIncrease } = calculateChange(current, previous);

          return (
            <div
              key={item.id}
              className="relative px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:pt-6 sm:px-6"
            >
              <dt>
                <div className="absolute p-3 rounded-md bg-yellow">
                  <item.icon
                    className="w-6 h-6 text-black"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="flex flex-col ml-16">
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">
                    {current}
                  </p>
                  <div className="ml-2 flex items-center">
                    {percent !== "0.00" ? (
                      <div
                        className={`flex items-center ${
                          isIncrease ? "text-green-500" : "text-red"
                        }`}
                      >
                        {isIncrease ? (
                          <ChevronUpIcon className="w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5" />
                        )}
                        <span className="ml-1 text-sm">{percent}%</span>
                      </div>
                    ) : (
                      <div className="text-gray-500 flex items-center">
                        <span className="text-xl">≡</span>
                        <span className="ml-1 text-sm">0%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tampilkan extra jika ada */}
                {item.extra && (
                  <p className="mt-1 text-sm text-gray-600">{item.extra}</p>
                )}
              </dd>
            </div>
          );
        })}
      </div>
      <div className="flex w-full overflow-x-auto">
        <div className="flex w-full">
          {/* Chart Disini */}
          <ChartComponent chartOptions={chartTs} />
        </div>
      </div>
      <div className="flex w-full">
        {/* Chart Disini */}
        {session?.user?.role == 2 && (
          <ChartComponent chartOptions={chartPieWithDrilldown} />
        )}
      </div>
      <div className="flex w-full">
        {/* Chart Disini */}
        {session?.user?.role == 2 && (
          <ChartComponent chartOptions={generateChartMapKota(dataWilayah)} />
        )}
      </div>
      <br />
      {isSearchLoading && (
      <div className="text-center py-4 text-sm text-gray-500">Memuat hasil pencarian...</div>
      )}
      <div className="sm:flex lg:items-center">
        <div className="sm:flex-auto">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-end">
            <div className="max-w-xs mr-2 w-80">
            <Search id="search-query" name="search_query" placeholder={"Search..."} />
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
      </div>  
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
