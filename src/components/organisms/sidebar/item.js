import { ChartPieIcon, Cog6ToothIcon, UsersIcon, DocumentDuplicateIcon, FolderIcon } from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Beranda",
    to: "/beranda",
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
];

const secondaryNavigation = [{ name: "Settings", to: "/settings", icon: Cog6ToothIcon }];

export { navigation, secondaryNavigation };
