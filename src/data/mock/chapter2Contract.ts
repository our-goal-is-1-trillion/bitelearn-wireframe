import type { ChoiceQuestionSet } from "./choiceQuestion"

export const MOCK_CHAPTER2_CONTRACT: ChoiceQuestionSet = {
  title: "[2단계: 계약] 도장 찍기 전, 멍멍이의 방어선",
  questions: [
    // --- Learning Concept 1 ---
    {
      questionNumber: 1,
      type: "learning",
      passage:
        "1부: 계약 전 필수 탑재! 멍멍이의 생존 단어장\n\n불독 중개사 아저씨와 기싸움을 하기 전, 5가지만 머릿속에 넣으세요! 첫 번째는 '등기사항전부증명서(등기부등본)'입니다.",
      flavorText: "표제부: 겉모습 / 갑구: 진짜 주인 / 을구: 빚 상태",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계약서와 펜",
      question: "등기사항전부증명서는 집의 진짜 주인과 빚이 적힌 부동산의 신분증입니다.",
      choices: ["개념을 확실히 이해했어요!"],
      correctIndex: 0,
      explanation: "집의 모든 역사가 기록된 서류입니다. 표제부, 갑구, 을구 세 가지로 나뉘어 있어요.",
    },
    // --- Learning Concept 2 ---
    {
      questionNumber: 2,
      type: "learning",
      passage:
        "단어장 두 번째, '근저당권'과 '채권최고액'입니다. 근저당권은 집주인이 집을 담보로 은행에 진 빚을 뜻해요.",
      flavorText: "채권최고액은 은행이 나중에 1순위로 뺏어갈 최대 금액이에요.",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80",
      imageAlt: "돈과 동전",
      question: "보통 실제 빌린 돈의 120%를 넉넉하게 적어둡니다. 내 보증금이 안전한지 따질 때는 이 채권최고액 전체를 빚으로 봐야 해요.",
      choices: ["빚에 대해 이해했어요!"],
      correctIndex: 0,
      explanation: "실제 남은 빚이 얼마든 간에 서류에 적힌 근저당권 채권최고액 전체를 빚으로 계산하는 것이 안전합니다.",
    },
    // --- Learning Concept 3 ---
    {
      questionNumber: 3,
      type: "learning",
      passage:
        "단어장 세 번째, 무시무시한 빨간불 삼총사! 바로 '가압류', '가처분', '신탁' 입니다.",
      flavorText: "서류의 갑구에 이런 단어들이 보인다면?",
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80",
      imageAlt: "경고 표시",
      question: "집에 심각한 문제가 있거나 진짜 주인이 따로 있다는 뜻이므로 절대 함부로 계약하면 안 됩니다.",
      choices: ["빨간불 삼총사 접근 금지!"],
      correctIndex: 0,
      explanation: "부동산 초보라면 갑구에 이런 권리 제한 단어가 있는 집은 무조건 피하는 것이 상책입니다.",
    },
    // --- Learning Concept 4 ---
    {
      questionNumber: 4,
      type: "learning",
      passage:
        "단어장 네 번째, 대리인 계약 필수 서류. 주인이 바빠서 다른 사람이 대신 나왔다면 주인이 직접 떼어준 서류가 필요해요.",
      flavorText: "어떤 서류인지 기억 나시나요?",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=400&q=80",
      imageAlt: "서명하는 사람",
      question: "진짜 주인이 대리인에게 권한을 넘겼다는 증거인 '위임장'과 '본인발급 인감증명서'를 반드시 요구하세요.",
      choices: ["대리인 서류 체크리스트 추가 완료!"],
      correctIndex: 0,
      explanation: "이 서류가 없으면 대리인과 맺은 계약은 무효가 될 수 있으므로, 보증금을 날릴 위험이 있습니다.",
    },
    // --- Learning Concept 5 ---
    {
      questionNumber: 5,
      type: "learning",
      passage:
        "단어장 마지막, 나를 지켜주는 마법의 방패인 '특약'입니다. 계약서 맨 밑에 쓰는 특별한 약속이에요.",
      flavorText: "나중에 발생할 수 있는 사고를 대비해요.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계약서 특약 사항",
      question: "예: 임차인의 책임 없는 사유로 전세대출이 거절될 경우 계약금을 전액 반환한다.",
      choices: ["특약의 힘을 느꼈어요!"],
      correctIndex: 0,
      explanation: "표준 계약서의 기본 조항 외에 나를 보호할 수 있는 안전장치를 특약으로 반드시 명시해야 합니다.",
    },
    // --- Quiz 1 ---
    {
      questionNumber: 6,
      type: "quiz",
      passage:
        "[실전 모의고사 1: 신분증 요구하라!]\n\n부푼 꿈을 안고 '불독 부동산' 문을 연 멍멍이. 불독 중개사 아저씨가 사람 좋은 미소로 시세 반값짜리 집을 보여주며 계약서에 도장을 찍자고 재촉합니다.",
      flavorText: '"내가 보증하니까 그냥 요기 계약서에 발도장 꾹 찍어~"',
      imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
      imageAlt: "불독 강아지",
      question: "아저씨 말만 믿을 수 없는 멍멍이! 이 집의 '진짜 주인'과 '빚'을 확인하기 위해 당당히 떼어달라 요구해야 할 서류는?",
      choices: [
        "이 집 크기가 얼만지 건축물대장 보여주세요!",
        "제 신분증 여깄습니다! 주민등록등본 떼어주세요!",
        "부동산의 신분증! 등기사항전부증명서(등기부등본) 보여주세요!",
        "집주인 아저씨 건강검진표 보여주세요!",
      ],
      correctIndex: 2,
      explanation:
        "등기사항전부증명서(등기부등본)는 집의 진짜 주인과 빚이 적힌 '부동산의 신분증'입니다. 계약 전 무조건 확인해야 해요!",
    },
    // --- Quiz 2 ---
    {
      questionNumber: 7,
      type: "quiz",
      passage:
        "[실전 모의고사 2]\n\n윙~ 프린터기에서 서류가 나왔어요. 첫 장을 보니 이 집이 '햇살동 100번지, 2층짜리 집'이 맞는지 건물의 스펙이 적혀 있네요.",
      flavorText: '"이 집이 어디 있고 몇 평인지 적혀있네!"',
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
      imageAlt: "집 외부",
      question: "집의 겉모습이 적혀 있는 서류의 이 부분은 뭐라고 부를까요?",
      choices: ["표제부", "갑구", "을구"],
      correctIndex: 0,
      explanation: "표제부는 집의 주소, 면적, 층수 등 겉모습(외형)에 대한 기본적인 정보가 적힌 부분입니다.",
    },
    // --- Quiz 3 ---
    {
      questionNumber: 8,
      type: "quiz",
      passage:
        "[실전 모의고사 3]\n\n주소와 층수는 확인했어요. 그럼 이제 불독 아저씨가 진짜 주인이 맞는지 이름과 주민등록번호를 대조해 보려고 해요.",
      flavorText: '"누가 진짜 주인이개?"',
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80",
      imageAlt: "자세히 보는 강아지",
      question: "소유권 확인을 위해 서류의 어느 부분을 뚫어져라 살펴봐야 할까요?",
      choices: ["표제부", "갑구", "을구"],
      correctIndex: 1,
      explanation: "갑구에는 소유권(진짜 주인)과 소유권을 위협하는 위험 요소(가압류, 신탁 등)가 적혀 있습니다.",
    },
    // --- Quiz 4 ---
    {
      questionNumber: 9,
      type: "quiz",
      passage:
        "[실전 모의고사 4: 서류의 진실]\n\n(헉!) 갑구를 보던 멍멍이의 꼬리가 처졌어요. 무시무시한 글씨로 [가압류]라고 적혀 있었거든요!\n불독 중개사: 아유~ 그거 별거 아니야. 내가 내일모레 싹 지워줄 테니까 도장 찍어!",
      flavorText: '"내일모레면 안전해진다고?"',
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80",
      imageAlt: "당황한 강아지",
      question: "위험을 느낀 멍멍이의 올바른 행동은?",
      choices: [
        "넵! 내일모레 지워주신다는 아저씨 약속 믿고 계약할게요!",
        "절대 안 돼요! 약속은 무효! 서류가 깨끗해지기 전까진 계약 못 해요!",
      ],
      correctIndex: 1,
      explanation: "말로 하는 약속은 법적 효력을 입증하기 어렵습니다. 가압류 등이 깨끗하게 지워진 후의 서류를 확인하고 계약해야 합니다.",
    },
    // --- Quiz 5 ---
    {
      questionNumber: 10,
      type: "quiz",
      passage:
        "[실전 모의고사 5]\n\n다른 집 구경을 갔는데, 이번엔 '갑구' 소유자 란에 집주인 대신 [신탁]이라고 적혀 있어요.\n불독 중개사: 내가 원래 주인 맞고, 관리만 회사에 잠깐 맡긴 거니까 나랑 그냥 계약해~",
      flavorText: '"내가 원래 주인이라니까 믿으라고!"',
      imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80",
      imageAlt: "집 안 문스프링",
      question: "신탁이라고 적힌 집, 불독 아저씨의 말만 믿고 덜컥 계약해도 될까요?",
      choices: ["O (계약해도 된다)", "X (계약하면 안 된다)"],
      correctIndex: 1,
      explanation: "신탁된 집의 진짜 권리는 '신탁회사'에 있습니다. 원래 주인이랑 함부로 계약하면 보증금을 다 날릴 수 있어요!",
    },
    // --- Quiz 6 ---
    {
      questionNumber: 11,
      type: "quiz",
      passage:
        "[실전 모의고사 6: 빚쟁이 피하기]\n\n이번엔 가압류도 신탁도 없는 달빛 하우스를 보러 왔어요. 방금 배운 '을구'를 확인해 은행 대출을 꼼꼼히 봅니다.",
      flavorText: '"빚이 얼마나 있는 집이지?"',
      imageUrl: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=400&q=80",
      imageAlt: "계산기와 돈",
      question: "을구에 은행 대출이 적혀있는 것을 보았습니다. 집에 은행 대출이 얼마나 있는지 확인하려면 어디를 봐야 할까요?",
      choices: ["표제부", "갑구", "을구"],
      correctIndex: 2,
      explanation: "정답은 '을구'입니다! 을구에는 근저당권(은행 대출) 및 전세권 등 집에 얽힌 빚과 관련된 권리가 기록됩니다.",
    },
    // --- Quiz 7 ---
    {
      questionNumber: 12,
      type: "quiz",
      passage:
        "[실전 모의고사 7]\n\n을구를 보니 [근저당권 채권최고액 3억 원]이라고 떡하니 적혀 있어요! 멍멍이는 머릿속으로 보증금이 안전할지 계산해보기 시작합니다.",
      flavorText: '"채권최고액이라... 무슨 뜻이더라?"',
      imageUrl: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=400&q=80",
      imageAlt: "생각하는 개",
      question: "멍멍이의 생각 중 '가장 위험한 착각'은 무엇일까요?",
      choices: [
        "은행이 집을 넘길 때 최대로 뺏어갈 수 있는 한도가 3억이군.",
        "실제로 빌린 원금은 3억보단 조금 적겠지.",
        "보증금 안전을 계산할 때, 실제 대충 빌린 원금만 빚으로 빼면 되겠지? 개이득!",
      ],
      correctIndex: 2,
      explanation:
        "무조건 은행 입장에서 적어 둔 최대 금액인 '채권최고액(3억 전체)'을 빚으로 쳐서 보수적으로 계산해야 내 돈을 지킬 수 있습니다.",
    },
    // --- Quiz 8 ---
    {
      questionNumber: 13,
      type: "quiz",
      passage:
        "[실전 모의고사 8]\n\n불독 아저씨가 갑자기 은행 영수증을 꺼냅니다.\n불독 중개사: 봐봐! 서류엔 3억이라 되어있지만, 내가 열심히 갚아서 이제 원금이 5천만원밖에 안 남았어. 자 영수증!",
      flavorText: '"영수증에 도장도 찍혀 있네?"',
      imageUrl: "https://images.unsplash.com/photo-1620228864756-32d721151bb2?auto=format&fit=crop&w=400&q=80",
      imageAlt: "영수증 이미지",
      question: "이 상황에서 영수증을 본, 가장 똑똑한 멍멍이의 대답은?",
      choices: [
        "우와, 영수증 팩트 체크 완벽하네요! 당장 계약할게요.",
        "영수증 말고, 나중에 잔금 치를 때 서류상 빚도 확실하게 5천으로 감액등기나 말소해주시면 계약할게요!",
      ],
      correctIndex: 1,
      explanation:
        "영수증 백 장보다 등기부등본 한 줄이 더 중요합니다! 은행 영수증과 별개로 서류를 직접 고치는 감액등기나 말소를 요구해야 합니다.",
    },
    // --- Quiz 9 ---
    {
      questionNumber: 14,
      type: "quiz",
      passage:
        "[실전 모의고사 9: 최후의 보스!]\n\n깐깐한 철벽 방어 끝에 빚도 권리관계도 깨끗한 안전한 집을 찾았습니다. 오늘은 '이 집 찜할게요!'라며 계약금을 내는 날이에요.",
      flavorText: '"드디어 맘에 쏙 드는 집을 찾았어!"',
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
      imageAlt: "열쇠 스토어",
      question: "부동산 계약 시, 보통 전체 전세 보증금의 몇 %를 계약금으로 낼까요?",
      choices: [
        "1% (만 원만 낼게요!)",
        "5~10% (국룰의 시작!)",
        "50% (반은 줘야 내 집이지!)",
        "100% (오늘 다 가져가세요!)",
      ],
      correctIndex: 1,
      explanation: "보통 전체 보증금의 5~10%를 계약금으로 지불하여 계약 파기를 서로 방지하는 것이 일반적(국룰)입니다.",
    },
    // --- Quiz 10 ---
    {
      questionNumber: 15,
      type: "quiz",
      passage:
        "[실전 모의고사 10]\n\n집주인 불독 아저씨가 바쁘다며, 동생인 퍼그 아저씨가 대신(대리인) 계약하러 나왔어요.",
      flavorText: '"우리 형이 나한테 맡겼어. 나 형이랑 똑같이 생겼지?"',
      imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80",
      imageAlt: "다른 강아지",
      question: "멍멍이가 대리인으로 나온 퍼그 아저씨에게 꼭 확인해야 하는 필수 서류 두 가지는?",
      choices: [
        "가족관계증명서, 불독 아저씨의 셀카",
        "위임장, 본인(불독 아저씨)의 인감증명서",
        "건축물대장, 토지대장",
      ],
      correctIndex: 1,
      explanation: "자신이 진짜 주인의 부탁을 받았다는 법적 근거가 되는 '위임장'과 발급 용도가 명시된 '본인발급 인감증명서'가 반드시 필요합니다.",
    },
    // --- Quiz 11 ---
    {
      questionNumber: 16,
      type: "quiz",
      passage:
        "[실전 모의고사 11]\n\n멍멍이는 은행에서 '전세 대출'을 받아서 남은 돈을 낼 거예요. 만약 대출이 튕기면 아까운 계약금을 날릴까 봐 두렵습니다.",
      flavorText: '"대출 심사 떨어지면 내 피같은 계약금은 어떡하지?"',
      imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=400&q=80",
      imageAlt: "돈 무더기",
      question: "계약서 맨 밑 '특약사항'에 꼭 적어달라고 요청해야 하는 마법의 문장은?",
      choices: [
        "대출 안 나오면 중개사 아저씨가 대신 갚아준다.",
        "임차인의 책임 없는 사유로 전세 대출이 거절될 경우, 본 계약은 무효로 하고 계약금은 전액 반환한다.",
        "집에 모기가 나오면 방역해 준다.",
      ],
      correctIndex: 1,
      explanation: "대출 불승인 조건 시 계약금 반환 특약이 없다면, 나중에 내 잘못 없이 대출이 거절되어도 계약금을 전액 몰수당할 수 있습니다.",
    },
    // --- Quiz 12 ---
    {
      questionNumber: 17,
      type: "quiz",
      passage:
        "[실전 모의고사 12]\n\n드디어 모바일 뱅킹으로 계약금을 쏠 시간!\n퍼그 아저씨: 형이 바쁘니까 그냥 내(퍼그) 통장이나 중개사 통장으로 보내줘~",
      flavorText: '"내 통장으로 쏴~ 어차피 다 가족이야!"',
      imageUrl: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=400&q=80",
      imageAlt: "스마트폰 결제",
      question: "멍멍이는 귀찮은데 그냥 퍼그 아저씨 통장이나 중개사 아저씨 통장으로 돈을 보내도 될까요?",
      choices: ["O (보내도 된다)", "X (절대 안 된다)"],
      correctIndex: 1,
      explanation:
        "정답은 X! 하늘이 두 쪽 나도 등기부등본 갑구에 명시된 진짜 집주인(불독) 명의의 은행 계좌로만 돈을 입금해야 송금 이력이 방어 수단이 됩니다.",
    },
  ],
}
