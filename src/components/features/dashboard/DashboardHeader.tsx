import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

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
  return (
    <header className="py-8">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Personal Dashboard</p>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">{title}</h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">{subtitle}</p>
        </div>
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
    </header>
  )
}
