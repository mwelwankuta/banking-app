import React, { Fragment, useEffect, useState } from 'react';

import Header from '../../components/Header';
import Container from '../../components/Container';
import Transactions from '../../components/Transactions';

import HeaderPlaceholder from '../../components/Header/Placeholder';
import TransactionsPlaceholder from '../../components/Transactions/TransactionsPlaceholder';

import { HomeTransactions } from '../../apis/home';

function Home() {
  const [data, setData] = useState();

  // get transaction on load
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await HomeTransactions();

        if (response.message) {
          setData({ balance: 0, transactions: [] });
          return;
        }
        setData(response);
      } catch (error) {
        setData({ balance: 0 });
      }
    };
    getData();
  }, []);

  return (
    <Container element='main' className='flex flex-col'>
      {/* Date Available */}
      {data && (
        <Fragment>
          <Header balance={data.balance} />
          {data.transactions.length > 0 ? (
            <Transactions transactions={data.transactions} />
          ) : (
            <p className='text-center mt-10 font-medium text-gray-600'>
              no previous transactions
            </p>
          )}
        </Fragment>
      )}
      {/* Loading Placeholder */}
      {!data && (
        <Fragment>
          <HeaderPlaceholder />
          <TransactionsPlaceholder />
        </Fragment>
      )}
    </Container>
  );
}

export default Home;
