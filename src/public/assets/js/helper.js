const helpers = {};

helpers.calculedifficulty = (rating) => {
  if (rating < 2) return "easy";
  if (rating < 2.7) return "normal";
  if (rating < 4) return "hard";
  if (rating < 5.3) return "insane";
  if (rating < 6.5) return "expert";
  return "expert-plus";
};

export default helpers;
