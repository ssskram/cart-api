const dt = require("node-json-transform").DataTransform

const allFacilities = {
    list: 'cgFacilitiesClass',
    item: {
        cartegraphID: "Oid",
        name: "IDField",
        neighborhood: "NeighborhoodField",
        shape: "CgShape.Points"
    },
    operate: [
        {
            'run': function(ary) { 
            	return dt({list:ary}, shape).transform();
            }, 
            'on': 'shape'
        }
    ]
}

const shape = {
    'list': 'list',
    'item' : {
        'lat': 'Lat',
        'lng': 'Lng'
    }
}

module.exports = {
    allFacilities
}