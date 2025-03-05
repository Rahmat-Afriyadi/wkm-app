"use client";
import {LockClosedIcon,CurrencyDollarIcon,SignalIcon} from "@heroicons/react/24/outline";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "@/components/Search/index";
import Datepicker from "react-tailwindcss-datepicker";
import { useSession } from "next-auth/react";
import ButttonExportReportTele from "@/components/form/report-tele/form-export";
import ChartComponent from "@/components/chart/chart";

export default function PageFrame({ children, data }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState({ startDate: "", endDate: "" });
  const [selectedCategory, setSelectedCategory] = useState("Membership");
  //  console.log("tanggal", data.Dari, data.Sampai)
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
    const params = new URLSearchParams(searchParams);
    params.set("tgl1", value.startDate);
    params.set("tgl2", value.endDate);
    replace(`${pathname}?${params}`);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleValueChange = (newValue) => {
    setValue(newValue);
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

    // console.log("Current:", current, "Previous:", previous);

    // Jika previous 0 dan current > 0, naik 100%
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
  if (selectedCategory === "Membership") {
    stats = [
      {
        id: 1,
        name: "Jumlah Data Call",
        stat: `${data.data?.jumlah_data_membership || 0}`,
        before: `${data.data?.jumlah_data_membership_before || 0}`,
        icon: SignalIcon,
      },
      {
        id: 2,
        name: "Berminat",
        stat: `${data.data?.data_berminat_membership || 0}`,
        before: `${data.data?.data_berminat_membership_before || 0}`,
        icon: CurrencyDollarIcon,
        extra: `Cash: ${
          data.data?.data_berminat_membership_cash || 0
        }, Transfer: ${data.data?.data_berminat_membership_transfer || 0}`,
      },
      {
        id: 3,
        name: "Sukses",
        stat: `${data.data?.data_sukses_membership || 0}`,
        before: `${data.data?.data_sukses_membership_before || 0}`,
        icon: CurrencyDollarIcon,
      },
      {
        id: 4,
        name: "Prospect",
        stat: `${data.data?.data_prospect_membership || 0}`,
        before: `${data.data?.data_prospect_membership_before || 0}`,
        icon: SignalIcon,
      },
      {
        id: 5,
        name: "Tidak Berminat",
        stat: `${data.data?.data_tidak_berminat_membership || 0}`,
        before: `${data.data?.data_tidak_berminat_membership_before || 0}`,
        icon: LockClosedIcon,
      },
      {
        id: 6,
        name: "Pending",
        stat: `${data.data?.data_pending_membership || 0}`,
        before: `${data.data?.data_pending_membership_before || 0}`,
        icon: LockClosedIcon,
      },
    ];
  } else {
    const isPA = selectedCategory === "Asuransi PA";
    stats = [
      {
        id: 2,
        name: "Berminat",
        stat: isPA
          ? `${data.data?.data_berminat_pa || 0}`
          : `${data.data?.data_berminat_mtr || 0}`,
        before: isPA
          ? `${data.data?.data_berminat_pa_before || 0}`
          : `${data.data?.data_berminat_mtr_before || 0}`,
        icon: CurrencyDollarIcon,
      },
      {
        id: 3,
        name: "Sukses",
        stat: isPA
          ? `${data.data?.data_sukses_pa || 0}`
          : `${data.data?.data_sukses_mtr || 0}`,
        before: isPA
          ? `${data.data?.data_sukses_pa_before || 0}`
          : `${data.data?.data_sukses_mtr_before || 0}`,
        icon: CurrencyDollarIcon,
      },
      {
        id: 4,
        name: "Prospect",
        stat: isPA
          ? `${data.data?.data_prospect_pa || 0}`
          : `${data.data?.data_prospect_mtr || 0}`,
        before: isPA
          ? `${data.data?.data_prospect_pa_before || 0}`
          : `${data.data?.data_prospect_mtr_before || 0}`,
        icon: SignalIcon,
      },
      {
        id: 5,
        name: "Tidak Berminat",
        stat: isPA
          ? `${data.data?.data_tidak_berminat_pa || 0}`
          : `${data.data?.data_tidak_berminat_mtr || 0}`,
        before: isPA
          ? `${data.data?.data_tidak_berminat_pa_before || 0}`
          : `${data.data?.data_tidak_berminat_mtr_before || 0}`,
        icon: LockClosedIcon,
      },
      {
        id: 6,
        name: "Pending",
        stat: isPA
          ? `${data.data?.data_pending_pa || 0}`
          : `${data.data?.data_pending_mtr || 0}`,
        before: isPA
          ? `${data.data?.data_pending_pa_before || 0}`
          : `${data.data?.data_pending_mtr_before || 0}`,
        icon: LockClosedIcon,
      },
    ];
  }

  const chartOptions = {
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
        name: "Berminat Membership",
        data: dataBerminatMembership,
        color: "#1E88E5", // Biru
      },
      {
        name: "Berminat PA",
        data: dataBerminatPA,
        color: "#F57C00", // Oranye
      },
      {
        name: "Berminat Motor",
        data: dataBerminatMTR,
        color: "#43A047", // Hijau
      },
    ],
  };

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
          params={{ awal_tgl: value.startDate, akhir_tgl: value.endDate }}
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
      <div className="flex w-full">
        {/* Chart Disini */}
        <ChartComponent chartOptions={chartOptions} />
      </div>
      <br></br>

      <div className="sm:flex lg:items-center">
        <div className="sm:flex-auto">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-end">
            <div className="max-w-xs mr-2 w-80">
              <Search
                id="search-query"
                name="search_query"
                placeholder={"Search for a customer..."}
              />
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
