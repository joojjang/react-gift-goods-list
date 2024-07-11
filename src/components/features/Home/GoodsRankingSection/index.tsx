import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getRankingProducts } from '@/api';
import { Container } from '@/components/common/layouts/Container';
import { GoodsData } from '@/types';
import { GoodsRankingFilter } from './GoodsRankingFilter';
import { GoodsRankingList } from './GoodsRankingList';

export const GoodsRankingSection = () => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchRankingProducts = async () => {
      try {
        const data = await getRankingProducts();
        setGoodsList(data.products);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchRankingProducts();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading ranking products.</p>;

  return (
    <StyledGoodsRankingSection>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter />
        <GoodsRankingList goodsList={goodsList} />
      </Container>
    </StyledGoodsRankingSection>
  );
};

const StyledGoodsRankingSection = styled.section`
  padding: 0px 16px 32px;
`;

const Title = styled.h2`
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
`;
