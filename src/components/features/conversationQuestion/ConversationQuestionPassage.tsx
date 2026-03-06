import { useEffect, useRef, useState } from "react"
import QuizFooter from "@/components/layout/QuizFooter"
import type { ChoiceQuestionItem } from "@/data/mock/choiceQuestion"
import QuestionPassage from "@/components/common/QuestionPassage"

type ConversationQuestionPassageProps = {
  questionData: ChoiceQuestionItem
  onSolve: () => void
  /** true면 말풍선 애니메이션 없이 전체 대화를 바로 표시 (뒤로 돌아올 때) */
  skipAnimation?: boolean
}

/** 말풍선 하나씩 뿅뿅 나타나는 대화형 지문 화면 */
export default function ConversationQuestionPassage({
  questionData,
  onSolve,
  skipAnimation = false,
}: ConversationQuestionPassageProps) {
  const conversations = questionData.conversations || []
  const conversationSpeakers = questionData.conversationSpeakers || []
  const conversationInfoBox = questionData.conversationInfoBox

  // skipAnimation이면 처음부터 전체 표시, 아니면 0부터 시작
  const [visibleCount, setVisibleCount] = useState(() =>
    skipAnimation ? (questionData.conversations?.length ?? 0) : 0
  )
  // 타이핑 인디케이터 표시 여부 (다음 말풍선 등장 전 잠깐 보임)
  const [showTyping, setShowTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const totalBubbles = conversations.length
  const allVisible = visibleCount >= totalBubbles

  // 새 문제로 바뀌면 초기화 (skipAnimation이면 전체 즉시 표시)
  useEffect(() => {
    setVisibleCount(skipAnimation ? conversations.length : 0)
    setShowTyping(false)
  }, [questionData, skipAnimation, conversations.length])

  // 말풍선을 하나씩 순서대로 표시:
  // 1) 타이핑 인디케이터를 먼저 보이고 (800ms~)
  // 2) 이후 실제 말풍선 등장 (메시지 길이에 비례)
  useEffect(() => {
    if (visibleCount >= totalBubbles) return

    const prevMessage = visibleCount > 0 ? conversations[visibleCount - 1]?.message ?? "" : ""
    const readingDelay = visibleCount === 0 ? 400 : Math.min(2000, Math.max(700, prevMessage.length * 30))

    // 첫 번째 말풍선은 타이핑 인디케이터 없이 바로 등장
    if (visibleCount === 0) {
      const t = setTimeout(() => setVisibleCount(1), readingDelay)
      return () => clearTimeout(t)
    }

    // 두 번째 말풍선부터 타이핑 인디케이터 → 말풍선 순서로 표시
    const typingTimer = setTimeout(() => setShowTyping(true), readingDelay)
    const bubbleTimer = setTimeout(() => {
      setShowTyping(false)
      setVisibleCount((prev: number) => prev + 1)
    }, readingDelay + 900)

    return () => {
      clearTimeout(typingTimer)
      clearTimeout(bubbleTimer)
    }
  }, [visibleCount, totalBubbles, conversations])

  // 새 말풍선/타이핑 인디케이터 나올 때마다 스크롤 아래로
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [visibleCount, showTyping])

  const nextConv = conversations[visibleCount]
  const nextSpeaker = conversationSpeakers.find((s) => s.id === nextConv?.speakerId)
  const nextIsLeft = nextSpeaker?.position === "left"

  return (
    <>
      <section
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50"
        data-mode="conversation"
      >
        <QuestionPassage
          passage={questionData.passage}
          flavorText={questionData.flavorText}
        >
          <div className="flex flex-col gap-3 py-5">
            {/* ✅ 이미 나타난 말풍선만 렌더링 (공간 낭비 없음) */}
            {conversations.slice(0, visibleCount).map((conv) => {
              const speaker = conversationSpeakers.find((s) => s.id === conv.speakerId)
              const isLeft = speaker?.position === "left"

              const alignClass = isLeft ? "justify-start" : "justify-end"
              const bubbleClass = isLeft
                ? "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm"
                : "bg-slate-700 text-white rounded-br-none shadow-sm"

              return (
                <div
                  key={conv.id}
                  className={`flex w-full ${alignClass} items-end gap-2 animate-bubble-in`}
                >
                  {/* 왼쪽 프로필 */}
                  {isLeft && (
                    <div className="shrink-0 mb-1">
                      {speaker?.profileImageUrl ? (
                        <img
                          src={speaker.profileImageUrl}
                          alt={speaker.name || "profile"}
                          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center text-xs text-white font-bold">
                          {speaker?.name?.[0] ?? "?"}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 말풍선 */}
                  <div className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-[14.5px] leading-relaxed ${bubbleClass}`}>
                    {conv.message.split("\n").map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </div>

                  {/* 오른쪽 프로필 */}
                  {!isLeft && (
                    <div className="shrink-0 mb-1">
                      {speaker?.profileImageUrl ? (
                        <img
                          src={speaker.profileImageUrl}
                          alt={speaker.name || "나"}
                          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-indigo-400 flex items-center justify-center text-xs text-white font-bold">
                          나
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {/* ✅ 타이핑 인디케이터: 다음 말풍선 바로 아래에 같은 방향으로 위치 */}
            {showTyping && nextConv && (
              <div className={`flex items-end gap-2 animate-bubble-in ${nextIsLeft ? "justify-start" : "justify-end"}`}>
                {nextIsLeft && nextSpeaker?.profileImageUrl && (
                  <img
                    src={nextSpeaker.profileImageUrl}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm mb-1"
                  />
                )}
                <div className={`flex gap-1.5 px-4 py-3.5 rounded-2xl shadow-sm ${nextIsLeft ? "bg-white border border-slate-200 rounded-bl-none" : "bg-slate-700/80 rounded-br-none"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0ms] ${nextIsLeft ? "bg-slate-400" : "bg-white/70"}`} />
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:150ms] ${nextIsLeft ? "bg-slate-400" : "bg-white/70"}`} />
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:300ms] ${nextIsLeft ? "bg-slate-400" : "bg-white/70"}`} />
                </div>
                {!nextIsLeft && nextSpeaker?.profileImageUrl && (
                  <img
                    src={nextSpeaker.profileImageUrl}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm mb-1"
                  />
                )}
              </div>
            )}

            {/* 대화 하단 안내 박스 */}
            {allVisible && conversationInfoBox && (
              <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-100 p-5 animate-bubble-in shadow-sm">
                <h4 className="flex items-center gap-2 text-sm font-bold text-amber-900 mb-2">
                  <span className="text-lg">💡</span> {conversationInfoBox.title}
                </h4>
                <p className="text-sm text-amber-800 leading-relaxed opacity-90">{conversationInfoBox.content}</p>
              </div>
            )}
          </div>
        </QuestionPassage>
      </section>

      <style>{`
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        .animate-bubble-in {
          animation: bubbleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>

      <QuizFooter onClick={onSolve} disabled={!allVisible}>
        문제 풀기
      </QuizFooter>
    </>
  )
}
