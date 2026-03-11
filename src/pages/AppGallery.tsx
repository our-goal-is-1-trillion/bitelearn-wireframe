
import { Button } from "@/components/ui/button"
import DashboardHome from "@/components/features/dashboard/DashboardHome"
import {
  DASHBOARD_CATEGORIES,
  DASHBOARD_TABS,
  DASHBOARD_TODAY_RECOMMENDATIONS,
} from "@/components/features/dashboard/dashboard.constants"
import WordLearning from "@/components/features/wordLearning/WordLearning"
import ChoiceQuestion from "@/pages/ChoiceQuestion"
import OxQuestion from "@/components/features/oxQuestion/OxQuestion"
import ConversationQuestion from "@/components/features/conversationQuestion/ConversationQuestion"
import DocumentChoiceQuestion from "@/components/features/documentChoiceQuestion/DocumentChoiceQuestion"
import DocumentClickQuestion from "@/components/features/documentClickQuestion/DocumentClickQuestion"
import QuizLayoutWrapper from "@/components/layout/QuizLayoutWrapper"
import Result from "@/pages/Result"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Mypage from "@/pages/Mypage"
import ArticleDetail from "@/components/features/article/ArticleDetail"
import ArticleList from "@/components/features/article/ArticleList"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"
import { mockArticles } from "@/data/mock/article"
import ChapterList from "@/components/features/chapter/ChapterList"
import LearningNote from "@/pages/LearningNote"
import LearningHome from "@/components/features/chapter/LearningHome"
import ChapterPlayer from "@/components/features/chapter/ChapterPlayer"
import OnboardingModal from "@/components/features/onboarding/OnboardingModal"
import { getBadgeGroups } from "@/components/features/badge/BadgeCollectionDialog"
import { MOCK_USER } from "@/data/mock/user"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import { CheckCircle2, Lock, X } from "lucide-react"

interface AppGalleryProps {
  onBack: () => void
}

const mockQuizResult = { total: 5, correct: 4, timeSpent: 125 }

export default function AppGallery({ onBack }: AppGalleryProps) {
  // Mock implementations for all required props
  const noop = () => {}

  // 뱃지 컬렉터 모달 (앱 갤러리 강제 렌더링용)
  const renderBadgeModal = () => {
    const badgeGroups = getBadgeGroups(MOCK_USER.totalExp, MOCK_CATEGORY_CHAPTERS, MOCK_USER.consecutiveDays)
    return (
      <div className="relative h-full w-full bg-slate-50 overflow-hidden">
        {/* 가짜 배경 (마이페이지) */}
        <Mypage onTabClick={noop} />
        
        {/* 모달 오버레이 및 컨텐츠 */}
        <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="relative w-full max-w-sm max-h-[70vh] flex flex-col rounded-[28px] bg-white p-6 shadow-xl animate-in zoom-in-95">
            <div className="mb-5 pr-6">
              <h2 className="text-base font-extrabold text-slate-900">뱃지 컬렉션</h2>
            </div>
            
            <button className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:opacity-80">
              <X size={15} />
            </button>
            
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-6">
              {badgeGroups.map((group) => (
                <div key={group.group}>
                  <p className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-2.5">
                    {group.group}
                  </p>
                  <div className="flex flex-col gap-2">
                    {group.badges.map((b) => (
                      <div
                        key={b.label}
                        className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 ${
                          b.unlocked
                            ? "border-slate-900 bg-slate-900"
                            : "border-dashed border-slate-200 bg-white opacity-40"
                        }`}
                      >
                        <span className="text-xl shrink-0">{b.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] font-extrabold ${b.unlocked ? "text-white" : "text-slate-900"}`}>
                            {b.label}
                          </p>
                          <p className="text-[11px] font-medium mt-0.5 text-slate-400">
                            {b.desc}
                          </p>
                        </div>
                        {b.unlocked
                          ? <CheckCircle2 size={16} className="text-white shrink-0" />
                          : <Lock size={14} className="text-slate-300 shrink-0" />
                        }
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const screens = [
    { title: "Login", render: () => <Login onBack={noop} onSignup={noop} /> },
    { title: "Signup", render: () => <Signup onLogin={noop} onSuccess={noop} /> },
    { title: "Onboarding Modal", render: () => <div className="h-full bg-slate-100"><OnboardingModal isOpen={true} onClose={noop} /></div> },
    { title: "Dashboard (Guest)", render: () => <DashboardHome userType="guest" tabs={DASHBOARD_TABS} categories={DASHBOARD_CATEGORIES} recommendations={DASHBOARD_TODAY_RECOMMENDATIONS} articles={mockArticles} onMoveToChapter={noop} onMoveToLogin={noop} onMoveToArticle={noop} onTabClick={noop} /> },
    { title: "Dashboard (New)", render: () => <DashboardHome userType="new" tabs={DASHBOARD_TABS} categories={DASHBOARD_CATEGORIES} recommendations={DASHBOARD_TODAY_RECOMMENDATIONS} articles={mockArticles} onMoveToChapter={noop} onMoveToLogin={noop} onMoveToArticle={noop} onTabClick={noop} /> },
    { title: "Dashboard (Active)", render: () => <DashboardHome userType="active" tabs={DASHBOARD_TABS.map(t => ({...t, active: t.label === "홈"}))} categories={DASHBOARD_CATEGORIES} recommendations={DASHBOARD_TODAY_RECOMMENDATIONS} articles={mockArticles} onMoveToChapter={noop} onMoveToLogin={noop} onMoveToArticle={noop} onTabClick={noop} /> },
    { title: "Learning Home", render: () => <LearningHome onSelectCategory={noop} onTabClick={noop} /> },
    { title: "Chapter List", render: () => <ChapterList initialCategoryId="real-estate" onBack={noop} onSelectChapter={noop} onTabClick={noop} /> },
    { title: "Chapter Player", render: () => <ChapterPlayer onBack={noop} onComplete={noop} /> },
    { title: "Word Learning (학습 - 단어)", render: () => <WordLearning wordSet={MOCK_CHOICE_QUESTION_SET} onBack={noop} demoState={{ isFlipped: false }} /> },
    { title: "Word Learning (학습 - 뜻)", render: () => <WordLearning wordSet={MOCK_CHOICE_QUESTION_SET} onBack={noop} demoState={{ isFlipped: true }} /> },
    { title: "Word Learning (완료)", render: () => <WordLearning wordSet={MOCK_CHOICE_QUESTION_SET} onBack={noop} demoState={{ showBriefing: true }} /> },
    
    { title: "Choice Question (지문)", render: () => <QuizLayoutWrapper hideMockup currentVariant="choiceQuestion" onVariantChange={noop}><ChoiceQuestion onComplete={noop} demoState={{phase: "passage"}} /></QuizLayoutWrapper> },
    { title: "Choice Question (풀이)", render: () => <QuizLayoutWrapper hideMockup currentVariant="choiceQuestion" onVariantChange={noop}><ChoiceQuestion onComplete={noop} demoState={{phase: "choices"}} /></QuizLayoutWrapper> },
    { title: "Choice Question (정답)", render: () => <QuizLayoutWrapper hideMockup currentVariant="choiceQuestion" onVariantChange={noop}><ChoiceQuestion onComplete={noop} demoState={{phase: "result", isCorrect: true}} /></QuizLayoutWrapper> },
    { title: "Choice Question (오답)", render: () => <QuizLayoutWrapper hideMockup currentVariant="choiceQuestion" onVariantChange={noop}><ChoiceQuestion onComplete={noop} demoState={{phase: "result", isCorrect: false}} /></QuizLayoutWrapper> },

    { title: "OX Question (지문)", render: () => <QuizLayoutWrapper hideMockup currentVariant="oxQuestion" onVariantChange={noop}><OxQuestion onComplete={noop} demoState={{phase: "passage"}} /></QuizLayoutWrapper> },
    { title: "OX Question (풀이)", render: () => <QuizLayoutWrapper hideMockup currentVariant="oxQuestion" onVariantChange={noop}><OxQuestion onComplete={noop} demoState={{phase: "choices"}} /></QuizLayoutWrapper> },
    { title: "OX Question (정답)", render: () => <QuizLayoutWrapper hideMockup currentVariant="oxQuestion" onVariantChange={noop}><OxQuestion onComplete={noop} demoState={{phase: "result", isCorrect: true}} /></QuizLayoutWrapper> },
    { title: "OX Question (오답)", render: () => <QuizLayoutWrapper hideMockup currentVariant="oxQuestion" onVariantChange={noop}><OxQuestion onComplete={noop} demoState={{phase: "result", isCorrect: false}} /></QuizLayoutWrapper> },

    { title: "Conversation Question (지문)", render: () => <ConversationQuestion onComplete={noop} demoState={{phase: "passage"}} /> },
    { title: "Conversation Question (풀이)", render: () => <ConversationQuestion onComplete={noop} demoState={{phase: "choices"}} /> },
    { title: "Conversation Question (정답)", render: () => <ConversationQuestion onComplete={noop} demoState={{phase: "result", isCorrect: true}} /> },
    { title: "Conversation Question (오답)", render: () => <ConversationQuestion onComplete={noop} demoState={{phase: "result", isCorrect: false}} /> },

    { title: "Document Choice (지문)", render: () => <DocumentChoiceQuestion onComplete={noop} demoState={{phase: "passage"}} /> },
    { title: "Document Choice (풀이)", render: () => <DocumentChoiceQuestion onComplete={noop} demoState={{phase: "choices"}} /> },
    { title: "Document Choice (정답)", render: () => <DocumentChoiceQuestion onComplete={noop} demoState={{phase: "result", isCorrect: true}} /> },
    { title: "Document Choice (오답)", render: () => <DocumentChoiceQuestion onComplete={noop} demoState={{phase: "result", isCorrect: false}} /> },

    { title: "Document Click (지문)", render: () => <DocumentClickQuestion onComplete={noop} demoState={{phase: "passage"}} /> },
    { title: "Document Click (풀이)", render: () => <DocumentClickQuestion onComplete={noop} demoState={{phase: "choices"}} /> },
    { title: "Document Click (정답)", render: () => <DocumentClickQuestion onComplete={noop} demoState={{phase: "result", isCorrect: true}} /> },
    { title: "Document Click (오답)", render: () => <DocumentClickQuestion onComplete={noop} demoState={{phase: "result", isCorrect: false}} /> },

    { title: "Result (Normal)", render: () => <Result resultData={mockQuizResult} onFinish={noop} /> },
    { title: "Result (Perfect)", render: () => <Result resultData={null} variant="perfect" onFinish={noop} /> },
    { title: "Result (Close)", render: () => <Result resultData={null} variant="close" onFinish={noop} /> },
    { title: "Result (Fail)", render: () => <Result resultData={null} variant="fail" onFinish={noop} /> },
    { title: "Article List", render: () => <ArticleList onSelectArticle={noop} onTabClick={noop} /> },
    { title: "Article Detail", render: () => <ArticleDetail onBack={noop} /> },
    { title: "Learning Note & Character", render: () => <LearningNote onTabClick={noop} /> },
    { title: "My Page", render: () => <Mypage onTabClick={noop} /> },
    { title: "Badge Modal (Gallery Item)", render: renderBadgeModal },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4 border-b pb-4 shrink-0">
        <Button onClick={onBack} variant="outline" className="shrink-0">
          ← 뒤로 가기
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          BiteLearn App Gallery
        </h1>
        <p className="text-gray-500 font-medium">
          총 {screens.length}개의 화면
        </p>
      </div>

      <div className="flex overflow-x-auto gap-8 pb-8 px-2 flex-nowrap items-start bg-slate-200/50 p-6 rounded-2xl w-full">
        {screens.map((screen, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 shrink-0">
            <h2 className="text-lg font-bold text-slate-700 bg-white px-4 py-2 rounded-full shadow-sm">
              {idx + 1}. {screen.title}
            </h2>
            <div className="w-[375px] h-[812px] overflow-hidden shadow-md relative select-none">
              <div className="w-full h-full relative overflow-y-auto overflow-x-hidden app-scrollbar pointer-events-auto">
                {screen.render()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
