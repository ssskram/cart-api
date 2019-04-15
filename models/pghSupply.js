const setDepartment = dept => {
  let d;
  if (dept == "Warehouse") {
    d = "DPW/Parks";
  } else {
    d = "Bureau of Fire";
  }
  return d;
};

const setImageURL = oid => {
  return "https://cgweb06.cartegraphoms.com/PittsburghPA/api/v1/attachments/primary/cgMaterialsClass/" +
    oid;
};

const inventoryItems = {
  list: "cgMaterialsClass",
  item: {
    cartegraphID: "Oid",
    itemName: "DescriptionField",
    itemType: "PublicSafetyCategoriesField",
    itemUnit: "UnitField",
    department: "MaterialTypeField",
    image: "Oid"
  },
  operate: [
    {
      run: setDepartment,
      on: "department"
    },
    {
      run: setImageURL,
      on: "image"
    }
  ]
};

module.exports = {
  inventoryItems
};
