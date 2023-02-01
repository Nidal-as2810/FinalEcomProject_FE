import { useContext } from "react";
import FavouritesContext from "../context/AuthProvider";

const useFavourites = () => {
  return useContext(FavouritesContext);
};

export default useFavourites;
