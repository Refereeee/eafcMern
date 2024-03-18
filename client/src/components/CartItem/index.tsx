import React, { FC } from 'react';
import { BiTime } from 'react-icons/bi';
import { GiTrashCan } from 'react-icons/gi';
import ObjCartTypes from '../../types/cartTypes';
import styles from './CartItem.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { removeItem } from '../../redux/slice/cartSlice';

const CartItem:FC<ObjCartTypes> = ({
  price, image, platform, streamBoolean, text, id,
}) => {
  const dispatch = useAppDispatch();
  const onClickRemoveItem = () => {
    window.confirm('Are you sure you want to remove?');
    dispatch(removeItem(id));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.cartItem}>
        <div className={styles.cartBox}>
          <div className={styles.info}>
            <div className={styles.imgWrapper}><img className={styles.img} src={image} alt={platform} /></div>
            <div className={styles.description}>
              <span className={styles.mode}>{text}</span>
              <span className={styles.platform}>{platform.toUpperCase()}</span>
              <span className={styles.streamBool}>
                {streamBoolean ? (
                  <span> • With Stream</span>
                ) : ''}
              </span>
              <span className={styles.deliveryTime}>
                <BiTime />
                {' '}
                Delivery time: 3 hours
              </span>
            </div>
          </div>
          <div className={styles.price}>
            <span>{price}</span>
            <span className={styles.remove} onClick={onClickRemoveItem}>
              <GiTrashCan size="1.2rem" />
              <span className={styles.removeText}>Remove</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
