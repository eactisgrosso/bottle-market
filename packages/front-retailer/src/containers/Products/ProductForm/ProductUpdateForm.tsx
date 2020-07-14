import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, gql } from '@apollo/client';

import Modal from '../../../components/Modal/Modal';

const GET_PRODUCT_DETAILS = gql`
  query getStoreProduct($id: String!) {
    storeProduct(id: $id) {
      id
      title
      gallery {
        url
      }
      description
      price
      price_retail
      quantity
    }
  }
`;

type Props = any;

const ProductUpdateForm: React.FC<Props> = ({ product, isOpen, onClose }) => {
  console.log(JSON.stringify(product));

  // const id = product.id;
  // const { data, error, loading } = useQuery(GET_PRODUCT_DETAILS, {
  //   variables: { id },
  // });
  const [gallery, setGallery] = useState([]);
  const [description, setDescription] = useState('');

  // useEffect(() => {
  //   if (data && data.storeProduct) {
  //     setGallery(data.storeProduct.gallery);
  //     setDescription(data.storeProduct.description);
  //   }
  // }, [data]);

  // const { register, handleSubmit, setValue } = useForm({
  //   defaultValues: data,
  // });

  // if (loading) return <></>;

  const onSubmit = (data) => {
    // const newProduct = {
    //   id: uuidv4(),
    //   name: data.name,
    //   type: data.type[0].value,
    //   description: data.description,
    //   image: data.image,
    //   price: Number(data.price),
    //   unit: data.unit,
    //   salePrice: Number(data.salePrice),
    //   discountInPercent: Number(data.discountInPercent),
    //   quantity: Number(data.quantity),
    //   slug: data.name,
    //   creation_date: new Date(),
    // };
    console.log(data, 'newProduct data');
    // closeDrawer();
  };

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={onClose}
        onCancel={onClose}
        onConfirm={() => {}}
        title={product ? product.title : ''}
      >
        <span></span>
      </Modal>
    </>
  );
};

export default ProductUpdateForm;
