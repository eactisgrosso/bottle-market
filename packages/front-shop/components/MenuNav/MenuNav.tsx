import React from "react";
import NavLink from "../NavLink/NavLink";
import MenuNavWrapper, { MenuNavLinks } from "./MenuNav.style";
import { GroceryIcon, MakeupIcon, DressIcon, Handbag } from "../AllSvgIcon";

type MenuNav = {
  className?: string;
  items?: any[];
};

const MenuNav: React.FunctionComponent<MenuNav> = ({
  className,
  items = [],
}) => {
  return (
    <MenuNavWrapper className={className}>
      <MenuNavLinks>
        {items.map((item, index) => (
          <NavLink
            className="store-nav-link"
            href={item.link}
            label={item.label}
            key={index}
          />
        ))}
      </MenuNavLinks>
    </MenuNavWrapper>
  );
};

export default MenuNav;
