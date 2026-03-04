import type { DashboardTab } from "@/components/features/dashboard/dashboard.types"

type BottomNavProps = {
  tabs: DashboardTab[]
}

export default function BottomNav({ tabs }: BottomNavProps) {
  return (
    <nav className="absolute inset-x-3 bottom-3 z-20 rounded-full border border-slate-300 bg-white p-3 shadow-sm">
      <ul className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <li key={tab.label}>
              <button
                type="button"
                className={`flex w-full flex-col items-center justify-center gap-1 rounded-full px-1 py-1.5 text-[11px] font-medium ${
                  tab.active ? "bg-slate-800 text-white" : "text-slate-400"
                }`}
              >
                <Icon size={16} strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
