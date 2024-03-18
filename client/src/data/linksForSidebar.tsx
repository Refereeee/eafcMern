import { GiCagedBall, GiThunderball } from 'react-icons/gi';
import { SiFifa } from 'react-icons/si';

const objectForLinks = [
  {
    id: 1,
    img: <GiCagedBall />,
    linkName: 'Fut Champions PlayOffs',
    linkTo: '/fut-champions-playoffs',
  },
  {
    id: 2,
    img: <GiThunderball />,
    linkName: 'Fut Champions Finals',
    linkTo: '/fut-champions-finals',
  },
  {
    id: 3,
    img: <SiFifa />,
    linkName: 'Division Rivals',
    linkTo: '/divisions',
  },
  {
    id: 4,
    img: <GiThunderball />,
    linkName: 'Tasks',
    linkTo: '/tasks',
  },

  {
    id: 5,
    img: <GiThunderball />,
    linkName: 'Draft',
    linkTo: '/draft',
  },
  {
    id: 6,
    img: <GiThunderball />,
    linkName: 'Squad Battles',
    linkTo: '/squad',
  },
];

export default objectForLinks;
