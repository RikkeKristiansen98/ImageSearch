import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const MyFavorites = () => {
  const { user } = useAuth0();
  const [favoriteImages, setFavoriteImages] = useState<string[]>([]);

  useEffect(() => {
    if (!user || !user.email) return;

    const userId = user.email;
    const url = `http://localhost:3000/users/${userId}/favorites`;

    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get(url);
        setFavoriteImages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("error getting favorites", error);
      }
    };

    fetchUserFavorites();
  }, [user?.email]);

  return (
    <>
      <h4>Your favorite images</h4>
      <div>
        {favoriteImages.length > 0 ? (
          favoriteImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Favorite Image ${index}`} />
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </>
  );
};