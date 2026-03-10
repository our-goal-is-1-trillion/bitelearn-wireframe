import { useState } from "react"
import WordCardsPlayer from "@/components/features/quiz/WordCardsPlayer"
import type { ChoiceQuestionSet } from "@/data/mock/choiceQuestion"

type WordLearningProps = {
  /** 퀴즈의 원본 세트 데이터 (여기서 word 타입만 필터링하여 사용) */
  wordSet: ChoiceQuestionSet
  /** 홈이나 이전 화면으로 돌아가는 함수 */
  onBack: () => void
  /** 앱 갤러리 렌더링용 강제 상태 */
  demoState?: { showBriefing?: boolean; isFlipped?: boolean }
}

/** 
 * 단독 단어 학습 화면 
 * WordCardsPlayer를 재사용하여 일관된 학습 경험을 제공합니다.
 */
  export default function WordLearning({ wordSet, onBack, demoState }: WordLearningProps) {
    // 전체 문항 중 "word" 타입만 추출합니다.
    const words = wordSet.questions.filter((q) => q.type === "word")
    const [wordIdx, setWordIdx] = useState(0)
  
    return (
      <WordCardsPlayer
        words={words}
        wordIdx={wordIdx}
        onWordIdxChange={setWordIdx}
        onComplete={onBack}
        onBack={onBack}
        demoState={demoState}
      />
    )
  }
