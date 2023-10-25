const helpers = {};
import { scaleLinear, interpolateRgb } from "d3";

const difficultyColourSpectrum = scaleLinear()
  .domain([0.1, 1.25, 2, 2.5, 3.3, 4.2, 4.9, 5.8, 6.7, 7.7, 9])
  .clamp(true)
  .range([
    "#4290FB",
    "#4FC0FF",
    "#4FFFD5",
    "#7CFF4F",
    "#F6F05C",
    "#FF8068",
    "#FF4E6F",
    "#C645B8",
    "#6563DE",
    "#18158E",
    "#000000",
  ])
  .interpolate(interpolateRgb.gamma(2.2));

helpers.calculedifficulty = (rating) => {
  if (rating < 2) return "easy";
  if (rating < 2.7) return "normal";
  if (rating < 4) return "hard";
  if (rating < 5.3) return "insane";
  if (rating < 6.5) return "expert";
  return "expert-plus";
};

helpers.getDiffColour = (rating) => {
  if (rating < 0.1) return "#AAAAAA";
  if (rating >= 9) return "#000000";
  return difficultyColourSpectrum(rating);
};

export default helpers;
