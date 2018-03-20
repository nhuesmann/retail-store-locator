const mongoose = require('mongoose');

const { Schema } = mongoose;

const capitalize = string => {
  if (!string) return string;

  return string
    .replace('.', '')
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
};

const RetailerSchema = new Schema({
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // lng, lat
  },
  name: { type: String, trim: true, set: capitalize },
  address1: { type: String, trim: true, set: capitalize },
  address2: { type: String, trim: true, set: capitalize },
  city: { type: String, trim: true, set: capitalize },
  state: { type: String, trim: true, uppercase: true },
  zip: { type: String, trim: true },
  launch_date: Date,
  recipes_offered: Array,
});

RetailerSchema.index({ location: '2dsphere' });

const Retailer = mongoose.model('retailer', RetailerSchema);

module.exports = Retailer;
