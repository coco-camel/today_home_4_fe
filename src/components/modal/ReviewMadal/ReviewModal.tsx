import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import ModalTemplate from '../../templates/Modal/ModalTemplate';
import { Wrap } from '../../../pages/ProductDetailPage/ProductDetailPage.styled';
import styled from 'styled-components';
import { GoStarFill } from 'react-icons/go';
import Header from '../../layout/Header';
import { Dimmed } from '../../templates/Modal/Modal.styled';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { selectiveproduct } from '../../../apis/productDetail';
import { useParams } from 'react-router-dom';
import { reviewRegistration } from '../../../apis/review';
import { ReivewInputData } from '../../../interfaces/modal/ReviewModal.interface';
import { number, string } from 'prop-types';
import { ReviewData } from '../../../interfaces/productDetail/productDetail.interface';
import { login } from '../../../apis/login';
import react from '@vitejs/plugin-react';

const ReviewModal = () => {
  const [hoverIndex, setHoverIndex] =
    useState<number>(-1);
  const [rating, setRating] = useState<number>(0);

  const handleMouseEnter = (
    index: number,
  ): void => {
    setHoverIndex(index);
  };

  const handleMouseLeave = (): void => {
    setHoverIndex(-1);
  };

  const handleClick = (index: number): void => {
    const selectedRating = index + 1;
    setRating(selectedRating);
    setFormData((prevState) => ({
      ...prevState,
      rating: selectedRating,
    }));
  };

  const StarRating = () => (
    <Wrap>
      {[...Array(5)].map((_, index) => (
        <GoStarFill
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() =>
            handleMouseEnter(index)
          }
          onMouseLeave={handleMouseLeave}
          style={{
            fontSize: '37px',
            cursor: 'pointer',
            color:
              hoverIndex !== -1
                ? index <= hoverIndex
                  ? '#82e0fa'
                  : '#dbdbdb'
                : index < rating
                  ? '#35c5f0'
                  : '#dbdbdb',
          }}
        />
      ))}
    </Wrap>
  );

  const params = useParams();

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: [
      'getProductDetail',
      params.productId,
    ],
    queryFn: () =>
      selectiveproduct(params.productId),
    select: (response) => response.data,
    enabled: !!params.productId,
  });

  const [formData, setFormData] =
    useState<ReivewInputData>({
      contents: '',
      rating: 0,
    });

  const reviewMutaion = useMutation({
    mutationFn: reviewRegistration,
    onSuccess: () => {
      console.log('><');
    },
  });

  const handleClickSubmit = () => {
    const productId: number = params?.productId
      ? Number(params.productId)
      : 0;
    reviewMutaion.mutate({
      ...formData,
      productId,
    });
    setFormData({
      contents: '',
      rating: 0,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Fragment>
      <Dimmed />
      <ModalTemplate $width={'720px'}>
        <TitleBox>
          <span>리뷰 쓰기</span>
        </TitleBox>
        <ReviewProduct>
          <ImgBox>
            <img
              src={data?.product.imageUrl}
              alt="Product"
            />
          </ImgBox>
          <FlexCloumBox>
            <span className={'brandname'}>
              {data?.product.brand}
            </span>
            <span className={'productname'}>
              {data?.product.name}
            </span>
          </FlexCloumBox>
        </ReviewProduct>
        <ModalBox>
          <span className={'spantext'}>
            별점 평가
          </span>
          <StarBox>
            <StarRating />
          </StarBox>
          <span className={'spantext'}>
            리뷰 작성
          </span>
          <textarea
            className={'reviewInput'}
            name="contents"
            placeholder={
              '자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다.'
            }
            value={formData.contents}
            onChange={handleChange}
          />
          <Sbmitbutton
            onClick={handleClickSubmit}
          >
            완료
          </Sbmitbutton>
        </ModalBox>
      </ModalTemplate>
    </Fragment>
  );
};

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  .spantext {
    font-size: 15px;
    font-weight: 700;
    margin: 30px 0 15px 0;
  }
  .reviewInput {
    width: 638px;
    height: 110px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    margin-bottom: 34px;
    padding: 0 15px;
    line-height: 40px;
  }
`;

const StarBox = styled.div`
  display: flex;
  justify-content: center;
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.35;
  font-weight: 700;
  text-align: center;
  font-size: 20px;
  height: 50px;
`;

const Sbmitbutton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 668px;
  height: 45px;
  background-color: #35c5f0;
  border-color: #35c5f0;
  color: #fff;
  border-radius: 4px;
`;

const FlexCloumBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .brandname {
    font-size: 11px;
    color: rgb(117, 117, 117);
    margin-bottom: 6px;
  }

  .productname {
    margin-bottom: 6px;
    font-size: 15px;
    line-height: 1.2;
  }
`;

const ReviewProduct = styled.div`
  display: flex;
  align-items: center;
`;
const ImgBox = styled.div`
  height: 100px;
  width: 125px;
  margin: 0 15px 0 0;
  > img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;
export default ReviewModal;
