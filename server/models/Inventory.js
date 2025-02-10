const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    enum: ['Food', 'Clothes', 'Books', 'Medical', 'Toys', 'Games Kit', 'Money', 'Others']
  },
  count: {
    type: Number,
    required: function () {
      return this.itemName !== 'Money';
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Out Of Stock']
  },
  amount: {
    type: Number,
    required: function () {
      return this.itemName === 'Money';
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);