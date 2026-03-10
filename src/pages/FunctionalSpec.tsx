import { useState, useMemo } from "react"
import { ChevronLeft, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FunctionalSpec({ onBack }: { onBack: () => void }) {
  const [sortByPriority, setSortByPriority] = useState(false)

  const rawSpecs = [
    {
      category: "1. 시스템 공통 및 라우팅 (App & Routing)",
      items: [
         { title: "초기 화면 조건부 렌더링 (Conditional View)", priority: "P0", desc: "사용자의 1) 로그인(인증) 여부 및 2) 기존 챕터 학습 진행 이력 데이터를 감별하여, 최근 진행 중인 챕터가 있는 기존 회원은 '대시보드 홈'으로, 새롭게 시작하는 신규/비회원은 커리큘럼 기반의 '학습 메인 홈'으로 초기 화면 컴포넌트를 동적 전환하여 렌더링합니다." },
         { title: "전역 진도율 트래킹 (Progress Tracking)", priority: "P1", desc: "사용자가 챕터 내에서 문제를 풀 때마다 발생하는 정답/오답 통신(API) 데이터를 역이용하여 현재 학습 중인 정확한 위치(특정 문제 단위 플로우)를 파악합니다. 진도율 트래킹을 위한 무거운 별도 기능을 새로 개발하는 대신, 기존에 쌓이는 문제 단위별 제출 로그를 활용하여 중도 이탈 시에도 마지막 풀이 시점부터 깔끔하게 '이어서 렌더링(Resume)' 되도록 효율적으로 구현합니다." },
         { title: "화면 전환 트랜지션", priority: "P2", desc: "앱 내 모든 주요 페이지(Home, Player, Note 등) 전환 시 부드러운 Fade-out/Fade-in 트랜지션 애니메이션(TransitionStage 상태 관리)을 적용합니다." },
         { title: "하단 글로벌 네비게이션 (GNB)", priority: "P0", desc: "홈, 아티클, 학습, 복습, 마이페이지 탭을 하단에 고정 배치하며, 현재 활성화된 탭의 아이콘 색상 및 라벨을 하이라이트합니다." }
      ]
    },
    {
      category: "2. 홈 대시보드 (Home Dashboard)",
      items: [
         { title: "동적 헤더 (Dynamic Header)", priority: "P0", desc: "[비회원] 가입/로그인 유도 텍스트 아이콘 조합 노출. [회원] 현재 누적된 보유 바이트(B) 수치, 장착 중인 지식 금고(뱃지) 아이콘, 맞춤형 웰컴 인사를 간소화하여 표시합니다." },
         { title: "학습 이어하기 딥링크 위젯", priority: "P1", desc: "[회원 전용] 최근 학습하다 중단하거나 이어서 해야 할 챕터 1개를 노출하고 클릭 시 즉시 챕터 플레이어로 딥링크(onContinue)되는 기능을 제공합니다. [비회원/신규] 공간 낭비를 막고 빈 뷰를 감추기 위해 해당 위젯의 렌더링을 생략합니다." },
         { title: "추천 콘텐츠 위젯 (Skeleton UI)", priority: "P2", desc: "서비스 내 자체 아티클 데이터를 불러올 때(Load/Fetch), 통신 지연에 따른 로딩 상태를 대비하여 스켈레톤 UI를 선제적으로 노출하고 데이터 수신 시 캐러셀 또는 그리드 형태로 스무스하게 렌더링합니다." }
      ]
    },
    {
      category: "3. 학습 관제탑 (Learning Command Center)",
      items: [
         { title: "자산 현황 및 아바타 피드백 (Asset & Avatar)", priority: "P1", desc: "사용자 누적 학습량(보유 바이트) 및 레벨업 상태를 감지하여 멍멍이(Avatar) 통장 뱃지와 아이콘 형태의 피드백으로 즉각 렌더링합니다." },
         { title: "목표 프로그레스 바 (Progress Bar-Hero)", priority: "P0", desc: "다음 지식 금고(등급/뱃지) 획득까지 앞으로 남은 바이트(B) 수치를 수학적으로 계산하여, 통장 프로그레스 바 영역에 시각적(게이지) 및 텍스트 형태로 목표치를 명확하게 제시합니다." },
         { title: "획득 뱃지 상세 팝업 모달 (Badge Modal)", priority: "P2", desc: "통장의 뱃지 영역(또는 아바타 주변부)을 클릭할 때 나타나는 팝업 또는 바텀 시트입니다. 현재 획득한 뱃지 리스트, 다음 등급까지의 남은 수치 및 상세 정보, 보상 혜택 등을 시각적으로 보여주어 사용자의 수집욕(콜렉터 동기)을 지속적으로 자극합니다." },
         { title: "카테고리별 달성률 맵 (Category Progress List)", priority: "P2", desc: "화면 하단에 전체 커리큘럼(예: 초보자 가이드, 대항력 등) 목록을 각 카테고리 카드 형태로 나열합니다. 각 카드의 챕터 완료 진행도(0~100%)에 따라 우측 게이지 바가 채워지며, 미진행 시 전체가 점점 그레이스케일 처리되는 연출이 발동합니다. 진행도가 있을 경우 다음에 바로 이어서 해야 할 챕터를 보여줍니다." }
      ]
    },
    {
      category: "4. 챕터 로드맵 (Chapter List Roadmap)",
      items: [
         { title: "상태별 챕터 노드 렌더링", priority: "P0", desc: "'잠김(Locked)': 자물쇠 아이콘, 클릭 비활성화, 회색 음영 처리. '가능(Available)': [다음 챕터] 뱃지 칩 표시, 클릭 활성화. '진행 중(InProgress)': Framer Motion 펄스(Pulse) 이펙트 적용 영역 강조, [▶ 이어서 학습 중] 라벨 강조. '완료(Completed)': 녹색 체크마크, 달성률 텍스트, 복습 모드 진입 제공." },
         { title: "수직 타임라인 레이아웃 (SVG Path)", priority: "P1", desc: "학습 순서가 시각적으로 직관적이도록, 상단부터 하단으로 뻗어 내려가는 선형 SVG Path 위에 각 챕터 컴포넌트들을 Z축으로 올려 트리(Tree)형 로드맵 뷰를 구성합니다." }
      ]
    },
    {
      category: "5. 챕터 플레이어 (Chapter Player)",
      items: [
         { title: "동기부여 인트로 화면", priority: "P1", desc: "단순 문장 설명 대신, 클리어 시 획득 가능한 예상 바이트(B) 리워드 명시, 학습할 핵심 키워드(Tag) 나열, 미션 수락 CTA 형태의 [인트로 브리핑 UI]를 띄워 몰입감을 높입니다." },
         { title: "마이크로러닝 플래시카드 (Word Cards)", priority: "P0", desc: "가벼운 개념/단어 확인 모드 플로우입니다. Tinder 형태의 좌우 스와이프 제스처뿐만 아니라, 화면 탭(클릭) 방식으로도 카드를 넘길 수 있는 하이브리드 인터랙션을 지원하며, 상단에 현재 카드/전체 카드의 비율을 보여주는 게이지 인디케이터를 연동합니다." },
         { title: "스테이지 전환 브리핑 모달", priority: "P2", desc: "단어 카드 모드를 모두 넘긴 즉시 퀴즈 모드로 전환되기 직전, 자연스럽게 마음의 준비를 할 수 있도록 [퀴즈 전환 브리핑 인라인 팝업] 제약을 렌더링합니다." }
      ]
    },
    {
      category: "6. 퀴즈 및 복습 시스템 (Quiz & Review)",
      items: [
         { title: "상호작용형 퀴즈 템플릿 (Multi-type Quiz)", priority: "P0", desc: "단순한 문답형식을 넘어 몰입도를 높이는 지문(Passage)과 맥락이 담긴 선택(Choice) 구조를 제공합니다.\n\n[지문(Passage) 렌더링 모드]\n• text: 일반적인 텍스트 지문과 부연 설명(Flavor Text) 제공\n• conversation: 피그마 화면에 맞춰 다수 참여자의 카카오톡/채팅 형태 UI로 상황 연출\n• document: 등기부등본 등 가상 서류 UI를 본문으로 렌더링하여 실전 판독 트레이닝 지원\n\n[선택지(Choice) 모드]\n• multiple: 4개의 보기 중 선택 (사지선다형)\n• ox: 직관적인 참/거짓 양자택일\n• document_select: 가상 서류 내의 특정 항목 필드(Label/Value)를 직접 터치하여 찾아내는 실전형 퀴즈\n• 기타(예정): 빈칸 채우기, 카드 매칭 등\n모든 퀴즈는 오답 시 즉각적인 하단 해설(Explanation) 바텀 시트를 제공합니다." },
         { title: "결과 처리 및 CTA 분기 (Quiz Result)", priority: "P1", desc: "최종 퀴즈 종료 시 맞춘 문제 수, 획득한 (Base + 추가) 바이트 등을 카운트업(Count Up) 애니메이션으로 노출합니다. 정답률 100% 미만 시 메인 CTA를 [다음 챕터 학습] 대신 부가적인 [오답 풀고 다시 바이트 얻기]로 렌더링 순위를 분기합니다." },
         { title: "학습 오답 노트 (Mistake Note)", priority: "P1", desc: "퀴즈 결과에 따른 오답 데이터를 수집하는 뷰어입니다. 단어장 탭과 문법 탭 등 카테고리 필터링이 가능하며, 아코디언 형태의 무한 스크롤 리스트 뷰로 틀린 문제를 손쉽게 훑어볼 수 있습니다." }
      ]
    }
  ];

  const specs = useMemo(() => {
    const allItems = rawSpecs.flatMap(section => 
      section.items.map(item => ({ ...item, originalCategory: section.category }))
    );

    if (!sortByPriority) {
      return rawSpecs.map(section => ({
        category: section.category,
        items: section.items.map(item => ({ ...item, originalCategory: section.category }))
      }));
    }

    const grouped = {
      P0: { category: "🔴 P0 (Critical / 필수 기능)", items: [] as typeof allItems },
      P1: { category: "🟡 P1 (High / 중요 기능)", items: [] as typeof allItems },
      P2: { category: "🟢 P2 (Medium / 부가 기능)", items: [] as typeof allItems },
    };

    allItems.forEach(item => {
      if (item.priority === "P0") grouped.P0.items.push(item);
      else if (item.priority === "P1") grouped.P1.items.push(item);
      else if (item.priority === "P2") grouped.P2.items.push(item);
    });

    return [grouped.P0, grouped.P1, grouped.P2].filter(g => g.items.length > 0);
  }, [sortByPriority, rawSpecs]);

  const getPriorityColor = (p: string) => {
    if (p === "P0") return "bg-red-100 text-red-700 border-red-200"
    if (p === "P1") return "bg-amber-100 text-amber-700 border-amber-200"
    if (p === "P2") return "bg-emerald-100 text-emerald-700 border-emerald-200"
    return "bg-slate-100 text-slate-700 border-slate-200"
  }

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 flex flex-col border border-slate-200 shadow-2xl">
      <header className="shrink-0 bg-white border-b border-slate-100 flex items-center px-4 h-14">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9 text-slate-600 rounded-xl">
          <ChevronLeft size={20} />
        </Button>
        <h1 className="flex-1 text-center text-sm font-bold tracking-tight">서비스 기능 명세서</h1>
        <div className="w-9 h-9" />
      </header>
      
      <div className="bg-white px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">조회 방식</span>
        <Button 
          variant={sortByPriority ? "default" : "outline"} 
          size="sm" 
          onClick={() => setSortByPriority(!sortByPriority)}
          className={`h-8 text-[11px] font-bold rounded-full px-3 ${sortByPriority ? "bg-slate-800" : "text-slate-600"}`}
        >
          <ArrowUpDown size={12} className="mr-1.5" />
          {sortByPriority ? "우선순위별 보기" : "기능 카테고리별 보기"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 hide-scrollbar">
        {specs.map((section, idx) => (
          <section key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm leading-relaxed">
            <h2 className="text-[14px] font-black text-slate-800 mb-4 tracking-tight border-b border-slate-100 pb-3">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.items.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded-[4px] border text-[10px] font-black tracking-tighter ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <h3 className="text-[13px] font-bold text-indigo-600 flex items-center gap-1.5">
                      {item.title}
                    </h3>
                  </div>
                  {sortByPriority && (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded w-fit">
                      {item.originalCategory}
                    </span>
                  )}
                  <p className="text-[12px] leading-relaxed font-medium text-slate-600 tracking-tight break-keep whitespace-pre-wrap">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
        <div className="h-4" />
      </div>
    </main>
  )
}
