/** 객관식 퀴즈 문서 UI 항목 타입 */
export type DocumentCardField = {
  label: string
  value: string
}

export type DocumentCardData = {
  header: string
  subHeader: string
  sectionTitle: string
  fields: DocumentCardField[]
  footerNotice?: string
}


/** 객관식 퀴즈 문제 하나의 데이터 타입 */
export interface ChoiceQuestionItem {
  /** 문제 번호 (1-based) */
  questionNumber: number
  /** 단계 타입 (단어장/학습 vs 퀴즈) */
  type?: "word" | "learning" | "quiz"
  /**
   * 지문 표시 모드
   * - "text" : 일반 텍스트 카드 (기본값)
   * - "story": 대화형 버블 (추후 확장 예정)
   * - "conversation": 피그마 기반 대화형 (채팅방) UI
   * - "document": 서류 UI 카드 렌더링 모드
   */
  passageMode?: "text" | "story" | "conversation" | "document"
  /**
   * 선택지 표시 모드
   * - "multiple" : 사지선다 RadioGroup (기본값)
   * - "ox"       : O/X 버튼 2개
   * - "document_select" : 서류 UI의 fields 항목을 직접 터치해서 정답을 고르는 모드
   */
  choiceMode?: "multiple" | "ox" | "document_select"
  /** 지문 본문 */
  passage: string
  /** 지문 아래 플레이버 텍스트 (생각 등) */
  flavorText: string
  /** 서류 기반 문제일 경우 렌더링할 UI 데이터 (passageMode가 "document"일 때 사용) */
  documentCard?: DocumentCardData
  /** 대화 참여자 정보 (passageMode가 "conversation"일 때 사용) */
  conversationSpeakers?: {
    id: string
    name?: string
    position: "left" | "right"
    profileImageUrl?: string
  }[]
  /** 대화형 지문 목록 (passageMode가 "conversation"일 때 사용) */
  conversations?: {
    id: string
    speakerId: string
    message: string
  }[]
  /** 대화형 지문 하단 안내 박스 */
  conversationInfoBox?: {
    title: string
    content: string
  }
  /** 문제 이미지 URL */
  imageUrl: string
  /** 문제 이미지 alt 텍스트 */
  imageAlt: string
  /** 정답일 때 보여줄 캐릭터 이미지 URL */
  characterCorrectImageUrl?: string
  /** 오답일 때 보여줄 캐릭터 이미지 URL */
  characterIncorrectImageUrl?: string
  /** 객관식 질문 */
  question: string
  /** 보기 목록 */
  choices: string[]
  /** 정답 인덱스 (0-based) */
  correctIndex: number
  /** 해설 텍스트 */
  explanation: string
}

/** 전체 퀴즈 세트 */
export interface ChoiceQuestionSet {
  title: string
  missionTitle?: string
  missionKeywords?: string[]
  questions: ChoiceQuestionItem[]
}

// ─── Mock Data ──────────────────────────────────────────────

export const MOCK_CHOICE_QUESTION_SET: ChoiceQuestionSet = {
  title: "[2단계: 계약] 도장 찍기 전, 멍멍이의 마지막 방어선!",
  missionTitle: "부동산 필수 개념 5개 완벽하게 마스터하기",
  missionKeywords: ["LTV & DTI", "임대차 3법", "전세권"],
  questions: [
    // ────────────────────────────────────────────────────────
    // 1단계: 단어학습 (type: "word") - Q1 ~ Q5
    // ────────────────────────────────────────────────────────
    {
      questionNumber: 1,
      type: "word",
      passageMode: "text",
      passage: "[1부: 생존 단어장]\n계약 전 5가지만 기억하세요! 첫 번째는 '등기사항전부증명서(등기부등본)'입니다.",
      flavorText: "표제부: 겉모습 / 갑구: 진짜 주인 / 을구: 빚 상태",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계약서 서류",
      question: "등기사항전부증명서는 집의 진짜 주인과 빚이 적힌 부동산의 신분증입니다.",
      choices: ["단어 1. 등기사항전부증명서 (등기부등본)"],
      correctIndex: 0,
      explanation: "집의 모든 역사가 기록된 서류입니다. 부동산 계약의 시작과 끝이라고 할 수 있죠.",
    },
    {
      questionNumber: 2,
      type: "word",
      passageMode: "text",
      passage: "[1부: 생존 단어장]\n두 번째, '근저당권'와 '채권최고액'입니다. 근저당권은 집을 담보로 은행에 진 빚이에요.",
      flavorText: "채권최고액은 은행이 나중에 1순위로 뺏어갈 최대 금액이에요.",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80",
      imageAlt: "돈과 동전",
      question: "내 보증금이 안전한지 따질 때는 실제 남은 빚이 아니라 무조건 '채권최고액' 전체를 빚으로 봐야 해요.",
      choices: ["단어 2. 근저당권과 채권최고액"],
      correctIndex: 0,
      explanation: "실제 남은 빚이 얼마든 간에 서류에 적힌 근저당권 채권최고액 전체를 빚으로 계산하는 것이 안전합니다.",
    },
    {
      questionNumber: 3,
      type: "word",
      passageMode: "text",
      passage: "[1부: 생존 단어장]\n세 번째, 무시무시한 빨간불 삼총사! 바로 '가압류', '가처분', '신탁' 입니다.",
      flavorText: "서류의 '갑구'에 이런 단어들이 보인다면?",
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80",
      imageAlt: "경고 표시",
      question: "집에 심각한 문제가 있거나 진짜 주인이 따로 있다는 뜻이므로 절대 함부로 계약하면 안 됩니다.",
      choices: ["단어 3. 피해야 할 빨간불 (가압류/가처분/신탁)"],
      correctIndex: 0,
      explanation: "부동산 초보라면 갑구에 이런 권리 제한 단어가 있는 집은 무조건 피하는 것이 상책입니다.",
    },
    {
      questionNumber: 4,
      type: "word",
      passageMode: "text",
      passage: "[1부: 생존 단어장]\n네 번째, 대리인 계약 필수 서류. 주인이 바빠서 다른 사람이 대신 나왔다면 주인이 직접 떼어준 서류가 필요해요.",
      flavorText: "아무리 가족이라도 이 서류가 없으면 무효!",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=400&q=80",
      imageAlt: "서명하는 사람",
      question: "진짜 주인이 대리인에게 권한을 넘겼다는 증거인 '위임장'과 '본인발급 인감증명서'를 반드시 요구하세요.",
      choices: ["단어 4. 대리인 계약 필수 서류"],
      correctIndex: 0,
      explanation: "이 서류가 없으면 대리인과 맺은 계약은 무효가 될 수 있으므로, 보증금을 날릴 위험이 있습니다.",
    },
    {
      questionNumber: 5,
      type: "word",
      passageMode: "text",
      passage: "[1부: 생존 단어장]\n마지막, 나를 지켜주는 마법의 방패인 '특약'입니다. 계약서 맨 밑에 쓰는 특별한 약속이에요.",
      flavorText: "전세대출이 거절되면 계약금은 돌려준다!",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계약서 특약 사항",
      question: "만약 대출이 안 나오면 계약금은 돌려준다는 등, 나를 보호하는 문장을 추가할 수 있어요.",
      choices: ["단어 5. 특약 (나를 지켜주는 방패)"],
      correctIndex: 0,
      explanation: "표준 계약서의 기본 조항 외에 나를 보호할 수 있는 안전장치를 특약으로 반드시 명시해야 합니다.",
    },

    // ────────────────────────────────────────────────────────
    // 2단계: 텍스트 문제 풀기 (type: "quiz", passageMode: "text") - Q6, Q7
    // ────────────────────────────────────────────────────────
    {
      questionNumber: 6,
      type: "quiz",
      passageMode: "text",
      choiceMode: "ox",
      passage: "[Scene 1: 첫 만남]\n부푼 꿈을 안고 '불독 부동산' 문을 연 멍멍이. 불독 중개사 아저씨가 시세 반값짜리 집을 보여주며 当장 계약하자고 재촉합니다.",
      flavorText: "내가 보증하니까 그냥 요기 계약서에 발도장 꾹 찍어~",
      imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
      imageAlt: "강아지 일러스트",
      question: "중개사의 말만 믿고 등기부등본을 확인하지 않아도 계약은 안전하다.",
      choices: ["O", "X"],
      correctIndex: 1,
      explanation: "무조건 틀렸습니다! 중개사의 말이 아니라 '등기사항전부증명서(등기부등본)'를 직접 떼어서 진짜 주인과 빚의 상태를 눈으로 확인해야 합니다.",
    },
    {
      questionNumber: 7,
      type: "quiz",
      passageMode: "text",
      choiceMode: "ox",
      passage: "[Scene 1: 서류의 구조]\n드디어 서류를 받았습니다! 등기부등본의 '을구'에는 소유자(진짜 주인) 정보가, '갑구'에는 근저당권(은행 빚) 정보가 적혀 있다고 중개사가 설명합니다.",
      flavorText: "중개사 아저씨 말이 맞을까요?",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
      imageAlt: "서류를 보는 일러스트",
      question: "등기부등본에서 소유자(진짜 주인)는 '갑구', 근저당권(빚)은 '을구'에서 확인할 수 있다.",
      choices: ["O", "X"],
      correctIndex: 0,
      explanation: "정답입니다! 갑구에는 소유권(진짜 주인)이, 을구에는 근저당권(은행 빚) 등 소유권 이외의 권리가 적혀 있습니다. 이 두 곳을 꼭 확인하세요!",
    },

    // ────────────────────────────────────────────────────────
    // 2단계-B: 텍스트 지문 + 사지선다 (type: "quiz", passageMode: "text", choiceMode: "multiple") - Q8, Q9
    // ────────────────────────────────────────────────────────
    {
      questionNumber: 8,
      type: "quiz",
      passageMode: "text",
      choiceMode: "multiple",
      passage: "[Scene 1-2: 안전 계산기]\n드디어 마음에 드는 집을 찾았습니다! 인터넷 시세는 3억 원, 을구에는 채권최고액 2억 4천만 원의 근저당권이 있어요. 집주인이 보증금 8천만 원을 요구합니다.",
      flavorText: "불독 중개사: '이 정도면 완전 안전하죠~ 어서 계약서 쓰세요!'",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계산기와 서류",
      question: "집값 3억, 채권최고액 2억 4천만 원, 보증금 8천만 원. 이 집에 전세로 들어가도 안전할까요?",
      choices: [
        "집값이 3억이나 되니까 보증금은 당연히 돌려받을 수 있다.",
        "집값(3억) - 채권최고액(2억 4천) = 6천만 원. 보증금 8천만 원보다 적으니 위험하다.",
        "보증금이 집값의 30%도 안 되니까 안전하다.",
        "채권최고액은 최대치일 뿐이니 크게 신경 안 써도 된다.",
      ],
      correctIndex: 1,
      explanation: "집이 경매에 넘어가면 은행이 채권최고액(2억 4천) 전액을 1순위로 가져갑니다. 남은 6천만 원에서는 보증금 8천만 원을 다 받을 수 없어요. '집값 - 채권최고액 ≥ 보증금'이어야 최소한의 안전을 담보할 수 있습니다.",
      characterCorrectImageUrl: "/images/result/dog_perfect.png",
      characterIncorrectImageUrl: "/images/result/dog_fail.png",
    },
    {
      questionNumber: 9,
      type: "quiz",
      passageMode: "text",
      choiceMode: "multiple",
      passage: "[Scene 1-3: 이사 당일 골든타임]\n드디어 계약을 마치고 이사 당일 아침! 멍멍이는 짐을 다 풀었습니다. 저녁에는 친구들과 집들이 파티가 예정되어 있어요. 그런데 집주인한테서 연락이 왔습니다.\n\n\"전입신고는 나중에 해도 되니까 오늘은 집들이나 즐겨~\"",
      flavorText: "이사 당일, 멍멍이가 반드시 챙겨야 할 순서는?",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
      imageAlt: "이삿짐 박스",
      question: "이사 당일 보증금을 지키기 위해 반드시 같은 날 완료해야 하는 절차는?",
      choices: [
        "짐 정리 → 인터넷 개통 → 며칠 안에 전입신고",
        "잔금 입금 → 전입신고 → 확정일자 (당일에 모두!)",
        "집주인에게 영수증 받기 → 편한 날 전입신고",
        "이사 완료 → 집들이 파티 → 다음 주 전입신고",
      ],
      correctIndex: 1,
      explanation: "이사 당일 잔금을 치르고, 같은 날 주민센터에서 전입신고와 확정일자를 모두 받아야 합니다. 하루라도 늦으면 그 사이 새 근저당이 잡히거나 다른 권리자가 먼저 순위를 취득할 수 있어요. 집들이는 도장 받고 나서!",
      characterCorrectImageUrl: "/images/result/dog_perfect.png",
      characterIncorrectImageUrl: "/images/result/dog_fail.png",
    },

    // ────────────────────────────────────────────────────────
    // 3단계: 서류 기반 문제 풀기 (type: "quiz", passageMode: "document") - Q10, Q11, Q12
    // ────────────────────────────────────────────────────────

    // 타입 1: 서류 UI의 요소를 직접 터치해서 정답을 고르는 문제 (document_select)
    {
      questionNumber: 10,
      type: "quiz",
      passageMode: "text",
      choiceMode: "document_select",
      passage: "[Scene 2: 서류 판독 트레이닝]\n불독 아저씨가 건넨 서류의 '갑구'를 살펴봅니다.",
      flavorText: "이 서류에서 당장 계약을 멈춰야 하는 가장 위험한 '부분'을 찾아 눌러보세요!",
      documentCard: {
        header: "등 기 사 항 전 부 증 명 서",
        subHeader: "토지 및 건물 — 가상 문서",
        sectionTitle: "▶ 갑구 (소유권에 관한 사항)",
        fields: [
          { label: "소재지", value: "햇살동 100번지 뼈다귀 하우스" }, // index 0
          { label: "소유자", value: "불독 (800101-*******)" }, // index 1
          { label: "순위번호", value: "2번" }, // index 2
          { label: "등기목적", value: "가압류" }, // index 3 (정답 영역)
          { label: "권리자 및 기타", value: "채권자 개굴개굴은행\n청구금액 50,000,000원" } // index 4
        ],
        footerNotice: "본 문서는 학습용 가상 서류입니다. 개인정보는 포함되어 있지 않습니다."
      },
      imageUrl: "",
      imageAlt: "",
      question: "이 서류에서 가장 위험한 글자를 찾아 직접 터치하세요!",
      choices: [], // 직접 선택 모드이므로 객관식 보기는 비움
      correctIndex: 3, // fields 배열의 3번째 인덱스("가압류")가 정답
      explanation: "정답입니다! 갑구에 '가압류'가 있다는 것은 집이 강제로 넘어갈 위기라는 뜻입니다. 서류에서 이 단어를 발견하면 뒤도 돌아보지 말고 피하세요.",
    },
    
    // 타입 2: 서류 UI를 지문으로 보고 하단 객관식을 고르는 문제 (multiple)
    {
      questionNumber: 11,
      type: "quiz",
      passageMode: "document",
      choiceMode: "multiple",
      passage: "[Scene 2: 서류 판독 트레이닝]\n가압류 집을 피하고 두 번째 집 서류를 봅니다. 이번에도 '갑구'입니다.",
      flavorText: "불독 아저씨가 자기가 주인이 맞다고 하네요. 진짜일까요?",
      documentCard: {
        header: "등 기 사 항 전 부 증 명 서",
        subHeader: "토지 및 건물 — 가상 문서",
        sectionTitle: "▶ 갑구 (소유권에 관한 사항)",
        fields: [
          { label: "소재지", value: "달빛동 200번지 치즈 하우스" },
          { label: "순위번호", value: "3번" },
          { label: "등기목적", value: "소유권이전" },
          { label: "권리자 및 기타", value: "수탁자 주식회사 무궁화신탁" }
        ],
        footerNotice: "본 문서는 학습용 가상 서류입니다. 개인정보는 포함되어 있지 않습니다."
      },
      imageUrl: "",
      imageAlt: "",
      question: "불독 아저씨가 '내가 원래 주인이니까 나랑 계약해'라고 합니다. 서류를 본 멍멍이의 올바른 해석은?",
      choices: [
        "원래 주인이라고 하니 불독 아저씨와 계약서를 쓴다.",
        "이 집의 진짜 권리는 '신탁회사'에 있으므로 불독 아저씨와 함부로 계약하면 안 된다."
      ],
      correctIndex: 1,
      explanation: "신탁회사가 관리하는 집은 소유권이 신탁회사에 넘어간 상태입니다. 반드시 신탁회사의 서면 동의서가 있거나 신탁회사와 직접 계약해야 보증금을 지킬 수 있습니다.",
    },
    {
      questionNumber: 12,
      type: "quiz",
      passageMode: "document",
      choiceMode: "multiple",
      documentCard: {
        header: "등 기 사 항 전 부 증 명 서",
        subHeader: "토지 및 건물 — 가상 문서",
        sectionTitle: "▶ 을구 (소유권 이외의 권리에 관한 사항)",
        fields: [
          { label: "소재지", value: "별빛동 300번지 우유 하우스" },
          { label: "순위번호", value: "1번" },
          { label: "등기목적", value: "근저당권설정" },
          { label: "권리자 및 기타", value: "채권최고액 금 300,000,000원\n근저당권자 튼튼은행" }
        ],
        footerNotice: "본 문서는 학습용 가상 서류입니다. 개인정보는 포함되어 있지 않습니다."
      },
      passage: "[Scene 3: 빚 계산하기]\n세 번째 집! 드디어 갑구가 깨끗합니다. 이제 빚이 얼마나 있는지 '을구'를 봅니다.",
      flavorText: "불독: '나 5천만 원 갚아서 이제 빚 2억 5천만 원이야! 영수증 봐봐~'",
      imageUrl: "",
      imageAlt: "",
      question: "불독 아저씨의 말을 듣고, 내 보증금이 안전할지 따져볼 때 기준으로 삼아야 할 빚 금액은?",
      choices: [
        "영수증으로 확인된 남은 원금인 2억 5천만 원!",
        "은행이 넉넉히 잡은 금액이니까 대충 2억 5천만 원!",
        "실제 빚이 얼마든 간에 무조건 서류에 적힌 최대치인 3억 원!"
      ],
      correctIndex: 2,
      explanation: "은행 이자 영수증이나 구두 약속은 법적 효력이 없습니다. 집이 경매에 넘어가면 은행은 등기부등본에 적힌 '채권최고액'만큼 1순위로 가져가므로, 이 3억 원 전체를 빚으로 보수적으로 계산해야 안전합니다.",
    },

    // ────────────────────────────────────────────────────────
    // 4단계: 상황형 문제 풀기 (type: "quiz", passageMode: "conversation") - Q13 ~ Q16
    // ────────────────────────────────────────────────────────
    {
      questionNumber: 13,
      type: "quiz",
      passageMode: "conversation",
      choiceMode: "multiple",
      passage: "[Scene 4: 대리인의 등장]",
      flavorText: "",
      conversationSpeakers: [
        { id: "me", position: "right", profileImageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80" },
        { id: "pug", name: "퍼그 아저씨", position: "left", profileImageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=100&q=80" }
      ],
      conversations: [
        { id: "c1", speakerId: "pug", message: "어휴 숨차. 우리 형(불독)이 오늘 바쁘다고 해서 내가 대신 계약하러 왔어~" },
        { id: "c2", speakerId: "me", message: "네? 집주인 아저씨가 안 오셨다고요?" },
        { id: "c3", speakerId: "pug", message: "응응, 형이 나한테 다 알아서 하라고 했어. 가족이니까 그냥 나랑 쓰자!" }
      ],
      imageUrl: "",
      imageAlt: "",
      question: "진짜 집주인 대신 동생인 퍼그 아저씨가 나왔습니다. 멍멍이가 당당하게 요구해야 할 서류 두 가지는?",
      choices: [
        "가족관계증명서, 집주인 불독 아저씨의 영상통화 캡처",
        "위임장, 집주인 불독 아저씨 본인이 발급한 인감증명서",
        "건축물대장, 토지대장"
      ],
      correctIndex: 1,
      explanation: "아무리 가까운 가족이라도 법적인 대리인이 되려면 집주인의 인감도장이 찍힌 '위임장'과 '본인발급 인감증명서'가 반드시 있어야 합니다.",
    },
    {
      questionNumber: 14,
      type: "quiz",
      passageMode: "conversation",
      choiceMode: "multiple",
      passage: "[Scene 4: 마법의 방패 치기]",
      flavorText: "",
      conversationSpeakers: [
        { id: "me", position: "right", profileImageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80" },
        { id: "broker", name: "불독 중개사", position: "left", profileImageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=100&q=80" }
      ],
      conversations: [
        { id: "c1", speakerId: "broker", message: "자, 이제 특약사항 다 적었고 도장 찍읍시다!" },
        { id: "c2", speakerId: "me", message: "아저씨, 저 은행에서 전세대출 받아서 잔금 치를 건데요. 만약에 대출 안 해주면 제 계약금은 어떻게 돼요?" },
        { id: "c3", speakerId: "broker", message: "에이~ 그럴 일 없어. 학생 관상이 딱 대출 프리패스 상이네!" }
      ],
      imageUrl: "",
      imageAlt: "",
      question: "중개사의 말을 무시하고, 계약서 맨 밑 특약사항에 꼭 적어달라고 해야 하는 '마법의 문구'는?",
      choices: [
        "전세대출이 거절될 경우 계약은 무효로 하고, 계약금은 즉시 전액 반환한다.",
        "전세대출이 거절될 경우, 집주인이 멍멍이에게 월세를 깎아준다.",
        "전세대출이 거절되면 멍멍이는 계약금을 포기한다."
      ],
      correctIndex: 0,
      explanation: "전세대출은 은행 심사 전까지 100% 확신할 수 없습니다. 대출 거절 시 피 같은 계약금을 잃지 않으려면 이 특약을 반드시 한 글자도 빠짐없이 넣어야 합니다.",
    },
    {
      questionNumber: 15,
      type: "quiz",
      passageMode: "conversation",
      choiceMode: "multiple",
      passage: "[Scene 4: 마지막 함정]",
      flavorText: "",
      conversationSpeakers: [
        { id: "me", position: "right", profileImageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80" },
        { id: "pug", name: "퍼그 아저씨", position: "left", profileImageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=100&q=80" }
      ],
      conversations: [
        { id: "c1", speakerId: "me", message: "휴, 서류 확인 다 끝났습니다. 이제 계약금 보낼게요." },
        { id: "c2", speakerId: "pug", message: "아이고 잘 생각했어! 근데 형이 지금 은행앱 점검 시간이라 확인이 안 된대." },
        { id: "c3", speakerId: "pug", message: "그러니까 일단 여기 내(퍼그) 통장으로 입금해 줘. 내가 형한테 이따 줄게." }
      ],
      conversationInfoBox: {
        title: "입금 직전 주의사항",
        content: "계약금과 잔금을 입금할 때는 1초만 더 생각해 보세요!"
      },
      imageUrl: "",
      imageAlt: "",
      question: "대리인 퍼그 아저씨가 자기 통장으로 입금하라고 유도합니다. 멍멍이의 올바른 대처법은?",
      choices: [
        "가족 통장이니까 편하게 퍼그 아저씨 통장으로 보낸다.",
        "절대 안 돼요! 서류(갑구)에 적힌 진짜 집주인(불독) 명의의 통장으로만 입금할게요."
      ],
      correctIndex: 1,
      explanation: "하늘이 두 쪽 나도 계약금과 보증금은 무조건 '등기부등본 갑구에 적힌 진짜 소유자 명의 통장'으로만 입금해야 법적인 보호를 받습니다. 대리인이나 중개사 통장으로 보내면 안 됩니다.",
    },
    {
      questionNumber: 16,
      type: "quiz",
      passageMode: "conversation",
      choiceMode: "multiple",
      passage: "[Scene 5: 전입신고의 중요성]",
      flavorText: "",
      conversationSpeakers: [
        { id: "me", position: "right", profileImageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80" },
        { id: "other", name: "불독 아저씨", position: "left", profileImageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=100&q=80" }
      ],
      conversations: [
        { id: "c1", speakerId: "other", message: "그런데 학생. 혹시 전입신고 할 생각이에요?" },
        { id: "c2", speakerId: "me", message: "네, 그러려고요. 왜요?" },
        { id: "c3", speakerId: "other", message: "전입신고 안 할수는 없을까? 세금이랑 건강보험 때문에 그래. 학생한테 부탁좀 할게." },
        { id: "c4", speakerId: "other", message: "대신 월세 5만원 깎아줄게요. 학생, 그렇게 해줄거지?" }
      ],
      conversationInfoBox: {
        title: "전입신고를 거부하는 경우",
        content: "전입신고를 하지 않으면, 대항력과 우선변제권을 상실해서 보증금을 통째로 날릴 수도 있어요."
      },
      imageUrl: "",
      imageAlt: "",
      question: "집주인이 전입신고를 하지 말라고 부탁할 때 가장 올바른 대처법은?",
      choices: [
        "월세를 깎아준다고 하니 오히려 좋다! 알겠다고 한다.",
        "전입신고는 무조건 해야 한다고 단호하게 거절한다.",
        "부모님과 상의해 보겠다고 하고 몰래 전입신고를 한다.",
        "동사무소 직원이 안 된다고 했다며 거짓말을 한다."
      ],
      correctIndex: 1,
      explanation: "전입신고와 확정일자는 주택임대차보호법의 보호를 받기 위한 필수 생명줄입니다. 어떠한 경우라도 전입신고를 하지 않는 조건의 계약은 피해야 합니다. 당장 도망치세요!",
    }
  ]
}


