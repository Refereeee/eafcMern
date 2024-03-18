import React from 'react';
import logo from '../../assets/logo.png';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={logo} alt="logo" className={styles.logo} />
        <span className={styles.text}>
          © Ea FC boost 2023. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
