import React, {Fragment, useEffect, useState,} from 'react';
import ModalTemplate from '../../templates/Modal/ModalTemplate';
import {StarBox, Wrap} from '../../../pages/ProductDetailPage/ProductDetailPage.styled';
import {GoStarFill} from 'react-icons/go';
import {Dimmed} from '../../templates/Modal/Modal.styled';
import {useMutation, useQuery, useQueryClient,} from '@tanstack/react-query';
import {selectiveproduct} from '../../../apis/productDetail';
import {useNavigate, useParams} from 'react-router-dom';
import {postAddReview} from '../../../apis/review';
import {ReivewInputData} from '../../../interfaces/modal/ReviewModal.interface';
import {FlexCloumBox, ImgBox, ModalBox, ReviewProduct, Sbmitbutton, TitleBox} from './ReviewModal.styled';
import {Reviews} from '../../../interfaces/api/product/response/index.interface'

const ReviewModal = ({targetReviewData}: {targetReviewData?: Reviews}) => {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);


  const [rating, setRating] = useState<number>(
      targetReviewData ? targetReviewData.rating : 0
  );

  const [formData, setFormData] = useState<ReivewInputData>({
      contents: '',
      rating: 0,
  });

  const params = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (targetReviewData) {
      setFormData({
        contents: targetReviewData.contents,
        rating: targetReviewData.rating
      });
    }
  }, [targetReviewData])



  const queryDetail = useQuery({
    queryKey: [
      'getProductDetail',
      params.productId,
    ],
    queryFn: () =>
        selectiveproduct(params.productId),
    select: (response) => response.data,
    enabled: !!params.productId,
  });

  const { isLoading, isError, data } = queryDetail



  const handleMouseEnter = (index: number,) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };


  const handleClick = (index: number) => {
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


const navigate = useNavigate()

  const reviewMutaion = useMutation({
    mutationFn: postAddReview,
    onSuccess: () => {
      queryDetail.refetch();
      console.log('><');
    },
  });

  const handleClickSubmit = () => {
    navigate(`/detail/${data?.product.productId}`)
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

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

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
            {targetReviewData ? '수정' : '완료' }
          </Sbmitbutton>
        </ModalBox>
      </ModalTemplate>
    </Fragment>
  );
};


export default ReviewModal;
