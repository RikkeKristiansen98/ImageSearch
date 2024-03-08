import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { ISearchGoogleResult } from "../models/SearchGoogleResults";


export const Home = () => {
  const { isAuthenticated } = useAuth0();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchGoogleResult>({
    context: { title: "" },
    items: [],
    searchInformation: { searchTime: "" },
  });


  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=${import.meta.env.VITE_SEARCH_ENGINE_KEY}&num=10&searchType=image&q=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ISearchGoogleResult = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDidYouMean = async (correctedQuery: string) => {
    setSearchQuery(correctedQuery);
    await handleSearch();
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <button onClick={handleSearch}>Search</button>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <p>Search Time: {searchResults.searchInformation.searchTime}</p>
  {searchResults.spelling && searchResults.spelling.correctedQuery && (
  <p>
    Did you mean:{" "}
    <button onClick={() => handleDidYouMean(searchResults.spelling!.correctedQuery)}>
      {searchResults.spelling.correctedQuery}
    </button>
  </p>
)}



          {searchResults.items.map((result, index) => (
            <img key={index} src={result.link} alt={`Image ${index}`} />
          ))}
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
};
