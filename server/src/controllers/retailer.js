/* eslint no-unused-vars: 0 */
const axios = require('axios');

const Retailer = require('../models/retailer');
const { runGeoQuery } = require('../helpers/geolocation');
const { parseCsv } = require('../helpers/csv');
const { capitalize } = require('../helpers/utility');

const createRetailer = retailer =>
  new Retailer({
    location: {
      coordinates: retailer.location.coordinates, // lng, lat
    },
    name: retailer.name,
    address1: retailer.address1,
    address2: retailer.address2,
    city: retailer.city,
    state: retailer.state,
    zip: retailer.zip,
    launch_date: retailer.launch_date,
    recipes_offered: retailer.recipes_offered,
  }).save();

exports.ListRetailers = async function ListRetailers(req, res, next) {
  if (req.query && req.query.lat && req.query.lng) {
    return runGeoQuery(req, res, Retailer);
  }

  const retailers = await Retailer.find({});
  res.json(retailers);
};

exports.CreateRetailer = async function CreateRetailer(req, res, next) {
  const savedRetailer = await createRetailer(req.body);

  res.status(201).json(savedRetailer);
};

exports.test = async function test(req, res, next) {
  res.json({ message: 'hi!' });
};

exports.SyncRetailers = async function SyncRetailers(req, res, next) {
  const csv = (await axios.get(process.env.GOOGLE_SHEET_URL)).data;

  // get the retailers
  const retailers = parseCsv(csv);

  // process each retailer
  const updatedRetailers = retailers
    .map(retailer => {
      // check if exists in db
      const found = Retailer.findOne(
        {
          name: capitalize(retailer.retailer),
          address1: capitalize(retailer.address),
        },
        '_id'
      );

      if (found) return null;

      // if new retailer, geocode address
      return 'need to geocode the address';
    })
    .filter(retailer => retailer);

  // process if they don't already exist

  // run geolocation to get coordinates

  // call createRetailer

  res.json(retailers);
};

// for each retailer result

// 1. check if exists in db

// if exists:
// do nothing

// if doesn't exist:
// 1. geolocate address
// 2. save
