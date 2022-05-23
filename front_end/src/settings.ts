import HomeIcon from "@mui/icons-material/Home";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { SvgIconComponent } from "@mui/icons-material";

export type NavbarTabType = {
  icon: SvgIconComponent;
  ariaLabel: string;
  label: string;
  to: string;
};

export const navbarTabArray: Array<NavbarTabType> = [
  {
    icon: HomeIcon,
    ariaLabel: "dashboard",
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: AlignHorizontalLeftIcon,
    ariaLabel: "transactions",
    label: "Transactions",
    to: "/transactions",
  },
  {
    icon: PersonPinIcon,
    ariaLabel: "person",
    label: "Profile",
    to: "/profile",
  },
];
