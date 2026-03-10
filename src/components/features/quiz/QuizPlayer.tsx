import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import QuizHeader from "@/components/layout/QuizHeader"
import QuizFooter from "@/components/layout/QuizFooter"
import ChoiceQuestionIndicator from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import type { StepIndicatorInfo } from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"

import ChoiceQuestionImage from "@/components/features/choiceQuestion/ChoiceQuestionImage"
import ChoiceQuestionChoices from "@/components/features/choiceQuestion/ChoiceQuestionChoices"
import ChoiceQuestionOXChoices from "@/components/features/choiceQuestion/ChoiceQuestionOXChoices"
import ChoiceQuestionResult from "@/components/features/choiceQuestion/ChoiceQuestionResult"
import ConversationQuestionPassage from "@/components/features/conversationQuestion/ConversationQuestionPassage"
import DocumentCard from "@/components/shared/DocumentCard"
import type { ChoiceQuestionItem } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

export type QuizPlayerProps = {
  questions: ChoiceQuestionItem[]
  /**
   * 고정 헤더 타이틀. 미제공 시 현재 문제 유형에서 자동 도출.
   * ChapterPlayer처럼 문제마다 타이틀이 바뀌는 경우 생략합니다.
   */
  headerTitle?: string
  /** 닫기/뒤로 가기 콜백. 미제공 시 닫기 버튼 미표시. */
  onBack?: () => void
  onComplete: (total: number, correct: number) => void
  /** ChapterPlayer에서 내려오는 통합 인디케이터 (미제공 시 로컬 계산) */
  indicatorSteps?: StepIndicatorInfo[]
  /** 현재 문제 인덱스 변경 알림 (ChapterPlayer 통합 인디케이터용) */
  onCurrentIndexChange?: (idx: number) => void
  /** 정오답 메트릭 변경 알림 (ChapterPlayer 통합 인디케이터용) */
  onMetricsChange?: (metrics: ("none" | "correct" | "incorrect")[]) => void
  /** 앱 갤러리 강제 렌더링용 mock 상태 */
  demoState?: {
    phase: "passage" | "choices" | "result"
    isCorrect?: boolean
  }
}

function getSectionLabel(q: ChoiceQuestionItem): string {
  if (q.passageMode === "conversation") return "상황형 퀴즈"
  if (q.choiceMode === "document_select") return "서류 오답 찾기"
  if (q.passageMode === "document") return "서류 정밀 검토"
  if (q.choiceMode === "ox") return "OX 퀴즈"
  return "지문형 퀴즈"
}

// ── Document result (문서 정답 결과 화면) ──────────────────
function DocumentResultView({
  isCorrect,
  explanation,
  documentCard,
  correctIndex,
  selectedAnswerIndex,
  characterImageUrl,
  isLast,
  onNext,
}: {
  isCorrect: boolean
  explanation: string
  documentCard: NonNullable<ChoiceQuestionItem["documentCard"]>
  correctIndex: number
  selectedAnswerIndex?: number
  characterImageUrl?: string
  isLast: boolean
  onNext: () => void
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col animate-in fade-in slide-in-from-right-8 duration-500">
      <section className="flex-1 overflow-y-auto px-6 pb-4">
        {isCorrect ? (
          <div className="flex flex-col items-center gap-2 pt-4 pb-4">
            {characterImageUrl && (
              <img src={characterImageUrl} alt="정답 캐릭터" className="h-[120px] w-[120px] object-contain" />
            )}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center"
            >
              <Check className="text-white" size={22} strokeWidth={3} />
            </motion.div>
            <h2 className="text-xl font-bold text-slate-900">완벽하게 찾아냈어요!</h2>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-4 pb-4">
            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-12 w-12 rounded-2xl bg-slate-200 flex items-center justify-center"
              >
                <X className="text-slate-500" size={22} />
              </motion.div>
              <h2 className="text-xl font-bold text-slate-900">아쉬워요,<br />다시 확인해볼까요?</h2>
            </div>
            {characterImageUrl && (
              <img src={characterImageUrl} alt="오답 캐릭터" className="h-[120px] w-[120px] object-contain" />
            )}
          </div>
        )}

        <div className="mb-5">
          <DocumentCard
            data={documentCard}
            mode="result"
            correctIndex={correctIndex}
            selectedAnswerIndex={selectedAnswerIndex}
          />
        </div>

        <div className="rounded-xl border border-slate-100 bg-white px-4 py-4">
          <p className="text-[10px] font-bold text-slate-400 mb-2">해설</p>
          <p className="text-sm leading-relaxed text-slate-600">{explanation}</p>
        </div>
      </section>

      <QuizFooter onClick={onNext}>
        {isLast ? "최종 결과 확인" : "다음 문제"}
      </QuizFooter>
    </div>
  )
}

// ── Main QuizPlayer ───────────────────────────────────────
export default function QuizPlayer({ questions, headerTitle, onBack, onComplete, indicatorSteps: externalSteps, onCurrentIndexChange, onMetricsChange, demoState }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>(demoState?.phase ?? "passage")
  
  // demoState가 result일 경우 임의의 선택값 지정
  const mockSelectedChoice = demoState?.isCorrect
    ? String(questions[0].correctIndex)
    : String(questions[0].correctIndex === 0 ? 1 : 0) // 오답 선택

  const [selectedChoice, setSelectedChoice] = useState(demoState?.phase === "result" ? mockSelectedChoice : "")
  
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(() => {
    const arr = Array(questions.length).fill("none")
    if (demoState?.phase === "result") {
      arr[0] = demoState.isCorrect ? "correct" : "incorrect"
    }
    return arr
  })
  const [seenPassages, setSeenPassages] = useState<Set<number>>(new Set())

  if (questions.length === 0) {
    return (
      <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 flex items-center justify-center border border-slate-200">
        <p className="text-sm text-slate-400">문제 데이터가 없습니다.</p>
      </main>
    )
  }

  const currentQ = questions[currentIndex]
  const isLastQ = currentIndex >= questions.length - 1
  const isCorrect = selectedChoice !== "" && Number(selectedChoice) === currentQ.correctIndex

  // ── Navigation ────────────────────────────────────────
  const goNext = () => {
    if (isLastQ) {
      const correctCount = metrics.filter((m) => m === "correct").length
      onComplete(questions.length, correctCount)
      return
    }
    const nextIdx = currentIndex + 1
    setCurrentIndex(nextIdx)
    onCurrentIndexChange?.(nextIdx)
    setPhase("passage")
    setSelectedChoice("")
  }

  const goPassage = () => {
    setPhase("passage")
    setSelectedChoice("")
  }

  const handleSolve = () => {
    if (currentQ.passageMode === "conversation") {
      setSeenPassages((prev) => new Set(prev).add(currentIndex))
    }
    setPhase("choices")
  }

  const handleCheckAnswer = (selectedIndex?: number | React.MouseEvent) => {
    const isEvent = selectedIndex && typeof selectedIndex !== "number"
    const resolved =
      !isEvent && selectedIndex !== undefined ? String(selectedIndex) : selectedChoice
    if (resolved === "") return

    const correct = Number(resolved) === currentQ.correctIndex
    setSelectedChoice(resolved)
    setPhase("checking")
    setMetrics((prev) => {
      const next = [...prev]
      next[currentIndex] = correct ? "correct" : "incorrect"
      onMetricsChange?.(next)
      return next
    })
    const delay = currentQ.choiceMode === "document_select" ? 2400 : 1400
    setTimeout(() => setPhase("result"), delay)
  }

  // ── Indicator ─────────────────────────────────────────
  const localSteps: StepIndicatorInfo[] = questions.map((q, idx) => ({
    type: q.type ?? "quiz",
    status: metrics[idx],
    isCurrent: idx === currentIndex,
  }))
  const indicatorSteps = externalSteps ?? localSteps

  const title = headerTitle ?? getSectionLabel(currentQ)

  // ── Passage renderers ─────────────────────────────────
  const renderTextPassage = () => (
    <>
      <section className="flex-1 overflow-y-auto px-5 py-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-4">
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">{currentQ.passage}</p>
        </div>
        {currentQ.flavorText && (
          <div className="flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
            <p className="text-sm font-bold text-slate-900 leading-relaxed">{currentQ.flavorText}</p>
          </div>
        )}
      </section>
      <QuizFooter onClick={handleSolve}>문제 풀기</QuizFooter>
    </>
  )

  const renderDocumentPassage = () => (
    <>
      <section className="flex-1 overflow-y-auto px-5 py-4">
        {currentQ.passage && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-4">
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">{currentQ.passage}</p>
          </div>
        )}
        {currentQ.flavorText && (
          <div className="flex items-start gap-2 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
            <p className="text-sm font-bold text-slate-900 leading-relaxed">{currentQ.flavorText}</p>
          </div>
        )}
        {currentQ.documentCard && (
          <DocumentCard data={currentQ.documentCard} mode="interactive" choiceMode="multiple" />
        )}
      </section>
      <QuizFooter onClick={handleSolve}>문제 풀기</QuizFooter>
    </>
  )

  const renderDocumentSelect = () => (
    <>
      <section className="flex-1 overflow-y-auto px-5 pb-4">
        <h2 className="mb-4 text-base font-bold text-slate-900 leading-tight">
          <span className="text-slate-400 text-sm font-normal mr-1.5">
            Q{currentQ.questionNumber ?? currentIndex + 1}.
          </span>
          {currentQ.question}
        </h2>
        {currentQ.documentCard && (
          <DocumentCard
            data={currentQ.documentCard}
            mode="interactive"
            choiceMode="document_select"
            selectedValue={selectedChoice}
            onSelectField={setSelectedChoice}
            isChecking={phase === "checking"}
            correctIndex={currentQ.correctIndex}
          />
        )}
      </section>
      <QuizFooter
        disabled={selectedChoice === "" || phase === "checking"}
        previousDisabled={phase === "checking"}
        onClick={handleCheckAnswer}
        onPrevious={goPassage}
      >
        {phase === "checking" ? "서류 스캔 중..." : "정답 확인하기"}
      </QuizFooter>
    </>
  )

  // ── Content dispatch ──────────────────────────────────
  const renderContent = () => {
    switch (phase) {
      case "passage":
        if (currentQ.passageMode === "conversation") {
          return (
            <ConversationQuestionPassage
              questionData={currentQ}
              onSolve={handleSolve}
              skipAnimation={seenPassages.has(currentIndex)}
            />
          )
        }
        if (currentQ.passageMode === "document") return renderDocumentPassage()
        return renderTextPassage()

      case "choices":
      case "checking":
        if (currentQ.choiceMode === "document_select") return renderDocumentSelect()
        if (currentQ.choiceMode === "ox") {
          return (
            <ChoiceQuestionOXChoices
              questionNumber={currentQ.questionNumber ?? currentIndex + 1}
              question={currentQ.question}
              correctIndex={currentQ.correctIndex}
              onCheckAnswer={handleCheckAnswer}
              isChecking={phase === "checking"}
              onPrevious={goPassage}
            />
          )
        }
        return (
          <ChoiceQuestionChoices
            questionNumber={currentQ.questionNumber ?? currentIndex + 1}
            question={currentQ.question}
            choices={currentQ.choices}
            choiceMode="multiple"
            selectedValue={selectedChoice}
            onSelectChoice={setSelectedChoice}
            onCheckAnswer={handleCheckAnswer}
            isChecking={phase === "checking"}
            correctIndex={currentQ.correctIndex}
            onPrevious={goPassage}
          />
        )

      case "result": {
        const isDocResult =
          currentQ.passageMode === "document" || currentQ.choiceMode === "document_select"
        const characterImageUrl = isCorrect
          ? (currentQ.characterCorrectImageUrl || "/images/result/dog_perfect.png")
          : (currentQ.characterIncorrectImageUrl || "/images/result/dog_fail.png")

        if (isDocResult && currentQ.documentCard) {
          return (
            <DocumentResultView
              isCorrect={isCorrect}
              explanation={currentQ.explanation}
              documentCard={currentQ.documentCard}
              correctIndex={currentQ.correctIndex}
              selectedAnswerIndex={selectedChoice !== "" ? Number(selectedChoice) : undefined}
              characterImageUrl={characterImageUrl}
              isLast={isLastQ}
              onNext={goNext}
            />
          )
        }

        return (
          <ChoiceQuestionResult
            isCorrect={isCorrect}
            correctAnswerText={currentQ.choices[currentQ.correctIndex] ?? ""}
            selectedAnswerText={selectedChoice !== "" ? (currentQ.choices[Number(selectedChoice)] ?? "") : ""}
            explanation={currentQ.explanation}
            characterImageUrl={characterImageUrl}
            isLastQuestion={isLastQ}
            onNext={goNext}
          />
        )
      }
    }
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader
            title={title}
            showCloseButton={!!onBack}
            onCloseClick={onBack}
          />
        </div>

        <ChoiceQuestionIndicator steps={indicatorSteps} />
        {phase !== "result" && (
          <ChoiceQuestionImage src={currentQ.imageUrl} alt={currentQ.imageAlt} />
        )}

        {renderContent()}
      </div>
    </main>
  )
}
