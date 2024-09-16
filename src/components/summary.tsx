import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import ptBR from "dayjs/locale/pt-BR";
import dayjs from "dayjs";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR);
export function Summary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 Seconds
  });

  if (!data) return;

  const firstDayOfWeek = dayjs().startOf("w").format("D MMM");
  const lastDayOfWeek = dayjs().endOf("w").format("D MMM");

  const completedPercentage = Math.round((data.completed * 100) / data.total);

  return (
    <div className="flex  flex-col gap-6 py-10 px-5 mx-auto max-w-[480px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress max={data?.total} value={data?.completed}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.completed}</span> de{" "}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format("dddd");
          const formattedDate = dayjs(date).format("D[ de ]MMMM");
          return (
            <div className="flex flex-col gap-4" key={date}>
              <h3 className="font-medium">
                <span className="capitalize"> {weekDay}</span>
                <span className="text-zinc-400 text-xs">
                  {" "}
                  ({formattedDate})
                </span>
              </h3>
              <ul className="flex flex-col gap-3">
                {goals.map((goal) => {
                  const time = dayjs(goal.completedAt).format("HH:mm");
                  return (
                    <li className="flex gap-2 items-center" key={goal.id}>
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou
                        <span className="text-zinc-100">
                          {" "}
                          "{goal.title}"
                        </span>{" "}
                        às <span className="text-zinc-100"> {time}h</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
