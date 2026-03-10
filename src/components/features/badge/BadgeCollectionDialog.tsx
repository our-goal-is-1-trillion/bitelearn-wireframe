import type { ReactNode } from "react"
import { CheckCircle2, Lock } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MOCK_CATEGORY_CHAPTERS } from "@/data/mock/chapter"
import { MOCK_USER } from "@/data/mock/user"
import type { CategoryChapters } from "@/data/mock/chapter"

type BadgeDef = { icon: string; label: string; desc: string; unlocked: boolean }
type BadgeGroup = { group: string; badges: BadgeDef[] }

export const getBadgeGroups = (
  exp: number,
  categories: CategoryChapters[],
  consecutiveDays: number
): BadgeGroup[] => {
  const isComplete = (id: string) => {
    const cat = categories.find((c) => c.categoryId === id)
    return !!cat && cat.completedChapters === cat.totalChapters
  }
  const allComplete = categories.every((c) => c.completedChapters === c.totalChapters)

  return [
    {
      group: "자산",
      badges: [
        { icon: "🤎", label: "낡은 저금통",  desc: "첫 학습 시작 시 자동 지급",   unlocked: true },
        { icon: "💳", label: "든든한 통장",   desc: "누적 1,000 B 달성",          unlocked: exp >= 1000 },
        { icon: "💎", label: "프리미엄 금고", desc: "누적 5,000 B 달성",          unlocked: exp >= 5000 },
      ],
    },
    {
      group: "도메인 마스터",
      badges: [
        { icon: "🏠", label: "독립 준비 완료",    desc: "부동산·주거 전 챕터 완료",   unlocked: isComplete("real-estate") },
        { icon: "💸", label: "머니 플로우 마스터", desc: "생활금융·고용 전 챕터 완료", unlocked: isComplete("finance") },
        { icon: "💼", label: "직장인 완전체",      desc: "커리어·세무 전 챕터 완료",   unlocked: isComplete("career") },
        { icon: "📈", label: "투자 입문 완료",     desc: "자산운용·투자 전 챕터 완료", unlocked: isComplete("investment") },
      ],
    },
    {
      group: "업적",
      badges: [
        { icon: "🔥", label: "불꽃 학습러",  desc: "7일 연속 학습 달성",       unlocked: consecutiveDays >= 7 },
        { icon: "⚡", label: "퍼펙트 플레이", desc: "챕터를 오답 없이 완료",     unlocked: false },
        { icon: "🏆", label: "프로 어른",    desc: "모든 도메인 전 챕터 완료",  unlocked: allComplete },
      ],
    },
  ]
}

type BadgeCollectionDialogProps = {
  children: ReactNode
}

export default function BadgeCollectionDialog({ children }: BadgeCollectionDialogProps) {
  const badgeGroups = getBadgeGroups(MOCK_USER.totalExp, MOCK_CATEGORY_CHAPTERS, MOCK_USER.consecutiveDays)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[70vh] overflow-y-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle>뱃지 컬렉션</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
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
      </DialogContent>
    </Dialog>
  )
}
