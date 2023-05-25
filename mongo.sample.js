// ================= Database and Models =================

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/glossary', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

// ============= Authenticate Connection =================
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => console.log('Connection Successful'));

// ============= Define a Schema =================
let productSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [
    {
      feature: String,
      value: String
    }
  ],
  styles: [
    {
      style_id: Number,
      name: String,
      original_price: Number,
      sale_price: Number,
      default: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String
        }
      ],
      skus: [
        {
          sku_id: Number,
          quantity: Number,
          size: String
        }
      ]
    }
  ],
  related: [Number]});

// ============= Create a Model =================
let Product = mongoose.model('Product', productSchema);

module.exports = Product;