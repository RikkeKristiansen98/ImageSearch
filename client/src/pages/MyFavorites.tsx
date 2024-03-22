import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { IImageResult } from "../models/ImageResult";
import "../styles/ImageCard.css";

export const MyFavorites = () => {
  const { user } = useAuth0();
  const [favorites, setFavorites] = useState<IImageResult[]>([]);
  const userId = user?.sub;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        const favoriteImages = response.data.map((item: IImageResult) => item.favoriteImages).flat();
        setFavorites(favoriteImages);
        console.log(response.data)
      } catch (error) {
        console.log("Error fetching data");
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="container">
      <h2 className="my-4">My favorite images</h2>
      {favorites.length > 0 ? (
        <div className="row">
          {favorites.map((image, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="image-container">
                <img src={image.url} alt={image.title} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No favorite images available</p>
      )}
    </div>
  );
}


