module.exports = {
  mockProducts: [
    {
      id: 1,
      name: "Camo Onesie",
      slogan: "Blend in to your crowd",
      description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      category: "Jackets",
      default_price: "140"
    },
    {
      id: 2,
      name: "Bright Future Sunglasses",
      slogan: "You've got to wear shades",
      description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      category: "Accessories",
      default_price: "69"
    },
    {
      id: 3,
      name: "Morning Joggers",
      slogan: "Make yourself a morning person",
      description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      category: "Pants",
      default_price: "40"
    },
    {
      id: 4,
      name: "Slacker's Slacks",
      slogan: "Comfortable for everything, or nothing",
      description: "I'll tell you how great they are after I nap for a bit.",
      category: "Pants",
      default_price: "65"
    },
    {
      id: 5,
      name: "Heir Force Ones",
      slogan: "A sneaker dynasty",
      description: "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
      category: "Kicks",
      default_price: "99"
    }
  ],

  mockProductById: {
    id: 1,
    name: "Camo Onesie",
    slogan: "Blend in to your crowd",
    description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    category: "Jackets",
    default_price: "140",
    features: [
      {
        feature: "Fabric",
        value: "Canvas"
      },
      {
        feature: "Buttons",
        value: "Brass"
      }
    ],
  },

  mockProductStyles: {
    product_id: "2000",
    results: [
      {
        style_id: 3964,
        name: "Turquoise",
        original_price: "466",
        sale_price: "null",
        "default?": true,
        photos: [
          {
            thumbnail_url: "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            url: "https://images.unsplash.com/photo-1556812191-381c7e7d96d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2982&q=80"
          },
          {
            thumbnail_url: "https://images.unsplash.com/photo-1526330563440-3ae2174b6bce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
            url: "https://images.unsplash.com/photo-1485646979142-d4abb57a876f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
          },
          {
            thumbnail_url: "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            url: "https://images.unsplash.com/photo-1550188053-b4e1e8e4f94f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
          }
        ],
        skus: {
            "22914": {
              id: 22914,
              quantity: 38,
              size: "XS"
            },
            "22915": {
              id: 22915,
              quantity: 46,
              size: "S"
            },
            "22916": {
              id: 22916,
              quantity: 24,
              size: "M"
            },
            "22917": {
              id: 22917,
              quantity: 15,
              size: "L"
            },
            "22918": {
              id: 22918,
              quantity: 24,
              size: "XL"
            },
            "22919": {
              id: 22919,
              quantity: 50,
              size: "XXL"
            }
        }
      }
    ]
  },

  mockRelatedProducts: [2, 3, 7, 8],
}