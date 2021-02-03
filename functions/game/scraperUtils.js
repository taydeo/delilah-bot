const cheerio = require("cheerio");
const axios = require('axios');

async function scrapePlayerInfo(playerUrl, messageAuthorName, messageAuthorProfilePicture) {
    var embedObj = [];

    await axios.get(playerUrl)
        .then(res => {
            // i am aware of how messy this looks. no, i dont care !!!!
            let $ = cheerio.load(res.data);
            let cardBody = $('div[style="background-color:rgba(255, 255, 255, 0.75);"]');
            let firstCard = cardBody.first();
            let middleCard = cardBody.eq(1);
            let lastCard = cardBody.eq(2);
            let middleTable = middleCard.find('td');
            let lastTable = lastCard.find('td');
            let electHist = $('#main2 > center > div.row > div:nth-child(3) > div:nth-child(3) > div > p > table');

            let pos = electHist.find('td').eq(0).text().trim();
            let state = electHist.find('td').eq(1).text().trim();
            let partyFrom = electHist.find('td > a').eq(1).text().trim();
            let whatTime = electHist.find('td').eq(3).text().trim();

            let politicianName = firstCard.find('h1').first().text().trim()
            let politicianImage = encodeURI('https://oppressive.games/power/' + firstCard.find('img').attr('src'));
            let politicianDesc = firstCard.find('table.table[style="max-width:600px;"]').text().trim();
            let politicianSong = cardBody.find('iframe').attr('src').trim();

            let politicianSongId = politicianSong.match('([0-9A-Z])\w+\g');
            let fullSongUrl = 'https://www.youtube.com/watch?v=' + politicianSongId;

            let location = lastTable.eq(1).find('a').text().trim();
            let locationFlag = lastTable.eq(1).find('img').attr('src');
            let gender = lastTable.eq(5).text().trim();
            let power = lastTable.eq(7).text().trim();
            let finance = lastTable.eq(9).text().trim();
            let natInfluence = lastTable.eq(11).text().trim();
            let hsInfluence = lastTable.eq(13).text().trim();
            let politRep = lastTable.eq(15).text().trim();
            let seniority = lastTable.eq(17).text().trim();
            let party = lastTable.eq(19).text().trim();
            let partyPower = lastTable.eq(21).text().trim();
            let socialPos = lastTable.eq(23).text().trim();
            let ecoPos = lastTable.eq(25).text().trim();

            let totalWealth = middleTable.eq(1).text().trim();
            let liquidWealth = middleTable.eq(3).text().trim();
            let playerClass = middleTable.eq(5).text().trim();
            let stocksValue = middleTable.eq(7).text().replace('Portfolio', '').trim();

            if (!politicianDesc || /^\s*$/.test(politicianDesc)) {
                politicianDesc = 'This player does not have a Description.'
            }

            embedObj = {
                color: 0x0099ff,
                title: politicianName,
                url: playerUrl,
                thumbnail: {
                    url: 'https://oppressive.games/power/' + politicianImage
                },
                author: {
                    name: messageAuthorName,
                    icon_url: messageAuthorProfilePicture
                },
                fields: [
                    {
                        name: `Info about ${politicianName}`,
                        value: 'State: ' + location + '\u0020\u0020\u0020\u0020' + gender + '\u0020\u0020\u0020\u0020' + party + '\u0020\u0020\u0020\u0020Party Power: ' + partyPower.trim() +
                            '\nSocial Pos: ' + socialPos + '\u0020\u0020\u0020\u0020Economic Pos: ' + ecoPos +
                            '\nStocks Val: ' + stocksValue + '\u0020\u0020\u0020\u0020Campaign Finances: ' + finance + '\u0020\u0020\u0020\u0020Class: ' + playerClass
                    },
                    {
                        name: 'Most Recent Election',
                        value: pos.trim() + ', ' + state + ', ' + partyFrom + ', ' + whatTime
                    },
                    {
                        name: 'Misc.',
                        value: 'Power: ' + power + '\u0020\u0020\u0020\u0020National Influence: ' + natInfluence + '\u0020\u0020\u0020\u0020Home State Influence: ' + hsInfluence +
                            '\nReputation: ' + politRep + '\u0020\u0020\u0020\u0020Total Wealth: ' + totalWealth + '\u0020\u0020\u0020\u0020Liquid Capital: ' + liquidWealth
                    },
                    {
                        name: 'Player Description',
                        value: politicianDesc
                    }
                ],
            };
            return embedObj;
        });

    return embedObj;
}

module.exports = {
    scrapePlayerInfo
}