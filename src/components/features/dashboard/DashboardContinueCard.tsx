import { Play } from 'lucide-react';
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
  if (userType === "guest") {
    return (
      <article className="rounded-[24px] border-2 border-slate-100 bg-slate-50/50 p-5 shadow-sm flex flex-col items-center justify-center text-center">
        <h3 className="text-[15px] font-bold text-slate-900 mb-1 tracking-tight">지식 바이트를 모아볼까요? 🌱</h3>
        <p className="text-[11px] font-medium text-slate-500 mb-4">로그인하고 맞춤 학습을 시작하세요!</p>
        <Button
          className="h-10 px-5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-md transition-all hover:bg-slate-800 active:scale-95"
          onClick={onContinue}
        >
          3초만에 시작하기
        </Button>
      </article>
    );
  }

  const defaultHeadline = "오늘 이어갈 지식 한 입 😋";
  const defaultCategory = category || "부동산 · 주거";
  const defaultLessonTitle = lessonTitle || "전세사기 예방 기초";
  const defaultMeta = meta || "현재 68% 진행 중";

  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h3 className="text-[14px] font-bold text-slate-900 tracking-tight">{headline || defaultHeadline}</h3>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3">
        <div className="space-y-0.5 flex-1 min-w-0 pr-2">
          <p className="text-[10px] font-bold text-indigo-500">{defaultCategory}</p>
          <p className="text-[14px] font-bold text-slate-900 leading-tight truncate">{defaultLessonTitle}</p>
          <p className="text-[10px] font-medium text-slate-500">{defaultMeta}</p>
        </div>
        <Button
          size="icon"
          variant="default"
          className="h-10 w-10 shrink-0 rounded-full bg-slate-900 text-white shadow-md transition-all hover:bg-slate-800 active:scale-95"
          onClick={onContinue}
          aria-label="학습 이어하기"
        >
          <Play size={16} className="ml-0.5 fill-white" />
        </Button>
      </div>
      
      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-slate-100 px-1">
         <div className="h-full rounded-full bg-indigo-500 w-[68%]" />
      </div>
    </article>
  );
}
