import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { MOCK_USER } from "@/data/mock/user"
import BadgeCollectionDialog from "@/components/features/badge/BadgeCollectionDialog"

const getAssetBadge = (exp: number) => {
  if (exp < 1000) return { icon: "🤎", label: "낡은 저금통" }
  if (exp < 5000) return { icon: "💳", label: "든든한 통장" }
  return { icon: "💎", label: "프리미엄 금고" }
}

type DashboardHeaderProps = {
  onProfileClick: () => void
  title?: string
  subtitle?: string
}

export default function DashboardHeader({
  onProfileClick,
  title = "반가워요, 시원님! 👋",
  subtitle = "오늘도 한 입 지식을 챙겨볼까요?",
}: DashboardHeaderProps) {
  const badge = getAssetBadge(MOCK_USER.totalExp)

  return (
    <header className="py-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">{title}</h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <BadgeCollectionDialog>
            <button
              className="h-12 w-12 flex items-center justify-center rounded-2xl border-2 border-slate-100 bg-white shadow-sm text-2xl transition-all hover:bg-slate-50 active:scale-95"
              aria-label="뱃지 컬렉션 보기"
              title={badge.label}
            >
              {badge.icon}
            </button>
          </BadgeCollectionDialog>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-2xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            onClick={onProfileClick}
            aria-label="프로필/로그인 화면으로 이동"
          >
            <User className="h-6 w-6 text-slate-400" />
          </Button>
        </div>
      </div>
    </header>
  )
}
