import React, { useState } from "react";
import NavStyle from "./nav.style";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
const LINKS = [
  {
    title: "GitHub",
    href: "/",
  },
  {
    title: "Contact",
    href: "mailto:bravo68web@gmail.com",
  },
];
function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <NavStyle>
      <Link href="/" passHref>
        <div className="title">
          <h1>&quot;WHOIS my ISP ?&quot;</h1>
        </div>
      </Link>
      <div className="links">
        {LINKS.map(({ title, href }, index) => (
          <div key={index} className="link">
            <Link href={href}>{title}</Link>
          </div>
        ))}
      </div>
      {/* Mobile Menu */}
      <div className={"menu"}>
        <IconButton
          id="nav-menu-button"
          aria-controls={open ? "nav-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "nav-menu-button",
          }}
        >
          {LINKS.map(({ title, href }, index) => (
            <MenuItem key={index} onClick={handleClose}>
              <Link href={href}>{title}</Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </NavStyle>
  );
}
export default Nav;
