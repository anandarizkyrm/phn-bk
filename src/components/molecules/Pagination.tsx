import styled from '@emotion/styled';
import React, { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useRouter } from 'next/router';
type Props = {
  page?: number;
  limit?: number;
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px 122px;
  box-sizing: border-box;
`;

const Pagination = (props: Props) => {
  const { limit = 10 } = props;
  const [page, setPage] = useState(1);
  const router = useRouter();
  function handleButtonClick(type: 'prev' | 'next') {
    if (type === 'prev') {
      if (page >= 2) {
        setPage(page - 1);
        return router.push({
          pathname: router.pathname,
          query: { offset: (page - 2) * limit },
        });
      } else {
        return;
      }
    }
    setPage(page + 1);
    return router.push({
      pathname: router.pathname,
      query: { offset: (page + 1) * limit - limit },
    });
  }
  return (
    <PaginationWrapper>
      <div onClick={() => handleButtonClick('prev')}>
        <FaAngleDoubleLeft />
      </div>
      <div onClick={() => handleButtonClick('next')}>
        <FaAngleDoubleRight />
      </div>
    </PaginationWrapper>
  );
};

export default Pagination;
