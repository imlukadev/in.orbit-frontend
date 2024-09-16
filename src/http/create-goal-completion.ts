export const createGoalCompletion = async (
  goalId: string
) => {
  const response = await fetch("http://localhost:3300/completions", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ goalId }),
  });
  const data = await response.json();
  return data.pendingGoals;
};
