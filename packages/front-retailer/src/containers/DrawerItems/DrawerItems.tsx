import React, { useCallback } from 'react';
import { styled } from 'baseui';
import Drawer from '../../components/Drawer/Drawer';
import { CloseIcon } from '../../components/AllSvgIcon';
import { useDrawerState, useDrawerDispatch } from '../../context/DrawerContext';

import StoreForm from '../Stores/StoreForm/StoreForm';
import DeliveryForm from '../Delivery/DeliveryForm/DeliveryForm';
import ProductUpdateForm from '../Products/ProductForm/ProductUpdateForm';
import Sidebar from '../Layout/Sidebar/Sidebar';
import DeliveryUpdateForm from '../Delivery/DeliveryUpdateForm/DeliveryUpdateForm';

const DRAWER_COMPONENTS = {
  STORE_FORM: StoreForm,
  DELIVERY_FORM: DeliveryForm,
  PRODUCT_UPDATE_FORM: ProductUpdateForm,
  SIDEBAR: Sidebar,
  DELIVERY_UPDATE_FORM: DeliveryUpdateForm
};

const CloseButton = styled('button', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textNormal,
  lineHeight: 1.2,
  outline: '0',
  border: 'none',
  padding: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '10px',
  left: '-30px',
  right: 'auto',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  width: '20px',
  height: '20px',
  borderRadius: '50%',

  '@media only screen and (max-width: 767px)': {
    left: 'auto',
    right: '30px',
    top: '29px',
  },
}));

export default function DrawerItems() {
  const isOpen = useDrawerState('isOpen');
  const drawerComponent = useDrawerState('drawerComponent');
  const data = useDrawerState('data');
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  if (!drawerComponent) {
    return null;
  }
  const SpecificContent = DRAWER_COMPONENTS[drawerComponent];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      overrides={{
        Root: {
          style: {
            zIndex: 2,
          },
        },
        DrawerBody: {
          style: {
            marginTop: '80px',
            marginLeft: '60px',
            marginRight: '60px',
            marginBottom: '30px',
            '@media only screen and (max-width: 767px)': {
              marginTop: '80px',
              marginLeft: '30px',
              marginRight: '30px',
              marginBottom: '30px',
            },
          },
        },
        DrawerContainer: {
          style: {
            width: '70vw',
            backgroundColor: '#f7f7f7',
            '@media only screen and (max-width: 767px)': {
              width: '100%',
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={closeDrawer}>
              <CloseIcon width="6px" height="6px" />
            </CloseButton>
          ),
        },
      }}
    >
      <SpecificContent onClose={closeDrawer} data={data} />
    </Drawer>
  );
}
