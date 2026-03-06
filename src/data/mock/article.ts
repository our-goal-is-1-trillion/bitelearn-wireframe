/** 
 * 아티클 상세 본문을 구성하는 블록 타입 
 * paragraph, heading, image, list, quote 등의 타입을 지원하여 
 * 다양한 형태의 아티클 레이아웃을 구성할 수 있습니다.
 */
export type ContentBlock =
  | { 
      /** 일반 텍스트 문단 */
      type: "paragraph"; 
      content: string 
    }
  | { 
      /** 섹션 제목 (level 2 or 3) */
      type: "heading"; 
      level: number; 
      content: string 
    }
  | { 
      /** 본문 삽입 이미지 */
      type: "image"; 
      url: string; 
      altText: string; 
      /** 이미지 하단 설명 텍스트 */
      caption?: string 
    }
  | { 
      /** 리스트 형태 (순서 있음/없음) */
      type: "list"; 
      listType: "unordered" | "ordered"; 
      items: string[] 
    }
  | { 
      /** 인용구 블록 */
      type: "quote"; 
      content: string 
    }

/** 아티클 상세 데이터 인터페이스 */
export interface ArticleDetail {
  /** 아티클 고유 ID */
  articleId: string
  /** 카테고리 명 (예: 부동산/주거) */
  category: string
  /** 아티클 제목 */
  title: string
  /** 목록 및 상세 상단 커버 이미지 URL */
  thumbnailUrl: string
  /** 작성자(에디터) 정보 */
  author: {
    name: string
    role: string
    profileImageUrl: string
  }
  /** 발행 일시 (ISO 형식) */
  publishedAt: string
  /** 조회수 */
  viewCount: number
  /** 관련 태그 목록 */
  tags: string[]
  /** 아티클 상단 3줄 요약 정보 */
  summary: {
    title: string
    points: string[]
  }
  /** 본문 콘텐츠 블록 배열 */
  contentBlocks: ContentBlock[]
  /** 하단 플로팅 버튼(CTA) 정보 */
  callToAction: {
    /** 버튼 문구 */
    text: string
    /** 이동할 URL */
    url: string
    /** 버튼 스타일 (강조 여부) */
    style: "primary" | "secondary"
  }
}

// ─── Mock Data ──────────────────────────────────────────────

/** 
 * [샘플 아티클] 전세사기 방지 체크리스트 
 * 바이트런 앱의 아티클 상세 화면 시연을 위한 모크 데이터입니다.
 */
export const mockArticles: ArticleDetail[] = [
  {
    articleId: "article-2026-001",
    category: "부동산/주거",
    title: "전세사기 방지 필수 체크리스트 | 계약 전 확인, 특약 작성, 보증보험까지",
    thumbnailUrl: "/images/article/article_thumbnail.png",
    author: {
      name: "에디터 샐리",
      role: "주거 안전 어드바이저",
      profileImageUrl: "/images/article/article_author_avatar.png",
    },
    publishedAt: "2026-03-05T10:00:00Z",
    viewCount: 12504,
    tags: ["전세사기", "부동산", "보증보험", "특약", "대항력"],
    summary: {
      title: "내 보증금 완벽하게 지켜내는 TIP! 📌",
      points: [
        "전세 계약 전, 등기부등본과 건축물대장 확인은 선택이 아닌 필수예요.",
        "계약서 작성 시, '나를 지켜주는 든든한 특약'을 반드시 넣어야 해요.",
        "복잡한 서류와 어려운 부동산 용어, 이제 바이트런이 가장 쉽고 안전하게 해석해 드릴게요.",
      ],
    },
    contentBlocks: [
      {
        type: "paragraph",
        content: "“집 구하는 것도 힘든데, 알아봐야 할 서류는 왜 이렇게 많지?”, “등기부등본을 떼보긴 했는데, 이 한자가 대체 무슨 뜻이야?”\n\n전세사기 관련 뉴스는 쏟아지는데 막상 내 전세 계약을 앞두고 있다면, 어려운 부동산 용어와 복잡한 확인 절차 때문에 막막하기 쉽죠. 기존 공공기관의 부동산 앱을 깔아봐도 전문가가 아닌 이상 헷갈리는 건 마찬가지고요.",
      },
      {
        type: "heading",
        level: 3,
        content: "전세사기, 내가 꼼꼼하지 못해서 당하는 걸까요?",
      },
      {
        type: "paragraph",
        content: "최근 사회초년생과 청년층을 중심으로 전세사기 피해가 끊이지 않고 있어요. 내가 꼼꼼히 안 알아봐서 당한 걸까요? 절대 아니에요. 부동산 계약 구조 자체가 세입자가 모든 정보를 투명하게 알기 어려운 '정보의 비대칭성'이라는 구조적 한계가 가장 커요.",
      },
      {
        type: "image",
        url: "/images/article/article_content_doc.png",
        altText: "복잡한 서류를 보며 고민하는 사람의 모습",
        caption: "어려운 부동산 서류, 꼼꼼히 확인하는 것만이 정답일까요?",
      },
      {
        type: "list",
        listType: "unordered",
        items: [
          "**등기부등본 (나보다 먼저 돈 받을 사람이 있는지 확인)**: 집주인이 이 집을 담보로 빌린 돈(근저당권)이 너무 많지 않은지 체크하세요. 통상적으로 융자금과 내 전세보증금을 합친 금액이 집값의 70%를 넘는다면 계약하지 않는 것이 안전해요.",
          "**건축물대장 (불법으로 지어진 집인지 확인)**: 서류상 '위반건축물'로 노란색 딱지가 붙어있다면 주의해야 해요. 전세자금대출이 거절되거나 전세보증보험 가입이 아예 불가능할 수 있어요.",
          "**임대인 세금 체납 여부 (숨겨진 빚 확인)**: 집주인이 밀린 세금이 있다면, 집이 잘못되어 경매로 넘어갔을 때 내 보증금보다 국가 세금이 먼저 빠져나가요. 계약하기 전 집주인에게 '국세·지방세 완납 증명서'를 꼭 요구하세요.",
        ],
      },
      {
        type: "quote",
        content: "1. \"전세보증금 반환보증보험 가입 불가 시, 본 계약은 무효로 하고 계약금 전액을 즉시 반환한다.\"\n2. \"임대인은 잔금 지급일 다음 날까지 현재의 권리 상태를 유지한다.\"\n3. \"계약 기간 중 임대인이 변경될 경우, 사전에 임차인에게 통지한다.\"",
      },
    ],
    callToAction: {
      text: "내 전세집 안전도 1분 만에 진단하기",
      url: "/safety-check",
      style: "primary",
    },
  },
]
