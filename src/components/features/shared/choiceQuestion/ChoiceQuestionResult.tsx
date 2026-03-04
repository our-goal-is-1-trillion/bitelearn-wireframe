import ChoiceQuestionFooter from "./ChoiceQuestionFooter"

type ChoiceQuestionResultProps = {
  isCorrect: boolean
  correctAnswerText: string
  selectedAnswerText: string
  explanation: string
  characterImageUrl?: string
  isLastQuestion: boolean
  onNext: () => void
}

export default function ChoiceQuestionResult({
  isCorrect,
  correctAnswerText,
  selectedAnswerText,
  explanation,
  characterImageUrl = "/vite.svg",
  isLastQuestion,
  onNext,
}: ChoiceQuestionResultProps) {
  return (
    <div className="flex h-full w-full flex-col animate-in fade-in slide-in-from-right-8 duration-500">
      <section className="flex-1 overflow-y-auto px-6">
        {isCorrect ? (
          <div className="flex flex-col items-center gap-2 pb-6">
            <img src={characterImageUrl} alt="정답 캐릭터" className="h-[120px] w-[120px] object-contain" />
            <h2 className="text-base font-semibold text-slate-600">맞혔습니다!</h2>
          </div>
        ) : (
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-base font-semibold text-slate-600">틀렸습니다.</h2>
            <img src={characterImageUrl} alt="오답 캐릭터" className="h-[120px] w-[120px] object-contain" />
          </div>
        )}

        {!isCorrect && (
          <div className="mb-3 rounded-md border border-[#e2caca] bg-[#f8e1e1] px-4 py-4">
            <p className="text-sm font-normal text-slate-900">내가 선택한 답</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-900">{selectedAnswerText}</p>
          </div>
        )}

        <div className="mb-3 rounded-md border border-[#cbe2ca] bg-[#e6f8e1] px-4 py-4">
          <p className="text-sm font-normal text-slate-900">정답</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-900">{correctAnswerText}</p>
        </div>

        <div className="rounded-md border border-slate-300 bg-white px-4 py-4">
          <p className="text-sm font-normal text-slate-900">해설</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-900">{explanation}</p>
        </div>
      </section>

      <ChoiceQuestionFooter onClick={onNext}>
        {isLastQuestion ? "최종 결과 확인" : "다음 문제"}
      </ChoiceQuestionFooter>
    </div>
  )
}
