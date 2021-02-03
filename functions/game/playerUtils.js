const arrayUtils = require('../util/findItemInArray');
const axios = require('axios');
const cheerio = require('cheerio');
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

async function findPlayer(playerToLookFor) {
    let listOfAllPols = [];
    await axios.post('https://oppressive.games/power/nationalpols.php?nation=USA',
     `query=${ playerToLookFor }&completedsearch=`, config)
    .then(res => {
        let $ = cheerio.load(res.data);

        $('#main2 > center > a').each(function(i, e) {
            listOfAllPols[i] = {
                name: $(e).text(),
                link: $(e).attr('href')
            }
        });
    }).catch(e => { console.log(e) });

    return listOfAllPols;
}

module.exports = {
    findPlayer
}