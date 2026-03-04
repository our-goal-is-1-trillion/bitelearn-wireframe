type Page = "home" | "choiceQuestion" | "choiceQuestionBottomSheet" | "dashBoard" | "result"

type IAItem = {
  label: string
  page?: Page
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
    title: "홈(Home)",
    emoji: "🏠",
    colorClass: {
      bg: "bg-red-50",
      border: "border-red-200",
      header: "bg-red-400",
      badge: "bg-red-100 text-red-600",
      itemHover: "hover:bg-red-100",
      itemBorder: "border-red-200",
    },
    items: [{ label: "대시보드", page: "dashBoard" }],
  },
  {
    id: 2,
    title: "아티클(Articles)",
    emoji: "📰",
    colorClass: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      header: "bg-indigo-400",
      badge: "bg-indigo-100 text-indigo-600",
      itemHover: "hover:bg-indigo-100",
      itemBorder: "border-indigo-200",
    },
    items: [{ label: "미정" }],
  },
  {
    id: 3,
    title: "학습(Learning)",
    emoji: "📘",
    colorClass: {
      bg: "bg-green-50",
      border: "border-green-200",
      header: "bg-green-500",
      badge: "bg-green-100 text-green-700",
      itemHover: "hover:bg-green-100",
      itemBorder: "border-green-200",
    },
    items: [
      { label: "퀴즈 결과", page: "result" },
      { label: "객관식 퀴즈-기본", page: "choiceQuestion" },
      { label: "객관식 퀴즈-BottomSheet", page: "choiceQuestionBottomSheet" },
    ],
  },
  {
    id: 4,
    title: "아카이브(Archive)",
    emoji: "🗂",
    colorClass: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      header: "bg-orange-400",
      badge: "bg-orange-100 text-orange-600",
      itemHover: "hover:bg-orange-100",
      itemBorder: "border-orange-200",
    },
    items: [{ label: "미정" }],
  },
  {
    id: 5,
    title: "마이(My Page)",
    emoji: "👤",
    colorClass: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      header: "bg-slate-400",
      badge: "bg-slate-100 text-slate-600",
      itemHover: "hover:bg-slate-100",
      itemBorder: "border-slate-200",
    },
    items: [{ label: "미정" }],
  },
]

type HomeProps = {
  onNavigate: (page: Page) => void
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-100 text-slate-900">
      <div className="flex h-full flex-col">
        <header className="shrink-0 bg-white px-5 py-4 shadow-sm">
          <h1 className="text-lg font-bold text-slate-800">BiteLearn IA</h1>
          <p className="mt-0.5 text-xs text-slate-400">항목을 눌러 화면으로 이동하세요</p>
        </header>

        <section className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-3">
            {IA_TABS.map((tab) => (
              <div
                key={tab.id}
                className={`overflow-hidden rounded-xl border ${tab.colorClass.bg} ${tab.colorClass.border}`}
              >
                <div className={`flex items-center gap-2 px-4 py-2.5 ${tab.colorClass.header}`}>
                  <span className="text-sm">{tab.emoji}</span>
                  <span className="text-sm font-semibold text-white">
                    Tab {tab.id} · {tab.title}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 p-3">
                  {tab.items.map((item) => {
                    const isEnabled = item.page !== undefined
                    return (
                      <button
                        key={item.label}
                        disabled={!isEnabled}
                        onClick={() => isEnabled && onNavigate(item.page!)}
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
                            이동 가능
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
    </main>
  )
}
