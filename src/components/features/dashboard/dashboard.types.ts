import type { LucideIcon } from "lucide-react"

export type DashboardView = "home" | "chapter"

export type DashboardTab = {
  label: string
  icon: LucideIcon
  active: boolean
}

export type DashboardCategory = {
  name: string
  lessons: number
  percent: number
}

export type DashboardRecommendation = {
  title: string
  category: string
}
