import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  lazy,
  Suspense,
} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Nav from '../components/Nav';
import BottomTabs from '../components/BottomTabs';
import Container from '../components/Container';

import { ROUTES } from '../constants';
import { userContext } from '../context/user';
import { User } from '../apis/authentication';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const Home = lazy(() => import('./Home'));
const Transactions = lazy(() => import('./Transactions'));
const AllTransactions = lazy(() => import('./AllTransactions'));

function App() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(userContext);

  const getUser = useCallback(async () => {
    try {
      const user = await User();
      setLoading(false);
      if (user.message) {
        setUser(null);
        return;
      }
      setUser(user);
    } catch (error) {
      localStorage.removeItem('token');
    }
  }, [setUser]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user && token) {
      getUser();
      return;
    }
    setLoading(false);
  }, [getUser, user]);

  if (loading) {
    return (
      <Container className='flex items-center justify-center h-screen'>
        <div className='p-2 rounded-full border-2 border-blue-600 border-t-0 animate-spin'></div>
      </Container>
    );
  }

  return (
    <div className='bg-white max-w-lg mx-auto '>
      {user && (
        <Container className='h-screen'>
          <Nav />
          <Switch>
            <Suspense fallback={<div></div>}>
              <Route exact path={ROUTES.home} component={Home} />
              <Route
                exact
                path={ROUTES.all_transactions}
                component={AllTransactions}
              />
              <Route
                exact
                path={ROUTES.transactions}
                component={Transactions}
              />
              <Redirect to={ROUTES.home} />
            </Suspense>
          </Switch>
          <BottomTabs />
        </Container>
      )}

      {!user && (
        <Container>
          <Switch>
            <Suspense fallback={<div></div>}>
              <Route exact path={ROUTES.login} component={Login} />
              <Route exact path={ROUTES.register} component={Register} />
              <Redirect to={ROUTES.login} />
            </Suspense>
          </Switch>
        </Container>
      )}
    </div>
  );
}

export default App;
