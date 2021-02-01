export {};
import cheerio from "cheerio";
import axios from "axios";

export default async function getSenateSeats() {
    var politicianDataArray = [];
    await axios.get("https://oppressive.games/power/legememberlist.php?nation=USA&lege=Senate")
        .then(webdata => {
            const $ = cheerio.load(webdata.data);
            var tableRow = $("#main2 > center > table > tbody > tr");
            
            tableRow.each(function (i, e) {
                
                politicianDataArray[i] = {
                    state: $(e).find("td").eq(0).text().trim(),
                    name: $(e).find("td").eq(1).text().trim(),
                    party: $(e).find("td").eq(2).text().trim()
                }
            })
    })

    return politicianDataArray;
}