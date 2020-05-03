import React from "react";
import {
  MainMenu,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from "./LeftMenu.style";
import Popover from "components/Popover/Popover";
import {
  MenuDown,
  FruitsVegetable,
  FacialCare,
  Handbag,
  DressIcon,
  FurnitureIcon,
  BookIcon,
  MedicineIcon,
} from "components/AllSvgIcon";
import NavLink from "components/NavLink/NavLink";
import {
  WINE_PAGE,
  OPORTO_PAGE,
  VERMOUTH_PAGE,
  SPIRITS_PAGE,
} from "constants/navigation";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import Logo from "components/Logo/Logo";
const MENU_ITEMS = [
  {
    link: WINE_PAGE,
    icon: <FruitsVegetable />,
    label: "Vinos",
    intlId: "navWineMenu",
  },
  {
    link: OPORTO_PAGE,
    label: "Oporto",
    icon: <FacialCare />,
    intlId: "navPortWineMenu",
  },
  {
    link: VERMOUTH_PAGE,
    label: "Vermouth",
    icon: <Handbag />,
    intlId: "navVermouthMenu",
  },
  {
    link: SPIRITS_PAGE,
    label: "Spirits",
    icon: <DressIcon />,
    intlId: "navSpiritsMenu",
  },
];

const CategoryMenu = ({ onClick }) => {
  return (
    <>
      {MENU_ITEMS.map((item) => (
        <NavLink
          key={item.link}
          onClick={() => onClick(item)}
          className="menu-item"
          href={item.link}
          label={item.label}
          icon={item.icon}
          iconClass="menu-item-icon"
          intlId={item.intlId}
        />
      ))}
    </>
  );
};

type Props = {
  logo: string;
};

export const LeftMenu: React.FC<Props> = ({ logo }) => {
  const { pathname } = useRouter();
  const initialMenu = MENU_ITEMS.find((item) => item.link === pathname);
  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? MENU_ITEMS[0]
  );

  return (
    <LeftMenuBox>
      <Logo
        imageUrl={logo}
        alt={"Shop Logo"}
        onClick={() => setActiveMenu(MENU_ITEMS[0])}
      />

      <MainMenu>
        <Popover
          className="right"
          handler={
            <SelectedItem>
              <span>
                <Icon>{activeMenu?.icon}</Icon>
                <span>
                  <FormattedMessage
                    id={activeMenu?.intlId}
                    defaultMessage={activeMenu?.label}
                  />
                </span>
              </span>
              <Arrow>
                <MenuDown />
              </Arrow>
            </SelectedItem>
          }
          content={<CategoryMenu onClick={setActiveMenu} />}
        />
      </MainMenu>
    </LeftMenuBox>
  );
};
