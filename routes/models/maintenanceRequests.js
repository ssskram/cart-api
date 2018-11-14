
const moment = require('moment')
const dateTransform = (date) => moment(date).format('MM/DD/YYYY')

const issues = {
    list: 'cgRequestIssuesClass',
    item: {
        cartegraphID: "Oid",
        name: "IssueField",
        type: "InternalRequestCategoryField"
    },
}

const allRequests = {
    list: 'cgTasksClass',
    item: {
        cartegraphID: "Oid",
        building: "cgAssetIDField",
        location: "LocationDescriptionField",
        description: "TaskDescriptionField",
        issue: "RequestIssueField",
        submitted: "EntryDateField",
        status: "StatusField",
        lastModified: "cgLastModifiedField",
        notes: "NotesField"
    },
    operate: [{
        'run': dateTransform,
        'on': "submitted"
    }, {
        'run': dateTransform,
        'on': "lastModified"
    }]
}

module.exports = {
    issues,
    allRequests
}