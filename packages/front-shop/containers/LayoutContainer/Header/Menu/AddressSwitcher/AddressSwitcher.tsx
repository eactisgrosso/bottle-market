import React from 'react';
import { Box, SelectedItem, Icon, MenuItem } from './AddressSwitcher.style';
import { GpsIcon, SearchIconSmall } from 'components/AllSvgIcon';
import Popover from 'components/Popover/Popover';
import { SearchContext } from 'contexts/search/search.context';

const AddressMenu = ({ onClick }) => {
  return (
    <>
      <MenuItem onClick={onClick}>
        Nueva dirección
        <Icon style={{ marginLeft: 10 }}>{<SearchIconSmall />}</Icon>
      </MenuItem>
    </>
  );
};

const AddressSwitcher: React.FC<{}> = () => {
  const { state, dispatch } = React.useContext(SearchContext);
  const { address } = state;

  const addressChangeHandler = (e) => {
    dispatch({
      type: 'RESET ADDRESS',
    });
  };

  if (!address) return <></>;

  return (
    <Box>
      <Popover
        className="right"
        handler={
          <SelectedItem>
            <Icon>
              <GpsIcon />
            </Icon>
            <span>{address.description.split(',')[0]}</span>
          </SelectedItem>
        }
        content={<AddressMenu onClick={addressChangeHandler} />}
      />
    </Box>
  );
};

export default AddressSwitcher;
