import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, X } from "lucide-react"
import ChoiceQuestionFooter from "./ChoiceQuestionFooter"

type ChoiceQuestionChoicesProps = {
  questionNumber: number
  question: string
  choices: string[]
  selectedValue: string
  onSelectChoice: (value: string) => void
  onCheckAnswer: () => void
  isChecking?: boolean
  correctIndex?: number
  onPrevious?: () => void
}

export default function ChoiceQuestionChoices({
  questionNumber,
  question,
  choices,
  selectedValue,
  onSelectChoice,
  onCheckAnswer,
  isChecking = false,
  correctIndex,
  onPrevious,
}: ChoiceQuestionChoicesProps) {
  const isCtaEnabled = selectedValue !== ""

  return (
    <>
      <section className="max-h-[50vh] overflow-y-auto px-6">
        <h2 className="mb-4 text-base font-semibold text-slate-600">
          Q{questionNumber}. {question}
        </h2>

        <RadioGroup
          value={selectedValue}
          onValueChange={onSelectChoice}
          className="flex flex-col gap-2"
          disabled={isChecking}
        >
          {choices.map((choice, index) => {
            const isSelected = selectedValue === String(index)
            const isAnswer = index === correctIndex

            let containerClass = "border-slate-300 bg-white text-slate-900"
            let radioClass = ""
            let customIcon: React.ReactNode = undefined

            if (isChecking) {
              if (isAnswer) {
                containerClass = `border-green-500 bg-green-50 text-green-700 font-semibold ${
                  isSelected ? "animate-pop" : ""
                }`
                radioClass = "border-green-600 bg-green-600 text-white disabled:opacity-100"
                customIcon = <Check className="h-3 w-3 stroke-[3]" />
              } else if (isSelected && !isAnswer) {
                containerClass = "border-red-500 bg-red-50 text-red-700 font-medium animate-shake"
                radioClass = "border-red-600 bg-red-600 text-white disabled:opacity-100"
                customIcon = <X className="h-3 w-3 stroke-[3]" />
              } else {
                containerClass = "border-slate-200 bg-slate-50 text-slate-400"
                radioClass = "border-slate-300 disabled:opacity-40"
              }
            } else if (isSelected) {
              containerClass = "border-slate-900 bg-white text-slate-900 font-medium"
            }

            return (
              <label
                key={index}
                className={`flex w-full items-center gap-3 rounded-md border px-4 py-3.5 text-sm transition-colors ${
                  isChecking ? "cursor-not-allowed" : "cursor-pointer"
                } ${containerClass}`}
              >
                <RadioGroupItem
                  value={String(index)}
                  id={`choice-${index}`}
                  className={`shrink-0 ${radioClass}`}
                  icon={customIcon}
                  showIconAlways={isChecking && (isAnswer || (isSelected && !isAnswer))}
                />
                <span>{choice}</span>
              </label>
            )
          })}
        </RadioGroup>
      </section>

      <ChoiceQuestionFooter
        disabled={!isCtaEnabled || isChecking}
        previousDisabled={isChecking}
        onClick={onCheckAnswer}
        onPrevious={onPrevious}
        fixed={false}
      >
        정답 확인
      </ChoiceQuestionFooter>
    </>
  )
}
