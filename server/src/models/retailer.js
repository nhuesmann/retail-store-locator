const mongoose = require('mongoose');

const { Schema } = mongoose;

const RetailerSchema = new Schema({
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // lng, lat
  },
  name: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  launch_date: Date,
  recipes_offered: Array,
});

// RetailerSchema.index({ location: '2dsphere' });

const Retailer = mongoose.model('retailer', RetailerSchema);

module.exports = Retailer;
