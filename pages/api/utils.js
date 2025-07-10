export const convertBacklogScoreToString = (score) => {
  if (!score || score < 2) return "Lowest";
  if (score < 3) return "Low";
  if (score < 4) return "Medium";
  if (score < 5) return "High";
  if (score >= 5) return "Highest";
  return undefined;
};

export const convertBacklogScoreToInt = (score) => {
  if (!score) return undefined;
  if (score === "Lowest") return 1;
  if (score === "Low") return 2;
  if (score === "Medium") return 3;
  if (score === "High") return 4;
  if (score === "Highest") return 5;
  return undefined;
};
