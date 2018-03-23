/* eslint import/prefer-default-export: 0 */

export function getSearchRadius(store) {
  const options = store.form.searchRadiusOptions;
  const selectedIndex = store.form.searchRadiusSelectedIndex;

  return options[selectedIndex];
}
