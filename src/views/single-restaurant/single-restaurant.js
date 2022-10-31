import { Button, Divider, message, Rate, Table } from 'antd';
import { orderList } from 'atoms/order-list.atom';
import axios from 'axios';
import { ViewWrapper } from 'components/common';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import {
  RestaurantData,
  RestaurantHead,
  RestaurantImage,
} from './single-restaurant.styled';

const getRestaurant = async (id) => {
  const { data } = await axios.get(`http://platzi.nru.to:3003/api/menu/${id}`);

  return data;
};

const SingleRestaurant = () => {
  const { id } = useParams();

  const [orderListItems, setOrderList] = useRecoilState(orderList);

  const { data } = useQuery('restaurant', () => getRestaurant(id));

  const handleAddToCart = (clickedRow) => {
    const isItemInCart = orderListItems.find(
      (item) => item.name === clickedRow.name
    );

    message.success(`${clickedRow.name} added to cart`, 1);

    if (isItemInCart) {
      const newData = orderListItems.map((item) =>
        item.name === clickedRow.name
          ? { ...item, count: item.count + 1 }
          : item
      );
      setOrderList(newData);
    } else {
      setOrderList([
        ...orderListItems,
        { name: clickedRow.name, price: clickedRow.price, count: 1 },
      ]);
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Add to cart',
      render: (clickedRow) => (
        <Button id="menuItem" onClick={() => handleAddToCart(clickedRow)}>
          Add
        </Button>
      ),
    },
  ];

  let menuItems = data?.menuItems || [];
  menuItems.forEach((item) => {
    item.key = item.name;
    return item;
  });

  return (
    <ViewWrapper>
      <RestaurantHead>
        <RestaurantImage
          alt={data?.name}
          src={require(`./../../assets/images/restaurants/${id}.jpg`)}
        />
        <RestaurantData>
          <h1>{data?.name}</h1>
          <Rate value={data?.rating} disabled />
          <p>{data?.description}</p>
          <p>You can find us at {data?.location}</p>
        </RestaurantData>
      </RestaurantHead>
      <Divider />
      <h4>Menu</h4>
      <Table
        dataSource={menuItems}
        columns={columns}
        style={{ width: '100%' }}
      />
    </ViewWrapper>
  );
};

export default SingleRestaurant;
