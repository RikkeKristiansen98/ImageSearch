import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { IImageResultItem } from "../models/ImageResult";

export const MyFavorites = () => {
  const {user} = useAuth0()

  const [favorites, setFavorites] = useState<IImageResultItem[]>([]);

  const userId = user?.sub;
  
  useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/users/${userId}`);
            setFavorites(response.data)
              console.log(response.data)

          }catch (error) {
              console.log("Error fetching data", error)
          }
      };
      fetchData()
  },[]);


  
    return (
      <div>
          <h2>My favorite images</h2>
          {favorites.length > 0 ? (
              <ul className="images-container">
                  {favorites?.map((item, i) => (
                      <li key={i}>
                          <img className="favorite-img" src={item.url} alt={item.title}  />
                          
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No images available</p>
          )}
      </div>
  );
          };