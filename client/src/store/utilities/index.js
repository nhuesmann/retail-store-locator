/* eslint import/prefer-default-export: 0 */

exports.truncateCoordinates = ({ lat, lng }) => ({
  lat: +lat.toFixed(7),
  lng: +lng.toFixed(7),
});

exports.truncateBounds = boundsObj =>
  Object.keys(boundsObj).reduce((acc, key) => {
    acc[key] = this.truncateCoordinates(boundsObj[key]);
    return acc;
  }, {});
