import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import {
  AppHeader,
  Modal,
  OrderInfo,
  ProtectedRoute,
  IngredientDetails
} from '@components';
import { useDispatch, useSelector } from '@store';
import { fetchIngredientsThunk } from '@slices/ingredients/ingredientsSlice';
import { getUserThunk } from '@slices/user/userSlice';
import { getOrdersState } from '@slices/orders/ordersSlice';

import styles from './app.module.css';
import '../../index.css';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const orderState = useSelector(getOrdersState);

  const backgroundLocation = location.state?.background;
  const orderTitle = orderState.isLoading
    ? ''
    : (orderState.orderByNumber?.number &&
        String(orderState.orderByNumber?.number)) ||
      '';

  useEffect(() => {
    dispatch(fetchIngredientsThunk());

    dispatch(getUserThunk());
  }, [dispatch]);

  const onCloseModal = () => {
    if (backgroundLocation) {
      navigation(backgroundLocation);
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route
            path=':number'
            element={
              <div className='pt-30'>
                <OrderInfo />
              </div>
            }
          />
        </Route>
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path=':number'
              element={
                <ProtectedRoute>
                  <div className='pt-30'>
                    <OrderInfo />
                  </div>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route
          path='/ingredients/:id'
          element={
            <div className='pt-30'>
              <IngredientDetails />
            </div>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={orderTitle} onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={orderTitle} onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
