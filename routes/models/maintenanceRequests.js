
const issues = {
    list: 'cgRequestIssuesClass',
    item: {
        cartegraphID: "Oid",
        name: "IssueField",
        type: "InternalRequestCategoryField"
    },
}

const allRequests = {
    list: 'cgRequestsClass',
    item: {
        cartegraphID: "Oid",
        building: "BuildingNameField",
        location: "LocationDescriptionField",
        description: "DescriptionField",
        submitted: "EntryDateField",
        status: "StatusField",
        issue: "IssueField"
    }
}

const myRequests = {
    list: 'cgTasksClass',
    item: {
        cartegraphID: "Oid",
        building: "cgAssetIDField",
        location: "LocationDescriptionField",
        description: "TaskDescriptionField",
        submitted: "EntryDateField",
        status: "StatusField",
        lastModified: "cgLastModifiedField",
        notes: "NotesField"
    },
}

module.exports = {
    issues,
    allRequests,
    myRequests
}