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

}

const myRequests = {

}

module.exports = {
    issues,
    allRequests,
    myRequests
}