import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../Header/Header.module.scss';
import { cartFlagToFalse, selectCart } from '../../redux/slice/cartSlice';
import CartClose from '../../assets/cart/cartClose';
import { useAppDispatch } from '../../redux/hooks';
import CartItem from '../CartItem';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, subtotal } = useSelector(selectCart);
  const cartsRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [bottomScrollPosition, setBottomScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    const position = cartsRef.current?.scrollTop;
    if (cartsRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = cartsRef.current;
      const bottom = scrollHeight - scrollTop - clientHeight;
      setBottomScrollPosition(bottom);
    }
    if (position !== undefined) {
      setScrollPosition(position);
    }
  };

  useEffect(() => {
    if (cartsRef.current) {
      cartsRef.current.addEventListener('scroll', handleScroll);
      return () => {
        cartsRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, [cartsRef.current]);

  return (
    <>
      <div className={styles.headerWrapper}>
        <span className={styles.headerText}>
          Shopping Cart
          {items?.length ? `(${items.length} items)` : ''}
        </span>
        <span className={styles.closeIcon} onClick={() => dispatch(cartFlagToFalse())}>
          <CartClose />
        </span>
      </div>

      {
        !items?.length ? (
          <div className={styles.main}>
            <div className={styles.info}>
              <div>
                <span className={styles.infoHead}>Your shopping cart is empty</span>
                <span
                  className={styles.infoDesc}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't wait, let's get shopping and find your next deal today!
                </span>
                <div className={styles.buttons}>
                  <button className={styles.offCart} onClick={() => dispatch(cartFlagToFalse())}>
                    Start shopping
                  </button>
                  <Link to="/register" className={styles.register} onClick={() => dispatch(cartFlagToFalse())}>
                    <h5 style={{ color: 'white' }}>Sign up</h5>
                    <FaUserPlus color="white" size="1.5rem" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.cartsWrapper}>
              <div className={scrollPosition === 0 ? styles.shadowHidden : styles.shadowAbove} />
              <div className={bottomScrollPosition === 0 ? styles.shadowHidden : styles.shadowBelow} />
              <div className={styles.cartsItems} ref={cartsRef}>
                {items.map((item) => (
                  <div className={styles.cartBox}>
                    <CartItem key={item.id} {...item} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.cartTotal}>
              <div className={styles.subTotal}>
                <span>Subtotal</span>
                <span>{`$${subtotal}`}</span>
              </div>
              <div className={styles.buttonForPayWrapper}>
                <button className={styles.buttonForPay}>Secure Checkout</button>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default Cart;
