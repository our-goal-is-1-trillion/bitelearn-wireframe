import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import type { UserOnboardingType } from "./dashboard.types"
import { MOCK_USER } from "@/data/mock/user"
import BadgeCollectionDialog from "@/components/features/badge/BadgeCollectionDialog"

const getAssetBadge = (exp: number) => {
  if (exp < 1000) return { icon: "🤎", label: "낡은 저금통" }
  if (exp < 5000) return { icon: "💳", label: "든든한 통장" }
  return { icon: "💎", label: "프리미엄 금고" }
}

const getHeaderCopy = (userType: UserOnboardingType, name: string) => {
  if (userType === "guest") return {
    title: "어서 오세요! 👋",
    subtitle: "회원가입하고 나만의 학습을 시작해보세요.",
  }
  return {
    title: `반가워요, ${name}님! 👋`,
    subtitle: "오늘도 한 입 지식을 챙겨볼까요?",
  }
}

type DashboardHeaderProps = {
  onProfileClick: () => void
  userType?: UserOnboardingType
  title?: string
  subtitle?: string
}

export default function DashboardHeader({
  onProfileClick,
  userType = "active",
  title,
  subtitle,
}: DashboardHeaderProps) {
  const badge = getAssetBadge(MOCK_USER.totalExp)
  const copy = getHeaderCopy(userType, MOCK_USER.name)
  const isGuest = userType === "guest"

  return (
    <header className="py-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1 pr-4">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">
            {title ?? copy.title}
          </h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            {subtitle ?? copy.subtitle}
          </p>
        </div>

        {isGuest ? (
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 shrink-0 rounded-2xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            onClick={onProfileClick}
            aria-label="로그인 화면으로 이동"
          >
            <LogIn className="h-5 w-5 text-slate-400 ml-0.5" />
          </Button>
        ) : (
          <BadgeCollectionDialog>
            <button
              className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl border-2 border-slate-100 bg-white shadow-sm text-2xl transition-all hover:bg-slate-50 active:scale-95"
              aria-label="뱃지 컬렉션 보기"
              title={badge.label}
            >
              {badge.icon}
            </button>
          </BadgeCollectionDialog>
        )}
      </div>
    </header>
  )
}
