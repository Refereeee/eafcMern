import React, { useEffect, useRef, useState } from 'react';
import { BsCartFill, BsFillCartFill } from 'react-icons/bs';
import { CgLogIn } from 'react-icons/cg';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import {
  changeBurgerOpenFlag,
  changeImageFlagTrue,
  onLogModal,
  selectLog,
  setProfileModal,
} from '../../redux/slice/loginSLice';
import styles from './Header.module.scss';
import logo from '../../assets/logo.png';
import { useAppDispatch } from '../../redux/hooks';
import { BurgerIcon, CloseIcon, LittleIcon, ProfileIcon, } from '../../assets/home/svgs/littleIcon';
import { objectForLinks } from '../../data/homeData';
import image from '../../assets/header/user.jpg';
import { authOptions, logout, refresh } from '../../redux/slice/authSlice';
import { cartFlagToFalse, cartFlagToOpen, selectCart } from '../../redux/slice/cartSlice';
import Cart from '../Cart/Cart';
import { onRegModal, selectReg } from '../../redux/slice/registerSlice';

const Header = () => {
  const cartBlock = useRef<HTMLDivElement| null>(null);
  const linkCart = useRef<HTMLButtonElement| null>(null);
  const dispatch = useAppDispatch();
  const {
    imageFlag,
  } = useSelector(authOptions);

  const {
    loadingImgFlag,
    currentUserFind,
    burgerOpen,
    logModal,
    profileModal
  } = useSelector(selectLog);

  const {
    regModal,
  } = useSelector(selectReg);

  const {
    cartFlag,
    totalCount,
  } = useSelector(selectCart);

  const { isAuth } = useSelector(authOptions);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const onBurgerOpenFlag = (act: boolean) => {
    dispatch(changeBurgerOpenFlag(act));
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(refresh());
    }
  }, []);

  useEffect(() => {
    if (image) dispatch(changeImageFlagTrue());
    if (burgerOpen || cartFlag || profileModal) {
      document.body.classList.add('overflowOff');
    }
    if ((windowWidth >= 768 || (windowWidth >= 320 && windowWidth <= 768)) && !burgerOpen && !cartFlag && !profileModal) {
      document.body.classList.remove('overflowOff');
    }
    if (windowWidth >= 1200 && burgerOpen) onBurgerOpenFlag(false);
    if (windowWidth >= 1200 && profileModal) dispatch(setProfileModal());
  }, [image, burgerOpen, windowWidth, cartFlag, profileModal]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClickLogOut = () => {
    dispatch(logout());
  };

  // const { pathname } = useLocation();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartBlock.current && !cartBlock.current.contains(event.target as Node) && !linkCart.current?.contains(event.target as Node)) {
        if (cartFlag) dispatch(cartFlagToFalse());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartFlag]);

  return (
    <>
      <div className={styles.adaptive}>
        <div className={burgerOpen ? styles.modalBurger : styles.displayNone}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIcon}><LittleIcon /></div>
            <div className={styles.closeIcon} onClick={() => onBurgerOpenFlag(false)}>
              <CloseIcon />
            </div>
          </div>
          <div className={styles.burgerMenu}>
            {
               objectForLinks.map(({
                 linkName,
                 id,
                 linkTo,
               }) => {
                 return (
                   <div className={styles.burgerMenuBlock} key={id}>
                     <Link
                       to={linkTo}
                       className={styles.burgerMenuLink}
                       onClick={() => onBurgerOpenFlag(false)}
                     >
                       {' '}
                       {linkName}
                       {' '}
                     </Link>
                   </div>
                 );
               })
                      }
          </div>
        </div>
        <button
          className={styles.burgerIcon}
          onClick={() => onBurgerOpenFlag(true)}
          aria-label="burger"
        >
          <BurgerIcon />
        </button>
        <div className={styles.mainIconSmall}><Link to="/"><LittleIcon/></Link></div>
        <div className={styles.wrapperBurgerIcons}>
          <div className={styles.cartBurger}
               onClick={() => (!cartFlag ? dispatch(cartFlagToOpen()) : dispatch(cartFlagToFalse()))}>
            <BsFillCartFill size={24}/>
          </div>
          <div className={styles.iconProfile} onClick={() => dispatch(setProfileModal())}>
            <ProfileIcon/>
          </div>
          <div className={profileModal ? styles.profileResponsive : styles.profileResponsiveNone}>
            <div className={styles.profileCloseIcon} onClick={() => dispatch(setProfileModal())}>
              <CloseIcon/>
            </div>
            <div className={styles.profileWindow}>
              <div className={styles.profileInfo}>
                <img src={image} className={styles.profileImg} alt="loginImg"/>
                <span>Nickname</span>
              </div>
              <div className={styles.profileButtons}>
                <button className={styles.profileButtonsSignIn} onClick={() => dispatch(onLogModal())} disabled={!!logModal}>Log In</button>
                <button className={styles.profileButtonsSignUp} onClick={() => dispatch(onRegModal())} disabled={!!regModal}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.root}>
        <div className={styles.imgWrapper}>
          <Link to="/">
            <img src={logo} className={styles.img} alt="mainLogo" />
          </Link>
        </div>

        <div className={styles.tabs}>
          <button className="linkCart" onClick={() => (!cartFlag ? dispatch(cartFlagToOpen()) : dispatch(cartFlagToFalse()))} ref={linkCart}>
            <span className={styles.cart}>
              <BsCartFill style={{ color: 'white' }} size="2rem" />
              <span className={styles.cartSpan}>{totalCount}</span>
            </span>
          </button>
          { !isAuth ? (
            <div className={styles.authorize}>
              <button className={styles.login} onClick={() => dispatch(onLogModal())} disabled={!!logModal}>
                <h5 style={{ color: 'white' }}>Sign in</h5>
                <CgLogIn color="white" size="1.5rem" />
              </button>
              <button className={styles.registerHead} onClick={() => dispatch(onRegModal())} disabled={!!regModal}>
                <h5 style={{ color: 'white' }}>Sign up</h5>
                <FaUserPlus color="white" size="1.5rem" />
              </button>
            </div>
          ) : null}
          {loadingImgFlag ? <span>Загрузка...</span>
            : (imageFlag) && (
            <div style={{ position: 'relative' }}>
              <img src={image} className={styles.imgLogin} alt="loginImg" />
              <span className={styles.loginName}>{currentUserFind}</span>
              <FiLogOut className={styles.loginOut} size="2rem" onClick={onClickLogOut} />
            </div>
            )}
        </div>
      </div>
      <div className={cartFlag ? styles.modalCartOn : styles.modalCart} />
      <div className={cartFlag ? `${styles.cartWrapperOn} ${styles.cartWrapperTransitionOn} ` : `${styles.cartWrapper} ${styles.cartWrapperTransitionOff}`}>
        <div className={styles.rootCart} ref={cartBlock}>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default Header;

