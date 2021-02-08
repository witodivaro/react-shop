export const getItemsByFilter = (collections, filter) => {
  const filteredItems = [];
  const filterLetters = filter.toLowerCase().split("");

  collections.forEach((collection) => {
    collection.items.forEach((item) => {
      const filterCheck = filterLetters.map(
        (letter) => item.name.toLowerCase().indexOf(letter) !== -1
      );

      if (filterCheck.indexOf(false) === -1) {
        filteredItems.push(item);
      }
    });
  });

  return filteredItems;
};
