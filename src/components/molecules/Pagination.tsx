import { colors } from '@/styles/constants';
import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
type Props = {
  page: number;
  limit?: number;
  data: any[];
  setPage: Dispatch<SetStateAction<number>>;
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px 122px;
  box-sizing: border-box;
`;

const PageIndex = styled.span`
  color: ${colors.light};
  font-size: 12px;
`;

const Pagination = (props: Props) => {
  const { limit = 10, data, page, setPage } = props;

  function handleButtonClick(type: 'prev' | 'next') {
    if (type === 'prev') {
      if (page > 1) {
        return setPage(page - 1);
      }
      return;
    }

    if (data.length / limit > page) {
      return setPage(page + 1);
    }
  }
  return (
    <PaginationWrapper>
      <div onClick={() => handleButtonClick('prev')}>
        <FaAngleDoubleLeft />
      </div>
      <PageIndex>page {page}</PageIndex>
      <div onClick={() => handleButtonClick('next')}>
        <FaAngleDoubleRight />
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
