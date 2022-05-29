import HomeIcon from "@mui/icons-material/Home";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { SvgIconComponent } from "@mui/icons-material";
import { createTheme } from "@material-ui/core/styles";

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

export const THEME = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    body1: {
      fontFamily: `"Inter", sans-serif`,
    },
  },
  /*  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          {
            fontFamily: `"Inter", sans-serif`,
            fontStyle: "normal",
            fontWeight: "normal",
            src: `url('Inter-Regular.eot'), local('Inter Regular'), local('Inter-Regular'),
              url('Inter-Regular.eot?#iefix') format('embedded-opentype'),
              url('Inter-Regular.woff2') format('woff2'),
              url('Inter-Regular.woff') format('woff'),
              url('Inter-Regular.ttf') format('truetype')`,
          },
        ],
      },
    },
  }, */
});
