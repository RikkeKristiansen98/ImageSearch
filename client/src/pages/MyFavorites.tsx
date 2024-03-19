import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const MyFavorites = () => {
  const { user } = useAuth0();
  const [favoriteImages, setFavoriteImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.sub) return;

    const userId = user.sub;
    console.log("User ID:", userId);
    const url = `http://localhost:3001/users`;

    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get(url);
        setFavoriteImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting favorites:", error);
        setLoading(false);
      }
    };

    fetchUserFavorites();
  }, [user?.sub]);

  return (
    <div className="container mt-5">
      <h4>Your favorite images</h4>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {favoriteImages.length > 0 ? (
            favoriteImages.map((favorite, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div>
                  <img src={favorite.url} className="card-img-top" alt={`Favorite Image ${index}`} />
                  <div>
                    <h5>{favorite.title}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No images found</p>
          )}
        </div>
      )}
    </div>
  );
};
