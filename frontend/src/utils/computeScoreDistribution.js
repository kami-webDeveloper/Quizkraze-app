export default function computeScoreDistribution(submissions) {
  const distribution = {
    "0-50": 0,
    "51-70": 0,
    "71-90": 0,
    "91-100": 0,
  };

  for (const s of submissions) {
    const score = s.score;

    if (score <= 50) distribution["0-50"]++;
    else if (score <= 70) distribution["51-70"]++;
    else if (score <= 90) distribution["71-90"]++;
    else distribution["91-100"]++;
  }

  return Object.entries(distribution).map(([range, count]) => ({
    range,
    count,
  }));
}
