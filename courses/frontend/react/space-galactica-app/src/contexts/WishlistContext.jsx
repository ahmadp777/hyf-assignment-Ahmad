import { createContext, useContext } from "react";
import { useState, useMemo } from "react";

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [planetsWishlist, setPlanetsWishlist] = useState([]);

  const addPlanetToWishlist = (name, thumbnail) => {
    setPlanetsWishlist((currentWishlist) => {
        const alreadyInWishlist = currentWishlist.some((planet) =>
            planet.thumbnail === thumbnail ||
            planet.name.toLowerCase() === name.toLowerCase()
        );
        if (alreadyInWishlist) {
            return currentWishlist;
        }
        return [...currentWishlist, { name, thumbnail }];
    });
  };    

  const removePlanetFromWishlist = (name) => {
    setPlanetsWishlist((currentWishlist) =>
      currentWishlist.filter((planet) => planet.name !== name)
    );
  };

  const isPlanetInWishlist = (name) => {
    return planetsWishlist.some(
      (planet) => planet.name.toLowerCase() === name.toLowerCase()
    );
  };

    const wishlistCount = planetsWishlist.length;

    const contextValue = useMemo(() => ({
      planetsWishlist,
      addPlanetToWishlist,
      removePlanetFromWishlist,
      isPlanetInWishlist,
      wishlistCount,
    }), [planetsWishlist]);

    return (
      <WishlistContext.Provider value={contextValue}>
        {children}
      </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};  