import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as S from './MyPageContentsStyles';
import { Link } from 'react-router-dom';
import { scrapList } from '../../../apis/myPage';

interface Scrap {
  id: number;
  productId: number;
  imageUrl: string;
}

function MyPageScrapList() {
  const [scraps, setScraps] = useState<Scrap[]>(
    [],
  );
  const [isPageEnd, setIsPageEnd] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const pageIndexRef = useRef<number>(0);
  const loadMoreRef =
    useRef<HTMLDivElement>(null);

  const getList = useCallback(async () => {
    if (isPageEnd || isLoading) return;
    setIsLoading(true);
    try {
      const response = await scrapList(
        pageIndexRef.current,
      );
      if (response && response.data) {
        const { data } = response.data;
        setScraps((prevScraps) => [
          ...prevScraps,
          ...data,
        ]);
        setIsPageEnd(data.length < 10);
        pageIndexRef.current++;
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [isLoading, isPageEnd]);

  const handleObserver = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (
        entry.isIntersecting &&
        !isPageEnd &&
        !isLoading
      ) {
        getList();
      }
    },
    [getList, isPageEnd, isLoading],
  );

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const option = {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      handleObserver,
      option,
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <S.ScrapProductWrap>
      <S.ScrapList>
        {scraps.map((item, index) => (
          <S.ScrapItem key={index}>
            <Link
              to={`/detail/${item.productId}`}
            ></Link>
            <S.ImgWrap>
              <img src={item.imageUrl} alt="" />
            </S.ImgWrap>
          </S.ScrapItem>
        ))}
      </S.ScrapList>
      {!isPageEnd && (
        <div
          ref={loadMoreRef}
          style={{ height: '20px' }}
        ></div>
      )}
    </S.ScrapProductWrap>
  );
}

export default MyPageScrapList;
