const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'ساعة Rolex ذهبية',
      price: 300,
      currency: 'درهم',
      description: 'ساعة Rolex فاخرة باللون الذهبي',
      brand: 'Rolex',
      color: 'ذهبي'
    }
  ];
  res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`السيرفر يعمل على البورت ${PORT}`);
});