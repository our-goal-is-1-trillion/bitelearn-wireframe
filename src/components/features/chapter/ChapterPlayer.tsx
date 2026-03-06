import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, MousePointerClick } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"
import type { ChoiceQuestionItem } from "@/data/mock/choiceQuestion"

// ─── Types ──────────────────────────────────────────────────
type InnerPhase = "passage" | "choices" | "checking" | "result"

type ChapterPlayerProps = {
  onComplete: (total: number, correct: number) => void
  onBack: () => void
}

// ─── Constants ──────────────────────────────────────────────
const QUESTIONS = MOCK_CHOICE_QUESTION_SET.questions
const TOTAL = QUESTIONS.length
const QUIZ_TOTAL = QUESTIONS.filter((q) => q.type === "quiz").length

function getSectionLabel(q: ChoiceQuestionItem): string {
  if (q.type === "word") return "생존 단어장"
  if (q.passageMode === "conversation") return "상황형 퀴즈"
  if (q.choiceMode === "document_select") return "서류 오답 찾기"
  if (q.passageMode === "document") return "서류 정밀 검토"
  if (q.choiceMode === "ox") return "OX 퀴즈"
  return "지문형 퀴즈"
}

// ─── Chapter Done Screen ─────────────────────────────────────
function ChapterDoneScreen({
  metrics,
  chapterTitle,
  onFinish,
}: {
  metrics: ("none" | "correct" | "incorrect")[]
  chapterTitle: string
  onFinish: () => void
}) {
  const quizCorrect = metrics.filter((m, i) => QUESTIONS[i].type === "quiz" && m === "correct").length
  const pct = QUIZ_TOTAL > 0 ? Math.round((quizCorrect / QUIZ_TOTAL) * 100) : 0

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="flex h-full flex-col items-center justify-center border border-slate-200 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex w-full flex-col items-center text-center"
        >
          <div className="mb-6 h-16 w-16 rounded-3xl bg-slate-900 flex items-center justify-center">
            <Check size={32} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">챕터 완료!</h1>
          <p className="text-sm text-slate-400 mb-10 max-w-[260px] leading-snug">{chapterTitle}</p>

          <div className="w-full rounded-3xl border-2 border-slate-100 bg-slate-50 p-6 mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">퀴즈 결과</p>
            <div className="flex items-end justify-between mb-3">
              <span className="text-4xl font-black text-slate-900 leading-none">{pct}%</span>
              <span className="text-sm text-slate-400 mb-0.5">{quizCorrect} / {QUIZ_TOTAL} 정답</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-slate-900"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {metrics.map((m, i) => {
                const q = QUESTIONS[i]
                if (q.type === "word") return (
                  <div key={i} className="h-2 w-2 rounded-full bg-blue-400 opacity-60" />
                )
                return (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      m === "correct" ? "bg-emerald-500" : m === "incorrect" ? "bg-rose-500" : "bg-slate-200"
                    }`}
                  />
                )
              })}
            </div>
          </div>

          <Button
            className="w-full h-14 rounded-2xl text-base font-bold"
            onClick={onFinish}
          >
            최종 결과 확인
          </Button>
        </motion.div>
      </div>
    </main>
  )
}

// ─── Document Result View ─────────────────────────────────────
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
        {/* Character image header — same layout as ChoiceQuestionResult */}
        {isCorrect ? (
          <div className="flex flex-col items-center gap-2 pb-6">
            {characterImageUrl && (
              <img
                src={characterImageUrl}
                alt="정답 캐릭터"
                className="h-[120px] w-[120px] object-contain"
              />
            )}
            <h2 className="text-base font-semibold text-slate-600">완벽하게 찾아냈어요!</h2>
          </div>
        ) : (
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-base font-semibold text-slate-600">아쉬워요, 다시 확인해볼까요?</h2>
            {characterImageUrl && (
              <img
                src={characterImageUrl}
                alt="오답 캐릭터"
                className="h-[120px] w-[120px] object-contain"
              />
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

        <div className="rounded-md border border-slate-300 bg-white px-4 py-4">
          <p className="text-sm font-normal text-slate-900">해설</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-900">{explanation}</p>
        </div>
      </section>

      <QuizFooter onClick={onNext}>
        {isLast ? "최종 결과 확인" : "다음 문제"}
      </QuizFooter>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────
export default function ChapterPlayer({ onComplete, onBack }: ChapterPlayerProps) {
  const [qIdx, setQIdx] = useState(0)
  const [innerPhase, setInnerPhase] = useState<InnerPhase>("passage")
  const [selectedChoice, setSelectedChoice] = useState("")
  const [wordFlipped, setWordFlipped] = useState(false)
  const [wordDirection, setWordDirection] = useState(1) // 1: next →, -1: prev ←
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(TOTAL).fill("none")
  )
  const [seenPassages, setSeenPassages] = useState<Set<number>>(new Set())
  const [isDone, setIsDone] = useState(false)

  const currentQ = QUESTIONS[qIdx]
  const isLastQ = qIdx >= TOTAL - 1
  const isCorrect = selectedChoice !== "" && Number(selectedChoice) === currentQ.correctIndex

  // ── Navigation helpers ───────────────────────────────────
  const goNextQuestion = () => {
    if (isLastQ) { setIsDone(true); return }
    setWordDirection(1)
    setQIdx((prev) => prev + 1)
    setInnerPhase("passage")
    setSelectedChoice("")
    setWordFlipped(false)
  }

  const goPassage = () => {
    setInnerPhase("passage")
    setSelectedChoice("")
  }

  const handleSolve = () => {
    if (currentQ.passageMode === "conversation") {
      setSeenPassages((prev) => new Set(prev).add(qIdx))
    }
    setInnerPhase("choices")
  }

  const handleCheckAnswer = (selectedIndex?: number | React.MouseEvent) => {
    const isEvent = selectedIndex && typeof selectedIndex !== "number"
    const resolved =
      !isEvent && selectedIndex !== undefined ? String(selectedIndex) : selectedChoice
    if (resolved === "") return

    const correct = Number(resolved) === currentQ.correctIndex
    setSelectedChoice(resolved)
    setInnerPhase("checking")
    setMetrics((prev) => {
      const next = [...prev]
      next[qIdx] = correct ? "correct" : "incorrect"
      return next
    })
    const delay = currentQ.choiceMode === "document_select" ? 2400 : 1400
    setTimeout(() => setInnerPhase("result"), delay)
  }

  // ── Indicator ────────────────────────────────────────────
  const indicatorSteps: StepIndicatorInfo[] = QUESTIONS.map((q, idx) => ({
    type: q.type ?? "quiz",
    status: metrics[idx],
    isCurrent: idx === qIdx,
  }))

  // ── Done screen ──────────────────────────────────────────
  if (isDone) {
    return (
      <ChapterDoneScreen
        metrics={metrics}
        chapterTitle={MOCK_CHOICE_QUESTION_SET.title}
        onFinish={() => {
          const correct = metrics.filter((m, i) => QUESTIONS[i].type === "quiz" && m === "correct").length
          onComplete(QUIZ_TOTAL, correct)
        }}
      />
    )
  }

  // ── Word card slide variants ──────────────────────────────
  const wordSlideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "110%" : "-110%",
      opacity: 0,
      scale: 0.92,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-110%" : "110%",
      opacity: 0,
      scale: 0.92,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  }

  // ── Word card ────────────────────────────────────────────
  const renderWordCard = () => {
    const isFirstWord = qIdx === 0 || QUESTIONS[qIdx - 1]?.type !== "word"
    const isLastWord = isLastQ || QUESTIONS[qIdx + 1]?.type !== "word"

    return (
      <>
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={wordDirection}>
            <motion.div
              key={qIdx}
              custom={wordDirection}
              variants={wordSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-[310px] perspective-1000 h-[460px]"
            >
              <motion.div
                className="w-full h-full relative preserve-3d cursor-pointer rounded-2xl shadow-md"
                animate={{ rotateY: wordFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setWordFlipped(!wordFlipped)}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="flex-1 bg-slate-100 flex items-center justify-center overflow-hidden">
                    {currentQ.imageUrl ? (
                      <img
                        src={currentQ.imageUrl}
                        alt={currentQ.imageAlt}
                        className="w-full h-full object-cover grayscale opacity-90"
                      />
                    ) : (
                      <span className="text-5xl opacity-30">📖</span>
                    )}
                  </div>
                  <div className="shrink-0 flex flex-col items-center p-6 text-center bg-white border-t border-slate-100">
                    <div className="mb-2 bg-slate-100 px-3 py-1 rounded-full">
                      <span className="text-[11px] font-bold text-slate-500">{currentQ.flavorText}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">{currentQ.choices[0]}</h2>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MousePointerClick size={13} />
                      <span className="text-xs font-medium">터치해서 의미 확인</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col bg-slate-800 rounded-2xl overflow-hidden text-white p-7">
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-base font-bold mb-4 text-center leading-tight">{currentQ.question}</h3>
                    <div className="w-8 h-px bg-slate-600 mb-5 mx-auto" />
                    <p className="text-[13px] font-medium leading-relaxed text-slate-300 text-center whitespace-pre-line">
                      {currentQ.passage}
                    </p>
                    <div className="mt-5 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <p className="text-xs text-slate-400 leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <QuizFooter
          disabled={!wordFlipped}
          previousDisabled={isFirstWord}
          onClick={goNextQuestion}
          onPrevious={isFirstWord ? undefined : () => {
            setWordDirection(-1)
            setQIdx((prev) => prev - 1)
            setWordFlipped(false)
          }}
        >
          {isLastWord ? "단어 학습 완료" : "다음 단어"}
        </QuizFooter>
      </>
    )
  }

  // ── Text passage ─────────────────────────────────────────
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

  // ── Document passage (read-only) ─────────────────────────
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
          <DocumentCard
            data={currentQ.documentCard}
            mode="interactive"
            choiceMode="multiple"
          />
        )}
      </section>
      <QuizFooter onClick={handleSolve}>문제 풀기</QuizFooter>
    </>
  )

  // ── Document select choices/checking ─────────────────────
  const renderDocumentSelect = () => (
    <>
      <section className="flex-1 overflow-y-auto px-5 pb-4">
        <h2 className="mb-4 text-base font-bold text-slate-900 leading-tight">
          <span className="text-slate-400 text-sm font-normal mr-1.5">Q{currentQ.questionNumber}.</span>
          {currentQ.question}
        </h2>
        {currentQ.documentCard && (
          <DocumentCard
            data={currentQ.documentCard}
            mode="interactive"
            choiceMode="document_select"
            selectedValue={selectedChoice}
            onSelectField={setSelectedChoice}
            isChecking={innerPhase === "checking"}
            correctIndex={currentQ.correctIndex}
          />
        )}
      </section>
      <QuizFooter
        disabled={selectedChoice === "" || innerPhase === "checking"}
        previousDisabled={innerPhase === "checking"}
        onClick={handleCheckAnswer}
        onPrevious={goPassage}
      >
        {innerPhase === "checking" ? "서류 스캔 중..." : "정답 확인하기"}
      </QuizFooter>
    </>
  )

  // ── Dispatch ─────────────────────────────────────────────
  const renderContent = () => {
    if (currentQ.type === "word") return renderWordCard()

    switch (innerPhase) {
      case "passage":
        if (currentQ.passageMode === "conversation") {
          return (
            <ConversationQuestionPassage
              questionData={currentQ}
              onSolve={handleSolve}
              skipAnimation={seenPassages.has(qIdx)}
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
              questionNumber={currentQ.questionNumber}
              question={currentQ.question}
              correctIndex={currentQ.correctIndex}
              onCheckAnswer={handleCheckAnswer}
              isChecking={innerPhase === "checking"}
              onPrevious={goPassage}
            />
          )
        }
        return (
          <ChoiceQuestionChoices
            questionNumber={currentQ.questionNumber}
            question={currentQ.question}
            choices={currentQ.choices}
            choiceMode="multiple"
            selectedValue={selectedChoice}
            onSelectChoice={setSelectedChoice}
            onCheckAnswer={handleCheckAnswer}
            isChecking={innerPhase === "checking"}
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
              onNext={goNextQuestion}
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
            onNext={goNextQuestion}
          />
        )
      }
    }
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pt-14">
        {/* Header */}
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader
            title={getSectionLabel(currentQ)}
            showCloseButton
            onCloseClick={onBack}
          />
        </div>

        {/* Progress indicator (hide in result phase) */}
        {innerPhase !== "result" && currentQ.type !== "word" && (
          <>
            <ChoiceQuestionIndicator steps={indicatorSteps} />
            {currentQ.imageUrl && (
              <ChoiceQuestionImage src={currentQ.imageUrl} alt={currentQ.imageAlt} />
            )}
          </>
        )}
        {innerPhase !== "result" && currentQ.type === "word" && (
          <ChoiceQuestionIndicator steps={indicatorSteps} />
        )}

        {/* Main content */}
        {renderContent()}
      </div>
    </main>
  )
}
