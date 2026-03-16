# 🎨 퀴즈 피드백 및 바이트 상태 프롬프트 가이드라인

## 1. 핵심 디자인 원칙
- **Character Consistency (캐릭터 일관성)**: **파스텔 오렌지(Pastel Orange)** 펠트 질감을 유지합니다. **[중요] 입 모양 수정 (v7)**: 이전 문제 이미지들처럼 펠트 질감을 고집하지 않고 **자연스럽고 생동감 있는 표정의 입**으로 그려져야 합니다. (펠트로 만든 두꺼운 테두리나 경직된 선 형태 절대 금지. 매끄럽고 심플하게 표현)
- **Dynamic Poses (역동성)**: 모든 이미지에서 **휘날리는 파란 넥타이**와 **역동적인 팔다리 움직임**을 통해 생동감을 극대화합니다.
- **Unified Byte Token (코인 형태 완벽 통일)**: 모든 상태에서 바이트 코인은 형태가 절대 변하지 않아야 합니다. **(단순하고 보송보송한 노란색 원형 펠트 토큰 + 중앙에 오렌지색 선으로 수놓아진 단순한 육각형 모양의 얇은 펠트 자수. 광택이나 금속 느낌, 글씨 절대 없음)**.
- **Strict Background (백색 배경 통일)**: 깨끗하고 밝은 **#fafafa (Off-white)** 컬러의 단색 펠트 배경으로 고정.
- **No Text (텍스트 금지)**: 이미지 내 텍스트 절대 금지.

## 2. 상태별 시각적 연출 가이드

| 상태 | 멍멍이 포즈/표정 | 바이트(토큰) 연출 | 주변 효과 | 배경 |
| :--- | :--- | :--- | :--- | :--- |
| **정답 (Correct)** | 넥타이가 위로 휘날리며 만세 점프. 크게 벌어진 자연스럽고 기쁜 입 | 공중에 흩날리는 여러 개의 '통일된 펠트 토큰' | 화려한 펠트 꽃가루 | #fafafa |
| **오답 (Incorrect)** | 넥타이와 귀가 힘없이 늘어짐. 자연스럽게 시무룩한 표정 | 바닥에 놓인 단 하나의 '통일된 펠트 토큰' | 회색 펠트 먹구름, 땀방울 | #fafafa |
| **방어 성공** | 넥타이를 거세게 휘날리며 당단한 가드 포즈 | 뒤에 쌓여있는 '통일된 펠트 토큰' 더미 | 코인 주변의 은은한 광채 | #fafafa |
| **바이트 지킴** | 부드러운 미소. 토큰을 소중하게 안음 | 품에 안겨있는 커다란 '통일된 펠트 토큰' 1개 | 핑크색 펠트 하트 | #fafafa |
| **바이트 잃음** | 절망하며 손을 뻗음. 크고 자연스럽게 벌린 절망적인 입 | 반투명하게 흩어지며 사라지는 '통일된 펠트 토큰' 1개 | 흩날리는 입자들 | #fafafa |

## 3. 프롬프트 템플릿 예시
`A high-energy premium 3D art render of Mungmung (a pastel orange felt dog. **CRITICAL MOUTH: Natural, highly expressive mouth WITHOUT any thick felt borders or stiff straight lines. The mouth should look smooth and expressive like 2D animation on a 3D character**). Fluttering blue necktie. Action: [Action]. [Token details: consistent fluffy yellow felt circular tokens with an orange hexagon line. NO text, NO metal]. Background: Solid #fafafa off-white felt.`
