import type { DashboardTab } from "@/components/features/dashboard/dashboard.types"

type DashboardBottomNavProps = {
  tabs: DashboardTab[]
}

export default function DashboardBottomNav({ tabs }: DashboardBottomNavProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30">
      {/* Subtle blur background for safe area */}
      <div className="h-8 bg-white/60 backdrop-blur-md" />
      
      <nav className="pointer-events-auto absolute inset-x-4 bottom-4 rounded-[32px] border-2 border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50">
        <ul className="flex items-center justify-between gap-1 px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <li key={tab.label} className="flex-1">
                <button
                  type="button"
                  className={`flex w-full flex-col items-center justify-center gap-1.5 rounded-[24px] py-3.5 transition-all active:scale-95 ${
                    tab.active 
                      ? "bg-slate-900 text-white shadow-md shadow-slate-400/20" 
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  }`}
                >
                  <Icon size={20} strokeWidth={tab.active ? 2.5 : 2} />
                  <span className={`text-xs font-bold uppercase tracking-tighter ${tab.active ? "opacity-100" : "opacity-80"}`}>
                    {tab.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
