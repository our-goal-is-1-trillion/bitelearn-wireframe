import { Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserOnboardingType } from "./dashboard.types"

type DashboardContinueCardProps = {
  onContinue: () => void;
  userType?: UserOnboardingType;
  headline?: string;
  category?: string;
  lessonTitle?: string;
  meta?: string;
};

export default function DashboardContinueCard({
  onContinue,
  userType = "active",
  headline,
  category,
  lessonTitle,
  meta,
}: DashboardContinueCardProps) {
  const isStarter = userType === "guest" || userType === "new";
  
  const defaultHeadline = isStarter ? "학습이 처음인 당신을 위해 🌱" : "마지막으로 공부하던 곳이에요 🚩";
  const defaultCategory = category || "부동산 · 주거";
  const defaultLessonTitle = lessonTitle || "전세사기 예방 기초";
  const defaultMeta = isStarter ? "처음 시작 · 약 5분" : (meta || "현재 68% 완료");

  return (
    <article className="rounded-[28px] border-2 border-slate-100 bg-slate-50/50 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">{headline || defaultHeadline}</h3>
      </div>

      <div className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-white p-3.5 shadow-inner">
        <div className="space-y-1 flex-1 min-w-0 pr-2">
          <p className="text-[11px] font-bold text-slate-400">{defaultCategory}</p>
          <p className="text-[15px] font-bold text-slate-900 leading-tight truncate">{defaultLessonTitle}</p>
          <p className="text-[11px] font-medium text-slate-500">{defaultMeta}</p>
        </div>
        <Button
          size="icon"
          variant="default"
          className={`h-11 w-11 shrink-0 rounded-full text-white shadow-lg transition-all active:scale-90 ${
            isStarter ? "bg-indigo-600 shadow-indigo-200" : "bg-slate-900 shadow-slate-200"
          }`}
          onClick={onContinue}
          aria-label={isStarter ? "학습 시작하기" : "학습 이어하기"}
        >
          {isStarter ? <Sparkles size={18} className="fill-white" /> : <Play size={18} className="ml-0.5 fill-white" />}
        </Button>
      </div>
      
      {!isStarter && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/50 px-1">
           <div className="h-full rounded-full bg-slate-900 w-[68%]" />
        </div>
      )}
    </article>
  );
}
