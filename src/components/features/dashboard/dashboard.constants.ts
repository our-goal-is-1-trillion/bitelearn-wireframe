import { BookOpenCheck, FileText, GraduationCap, House, UserRound } from "lucide-react"
import type { DashboardCategory, DashboardRecommendation, DashboardTab } from "./dashboard.types"

export const DASHBOARD_TABS: DashboardTab[] = [
  { label: "홈", icon: House, active: true },
  { label: "학습", icon: GraduationCap, active: false },
  { label: "오답노트", icon: BookOpenCheck, active: false },
  { label: "아티클", icon: FileText, active: false },
  { label: "마이", icon: UserRound, active: false },
]

export const DASHBOARD_CATEGORIES: DashboardCategory[] = [
  { name: "부동산 · 주거", lessons: 12, percent: 72 },
  { name: "생활금융 · 고용", lessons: 8, percent: 38 },
  { name: "커리어 · 세무", lessons: 15, percent: 84 },
  { name: "자산운용 · 투자", lessons: 15, percent: 84 },
]

export const DASHBOARD_TODAY_RECOMMENDATIONS: DashboardRecommendation[] = [
  {
    title: "신용점수 빠르게 올리는 3가지 습관",
    category: "생활금융 · 고용",
  },
  {
    title: "전세 계약 전 꼭 확인해야 할 체크리스트",
    category: "부동산 · 주거",
  },
]
