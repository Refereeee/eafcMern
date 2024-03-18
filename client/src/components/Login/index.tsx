import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosMail } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import styles from './Login.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import {
  offLogModal, selectLog, setLoginSuccessToFalse,
} from '../../redux/slice/loginSLice';
import {
  authOptions, changeEyeValue, deleteLoginError, loginUser,
} from '../../redux/slice/authSlice';
import useInput from '../../hooks/useInput';

interface ChildProps {
  forwardRef: React.RefObject<HTMLFormElement>;
}

const Login: React.FC<ChildProps> = ({ forwardRef }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const {
    isAuth, passwordVisible, passwordType, loginError,
  } = useSelector(authOptions);

  const {
    headerImageFlagLogin,
    loginSuccess,
  } = useSelector(selectLog);

  const email = useInput('', {
    isEmpty: true,
    minLength: 3,
    maxLength: 32,
    isEmail: false,
  });
  const password = useInput('', {
    isEmpty: true,
    minLength: 3,
    maxLength: 32,
  });

  const clickLoginUser = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(loginUser({ email: email.value, password: password.value }));
  };

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        navigate('/');
        dispatch(setLoginSuccessToFalse());
      }, 1000);
    }
    if (loginError) {
      setTimeout(() => {
        console.log(loginError);
        dispatch(deleteLoginError());
        console.log(loginError);
      }, 2000);
    }
    if (isAuth) {
      setTimeout(() => {
        dispatch(offLogModal());
        navigate('/');
      }, 500);
    }
  }, [headerImageFlagLogin, loginSuccess, pathname, loginError, isAuth]);

  return (
    <form className={styles.formWrapper} ref={forwardRef}>
      <div>
        <h2 style={{ textAlign: 'center', color: 'black' }}>Sign In</h2>
      </div>
      <div className={styles.wrapper}>
        {isAuth && <div style={{ padding: '2rem', backgroundColor: 'green' }}>Авторизация успешна</div>}
        <div className={styles.forErrors}>
          {(email.isDirty && email.isEmpty)
            && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Поле не может быть пустым</div>}
          {(email.isDirty && email.minLengthError)
            && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Малое количество символов</div>}
          {(email.isDirty && email.maxLengthError)
            && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Поле не должно превышать 32 символа</div>}
          {(email.isDirty && email.emailError)
            && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Не валидный Email</div>}
          {loginError && <div style={{ color: 'red', whiteSpace: 'nowrap', textAlign: 'center' }}>Incorrect login or password</div>}
        </div>
        <label htmlFor="log" className={styles.labelLogin}>
          <input
            className={styles.input}
            placeholder="Email"
            value={email.value}
            id="regLogin"
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            name="log"
          />
          <div className={styles.icon}>
            <IoIosMail style={{ fill: 'darkcyan' }} size="20px" />
          </div>
        </label>
        <div className={styles.forErrorsPassword}>
          {(password.isDirty && password.isEmpty)
            && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Поле не может быть пустым</div>}
          {(password.isDirty && password.minLengthError)
            && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Малое количество символов</div>}
          {(password.isDirty && password.maxLengthError)
            && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Поле не должно превышать 32 символа</div>}
        </div>
        <label htmlFor="pass" className={styles.labelLogin}>
          <input
            className={styles.input}
            onBlur={(e) => password.onBlur(e)}
            value={password.value}
            type={passwordType ? 'password' : 'text'}
            onChange={(e) => password.onChange(e)}
            placeholder="Password"
            id="regPass"
            name="pass"
          />
          <div className={styles.icon}>
            <RiLockPasswordFill style={{ fill: 'darkcyan' }} size="20px" />
          </div>
          <div className={styles.iconEye}>
            {passwordVisible
              ? <FaRegEyeSlash style={{ fill: 'darkcyan' }} size="20px" onClick={() => dispatch(changeEyeValue(false))} />
              : <FaRegEye style={{ fill: 'darkcyan' }} size="20px" onClick={() => dispatch(changeEyeValue(true))} />}
          </div>
        </label>
        <input
          className={!email.inputValid || !password.inputValid ? styles.btnDisabled : styles.btn}
          type="submit"
          value="Sign In"
          disabled={!email.inputValid || !password.inputValid}
          onClick={clickLoginUser}
        />
      </div>
    </form>
  );
};

export default Login;
