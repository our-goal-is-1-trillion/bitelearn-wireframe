import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DashboardContinueCardProps = {
  onContinue: () => void;
  headline?: string;
  category?: string;
  lessonTitle?: string;
  meta?: string;
};

export default function DashboardContinueCard({
  onContinue,
  headline = "학습을 이어가볼까요? 🚩",
  category = "부동산 · 주거",
  lessonTitle = "전세사기 예방 기초",
  meta = "현재 완료율 68%",
}: DashboardContinueCardProps) {
  return (
    <article className="rounded-[32px] border-2 border-slate-100 bg-slate-50/50 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">{headline}</h3>
      </div>

      <div className="flex items-center justify-between rounded-2xl border-2 border-slate-100 bg-white p-4 shadow-inner">
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-slate-400">{category}</p>
          <p className="text-base font-bold text-slate-900 leading-tight">{lessonTitle}</p>
          <p className="text-xs font-medium text-slate-500">{meta}</p>
        </div>
        <Button
          size="icon"
          variant="default"
          className="h-12 w-12 rounded-full bg-slate-900 text-white shadow-lg shadow-slate-200 transition-all active:scale-90"
          onClick={onContinue}
          aria-label="계속 학습하기"
        >
          <Play size={20} className="ml-1 fill-white" />
        </Button>
      </div>
      
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/50 px-1">
         <div className="h-full rounded-full bg-slate-900 w-[68%]" />
      </div>
    </article>
  );
}
