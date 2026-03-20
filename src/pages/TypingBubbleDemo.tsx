/** 타이핑 인디케이터 (말풍선 ...) 단독 데모 */
export default function TypingBubbleDemo() {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 border border-slate-200 flex flex-col items-center justify-center gap-10 px-8">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Typing Indicator</p>

      {/* 왼쪽 (상대방) */}
      <div className="w-full flex flex-col gap-3">
        <p className="text-[10px] text-slate-400 font-medium">← 왼쪽 (상대방)</p>
        <div className="flex items-end gap-2">
          <div className="w-9 h-9 rounded-full bg-slate-300 shrink-0" />
          <div className="flex gap-1.5 px-4 py-3.5 rounded-2xl rounded-bl-none bg-white border border-slate-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>

      {/* 오른쪽 (나) */}
      <div className="w-full flex flex-col gap-3">
        <p className="text-[10px] text-slate-400 font-medium text-right">오른쪽 (나) →</p>
        <div className="flex items-end justify-end gap-2">
          <div className="flex gap-1.5 px-4 py-3.5 rounded-2xl rounded-br-none bg-slate-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:300ms]" />
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-400 shrink-0" />
        </div>
      </div>
    </main>
  )
}
