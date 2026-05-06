import { useState } from 'react';
import styles from './DestinationPage.module.css';


export const PlanetsWishlistItem = ({ name, thumbnail, onRemove }) => {
  return (
    <div className={styles.wishlistItem}>
      <img className={styles.wishlistItemThumbnail} src={thumbnail} alt="" />
      <b>{name.toUpperCase()}</b>
      <button onClick={onRemove}>remove</button>
    </div>
  );
};

export const AddWishlistItem = ({
  onAddWishlistItem,
}) => {
  const [thumbnail, setThumbnail] = useState('/destination/image-europa.png');
  const [customWishlist, setCustomWishlist] = useState('');

  const namesByThumbnail = {
    '/destination/image-europa.png': 'Europa',
    '/destination/image-mars.png': 'Mars',
    '/destination/image-moon.png': 'Moon',
    '/destination/image-titan.png': 'Titan',
  };

  const onAddItemPressed = () => {
    const normalizedName = customWishlist.trim() || namesByThumbnail[thumbnail] || 'CUSTOM PLANET';
    onAddWishlistItem(normalizedName, thumbnail);
    setCustomWishlist('');
  }

  return (
    <div className={styles.addWishlistItem}>
      <p>Add custom planet to wishlist</p>
      <label htmlFor="customWishlist">Wishlist item name</label>
      <input
        id="customWishlist"
        type="text"
        value={customWishlist}
        onChange={(e) => setCustomWishlist(e.target.value)}
      />
      <label htmlFor="customWishlistThumbnail">Wishlist item thumbnail</label>
      <select
        id="customWishlistThumbnail"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      >
        <option value="/destination/image-europa.png">EUROPA</option>
        <option value="/destination/image-mars.png">MARS</option>
        <option value="/destination/image-moon.png">MOON</option>
        <option value="/destination/image-titan.png">TITAN</option>
      </select>
      <button onClick={onAddItemPressed}>ADD CUSTOM</button>
    </div>
  );
};
