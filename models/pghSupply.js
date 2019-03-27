const pbfItems = {
  list: "cgMaterialsClass",
  item: {
    cartegraphID: "Oid",
    itemName: "DescriptionField",
    itemType: "PublicSafetyCategoriesField",
    itemUnit: "UnitField"
  },
  each: item => {
    item.department = "Bureau of Fire";
    return item;
  }
};

module.exports = {
  pbfItems
};
