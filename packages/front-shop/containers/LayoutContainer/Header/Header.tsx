import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { openModal } from '@redq/reuse-modal';
import SearchBox from 'components/SearchBox/SearchBox';
import { SearchContext } from 'contexts/search/search.context';
import { useAuth } from '@bottle-market/common/auth';
import { RightMenu } from './Menu/RightMenu/RightMenu';
import { LeftMenu } from './Menu/LeftMenu/LeftMenu';
import HeaderWrapper from './Header.style';
import LogoImage from 'image/Logo.svg';
import { isCategoryPage } from '../is-home-page';
import SignInForm from '../../SignInOutForm/SignIn';
import { setCookie } from 'helper/session';
import { usePlaces } from '@bottle-market/common/helpers';

type Props = {
  className?: string;
  token?: string;
  pathname?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const { signIn, logout, isAuthenticated, user } = useAuth();
  const {
    placeSearch,
    setPlaceSearch,
    suggestions,
    getGeocode,
    getLatLng,
    clear,
  } = usePlaces();
  const { state, dispatch } = React.useContext(SearchContext);
  const { address, text } = state;
  const [search, setSearch] = useState('');
  const { pathname } = useRouter();

  const handleLogout = () => {
    logout();
  };

  const handleJoin = () => {
    setCookie('returnUrl', '/');
    signIn();
    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: SignInForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };

  const onSearch = (text: string) => {
    setSearch(text);
    if (!address) setPlaceSearch(text);
  };

  const handleSuggestionSelected = (suggestion: any) => {
    setSearch(suggestion.description);
    clear();
  };

  const onClickHandler = () => {
    if (!address)
      getGeocode({ address: search })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          dispatch({
            type: 'UPDATE ADDRESS',
            payload: {
              ...state,
              address: {
                description: search,
                lat: lat,
                lng: lng,
              },
            },
          });
          setSearch('');
        })
        .catch((error) => {
          console.log('😱 Error: ', error);
        });
    else {
      dispatch({
        type: 'UPDATE TEXT',
        payload: {
          ...state,
          text: search,
        },
      });
    }
  };
  const showSearch = isCategoryPage(pathname);

  return (
    <HeaderWrapper className={className}>
      <LeftMenu logo={LogoImage} />
      {showSearch && (
        <SearchBox
          className="headerSearch"
          handleSearch={(value: any) => onSearch(value)}
          onSuggestionSelected={handleSuggestionSelected}
          onClick={onClickHandler}
          intlPlaceholderId={address ? 'searchPlaceholder' : 'enterAddress'}
          hideType={true}
          minimal={true}
          showSvg={true}
          style={{ width: '100%' }}
          value={search || ''}
          intlMenuId={'navWineMenu'}
          autoSuggestion={!address}
          suggestions={suggestions}
        />
      )}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={user ? user.picture : ''}
      />
    </HeaderWrapper>
  );
};

export default Header;
