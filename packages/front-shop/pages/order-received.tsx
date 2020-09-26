import React from 'react';
import { SEO } from 'components/seo';
import OrderRecivedPage from 'containers/OrderReceived/OrderReceived';

class OrderReceived extends React.Component<any> {
  public render() {
    return (
      <>
        <SEO title="Invoice - BottleMarket" description="Invoice Details" />
        <OrderRecivedPage />
      </>
    );
  }
}

export default OrderReceived;
