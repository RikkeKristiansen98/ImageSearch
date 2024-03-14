const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware 
app.use(cors());
app.use(express.json());

// POST för att spara favoritbilder
app.post("/favorites", (req, res) => {
  const newFavorite = req.body;

  // befintliga favoritbilder från JSON-filen
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading favorites file:", err);
      res.status(500).json({ error: "Internal server error, 500" });
      return;
    }

    try {
      // konverterar JSON till ett JavaScript-objekt
      const favorites = JSON.parse(data);
      
      favorites.push(newFavorite);
      
      // skriv tillbaka data till JSON med den nya favoritbilden
      fs.writeFile("users.json", JSON.stringify(favorites, null, 2), (err) => {
        if (err) {
          console.error("Error writing to favorites file:", err);
          res.status(500).json({ error: "Internal server error, 500" });
          return;
        }
        
        res.status(201).json({ message: "Favorite image saved successfully" });
      });
    } catch (error) {
      console.error("Error parsing favorites data:", error);
      res.status(500).json({ error: "Internal server error, 500" });
    }
  });
});


app.get("/users/:userId/favorites", (req, res) => {
  const userId = req.params.userId;


  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading favorites file:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    try {
      const favorites = JSON.parse(data);
      
      const userFavorites = favorites.filter(favorite => favorite.userId === userId);
      
      res.status(200).json(userFavorites);
    } catch (error) {
      console.error("Error parsing favorites data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
