import {
  Home as HomeIcon,
  LiveTv as LiveTvIcon,
  Logout as LogoutIcon,
  SpaceDashboard as DashboardIcon
} from "@mui/icons-material";

export const navItems = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Dashboard", href: "/dashboard", Icon: DashboardIcon },
  { label: "Movies", href: "/movies", Icon: LiveTvIcon },
  { label: "Logout", href: "/logout", Icon: LogoutIcon },
]
