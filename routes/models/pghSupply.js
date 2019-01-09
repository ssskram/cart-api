
const pbfItems = {
    list: 'cgMaterialsClass',
    item: {
        cartegraphID: "Oid",
        itemName: "DescriptionField",
        itemType: "PublicSafetyCategoriesField"
    },
    each: item => {
        item.department = "Bureau of Fire"
        return item
    }
}

module.exports = {
    pbfItems
}