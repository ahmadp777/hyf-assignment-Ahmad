import { useLocation } from "react-router-dom";
import styles from './Footer.module.css';
import { Link } from "react-router-dom";
import { SocialMediaItem } from './SocialMediaItem.jsx';

export const Footer = () => {
  const { pathname } = useLocation();
  const pageLinks = [
    {title: 'Home', link: '/'},
    {title: 'About Us', link: '/about_us'},
    {title: 'Destination', link: '/destination'},
    {title: 'NASA Collaboration', link: '/nasa_collaboration'},
  ];
  const socialMediaItems = [
    { title: 'Facebook', url: 'https://facebook.com', icon: '/socialmedia/facebook.png' },
    { title: 'Instagram', url: 'https://instagram.com', icon: '/socialmedia/instagram.png' },
    { title: 'Tiktok', url: 'https://tiktok.com', icon: '/socialmedia/tiktok.png' },
    { title: 'Google', url: 'https://google.com', icon: '/socialmedia/google.png' },
    { title: 'LinkedIn', url: 'https://linkedin.com', icon: '/socialmedia/linkedin.png' },
  ];

  return (
    <footer className={pathname !== "/" ? styles.footer : styles.hidden}>
      <div className={styles.footerDescription}>
        <h3>Galactica</h3>
        <p>Explore the universe and beyond. Your journey to the stars starts here.</p>
        <p>&copy; 2024 Galactica. All rights reserved.</p>
      </div>
      
      <div className={styles.pages}>
        <h3>Pages</h3>
        <ul className={styles.pagesList}>
          {pageLinks.map((page) => (
            <li key={page.link}>
              <Link to={page.link}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className={styles.footerLinks}>
        <h3>Follow us</h3>
        <ul className={styles.footerList}>
          {socialMediaItems.map((item) => (
            <SocialMediaItem
              key={item.title}
              title={item.title}
              url={item.url}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>
    </footer>
  );
}
