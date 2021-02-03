async function findItemInArray(jsonArray, itemToFind) {
    console.log(jsonArray + " - " + itemToFind)
    var foundMatches = [];
    for(var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i].name == itemToFind) {
            foundMatches[i] = {
                name: jsonArray[i].name,
                link: jsonArray[i].link
            }
        }
    }

    return foundMatches;
}

module.exports = {
    findItemInArray
}