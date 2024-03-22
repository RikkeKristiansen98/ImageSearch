Image Search App

Features:
* User authentication with Google/Github using Auth0.
* Search for images with suggestions if mispelled.
* Display search results and search time.
* Function to save favorite images.
* A favorite page with all chosen favorites.

Set up:
* Make sure you have node.js installed
* Clone repository
* Open Terminal in VS Code 
* Terminal for Client: cd client then npm i and npm run dev
* Create a .env file and add variables in client folder
VITE_AUTH0_CLIENT_ID=...
VITE_GOOGLE_API_KEY=...
VITE_SEARCH_ENGINE_KEY=...

* New Terminal for Server: First cd server Run npm i and node server.js
* Create a.env file and add variables in server folder
VITE_AUTH0_CLIENT_ID=....
VITE_GOOGLE_API_KEY=...
VITE_SEARCH_ENGINE_KEY=....
PORT=3001
* Navigate to http://localhost:5173/ 
