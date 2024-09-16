import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pending-goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60 // 60 Seconds
  });

  if (!data) return;

  const handleCompleteGoal = async (goalId: string) => {
    await createGoalCompletion(goalId);
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        const isGoalCompletedOnWeek =
          goal.completionCount >= goal.desiredWeeklyFrequency;
        return (
          <OutlineButton
            key={goal.id}
            disabled={isGoalCompletedOnWeek}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="text-zinc-600 size-4" /> {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
