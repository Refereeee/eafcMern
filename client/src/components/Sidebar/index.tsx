import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import objectForLinks from '../../data/linksForSidebar';

const Sidebar = () => {
  const location = useLocation();
  const clickActive = () => {
    // dispatch(changeIsActive(true));
    console.log('123');
  };

  return (
    <div className={styles.sidebarWrapper}>

      <div className={styles.nav}>
        <div>
          <h3 className={styles.heading}>Boost</h3>
          <ul className={styles.listLinks}>
            {objectForLinks.map(({
              img, linkName, linkTo, id,
            }) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={id}
                onClick={() => clickActive()}
              >
                <NavLink
                  to={linkTo}
                  className={location.pathname === linkTo ? styles.activate : styles.weekend}
                >
                  <span className={styles.changeColor}>{img}</span>
                  <span className={styles.changeColorSpan}>{linkName}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
