import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { checkUserSession } from './redux-toolkit/user/userSlice';

import RouteCheck from './routes/RouteCheck';

import Header from './components/Header'
import CollectionsOverview from './components/Shop/CollectionsOverview';
import Collection from './components/Shop/Collection'
import Home from './components/Home';
import Shop from './components/Shop';
import Checkout from './components/Checkout';

const App = (props) => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} index />
        <Route path='/shop' element={<Shop />} >
          <Route path='/shop' element={<CollectionsOverview />} />
          <Route path='/shop/:category' element={<Collection />} />
        </Route>
        <Route path='/auth' element={<RouteCheck comp='auth' user={user.currentUser} />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
