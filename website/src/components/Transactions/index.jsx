import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Container from '../Container';
import TransactionCard from './TransactionCard';

function Transactions({ transactions }) {
  const [currentDayTransactionsExist, setCurrentDayTransactionsExist] =
    useState(false);
  const [olderTransactionsExist, setOlderTransactionsExist] = useState(false);

  const history = useHistory();
  return (
    <Container className='px-4 py-2 rounded-t-2xl border-t'>
      <button
        onClick={() => history.push(ROUTES.all_transactions)}
        className='bg-pink-600 px-4 py-1 w-full rounded-md text-white mb-4'
      >
        View More
      </button>
      {transactions.length > 0 && (
        <Fragment>
          {currentDayTransactionsExist && (
            <div className='flex items-center justify-between text-gray-500 text-sm font-medium '>
              <p>RECENT</p>
              <p>TODAY</p>
            </div>
          )}
          <div className='mt-2'>
            {transactions.map(({ _id, amount, createdAt, from, to }) => {
              const date = new Date(createdAt).getDate();
              const today = new Date().getDate();

              if (date === today) {
                if (!currentDayTransactionsExist)
                  setCurrentDayTransactionsExist(true);

                return (
                  <TransactionCard
                    amount={amount}
                    date={createdAt}
                    from={from}
                    to={to}
                    key={_id}
                  />
                );
              } else return null;
            })}
          </div>

          {olderTransactionsExist && (
            <div className='flex items-center justify-between text-gray-500 text-sm font-medium '>
              <p>OLDER TRANSACTIONS</p>
            </div>
          )}
          <div className='mt-2'>
            {transactions.map(({ _id, amount, createdAt, from, to }) => {
              const date = new Date(createdAt).getDate();
              const today = new Date().getDate();

              if (date !== today) {
                if (!olderTransactionsExist) setOlderTransactionsExist(true);
                return (
                  <TransactionCard
                    amount={amount}
                    date={createdAt}
                    to={to}
                    from={from}
                    key={_id}
                  />
                );
              } else return null;
            })}
          </div>
        </Fragment>
      )}
    </Container>
  );
}

export default Transactions;
