import {
  ChartPieIcon,
  Cog6ToothIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  LockClosedIcon,
  CurrencyDollarIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: ChartPieIcon,
  },
  {
    name: "Export WA Blast",
    to: "/wa-blast",
    icon: UsersIcon,
  },
  {
    name: "Edit Jenis Bayar",
    to: "/edit-jenis-bayar",
    icon: FolderIcon,
  },
  {
    name: "Asuransi",
    to: "/asuransi",
    icon: FolderIcon,
  },
  {
    name: "Asuransi Pending",
    to: "/asuransi-pending",
    icon: SignalIcon,
  },
  {
    name: "Asuransi Tidak Berminat",
    to: "/asuransi-not-oke",
    icon: LockClosedIcon,
  },
  {
    name: "Asuransi Berminat",
    to: "/asuransi-oke",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Rekap Verifikasi",
    to: "/rekap",
    icon: FolderIcon,
  },
];

const secondaryNavigation = [{ name: "Settings", to: "/settings", icon: Cog6ToothIcon }];

export { navigation, secondaryNavigation };
