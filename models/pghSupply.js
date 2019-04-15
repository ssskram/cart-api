const setDepartment = dept => {
  let d;
  if (dept == "Warehouse") {
    d = "DPW/Parks";
  } else {
    d = "Bureau of Fire";
  }
  return d;
};

const hasImage = attachment => {
  if (attachment == "") {
    return false;
  } else return true;
};

const inventoryItems = {
  list: "cgMaterialsClass",
  item: {
    cartegraphID: "Oid",
    itemName: "DescriptionField",
    itemType: "PublicSafetyCategoriesField",
    itemUnit: "UnitField",
    department: "MaterialTypeField",
    hasImage: "PrimaryAttachmentField"
  },
  operate: [
    {
      run: setDepartment,
      on: "department"
    },
    {
      run: hasImage,
      on: "hasImage"
    }
  ]
};

module.exports = {
  inventoryItems
};
