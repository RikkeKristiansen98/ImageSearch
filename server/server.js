const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// datastruktur, validering
const userDataSchema = Joi.object({
  user: Joi.string().required(),
  favoriteImages: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      byteSize: Joi.number().required(),
      url: Joi.string().uri().required()
    })
  )
});


// POST lagra användar data med favorittbild
app.post("/user-data", async (req, res) => {
  try {
    const userData = req.body;
    console.log(req.body)
    // Validering 
    const { error } = userDataSchema.validate(userData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //  existerande användar data från json filen
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);

    //  ny användar data till existerande
    users.push(userData);

    // uppdaterat användar data till user.json
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "500" });
  }
});

app.get("/user-data/:userId/favorites", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Läs användardata från users.json
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);

    const user = users.find(user => user.user === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // returnerar favoritbilder för den angivna användaren
    res.status(200).json(user.favoriteImages);
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ error: "500" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
