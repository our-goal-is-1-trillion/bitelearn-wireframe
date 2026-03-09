import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import type { UserOnboardingType } from "./dashboard.types"
import { MOCK_USER } from "@/data/mock/user"

type DashboardHeaderProps = {
  onProfileClick: () => void
  userType?: UserOnboardingType
  title?: string
  subtitle?: string
}

const getAssetBadge = (exp: number) => {
  if (exp < 1000) return { icon: "🤎", label: "낡은 저금통" }
  if (exp < 5000) return { icon: "💳", label: "든든한 통장" }
  return { icon: "💎", label: "프리미엄 금고" }
}

export default function DashboardHeader({
  onProfileClick,
  userType = "active",
  title,
  subtitle,
}: DashboardHeaderProps) {
  let defaultTitle = "반가워요, 바이트런님! 👋"
  let defaultSubtitle = "오늘도 한 입 지식을 챙겨볼까요?"

  if (userType === "guest") {
    defaultTitle = "BiteLearn에 오신 것을 환영해요! 👋"
    defaultSubtitle = "필수 경제 지식을 한 입에 쏙 챙겨보세요."
  }

  const badge = getAssetBadge(MOCK_USER.totalExp);

  return (
    <header className="py-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5 mt-1 flex-1 pr-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">{title || defaultTitle}</h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">{subtitle || defaultSubtitle}</p>
        </div>
        
        <div className="flex items-center shrink-0">
          {userType === "guest" ? (
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-2xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95 shrink-0"
              onClick={onProfileClick}
              aria-label="로그인 화면으로 이동"
            >
              <LogIn className="h-5 w-5 text-slate-400 ml-0.5" />
            </Button>
          ) : (
            <div className="flex items-center justify-center bg-slate-50 border border-slate-100 h-11 w-11 rounded-2xl shadow-sm">
              <span className="text-[22px] leading-none" title={badge.label}>{badge.icon}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
