const mongoose = require("mongoose");

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not set");
  }

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  ingredients: [String],
  cookingTime: Number,
  difficulty: String,
  rating: Number,
  isVegetarian: Boolean,
  nutrition: Object
});

const Recipe =
  mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

module.exports = async (req, res) => {
  try {
    await connectToDatabase();

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { ingredients = "", mode = "and" } = req.query;

    const ingredientList = ingredients
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    let query = {};
    if (ingredientList.length > 0) {
      if (mode === "and") {
        query.ingredients = { $all: ingredientList };
      } else {
        query.ingredients = { $in: ingredientList };
      }
    }

    const recipes = await Recipe.find(query);
    res.status(200).json(recipes);
  } catch (err) {
    console.error("Error in /api/search:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
