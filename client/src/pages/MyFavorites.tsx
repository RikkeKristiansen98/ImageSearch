import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const MyFavorites = () => {
  const { user } = useAuth0();
  const [favoriteImages, setFavoriteImages] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !user.sub) return;

    const userId = user.sub; 
    const url = `http://localhost:3001/user-data/${userId}/favorites`;

    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get(url);
        setFavoriteImages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error getting favorites:", error);
      }
    };

    fetchUserFavorites();
  }, [user?.sub]);

  return (
    <>
      <h4>Your favorite images</h4>
      <div>
        {favoriteImages.length > 0 ? (
          favoriteImages.map((favorite, index) => (
            <div key={index}>
              <img src={favorite.url} alt={`Favorite Image ${index}`} />
              <p>Title: {favorite.title}</p>
              <p>Byte Size: {favorite.byteSize}</p>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </>
  );
};

export default MyFavorites;
