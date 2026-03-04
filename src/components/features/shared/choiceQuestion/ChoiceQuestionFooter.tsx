import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"

type ChoiceQuestionFooterProps = {
  disabled?: boolean
  previousDisabled?: boolean
  onClick: () => void
  children: ReactNode
  onPrevious?: () => void
  fixed?: boolean
}

export default function ChoiceQuestionFooter({
  disabled = false,
  previousDisabled = false,
  onClick,
  children,
  onPrevious,
  fixed = true,
}: ChoiceQuestionFooterProps) {
  return (
    <footer
      className={cn(
        "z-20 flex gap-2 border-t border-slate-200 bg-white p-4",
        fixed ? "absolute inset-x-0 bottom-0" : "mt-2"
      )}
    >
      {onPrevious && (
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0 rounded-md bg-white text-slate-600"
          onClick={onPrevious}
          disabled={previousDisabled}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">이전</span>
        </Button>
      )}
      <Button disabled={disabled} className="h-12 flex-1 rounded-md" onClick={onClick}>
        {children}
      </Button>
    </footer>
  )
}
