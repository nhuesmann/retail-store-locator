/* eslint no-unused-vars: 0 */

const Retailer = require('../models/retailer');

const runGeoQuery = async (req, res) => {
  const { lng, lat, maxMiles = 50 } = req.query;

  const milesPerKilometer = 1.60934;
  const earthRadius = 6371;

  const validLatLng = lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

  if (!validLatLng) {
    res.json({ error: 'Invalid location' });
  }

  const maxDistance = maxMiles * milesPerKilometer / earthRadius;

  const query = Retailer.find();
  query
    .where('location')
    .near({ center: [lng, lat], spherical: true, maxDistance });

  const locations = await query.exec();

  res.json(locations);
};

exports.ListRetailers = async function ListRetailers(req, res, next) {
  if (req.query && req.query.lat && req.query.lng) {
    return runGeoQuery(req, res);
  }

  const retailers = await Retailer.find({});
  res.json(retailers);
};

exports.CreateRetailer = async function CreateRetailer(req, res, next) {
  const newRetailer = new Retailer({
    location: {
      coordinates: req.body.location.coordinates, // lng, lat
    },
    name: req.body.name,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    launch_date: req.body.launch_date,
    recipes_offered: req.body.recipes_offered,
  });

  const savedRetailer = await newRetailer.save();

  res.status(201).json(savedRetailer);
};

exports.test = async function test(req, res, next) {
  res.json({ message: 'hi!' });
};
