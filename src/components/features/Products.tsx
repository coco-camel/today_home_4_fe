import React, { useState } from 'react';
import styled from 'styled-components';
import FilterButton from './FilterButton';
import productAPI from '../../apis/product';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/product/product.interface';

const Products = () => {
  const [isFreeDelivery, setIsFreeDelivery] =
    useState(false);
  const getProductAll = async () => {
    const { data } =
      await productAPI.getProductAll();
    return data.data.products;
  };
  const { data: products } = useQuery({
    queryKey: ['getProductsAll'],
    queryFn: getProductAll,
  });

  if (!products) {
    return <div>Loading...</div>;
  }

  const handleFreeDeliveryClick = (
    isFreeDelivery: boolean,
  ) => {
    setIsFreeDelivery(!isFreeDelivery);
  };

  return (
    <ProductSection>
      <h1>인기 상품</h1>
      <FilterButton
        onFreeDeliveryClick={
          handleFreeDeliveryClick
        }
        isTrue={isFreeDelivery}
      />
      <ProductWrap>
        <ProductList>
          {products.map((product: Product) => (
            <ProductItem key={product.productId}>
              <Link to="#">
                <ImgWrap>
                  <img
                    src={product.imageUrl}
                    alt=""
                  />
                  <ScrapBtn>
                    <button>
                      
                    </button>
                  </ScrapBtn>
                </ImgWrap>
                <ItemInfo>
                  <ItemInfoHeader>
                    <em>{product.brand}</em>
                    <span>{product.name}</span>
                  </ItemInfoHeader>
                  <ItemPrice>
                    <span>
                      {product.discount}
                      <span>%</span>
                    </span>
                    <span>
                      {product.price
                        .toString()
                        .replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ',',
                        )}
                    </span>
                  </ItemPrice>
                  <ItemState>
                    <p>
                      <span>4.8</span>
                      <span>리뷰 33,361</span>
                    </p>
                  </ItemState>
                  <ItemBadgeWrap>
                    <DeliveryBadge>
                      무료배송
                    </DeliveryBadge>
                    <SaleBadge>특가</SaleBadge>
                  </ItemBadgeWrap>
                </ItemInfo>
              </Link>
            </ProductItem>
          ))}
        </ProductList>
      </ProductWrap>
    </ProductSection>
  );
};
const ProductSection = styled.div`
  width: 100%;
  max-width: 1256px;
  padding: 0 60px;
  margin: 50px auto 0;
  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #000;
    margin-bottom: 14px;
  }
`;
const ProductWrap = styled.div`
  margin-top: 15px;
`;
const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px 20px;
`;
const ProductItem = styled.li`
  a:hover {
    img {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
`;
const ImgWrap = styled.picture`
  display: block;
  position: relative;
  background-color: #f5f5f5;
  padding-bottom: 100%;
  border-radius: 4px;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.2s;
    width: 100%;
  }
`;
const ScrapBtn = styled.div``;
const ItemInfo = styled.div`
  padding: 9px 10px;
`;
const ItemInfoHeader = styled.div`
  em {
    display: block;
    font-style: normal;
    color: #828c94;
    font-size: 11px;
  }
  span {
    display: block;
    margin-top: 5px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.2;
    color: #000;
  }
`;
const ItemPrice = styled.div`
  margin-top: 5px;
  span {
    font-size: 17px;
    font-weight: 700;
    color: #35c5f0;
    + span {
      display: inline-block;
      margin-left: 5px;
      color: #000;
    }
  }
`;
const ItemState = styled.div`
  margin-top: 3px;
  p span {
    margin-right: 5px;
    color: #424242;
    font-weight: 700;
    font-size: 12px;
    + span {
      color: #9e9e9e;
    }
  }
`;
const ItemBadgeWrap = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 4px;
  em {
    font-size: 11px;
  }
`;
const DeliveryBadge = styled.em`
  font-style: normal;
`;
const SaleBadge = styled.em`
  font-style: normal;
`;
export default Products;
