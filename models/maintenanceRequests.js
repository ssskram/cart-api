
const issues = {
    list: 'cgRequestIssuesClass',
    item: {
        cartegraphID: "Oid",
        name: "IssueField",
        type: "InternalRequestCategoryField"
    },
    each: function (item) {
        return item;
    }
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
    },
    each: function (item) {
        return item;
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
    each: function (item) {
        return item;
    }
}

module.exports = {
    issues,
    allRequests,
    myRequests
}