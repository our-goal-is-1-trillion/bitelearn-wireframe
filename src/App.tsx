import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ChoiceQuestion from "./components/features/choiceQuestion/ChoiceQuestion"
import ChoiceQuestionBottomSheet from "./components/features/choiceQuestionBottomSheet/ChoiceQuestion"
import Home from "./components/features/home/Home"
import Dashboard from "./components/features/dashboard/Dashboard"
import Result from "./components/features/result/Result"

type Page = "home" | "choiceQuestion" | "choiceQuestionBottomSheet" | "quiz" | "result" | "dashBoard"
type TransitionStage = "idle" | "out" | "in"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [targetPage, setTargetPage] = useState<Page | null>(null)
  const [transitionStage, setTransitionStage] = useState<TransitionStage>("idle")

  useEffect(() => {
    if (transitionStage === "out" && targetPage) {
      const switchTimer = window.setTimeout(() => {
        setPage(targetPage)
        setTransitionStage("in")
      }, 180)

      return () => window.clearTimeout(switchTimer)
    }

    if (transitionStage === "in") {
      const settleTimer = window.setTimeout(() => {
        setTransitionStage("idle")
        setTargetPage(null)
      }, 260)

      return () => window.clearTimeout(settleTimer)
    }
  }, [transitionStage, targetPage])

  const handleNavigate = (next: Page) => {
    if (transitionStage !== "idle") return
    setTargetPage(next)
    setTransitionStage("out")
  }

  const transitionClass =
    transitionStage === "out" ? "page-transition-out" : transitionStage === "in" ? "page-transition-in" : ""

  const renderPage = () => {
    switch (page) {
      case "choiceQuestion":
        return <ChoiceQuestion onComplete={() => handleNavigate("result")} />
      case "choiceQuestionBottomSheet":
        return <ChoiceQuestionBottomSheet onComplete={() => handleNavigate("result")} />
      case "result":
        return <Result />
      case "dashBoard":
        return <Dashboard />
      case "home":
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  const isIaHomeButtonVisible = page !== "home"

  return (
    <div className={transitionClass}>
      {isIaHomeButtonVisible ? (
        <Button
          variant="outline"
          size="sm"
          className="fixed left-4 top-4 z-30"
          onClick={() => handleNavigate("home")}
        >
          IA 홈으로
        </Button>
      ) : null}

      {renderPage()}
    </div>
  )
}
