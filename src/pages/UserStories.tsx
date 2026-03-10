import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UserStories({ onBack }: { onBack: () => void }) {
  const stories = [
    {
      epic: "게이미피케이션 & 마찰 없는 학습 UX (Sprint)",
      items: [
         "유저(비회원)로서, 대시보드 진입 시 불필요한 '학습 이어하기' 카드 대신 직관적인 로그인 가이드를 볼 수 있어, 맞춤 학습을 시작할 방법을 명확히 인지할 수 있다.",
         "유저(회원)로서, 홈 화면 헤더에서 복잡한 텍스트 대신 '자산 뱃지 아이콘'과 인사말만 심플하게 볼 수 있어, 화면이 번잡해 보이지 않고 학습 진입의 심리적 장벽이 낮아진다.",
         "유저로서, 대시보드 하단에서 '오늘 이어갈 지식 한 입' 콤팩트 카드를 통해 가장 필요한 학습 항목으로 즉시 딥링크(바로가기) 할 수 있어, 무엇을 할지 고민하는 시간을 줄일 수 있다.",
         "학습자로서, 홈 상단(러닝 관제탑)에서 다음 뱃지 업그레이드까지 남은 바이트(B)를 프로그레스 바 형태로 직관적으로 확인할 수 있어, 더 많은 바이트를 모으려는 수집 동기를 부여받는다.",
         "학습자로서, 챕터 목록(학습 로드맵)에서 현재 진행 중인 챕터가 펄스(Pulse) 애니메이션과 명시적인 라벨표(▶ 이어서 학습 중)로 강조되어 있어, 다음에 눌러야 할 목적지를 1초 만에 파악할 수 있다.",
         "학습자로서, 새로운 챕터를 시작하기 전 인트로 화면에서 '완료 보상'과 '핵심 내용 브리핑'을 미리 볼 수 있어, 이번 학습의 목적과 기대 이득(보상)을 파악하고 미션을 수행하는 느낌을 얻을 수 있다.",
         "학습자로서, 단어 카드 학습을 모두 넘긴 직후 '퀴즈를 풀고 바이트를 모아보자'는 브리핑 메시지와 버튼을 볼 수 있어, 자연스럽게 본 게임(퀴즈 풀기)으로 넘어갈 마음의 준비를 할 수 있다.",
         "학습자로서, 전체 카테고리 맵에서 진행률에 따라 흑백이었던 카드들이 점차 컬러로 채워지는 변화를 눈으로 확인할 수 있어, 도장 깨기를 하는 듯한 시각적 성취감을 느낄 수 있다."
      ]
    }
  ];

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 flex flex-col border border-slate-200 shadow-2xl">
      <header className="shrink-0 bg-white border-b border-slate-100 flex items-center px-4 h-14">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9 text-slate-600 rounded-xl">
          <ChevronLeft size={20} />
        </Button>
        <h1 className="flex-1 text-center text-sm font-bold tracking-tight">유저 스토리 (Sprint)</h1>
        <div className="w-9 h-9" />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-8 space-y-8 hide-scrollbar">
        {stories.map((section, idx) => (
          <section key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm leading-relaxed">
            <h2 className="text-[14px] font-black text-indigo-600 mb-5 tracking-tight border-b border-indigo-50 pb-3">{section.epic}</h2>
            <div className="space-y-5">
              {section.items.map((story, i) => (
                <div key={i} className="flex gap-3.5">
                  <div className="mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-indigo-50 text-[10px] font-bold text-indigo-600">
                    {i+1}
                  </div>
                  <p className="text-[13px] leading-relaxed font-semibold text-slate-700 tracking-tight break-keep">
                    {story}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
