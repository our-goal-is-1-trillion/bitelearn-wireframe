import QuizFooter from "@/components/layout/QuizFooter"
import QuestionPassage from "@/components/common/QuestionPassage"
import DocumentCard from "@/components/shared/DocumentCard"
import type { DocumentCardData } from "@/components/shared/DocumentCard"

type ChoiceQuestionPassageProps = {
  passage: string
  flavorText: string
  passageMode?: "text" | "story" | "document"
  documentCard?: DocumentCardData
  choiceMode?: "multiple" | "ox" | "document_select"
  selectedValue?: string
  onSelectDocumentField?: (value: string) => void
  isChecking?: boolean
  correctIndex?: number
  onSolve: () => void
  hideSolveButton?: boolean
}

export default function ChoiceQuestionPassage({
  passage,
  flavorText,
  passageMode = "text",
  documentCard,
  choiceMode = "multiple",
  selectedValue = "",
  onSelectDocumentField,
  isChecking = false,
  correctIndex,
  onSolve,
  hideSolveButton = false,
}: ChoiceQuestionPassageProps) {
  const isDocumentMode = passageMode === "document" && !!documentCard

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6 py-4" data-mode={passageMode}>
        <QuestionPassage
          passage={passage}
          flavorText={flavorText}
        >
          {isDocumentMode && (
            <div className="mt-4">
              <DocumentCard
                data={documentCard}
                mode="interactive"
                choiceMode={choiceMode}
                selectedValue={selectedValue}
                onSelectField={onSelectDocumentField}
                isChecking={isChecking}
                correctIndex={correctIndex}
              />
            </div>
          )}
        </QuestionPassage>
      </section>

      {!hideSolveButton && <QuizFooter onClick={onSolve}>문제 풀기</QuizFooter>}
    </>
  )
}
