import { useState } from "react"
import OnboardingModal from "@/components/features/onboarding/OnboardingModal"

export type Page =
  | "home"
  | "choiceQuestion"
  | "choiceQuestionBottomSheet"
  | "choiceQuestionInline"
  | "oxQuestion"
  | "oxQuestionBottomSheet"
  | "oxQuestionInline"
  | "conversationQuestion"
  | "dashBoard"
  | "result"
  | "resultPerfect"
  | "resultClose"
  | "resultFail"
  | "wordLearning"
  | "article"
  | "documentChoiceQuestion"
  | "documentClickQuestion"
  | "login"
  | "signup"
  | "mypage"
  | "chapterList"
  | "mistakeNote"

type IAAction = "onboarding"

type IAItem = {
  label: string
  page?: Page
  action?: IAAction
}

type IATab = {
  id: number
  title: string
  emoji: string
  colorClass: {
    bg: string
    border: string
    header: string
    badge: string
    itemHover: string
    itemBorder: string
  }
  items: IAItem[]
}

const IA_TABS: IATab[] = [
  {
    id: 1,
    title: "홈 (Home)",
    emoji: "🏠",
    colorClass: {
      bg: "bg-red-50",
      border: "border-red-200",
      header: "bg-red-400",
      badge: "bg-red-100 text-red-600",
      itemHover: "hover:bg-red-100",
      itemBorder: "border-red-200",
    },
    items: [
      { label: "홈 대시보드", page: "dashBoard" },
    ],
  },
  {
    id: 2,
    title: "아티클 (Articles)",
    emoji: "📰",
    colorClass: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      header: "bg-indigo-400",
      badge: "bg-indigo-100 text-indigo-600",
      itemHover: "hover:bg-indigo-100",
      itemBorder: "border-indigo-200",
    },
    items: [{ label: "전세사기 방지 컨텐츠 보기", page: "article" }],
  },
  {
    id: 3,
    title: "학습 (Learning)",
    emoji: "📚",
    colorClass: {
      bg: "bg-green-50",
      border: "border-green-200",
      header: "bg-green-500",
      badge: "bg-green-100 text-green-700",
      itemHover: "hover:bg-green-100",
      itemBorder: "border-green-200",
    },
    items: [
      { label: "챕터 목록 (학습 탭)", page: "chapterList" },
      { label: "단어 학습", page: "wordLearning" },
      { label: "챕터 결과 · 완벽 방어! (정답률 80~100%)", page: "resultPerfect" },
      { label: "챕터 결과 · 아슬아슬 방어 (정답률 40~79%)", page: "resultClose" },
      { label: "챕터 결과 · 탈탈 털림... (정답률 0~39%)", page: "resultFail" },
      { label: "지문형 객관식 퀴즈 (A/B/C UI UX테스트)", page: "choiceQuestion" },
      { label: "지문형 OX 퀴즈 (A/B/C UI UX테스트)", page: "oxQuestion" },
      { label: "대화형 객관식 퀴즈", page: "conversationQuestion" },
      { label: "문서형 객관식", page: "documentChoiceQuestion" },
      { label: "문서 클릭", page: "documentClickQuestion" },
    ],
  },
  {
    id: 4,
    title: "오답노트 (Review Note)",
    emoji: "📝",
    colorClass: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      header: "bg-orange-400",
      badge: "bg-orange-100 text-orange-600",
      itemHover: "hover:bg-orange-100",
      itemBorder: "border-orange-200",
    },
    items: [{ label: "오답노트", page: "mistakeNote" }],
  },
  {
    id: 5,
    title: "마이 (My Page)",
    emoji: "👤",
    colorClass: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      header: "bg-slate-400",
      badge: "bg-slate-100 text-slate-600",
      itemHover: "hover:bg-slate-100",
      itemBorder: "border-slate-200",
    },
    items: [{ label: "마이페이지", page: "mypage" }],
  },
]

type HomeProps = {
  onNavigate: (page: Page) => void
}

export default function Home({ onNavigate }: HomeProps) {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-100 text-slate-900">
      <div className="flex h-full flex-col">
        <header className="shrink-0 bg-white px-5 py-4 shadow-sm">
          <h1 className="text-lg font-bold text-slate-800">🗺️ BiteLearn IA</h1>
          <p className="mt-0.5 text-xs text-slate-400">항목을 눌러 화면으로 이동하세요</p>
        </header>

        <section className="shrink-0 border-b bg-white p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Flows</h2>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setShowOnboarding(true)}
                className="flex items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
              >
                온보딩
              </button>
              <button
                onClick={() => onNavigate("login")}
                className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                로그인
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                회원가입
              </button>
            </div>
          </div>
        </section>

        <section className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-3">
            {IA_TABS.map((tab) => (
              <div
                key={tab.id}
                className={`overflow-hidden rounded-xl border ${tab.colorClass.bg} ${tab.colorClass.border}`}
              >
                <div className={`flex items-center gap-2 px-4 py-2.5 ${tab.colorClass.header}`}>
                  <span className="text-sm">{tab.emoji}</span>
                  <span className="text-sm font-semibold text-white">Tab {tab.id} - {tab.title}</span>
                </div>

                <div className="flex flex-col gap-1.5 p-3">
                  {tab.items.map((item) => {
                    const isEnabled = item.page !== undefined || item.action !== undefined

                    return (
                      <button
                        key={item.label}
                        disabled={!isEnabled}
                        onClick={() => {
                          if (item.action === "onboarding") {
                            setShowOnboarding(true)
                          } else if (item.page) {
                            onNavigate(item.page)
                          }
                        }}
                        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-colors
                          ${tab.colorClass.itemBorder}
                          ${
                            isEnabled
                              ? `cursor-pointer bg-white font-medium ${tab.colorClass.itemHover}`
                              : "cursor-not-allowed bg-white/60 text-slate-400"
                          }`}
                      >
                        <span>{item.label}</span>
                        {isEnabled ? (
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tab.colorClass.badge}`}>
                            이동 -&gt;
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-400">준비 중</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </main>
  )
}
