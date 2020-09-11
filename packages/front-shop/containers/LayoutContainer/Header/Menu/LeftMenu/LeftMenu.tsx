import React from 'react';
import {
  MainMenu,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from './LeftMenu.style';
import Popover from 'components/Popover/Popover';
import {
  MenuDown,
  Vino,
  Spirits,
  Vermouth,
} from 'components/AllSvgIcon';
import NavLink from 'components/NavLink/NavLink';
import { WINE_PAGE, SPIRITS_PAGE, BEER_PAGE } from 'constants/navigation';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import Logo from 'components/Logo/Logo';
import MenuNav from 'components/MenuNav/MenuNav';
const MENU_ITEMS = [
  {
    link: WINE_PAGE,
    label: 'Vinos',
    intlId: 'navWineMenu',
  },
  {
    link: SPIRITS_PAGE,
    label: 'Spirits',
    intlId: 'navSpiritsMenu',
  },
  {
    link: BEER_PAGE,
    label: 'Cervezas',
    intlId: 'navBeerMenu',
  },
  {
    link: WINE_PAGE,
    label: 'Más',
    intlId: 'navMoreMenu',
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
        alt={'Shop Logo'}
        onClick={() => setActiveMenu(MENU_ITEMS[0])}
      />
      <MenuNav items={MENU_ITEMS} />
    </LeftMenuBox>
  );
};
