import {
  ChartPieIcon,
  Cog6ToothIcon,
  UsersIcon,
  FolderIcon,
  LockClosedIcon,
  CurrencyDollarIcon,
  SignalIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: ChartPieIcon,
  },
  {
    name: "Data Renewal",
    to: "/data-renewal",
    icon: ChartPieIcon,
  },
  {
    name: "Dashboard Pembayaran",
    to: "/dashboard-pembayaran",
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
  {
    name: "Approval",
    to: "/approval",
    icon: FolderIcon,
  },
  {
    name: "On The Road",
    to: "/otr",
    icon: FolderIcon,
  },
  {
    name: "Master Kendaraan",
    to: "/mst-mtr",
    icon: FolderIcon,
  },
  {
    name: "Produk",
    to: "/produk",
    icon: FolderIcon,
  },
  {
    name: "Vendor",
    to: "/vendor",
    icon: FolderIcon,
  },
  {
    name: "Transaksi",
    to: "/transaksi",
    icon: FolderIcon,
  },
  // finance
  {
    name: "Input Bayar",
    to: "/input-bayar",
    icon: FolderIcon,
  },
  {
    name: "Input Tanggal Merah",
    to: "/input-tanggal-merah",
    icon: FolderIcon,
  },
  {
    name: "Pengajuan Extend Bayar",
    to: "/pengajuan-extend-bayar",
    icon: FolderIcon,
  },
  {
    name: "Approval Extend Bayar",
    to: "/approval-extend-bayar",
    icon: FolderIcon,
  },
  {
    name: "Pengajuan Bantuan",
    to: "/pengajuan-bantuan",
    icon: FolderIcon,
  },
  {
    name: "Tiket Bantuan",
    to: "/tiket-bantuan",
    icon: FolderIcon,
  },
  {
    name: "Master Script",
    to: "/master-script",
    icon: FolderIcon,
  },
  {
    name: "Telesales",
    to: "/telesales",
    icon: FolderIcon,
  },
  {
    name: "State",
    to: "/state",
    icon: FolderIcon,
  },
  {
    name: "Membership",
    icon: FolderIcon,
    children: [
      {
        name: "All Data",
        to: "/all-status-membership",
        icon: FolderIcon,
      },
      {
        name: "Kartu Balikan",
        to: "/kartu-balikan",
        icon: FolderIcon,
      },
      { name: "Pending", to: "/pending/membership", icon: FolderIcon },
      {
        name: "Prospect",
        to: "/prospect/membership",
        icon: FolderIcon,
      },
    ],
  },
  {
    name: "Asuransi PA",
    icon: FolderIcon,
    children: [
      { name: "Pending", to: "/pending/asuransi-pa", icon: FolderIcon },
      {
        name: "Prospect",
        to: "/prospect/asuransi-pa",
        icon: FolderIcon,
      },
    ],
  },
  {
    name: "Asuransi Motor",
    icon: FolderIcon,
    children: [
      { name: "Pending", to: "/pending/asuransi-mtr", icon: FolderIcon },
      {
        name: "Prospect",
        to: "/prospect/asuransi-mtr",
        icon: FolderIcon,
      },
    ],
  },
];

const secondaryNavigation = [{ name: "Settings", to: "/settings", icon: Cog6ToothIcon }];

export { navigation, secondaryNavigation };
