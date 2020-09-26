import React from 'react';
import { Items, Item } from './Breadcrumb.style';
import Link from 'next/link';

type BreadcrumbProps = {
  categories: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = ({
  deviceType,
  categories,
}) => {
  console.log(categories);
  return (
    <Items>
      {categories.map((item: any) => (
        <Item key={item.id}>
          <Link href={'/vinos'}>
            <a>{item.title}</a>
          </Link>
        </Item>
      ))}
    </Items>
  );
};

export default Breadcrumb;
