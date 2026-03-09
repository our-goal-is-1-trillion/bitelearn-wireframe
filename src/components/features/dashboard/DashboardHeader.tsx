import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import type { UserOnboardingType } from "./dashboard.types"

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
  let defaultTitle = "반가워요, 시원님! 👋"
  let defaultSubtitle = "오늘도 한 입 지식을 챙겨볼까요?"

  if (userType === "guest") {
    defaultTitle = "로그인 해볼까요? 👋"
    defaultSubtitle = "맞춤 학습을 위해 로그인이 필요해요."
  } else if (userType === "new") {
    defaultTitle = "환영해요, 처음 오셨군요! 🎉"
    defaultSubtitle = "첫 한 입 지식을 챙겨볼까요?"
  }

  return (
    <header className="py-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5 mt-1">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">{title || defaultTitle}</h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">{subtitle || defaultSubtitle}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-2xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:bg-slate-50 active:scale-95 shrink-0"
          onClick={onProfileClick}
          aria-label="프로필/로그인 화면으로 이동"
        >
          <User className="h-5 w-5 text-slate-400" />
        </Button>
      </div>
    </header>
  )
}
