interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export const createGoal = async ({
  desiredWeeklyFrequency,
  title,
}: CreateGoalRequest) => {
  const response = await fetch("http://localhost:3300/goals", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title, desiredWeeklyFrequency }),
  });
  const data = await response.json();
  return data.pendingGoals;
};
