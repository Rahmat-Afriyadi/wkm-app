import { ChartPieIcon, Cog6ToothIcon, UsersIcon, DocumentDuplicateIcon, FolderIcon } from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: ChartPieIcon,
  },
  {
    name: "Deployments",
    to: "/deployments",
    icon: UsersIcon,
  },
  {
    name: "Assets",
    to: "/assets",
    icon: FolderIcon,
  },
  {
    name: "Sites",
    to: "/sites",
    icon: ChartPieIcon,
  },
  {
    name: "Users",
    to: "/users",
    icon: UsersIcon,
  },
  {
    name: "Roles",
    to: "/roles",
    icon: DocumentDuplicateIcon,
  },
];

const secondaryNavigation = [{ name: "Settings", to: "/settings", icon: Cog6ToothIcon }];

export { navigation, secondaryNavigation };
