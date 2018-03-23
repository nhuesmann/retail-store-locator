export function truncateCoordinates({ lat, lng }) {
  return { lat: +lat.toFixed(7), lng: +lng.toFixed(7) };
}

export function truncateBounds(boundsObj) {
  return Object.keys(boundsObj).reduce((acc, key) => {
    acc[key] = truncateCoordinates(boundsObj[key]);
    return acc;
  }, {});
}
