
const pbfItems = {
    list: 'cgMaterialsClass',
    item: {
        cartegraphID: "Oid",
        name: "DescriptionField",
        type: "PublicSafetyCategoriesField"
    },
    each: item => {
        item.department = "Bureau of Fire"
        return item
    }
}

module.exports = {
    pbfItems
}