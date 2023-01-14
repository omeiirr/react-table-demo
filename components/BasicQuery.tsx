// @ts-nocheck

import React from 'react';

// libraries
import { useQuery } from 'react-query';
import ReactQueryTable from './ReactQueryTable';

const BasicQuery = () => {
  const fetchAllUsers = async () =>
    await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`)).json();

  const { data, error, status } = useQuery('users', fetchAllUsers, {
    staleTime: 0,
  });

  return (
    <div>
      {status === 'error' && <div>{error}</div>}

      {status === 'loading' && <div>Loading...</div>}

      {status === 'success' && <ReactQueryTable data={data} />}
    </div>
  );
};

export default BasicQuery;
