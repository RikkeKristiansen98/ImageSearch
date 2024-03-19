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


// POST användardata med favorittbild
app.post("/user-data", async (req, res) => {
  try {
    const userData = req.body;
    console.log(req.body)
    const { error } = userDataSchema.validate(userData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //  existerande användardata från json filen
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);

    users.push(userData);

    // uppdaterat användardata till user.json
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "500" });
  }
});


// GET för att hämta favoritbilder 

app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "500" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
