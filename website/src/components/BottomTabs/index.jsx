import React from 'react';
import {
  HomeIcon,
  SwitchHorizontalIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/solid';

import Container from '../Container';
import TabIcon from './TabIcon';
import { ROUTES } from '../../constants';

function BottomTabs() {
  return (
    <Container className='bottom-0 left-0 w-full fixed px-4 py-1 border-t bg-white'>
      <div className='max-w-lg mx-auto flex items-center justify-evenly'>
        <TabIcon
          name='Home'
          route={ROUTES.home}
          icon={<HomeIcon height={22} />}
        />
        <TabIcon
          name='Send Money'
          route={ROUTES.transactions}
          icon={<SwitchHorizontalIcon height={22} />}
        />
        <TabIcon
          name='Transactions'
          route={ROUTES.all_transactions}
          icon={<SpeakerphoneIcon height={20} />}
        />
      </div>
    </Container>
  );
}

export default BottomTabs;
