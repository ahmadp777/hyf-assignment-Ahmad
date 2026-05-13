
import classNames from 'classnames';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Planet } from '../icons/Planet';
import { Badge } from './Badge';
import { NavItem } from './NavItem';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import styles from './Navbar.module.css';

const navbarItems = [
  {
    title: 'ABOUT US',
    link: '/about_us',
  },
  {
    title: 'DESTINATION',
    link: '/destination',
  },
  {
    title: 'NASA COLLABORATION',
    link: '/nasa_collaboration',
  }
];

export const Navbar = () => {
  const currentPath = useLocation().pathname;
  const { wishlistCount } = useWishlist();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.navbarLogo}>
        <a href="/"><img src="/shared/logo.svg" alt="" /> GALACTICA</a>
      </div>
      <div className={styles.decorativeLine} />
      <nav className={styles.navbar}>
        <div className={styles.navbarBG} />
        <ul className={styles.navbarList}>
          {navbarItems.map((item) => (
            <NavItem
              key={item.link}
              title={item.title}
              link={item.link}
              isActive={item.link === currentPath}
            />
          ))}
          <li className={styles.wishlistBadge} aria-label="Wishlist">
          </li>
        </ul>
        <Badge count={wishlistCount}>
          <Planet color="white"  />
        </Badge>
      </nav>
    </header>
  );
}