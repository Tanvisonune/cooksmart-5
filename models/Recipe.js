// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  id: Number, // Keep the numeric id from your JSON
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  
  image: {
    type: String,
    default: null
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: mongoose.Schema.Types.Mixed, // Can be String or Array
    required: true
  },
  prepTime: {
    type: Number,
    default: 0
  },
  cookTime: {
    type: Number,
    default: 0
  },
  cookingTime: { // Your JSON has this field
    type: Number,
    default: function() {
      return this.cookingTime || (this.prepTime || 0) + (this.cookTime || 0);
    }
  },
  servings: {
    type: Number,
    default: 4
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'Easy', 'Medium', 'Hard'],
    default: 'medium'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5
  },
  likes: {
    type: Number,
    default: 0
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  },
  nutrition: {
    calories: { type: Number, default: 0 },
    protein_g: { type: Number, default: 0 },
    fat_g: { type: Number, default: 0 },
    carbs_g: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for faster searches
recipeSchema.index({ ingredients: 1 });
recipeSchema.index({ tags: 1 });
recipeSchema.index({ difficulty: 1 });

module.exports = mongoose.model('Recipe', recipeSchema);

