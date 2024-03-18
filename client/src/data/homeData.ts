import firstImg from '../assets/home/slider-images/first.jpg';
import boughtImg from '../assets/home/slider-images/bought.jpg';
import thirdImg from '../assets/home/slider-images/third.jpg';
import fourthImg from '../assets/home/slider-images/four.jpg';
import fiveImg from '../assets/home/slider-images/five.jpg';
import sixImg from '../assets/home/slider-images/six.jpg';
import benefitFirstSvg from '../assets/home/svgs/firstBenefit.svg';
import benefitBoughtSvg from '../assets/home/svgs/benefitBought.svg';
import benefitThirdSvg from '../assets/home/svgs/benefitThird.svg';

export const objectForLinks = [
  {
    id: 1,
    img: firstImg,
    linkName: 'Fut Champions Playoffs',
    linkTo: '/fut-champions-playoffs',
    price: 'From $3.00',
    firstLine: 'Get any number of wins in Index',
    boughtLine: 'Get FUT Champions rewards',
  },
  {
    id: 2,
    img: boughtImg,
    linkName: 'Fut Champions finals',
    linkTo: '/fut-champions-finals',
    price: 'From $3.00',
    firstLine: 'Get any number of wins in Index',
    boughtLine: 'Unlock FUT Champions rewards',
  },
  {
    id: 3,
    img: thirdImg,
    linkName: 'Division Rivals',
    linkTo: '/divisions',
    price: 'From $3.00',
    firstLine: 'Get desired rank with ease',
    boughtLine: 'Obtain unique rewards',
  },
  {
    id: 4,
    img: fourthImg,
    linkName: 'Squad Battles',
    linkTo: '/squad-battles',
    price: 'From $3.00',
    firstLine: '4 daily wins',
    boughtLine: 'Gold and players as rewards',
  },
  {
    id: 5,
    img: fiveImg,
    linkName: 'Draft',
    linkTo: '/draft',
    price: 'From $3.00',
    firstLine: 'Get desired rank with ease',
    boughtLine: 'Obtain unique rewards',
  },
  {
    id: 6,
    img: sixImg,
    linkName: 'Tasks',
    linkTo: '/tasks',
    price: 'From $3.00',
    firstLine: 'Get another task with ease',
    boughtLine: 'Obtain rewards',
  },
];

export const objectForBenefitItems = [
  {
    id: 1,
    img: benefitFirstSvg,
    alt: 'one',
    heading: 'Best value for your money',
    text: 'We carefully monitor the market every day to get you the best deals from the top level professional suppliers',
  },
  {
    id: 2,
    img: benefitBoughtSvg,
    alt: 'bought',
    heading: '100% Moneyback Guarantee',
    text: 'Our deals protection guarantees that you you will get the currency, item, service you paid for or your money back!',
  },
  {
    id: 3,
    alt: 'third',
    img: benefitThirdSvg,
    heading: 'One-stop shop for all your gaming needs',
    text: 'Whether you seek top quality services or to bargain with sellers on the marketplace - we got you covered',
  },
];
