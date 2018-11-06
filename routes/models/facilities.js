
const allFacilities = {
    list: 'cgFacilitiesClass',
    item: {
        cartegraphID: "Oid",
        name: "IDField",
        neighborhood: "NeighborhoodField",
        lat: "CgShape.Center.Lat",
        lng: "CgShape.Center.Lng"
    },
    each: item => item
}

module.exports = {
    allFacilities
}