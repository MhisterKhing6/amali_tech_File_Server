import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RegisterCustomerPage } from './pages/registerCustomerPage';
import { VerifyEmailPage } from './pages/verifyEmailPage';
import { CongratulationsPage } from './pages/congratualtionsPages';
import { LoginCustomerPage } from './pages/loginCustomerPage';
import { ForgetPasswordRequestPage } from './pages/forgetPasswordRequestPage';
import { NewPassworPage } from './pages/NewPasswordPage';
import { NewPwdCongratulationsPage } from './pages/newPwdCongratulations';

function App() {
  return (
    <Routes>
      <Route path='/auth/register/customer' element={<RegisterCustomerPage />} />
      <Route path='/auth/verify/customer' element={<VerifyEmailPage/>} />
      <Route path='/auth/customer/account/congratulations' element={<CongratulationsPage/>} />
      <Route path='/auth/login/customer' element={<LoginCustomerPage/>} />
      <Route path='/customer/feed' element={<p>Customer Feed page</p>} />
      <Route path='/user/request/password-reset' element={<ForgetPasswordRequestPage />} />
      <Route path='/user/reset-password/verificationCode' element = {<div><VerifyEmailPage/></div>} />
      <Route path='/auth/user/update-password' element={<NewPassworPage />} />
      <Route path='/user/congratulations/new-password' element={<NewPwdCongratulationsPage />} />
    </Routes>
  );
}

export default App;
