const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Define the Joi schema for validating the incoming data structure
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

// POST route to save user data with favorite images
app.post("/user-data", async (req, res) => {
  try {
    const userData = req.body;

    // Validate the incoming data against the Joi schema
    const { error } = userDataSchema.validate(userData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Read existing user data from users.json
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);

    // Add the new user data to the existing user data
    users.push(userData);

    // Write the updated user data back to users.json
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
