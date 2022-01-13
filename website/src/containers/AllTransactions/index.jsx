import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { HomeTransactions } from '../../apis/home';
import Container from '../../components/Container';
import TransactionCard from '../../components/Transactions/TransactionCard';
import TransactionsPlaceholder from '../../components/Transactions/TransactionsPlaceholder';

function AllTransactions() {
  const [data, setData] = useState();

  const getData = useCallback(async () => {
    try {
      const response = await HomeTransactions();
      if (response.message) {
        setData({ balance: 0 });
        return;
      }
      setData(response);
    } catch (error) {
      setData({ balance: 0 });
    }
  }, []);

  // get transaction on load
  useEffect(() => getData(), [data, getData]);

  return (
    <Container className='px-4'>
      <h1 className='font-semibold text-xl mt-4 mb-10 text-gray-900'>
        All Transactions
      </h1>

      {data && (
        <Fragment>
          {data.length === 0 && (
            <div>
              <p className='text-center mt-10 font-medium text-gray-600'>
                no previous transactions
              </p>
            </div>
          )}

          <div>
            {data.transactions.map(({ _id, amount, from, to, createdAt }) => (
              <TransactionCard
                amount={amount}
                from={from}
                to={to}
                date={createdAt}
                title={to}
                key={_id}
              />
            ))}
          </div>
        </Fragment>
      )}

      {!data && <TransactionsPlaceholder />}
    </Container>
  );
}

export default AllTransactions;
