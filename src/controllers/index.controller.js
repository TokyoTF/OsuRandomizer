import RequestClass from "../class/osu.class.js";
import helpers from "../lib/helper.js";
const indexCtrl = {};
const Request = new RequestClass();

indexCtrl.renderIndex = async (req, res) => {
  const Ranking = await Request.Api().ranking.getRanking("osu", "performance", {
    query: {
      country: "US",
    },
  });

  const Beatmaps = await Request.Api().getUndocumented("/beatmapsets/search");

  // rgb(79, 192, 255) //rgb(124, 255, 79) // rgb(246, 240, 92) // rgb(255, 78, 111) // rgb(198, 69, 184) // rgb(101, 99, 222)
  // &m = Mode (empty = any,0 = osu!, 1 = osu!taiko, 2 = osu!catch, 3 = osu!mania)
  // &s = Categories (empty = Has Leaderboard, any = any, ranked = ranked,qualified = qualified,loved = loved)

  res.render("home/home", {
    ranking: Ranking.ranking.slice(0, 3),
    beatmaps: RandomKeys(Beatmaps.beatmapsets, 3),
  });
};

indexCtrl.PostRandomMap = async (req, res) => {
  let { type, rank } = req.query;
  const Beatmaps = await Request.Api().getUndocumented(
    "/beatmapsets/search?" +
      (type ? "m=" + type : "") +
      (rank ? "&s=" + rank : "")
  );
  const RandomMap = RandomKeys(Beatmaps.beatmapsets, 3, type ? type : "");
  console.log(RandomMap[0].beatmaps);
  res.send({ maps: RandomMap });
};

function RandomKeys(arr, repeat, type) {
  var getRandom = "";
  var prevRandom = "";
  var NewArray = [];

  for (let index = 0; index < repeat; index++) {
    getRandom = Math.round(Math.random() * arr.length);
    if (prevRandom !== getRandom && arr[getRandom]) {
      arr[getRandom].beatmaps.filter((e) => {
        var calc = helpers.calculedifficulty(e.difficulty_rating);
  
          if (!NewArray.includes(calc) && e.mode == type) {
            e.difficulty_rating_calc = calc;
            e.difficulty_rating_color = helpers.getDiffColour(
              e.difficulty_rating
            );
          }else if (!NewArray.includes(calc)){
            e.difficulty_rating_calc = calc;
            e.difficulty_rating_color = helpers.getDiffColour(
              e.difficulty_rating
            );
          }
   
      });
      arr[getRandom].beatmaps.sort(
        (a, b) => a.difficulty_rating - b.difficulty_rating
      );
      NewArray.push(arr[getRandom]);
    } else {
      repeat += 1;
    }
    prevRandom = getRandom;
  }
  return NewArray;
}

export default indexCtrl;
