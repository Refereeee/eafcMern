import React, {
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import styles from './Register.module.scss';
import { useAppDispatch } from '../../redux/hooks';

import {
  noticeFlagToOff, selectReg,
} from '../../redux/slice/registerSlice';
import {
  authOptions, changeEyeValue, createUser, deleteRegisterError,
} from '../../redux/slice/authSlice';
import useInput from '../../hooks/useInput';

interface ChildProps {
  forwardedRef: React.RefObject<HTMLFormElement>;
}

const Register: React.FC<ChildProps> = ({ forwardedRef }) => {
  const dispatch = useAppDispatch();

  const {
    isAuth, passwordVisible, passwordType, registerError,
  } = useSelector(authOptions);

  const {
    registerFlag,
    noticeFlag,
    headerImageFlagReg,
  } = useSelector(selectReg);

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
  const navigate = useNavigate();

  const clickCreateUser = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(createUser({ email: email.value, password: password.value }));
  };

  useEffect(() => {
    if (registerError) {
      setTimeout(() => {
        dispatch(deleteRegisterError());
      }, 2000);
    }
    if (noticeFlag) {
      setTimeout(() => {
        dispatch(noticeFlagToOff());
      }, 3000);
    }
    if (isAuth) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [registerFlag, noticeFlag, headerImageFlagReg, isAuth, registerError]);

  return (
    <form className={styles.formWrapper} ref={forwardedRef}>
      <div>
        <h2 style={{ textAlign: 'center', color: 'black' }}>Sign Up</h2>
      </div>
      <div className={styles.wrapper}>
        {isAuth
                    && (
                    <div style={{ padding: '2rem', backgroundColor: 'green', borderRadius: '50%' }}>
                      регистрация
                      успешна
                    </div>
                    )}
        {noticeFlag && (
        <div style={{
          padding: '2rem',
          backgroundColor: 'red',
          borderRadius: '50px',
          width: '300px',
          paddingRight: '2rem',
        }}
        >
          Такой пользователь уже существует
        </div>
        )}
        <div className={styles.forErrors}>
          {registerError && <div style={{ color: 'red', whiteSpace: 'nowrap', textAlign: 'center' }}>This user already exists</div>}
          {(email.isDirty && email.isEmpty) && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Поле не может быть пустым</div>}
          {(email.isDirty && email.minLengthError) && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Малое количество символов</div>}
          {(email.isDirty && email.maxLengthError) && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Поле не должно превышать 32 символа</div>}
          {(email.isDirty && email.emailError) && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Не валидный Email</div>}
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
          {(password.isDirty && password.isEmpty) && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Поле не может быть пустым</div>}
          {(password.isDirty && password.minLengthError) && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Малое количество символов</div>}
          {(password.isDirty && password.maxLengthError) && <div style={{ color: 'red', whiteSpace: 'nowrap' }}>Поле не должно превышать 32 символа</div>}
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
          value="Sign Up"
          disabled={!email.inputValid || !password.inputValid}
          onClick={clickCreateUser}
        />
      </div>
    </form>
  );
};

export default Register;
