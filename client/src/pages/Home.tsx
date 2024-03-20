import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { ISearchGoogleResult } from "../models/SearchGoogleResults";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export const Home = () => {
  const { isAuthenticated, user } = useAuth0(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState<ISearchGoogleResult>({
    context: { title: "" },
    items: [],
    searchInformation: { searchTime: "" },
  });
  useEffect(() => {
    console.log("User object:", user);
  }, [user]);

  const saveFavoriteImage = async (imageUrl: string, title: string) => {
    try {
      if (!isAuthenticated || !user) {
        throw new Error("User is not authenticated");
      }
  
      const userId = user.sub; 
      const favoriteImageData = {
        user: userId,
        favoriteImages: [
          {
            title: title, 
            url: imageUrl
          }
        ]
      };
  
      await axios.post("http://localhost:3001/user-data", favoriteImageData);
      console.log("Favorite image saved successfully");
      setShowModal(true); 
    } catch (error) {
      console.error("Error saving favorite image:", error);
    }
  };
  
  

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=${import.meta.env.VITE_SEARCH_ENGINE_KEY}&num=10&searchType=image&q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ISearchGoogleResult = await response.json();
      setSearchResults(data);
      setSearchQuery("");
      console.log("Search results:", data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDidYouMean = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSearchQuery(event.currentTarget.textContent || ""); 
    await handleSearch(event.currentTarget.textContent || "");
  };

   return (
    <div className="container mt-5">
      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>This image is now saved in your favorite images page!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
      {isAuthenticated ? (
        <>
          <div className="row mb-3">
            <div className="col-md-8">
              <input type="text" placeholder="Search images" className="form-control" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary btn-block" onClick={() => handleSearch(searchQuery)}>Search</button>
            </div>
          </div>
          <p className="mb-3">Search Time: {searchResults.searchInformation.searchTime}</p>
          {searchResults.spelling && searchResults.spelling.correctedQuery && (
            <p>
              Did you mean:{" "}
              <button className="btn btn-link p-0" onClick={handleDidYouMean}>
                {searchResults.spelling.correctedQuery}
              </button>
            </p>
          )}
          <div className="row">
            {searchResults.items.map((result, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <img className="img-fluid" src={result.link} alt={`Image ${index}`}/>
                <button className="btn btn-primary btn-block mt-2" onClick={() => saveFavoriteImage(result.link, result.title)}>Save to Favorites</button>
              </div>
            ))}
          </div>
        </>
      ) : (
       <p>Log in to search after images and save your favorites.</p> 
      )}
    </div>
  );
};
