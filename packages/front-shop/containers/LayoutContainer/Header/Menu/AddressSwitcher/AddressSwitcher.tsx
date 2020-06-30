import React from "react";
import { Box, SelectedItem, Icon } from "./AddressSwitcher.style";
import { GpsIcon } from "components/AllSvgIcon";
import Popover from "components/Popover/Popover";
import { SearchContext } from "contexts/search/search.context";

const AddressSwitcher: React.FC<{}> = () => {
  const { state, dispatch } = React.useContext(SearchContext);
  const { address } = state;

  const addressChangeHandler = (e) => {
    // changeAddress(e.target.value);
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
            <span>{address.description.split(",")[0]}</span>
          </SelectedItem>
        }
        content={<span />}
      />
    </Box>
  );
};

export default AddressSwitcher;
