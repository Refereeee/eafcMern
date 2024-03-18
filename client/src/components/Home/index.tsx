import { useSelector } from 'react-redux';
import 'swiper/scss';
import 'swiper/scss/scrollbar';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { useRef } from 'react';
import styles from './Home.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { changeShowAll, homeOptions } from '../../redux/slice/homeSlice';

import { HomeAllLinks, LinkSwiper } from './HomeSwiper';
// import { authOptions } from '../../redux/slice/authSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  // const {
  //   isAuth,
  // } = useSelector(authOptions);

  const {
    showAll,
    objectBenefitItems,
  } = useSelector(homeOptions);

  const slide = useRef<HTMLDivElement>(null);
  const changeShowAllImages = () => {
    dispatch(changeShowAll(true));
  };

  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.mainPage}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>FIFA 23 Boost</h1>
        </div>
        <div className={styles.description}>
          <p className={styles.descriptionContent}>
            <span className={styles.descriptionText}>
              Buy FIFA boost services from FifaBoosting.
              Get exclusive boosting done by professional FIFA players with years of experience.
            </span>
            <span className={styles.descriptionText}>
              Get wins in FUT Champions mode, boost yourDivision Rivals
              rank and get many more other services for a cheap price.
            </span>
            <span className={styles.descriptionText}>Get all youneed for comfortable yet effective gaming with FifaBoosting boost services.</span>
          </p>
        </div>
        <div>
          <div className={styles.changeImages}>
            <div
              className={showAll ? styles.hiddenItem : styles.swiperAllGames}
              onClick={() => changeShowAllImages()}
            >
              Show All
            </div>

          </div>
          <div
            className={showAll ? styles.showAll : styles.swiperBlocks}
            ref={slide}
          >
            <div className={showAll ? styles.showAll : styles.swiperBlocks}>
              {showAll ? <HomeAllLinks /> : <LinkSwiper />}
            </div>
          </div>
        </div>
        <div className={styles.benefitBlocks}>
          {
            objectBenefitItems.map(({
              id,
              img,
              heading,
              text,
              alt,
            }) => (
              <div key={id} className={styles.benefitBlockWrapper}>
                <div className={styles.benefitBlock}>
                  <div>
                    <img src={img} alt={alt} />
                  </div>
                  <h4 className={styles.benefitHeading}>{heading}</h4>
                  <span className={styles.benefitText}>{text}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>

  );
};

export default Home;
