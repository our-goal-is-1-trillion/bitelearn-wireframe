import ChoiceQuestionFooter from "./ChoiceQuestionFooter"

type ChoiceQuestionPassageProps = {
  passage: string
  flavorText: string
  onSolve: () => void
}

export default function ChoiceQuestionPassage({ passage, flavorText, onSolve }: ChoiceQuestionPassageProps) {
  return (
    <>
      <section className="flex-1 overflow-y-auto px-6">
        <div className="rounded-md border border-slate-300 bg-white px-4 py-4">
          <p className="text-sm leading-relaxed text-slate-900">{passage}</p>
        </div>

        <p className="mt-6 text-sm text-black">{flavorText}</p>
      </section>

      <ChoiceQuestionFooter onClick={onSolve}>문제 풀기</ChoiceQuestionFooter>
    </>
  )
}
