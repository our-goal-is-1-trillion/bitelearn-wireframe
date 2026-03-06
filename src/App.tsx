import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Home from "@/components/features/home/Home"
import DashboardHome from "@/components/features/dashboard/DashboardHome"
import {
  DASHBOARD_CATEGORIES,
  DASHBOARD_TABS,
  DASHBOARD_TODAY_RECOMMENDATIONS,
} from "@/components/features/dashboard/dashboard.constants"
import WordLearning from "@/components/features/wordLearning/WordLearning"
import ChoiceQuestion from "@/pages/ChoiceQuestion"
import ChoiceQuestionBottomSheet from "@/components/features/choiceQuestion/ChoiceQuestionBottomSheet"
import ChoiceQuestionInlineScroll from "@/components/features/choiceQuestion/ChoiceQuestionInlineScroll"
import OxQuestion from "@/components/features/oxQuestion/OxQuestion"
import OxQuestionBottomSheet from "@/components/features/oxQuestion/OxQuestionBottomSheet"
import OxQuestionInlineScroll from "@/components/features/oxQuestion/OxQuestionInlineScroll"
import ConversationQuestion from "@/components/features/conversationQuestion/ConversationQuestion"
import DocumentChoiceQuestion from "@/components/features/documentChoiceQuestion/DocumentChoiceQuestion"
import DocumentClickQuestion from "@/components/features/documentClickQuestion/DocumentClickQuestion"
import QuizLayoutWrapper from "@/components/layout/QuizLayoutWrapper"
import type { QuizVariant } from "@/components/layout/QuizLayoutWrapper"
import Result from "@/pages/Result"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Mypage from "@/pages/Mypage"
import ArticleDetail from "@/components/features/article/ArticleDetail"
import ArticleList from "@/components/features/article/ArticleList"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"
import ChapterList from "@/components/features/chapter/ChapterList"
import LearningNote from "@/pages/LearningNote"
import LearningHome from "@/components/features/chapter/LearningHome"
import ChapterPlayer from "@/components/features/chapter/ChapterPlayer"

export type QuizResultData = {
  total: number
  correct: number
  timeSpent?: number
}

export type Page =
  | "home"
  | "choiceQuestion"
  | "choiceQuestionBottomSheet"
  | "choiceQuestionInline"
  | "oxQuestion"
  | "oxQuestionBottomSheet"
  | "oxQuestionInline"
  | "conversationQuestion"
  | "documentChoiceQuestion"
  | "documentClickQuestion"
  | "result"
  | "resultPerfect"
  | "resultClose"
  | "resultFail"
  | "dashBoard"
  | "wordLearning"
  | "article"
  | "articleList"
  | "login"
  | "signup"
  | "mypage"
  | "chapterList"
  | "mistakeNote"
  | "learningHome"
  | "chapterPlayer"

type TransitionStage = "idle" | "out" | "in"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [targetPage, setTargetPage] = useState<Page | null>(null)
  const [transitionStage, setTransitionStage] = useState<TransitionStage>("idle")
  const [quizResult, setQuizResult] = useState<QuizResultData | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("real-estate")

  useEffect(() => {
    if (transitionStage === "out" && targetPage) {
      const t = window.setTimeout(() => {
        setPage(targetPage)
        setTransitionStage("in")
      }, 180)
      return () => window.clearTimeout(t)
    }
    if (transitionStage === "in") {
      const t = window.setTimeout(() => {
        setTransitionStage("idle")
        setTargetPage(null)
      }, 260)
      return () => window.clearTimeout(t)
    }
  }, [transitionStage, targetPage])

  const handleNavigate = (next: Page) => {
    if (transitionStage !== "idle") return
    if (next !== "result") setQuizResult(null)
    setTargetPage(next)
    setTransitionStage("out")
  }

  const handleTabClick = (label: string) => {
    switch (label) {
      case "홈": handleNavigate("dashBoard"); break;
      case "학습": handleNavigate("learningHome"); break;
      case "노트": handleNavigate("mistakeNote"); break;
      case "아티클": handleNavigate("articleList"); break;
      case "마이": handleNavigate("mypage"); break;
      default: break;
    }
  }

  const handleCompleteQuiz = (total: number, correct: number) => {
    setQuizResult({ total, correct, timeSpent: 125 })
    handleNavigate("result")
  }

  const transitionClass =
    transitionStage === "out"
      ? "page-transition-out"
      : transitionStage === "in"
        ? "page-transition-in"
        : ""

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onNavigate={handleNavigate} />

      case "wordLearning":
        return (
          <WordLearning
            wordSet={MOCK_CHOICE_QUESTION_SET}
            onBack={() => handleNavigate("home")}
          />
        )

      case "articleList":
        return (
          <ArticleList
            onSelectArticle={() => handleNavigate("article")}
            onTabClick={handleTabClick}
          />
        )

      case "article":
        return <ArticleDetail onBack={() => handleNavigate("articleList")} />

      case "choiceQuestion":
      case "choiceQuestionBottomSheet":
      case "choiceQuestionInline":
        return (
          <QuizLayoutWrapper
            currentVariant={page as QuizVariant}
            onVariantChange={(v) => handleNavigate(v as Page)}
          >
            {page === "choiceQuestion" && (
              <ChoiceQuestion onComplete={handleCompleteQuiz} />
            )}
            {page === "choiceQuestionBottomSheet" && (
              <ChoiceQuestionBottomSheet onComplete={handleCompleteQuiz} />
            )}
            {page === "choiceQuestionInline" && (
              <ChoiceQuestionInlineScroll onComplete={handleCompleteQuiz} />
            )}
          </QuizLayoutWrapper>
        )

      case "oxQuestion":
      case "oxQuestionBottomSheet":
      case "oxQuestionInline":
        return (
          <QuizLayoutWrapper
            currentVariant={page as QuizVariant}
            onVariantChange={(v) => handleNavigate(v as Page)}
          >
            {page === "oxQuestion" && (
              <OxQuestion onComplete={handleCompleteQuiz} />
            )}
            {page === "oxQuestionBottomSheet" && (
              <OxQuestionBottomSheet onComplete={handleCompleteQuiz} />
            )}
            {page === "oxQuestionInline" && (
              <OxQuestionInlineScroll onComplete={handleCompleteQuiz} />
            )}
          </QuizLayoutWrapper>
        )

      case "conversationQuestion":
        return <ConversationQuestion onComplete={handleCompleteQuiz} />

      case "documentChoiceQuestion":
        return <DocumentChoiceQuestion onComplete={handleCompleteQuiz} />

      case "documentClickQuestion":
        return <DocumentClickQuestion onComplete={handleCompleteQuiz} />

      case "result":
        return (
          <Result
            resultData={quizResult}
            onFinish={() => handleNavigate("home")}
          />
        )

      case "resultPerfect":
        return <Result resultData={null} variant="perfect" onFinish={() => handleNavigate("home")} />
      case "resultClose":
        return <Result resultData={null} variant="close" onFinish={() => handleNavigate("home")} />
      case "resultFail":
        return <Result resultData={null} variant="fail" onFinish={() => handleNavigate("home")} />


      case "dashBoard":
        return (
          <DashboardHome
            tabs={DASHBOARD_TABS.map(t => ({ ...t, active: t.label === "홈" }))}
            categories={DASHBOARD_CATEGORIES}
            recommendations={DASHBOARD_TODAY_RECOMMENDATIONS}
            onMoveToChapter={() => handleNavigate("learningHome")}
            onMoveToLogin={() => handleNavigate("login")}
            onTabClick={handleTabClick}
            headerTitle="BiteLearn"
            headerSubtitle="로그인하고 맞춤 학습을 시작해보세요."
            continueHeadline="학습이 처음인 당신을 위해"
            continueCategory="부동산 · 주거"
            continueLessonTitle="전세사기 예방 기초"
            continueMeta="처음 시작 · 약 5분"
          />
        )

      case "login":
        return (
          <Login
            onBack={() => handleNavigate("home")}
            onSignup={() => handleNavigate("signup")}
          />
        )

      case "signup":
        return (
          <Signup
            onLogin={() => handleNavigate("login")}
            onSuccess={() => handleNavigate("login")}
          />
        )

      case "mypage":
        return <Mypage />

      case "learningHome":
        return (
          <LearningHome
            onSelectCategory={(id) => {
              setSelectedCategoryId(id)
              handleNavigate("chapterList")
            }}
            onTabClick={handleTabClick}
          />
        )

      case "chapterList":
        return (
          <ChapterList
            initialCategoryId={selectedCategoryId}
            onBack={() => handleNavigate("learningHome")}
            onSelectChapter={() => handleNavigate("chapterPlayer")}
            onTabClick={handleTabClick}
          />
        )

      case "chapterPlayer":
        return (
          <ChapterPlayer
            onBack={() => handleNavigate("chapterList")}
            onComplete={(total, correct) => {
              setQuizResult({ total, correct })
              handleNavigate("result")
            }}
          />
        )

      case "mistakeNote":
        return <LearningNote onTabClick={handleTabClick} />

      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  const showIAButton = page !== "home"

  return (
    <div className={transitionClass}>
      {showIAButton && (
        <Button
          variant="outline"
          size="sm"
          className="fixed left-4 top-4 z-30"
          onClick={() => handleNavigate("home")}
        >
          🗺️ IA 홈으로
        </Button>
      )}
      {renderPage()}
    </div>
  )
}
