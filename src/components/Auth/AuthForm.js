import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { userLogin, userRegister, getUser } from '../../util/api';
import { toast } from 'react-toastify';

import AuthContext from '../../store/auth';
import classes from './AuthForm.module.css';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';



const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    setIsLoading(true);
    try {
      const data = await userLogin({
        email: formData.get('email').trim(),
        password: formData.get('password').trim(),
        returnSecureToken: true,
      });
      const userObj = await getUser(data.localId);
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.idToken, expirationTime.toISOString(), data, userObj.isAdmin, userObj.name);
      history.replace('/');
    } catch (err) {
      toast(err.message, {
        position: "bottom-center",
        autoClose: 3000,
        type: "error"
      });
    }
    setIsLoading(false);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fullName = formData.get('name').trim();

    setIsLoading(true);
    try {
      const data = await userRegister({
        name: fullName,
        email: formData.get('email').trim(),
        password: formData.get('password').trim(),
        confirmPassword: formData.get('confirmPassword').trim(),
        returnSecureToken: true,
      });
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.idToken, expirationTime.toISOString(), data, false, fullName);
      history.replace('/');
    } catch (err) {
      toast(err.message, {
        position: "bottom-center",
        autoClose: 3000,
        type: "error"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes['title-text']}>
        <div className={classes.title}>
          {isLogin ? 'Login' : 'Sign Up'}
        </div>
      </div>
      <div className={classes['form-container']}>
        <div className={classes['slide-controls']}>
          <label onClick={switchAuthModeHandler} className={`${classes.slide} ${classes.login} ${isLogin ? classes.selected : ''}`}>Login</label>
          <label onClick={switchAuthModeHandler} className={`${classes.slide} ${classes.signup} ${isLogin ? '' : classes.selected}`}>Signup</label>
          <div className={`${classes['slider-tab']} ${isLogin ? classes.login : classes.signup}`}></div>
        </div>
        <div className={classes['form-inner']}>
          {isLogin && <SignInForm
            onSignUpClick={switchAuthModeHandler}
            onSubmit={loginHandler}
            isLoading={isLoading}
          />}
          {!isLogin && <SignUpForm
            onSubmit={signUpHandler}
            isLoading={isLoading}
          />}
          
        </div>
      </div>
    </div>

  );
};

export default AuthForm;
