import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { IImageResult } from "../models/ImageResult";

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
        console.log("Error fetching data", error);
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
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <img className="card-img-top" src={image.url} alt={image.title} />
                </div>
              </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No images available</p>
      )}
    </div>
  );
      };

