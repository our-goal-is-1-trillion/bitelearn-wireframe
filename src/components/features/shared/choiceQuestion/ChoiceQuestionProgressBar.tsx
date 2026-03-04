import { cn } from "@/lib/utils"

export type StepIndicatorInfo = {
  type: "learning" | "quiz"
  status: "none" | "correct" | "incorrect"
  isCurrent: boolean
}

type ChoiceQuestionProgressBarProps = {
  steps: StepIndicatorInfo[]
}

export default function ChoiceQuestionProgressBar({ steps }: ChoiceQuestionProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-6 pt-6">
      {steps.map((step, index) => {
        let bgColor = "bg-slate-300"

        if (step.type === "learning") {
          bgColor = "bg-blue-500"
        } else if (step.type === "quiz") {
          if (step.status === "correct") {
            bgColor = "bg-green-500"
          } else if (step.status === "incorrect") {
            bgColor = "bg-red-500"
          }
        }

        const sizeClass = step.isCurrent ? "h-2.5 w-2.5" : "h-1.5 w-1.5"

        return <div key={index} className={cn("rounded-full transition-all duration-300", bgColor, sizeClass)} />
      })}
    </div>
  )
}
