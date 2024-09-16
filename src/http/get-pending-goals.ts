type PendingGoalsResponse = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];

export const getPendingGoals = async (): Promise<PendingGoalsResponse> => {
  const response = await fetch("http://localhost:3300/pending-goals");
  const data = await response.json();
  return data.pendingGoals;
};
