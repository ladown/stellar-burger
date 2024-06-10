import { Route, Routes } from 'react-router-dom';

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

import '../../index.css';
import styles from './app.module.css';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route
        path='/login'
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route path='/feed'>
        <Route index element={<Feed />} />
        <Route
          path=':number'
          element={
            <Modal
              title='OrderInfo'
              onClose={() => {
                console.log('Close OrderInfo');
              }}
            >
              <OrderInfo />
            </Modal>
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
                <Modal
                  title='OrderInfo'
                  onClose={() => {
                    console.log('Close OrderInfo');
                  }}
                >
                  <IngredientDetails />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title='Детали ингредиента'
            onClose={() => {
              console.log('Close Детали ингредиента');
            }}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
