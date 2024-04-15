/* eslint-disable react/jsx-props-no-spreading */
import { Navigation, Pagination } from 'swiper';
import 'swiper/scss/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import styles from './Home.module.scss';
import { homeOptions } from '../../redux/slice/homeSlice';
import { ObjLinksType } from '../../types/homeDataTypes';
import { useEffect, useState } from 'react';

const MainLink = ({
  id, img, linkName, linkTo, price, firstLine, boughtLine,
} :ObjLinksType) => {
  return (
    <Link to={linkTo} className={styles.swiperBlock} key={id}>
      <div>
        <img className={styles.swiperImage} alt={linkName} src={img} />
        <div className={styles.swiperContent}>
          <ul className={styles.swiperDescription}>
            <li className={styles.swiperName}>{linkName}</li>
            <li className={styles.swiperFirst}>{firstLine}</li>
            <li className={styles.swiperBought}>{boughtLine}</li>
          </ul>
          <div className={styles.swiperSubDescription}>
            <button className={styles.subDescriptionButton}>
              <Link
                to={linkTo}
                className={styles.subDescriptionButtonLink}
              >
                <BiRightArrowAlt
                  style={{
                    height: '20px',
                    width: '24px',
                  }}
                />
              </Link>
            </button>
            <span className={styles.swiperPrice}>{price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const LinkSwiper = () => {
  const {
    objectLinks,
  } = useSelector(homeOptions);

  const [slidesCount, setSlidesCount] = useState(3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(()=>{
    if(windowWidth < 960){
      setSlidesCount(2)
    }
    if(windowWidth < 600){
      setSlidesCount(1)
    }
    if(windowWidth > 960){
      setSlidesCount(3)
    }
  },[windowWidth,slidesCount])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Swiper
      slidesPerView={slidesCount}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {
        objectLinks.map((objectLink) => (
          <SwiperSlide>
            <MainLink {...objectLink} />
          </SwiperSlide>
        ))
      }
      {/* <div className="swiper-button-next">next</div> */}
    </Swiper>
  );
};

export const HomeAllLinks = () => {
  const {
    objectLinks,
  } = useSelector(homeOptions);

  return (
    <>
      {
        objectLinks
          .map((objectLink) => (
            <MainLink {...objectLink} />
          ))
      }
    </>
  );
};
