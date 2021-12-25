import "./Header.scss";

import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IconButton, MenuItem, MenuList, Typography, useMediaQuery } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { colors } from "../../common/colors";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerComponent from "../Drawer/Drawer";

interface IRoutes {
  label: string;
  url: string;
}

const routes: IRoutes[] = [
  {
    label: "Home",
    url: "/home",
  },
  {
    label: "Movies",
    url: "/library/movies",
  },
  {
    label: "TV Series",
    url: "/library/tv-series",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const tabletScreen = useMediaQuery("(min-width:1024px)");
  const mobileScreen = useMediaQuery("(min-width:600px)");

  const headerRef = React.useRef<any>(null);
  const [isSearching, setSearching] = React.useState<boolean>(false);
  const [isOpeningMenu, setOpeningMenu] = React.useState<boolean>(false);

  React.useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editSearchStatus = () => {
    setSearching(!isSearching);
  };

  const editOpenMenu = (open: boolean) => {
    setOpeningMenu(open);
  };

  const onNavigate = (url: string) => {
    history.push(url);
    editOpenMenu(false);
  };

  return (
    <React.Fragment>
      <div className="header-box" ref={headerRef}>
        <div className="container header">
          {/* Menu App */}

          {!tabletScreen ? (
            <IconButton
              size="large"
              aria-label="open drawer"
              sx={{ color: colors.mainColor }}
              onClick={() => editOpenMenu(true)}
            >
              <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>
          ) : null}

          <div className="header__logo">
            <h1>MovieNgN</h1>
          </div>

          {/* Hidden Routes for tablet, mobile */}

          {tabletScreen ? (
            <div className="header__routes">
              {routes.map((route, index) => (
                <React.Fragment key={index}>
                  <div className="header__routes__link">
                    <Link
                      to={route.url}
                      className={pathname === route.url ? "active" : ""}
                      onClick={() => (pathname === route.url ? null : scrollToTop())}
                    >
                      {route.label}
                    </Link>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : null}

          <div className="header__search">
            <IconButton aria-label="delete" size="small" onClick={editSearchStatus}>
              <SearchOutlinedIcon sx={{ color: colors.mainColor }} />
            </IconButton>
          </div>
        </div>
        <div className={isSearching ? "container search search--open" : "container search"}>
          <input type="text" className="search--open__textfield" placeholder="Search here ..." />
          <CloseOutlinedIcon
            color="inherit"
            className="search--open__textfield__close"
            onClick={editSearchStatus}
          />
        </div>
      </div>
      {!tabletScreen ? (
        <DrawerComponent open={isOpeningMenu} toggle={() => editOpenMenu(false)}>
          <div className="drawer-box">
            <div className="drawer-box__logo">
              <Typography component="h1">MovieNgN</Typography>
            </div>
            <div className="drawer-box__routes">
              <MenuList>
                {routes.map((route, index) => (
                  <MenuItem
                    selected={pathname === route.url}
                    key={index}
                    sx={{ fontSize: mobileScreen ? 22 : 14 }}
                    onClick={() => onNavigate(route.url)}
                  >
                    {route.label}
                  </MenuItem>
                ))}
              </MenuList>
            </div>
          </div>
        </DrawerComponent>
      ) : null}
    </React.Fragment>
  );
};

export default Header;
