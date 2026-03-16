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
  title: "[챕터 1] 첫 발바닥 도장 꾹! 나만의 집 탐색 시작하기",
  missionTitle: "부동산 탐색 기초와 추가 비용 완벽하게 마스터하기",
  missionKeywords: ["관리비와 공과금", "전용면적", "중개보수"],
  questions: [
    {
      questionNumber: 1,
      type: "quiz",
      passageMode: "text",
      choiceMode: "ox",
      passage: "[Scene 1: 첫 보증금의 충격]\n생전 처음 보는 큰 액수의 '보증금'. 멍멍이는 이 돈을 한 번에 내야 한다는 사실에 깜짝 놀랍니다. 하지만 불독 중개사는 나중에 돌려받는 돈이니 걱정 말라고 하네요.",
      flavorText: "이 큰 돈을 진짜 나중에 다 돌려받을 수 있는 걸까멍?",
      imageUrl: "/ai_character_assets/05_illustrations/scene_deposit_shock_v2.png",
      imageAlt: "보증금 액수를 보고 놀란 멍멍이와 불독 중개사",
      question: "보증금은 계약이 끝나면 집주인에게 다시 돌려받는 돈이다.",
      choices: ["O", "X"],
      correctIndex: 0,
      explanation: "정답입니다! 보증금은 집을 빌리는 대가로 잠시 맡겨두는 돈이에요. 큰 금액이라 무섭지만, 나갈 때 돌려받는 내 돈이라는 점을 꼭 기억하세요!",
    },
    {
      questionNumber: 2,
      type: "quiz",
      passageMode: "text",
      choiceMode: "multiple",
      passage: "[Scene 2: 관리비가 끝이 아니라고?]\n관리비 5만 원에 모든 게 포함된 줄 알고 안심한 멍멍이. 하지만 나중에 날아온 고지서에는 내가 쓴 만큼 따로 내야 하는 '공과금'이 적혀 있습니다.",
      flavorText: "전기세랑 가스비는 관리비랑 별개였다멍...!",
      imageUrl: "/ai_character_assets/05_illustrations/scene_quiz_q2_utility_bill.png",
      imageAlt: "공과금 고지서를 보고 당황한 멍멍이",
      question: "관리비 외에 세입자가 사용량에 따라 별도로 납부해야 하는 '공과금'에 주로 포함되는 항목은?",
      choices: [
        "아파트 단지 청소비와 소독비",
        "엘리베이터 유지비와 공동 전기료",
        "개별적으로 사용한 전기 요금과 도시가스 요금",
        "부동산 중개사 아저씨의 점심 식사비",
      ],
      correctIndex: 2,
      explanation: "관리비는 건물 전체를 관리하는 데 드는 공통 비용이고, 공화금은 멍멍이가 방에서 직접 쓴 '에너지 값'이에요. 전기, 가스 등은 쓴 만큼 따로 내야 할 확률이 높답니다.",
    },
    {
      questionNumber: 3,
      type: "quiz",
      passageMode: "text",
      choiceMode: "multiple",
      passage: "[Scene 3: 숨어있던 관리비의 정체]\n분명 무선 인터넷 무료라고 했는데, 스마트폰을 보던 멍멍이는 '기타 관리비' 항목에서 무선 공유기 대여료가 따로 나가는 걸 발견합니다.",
      flavorText: "세상에 공짜는 없다더니... 꼼꼼히 확인해볼 걸 그랬다멍.",
      imageUrl: "/ai_character_assets/05_illustrations/scene_quiz_q3_hidden_cost.png",
      imageAlt: "스마트폰으로 관리비 상세 내역을 확인하는 멍멍이",
      question: "집을 구할 때 '관리비 포함 항목'을 꼼꼼히 확인해야 하는 이유는?",
      choices: [
        "나중에 집주인과 친해지기 위해서",
        "인터넷, 수도세 등이 포함되지 않으면 실제 생활비가 훨씬 늘어나기 때문",
        "관리비가 비싸야 집이 더 튼튼하기 때문",
        "중개사 아저씨에게 선물을 주기 위해서",
      ],
      correctIndex: 1,
      explanation: "월세가 싸더라도 관리비에 인터넷, 수도, TV 수신료 등이 빠져 있으면 매달 추가 지출이 발생해요. '포함' 목록을 꼭 확인하는 습관을 가져야 합니다.",
    },
    {
      questionNumber: 4,
      type: "quiz",
      passageMode: "text",
      choiceMode: "multiple",
      passage: "[Scene 4: 운동장 같다더니...?]\n불독 중개사가 '운동장처럼 넓은 방'이라고 해서 가봤더니, 멍멍이 발바닥 몇 번이면 끝나는 좁은 방입니다. 중개사는 이게 다 전용면적 때문이라고 변명하네요.",
      flavorText: "내 몸 하나 눕기도 벅차 보이는데 이게 운동장이라니멍!",
      imageUrl: "/ai_character_assets/05_illustrations/scene_quiz_q4_real_area.png",
      imageAlt: "좁은 방 면적에 당황한 멍멍이와 설명하는 불독",
      question: "공고에 적힌 평수보다 실제 방이 훨씬 작게 느껴지는 리얼한 이유는?",
      choices: [
        "멍멍이의 기분이 안 좋아서",
        "복도, 계단을 포함한 '공급면적'으로 홍보하고 실제로 내가 쓰는 '전용면적'은 작기 때문",
        "집주인이 매일 밤 방 크기를 줄이고 있어서",
        "방에 가구가 없어서 착시 현상이 일어난 것",
      ],
      correctIndex: 1,
      explanation: "광고에서는 넓게 보이려고 복도나 계단 같은 공용 공간을 합친 '공급면적'을 말할 때가 많아요. 우리가 실제로 살 공간인 '전용면적'을 반드시 확인해야 실망하지 않습니다.",
    },
    {
      questionNumber: 5,
      type: "quiz",
      passageMode: "text",
      choiceMode: "multiple",
      passage: "[Scene 5: 복비는 팁이 아니야!]\n방을 다 보고 나오는데 불독 중개사가 고생했다며 '수고비'를 조금 더 달라고 넌지시 말합니다. 멍멍이는 망설여집니다.",
      flavorText: "이미 정해진 수수료가 있을 텐데, 더 줘야 하는 걸까멍?",
      imageUrl: "/ai_character_assets/05_illustrations/scene_quiz_q5_brokerage_fee.png",
      imageAlt: "중개보수 요구에 고민하는 멍멍이와 불독",
      question: "부동산 중개사에게 지불하는 '중개보수(복비)'에 대한 올바른 설명은?",
      choices: [
        "중개사가 고생했으니 부르는 대로 더 줘야 한다.",
        "법으로 정해진 상한 요율이 있으며, 이를 초과해서 줄 의무는 없다.",
        "계약이 안 되어도 집을 보여준 수고비는 무조건 내야 한다.",
        "복비는 집주인이 다 내는 것이니 세입자는 신경 안 써도 된다.",
      ],
      correctIndex: 1,
      explanation: "중개보수는 법적으로 정해진 한도가 있어요. 고마운 마음은 이해하지만, 법적 한도를 넘는 추가 금전 요구를 따를 필요는 없답니다. 당당하게 계산하세요!",
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


