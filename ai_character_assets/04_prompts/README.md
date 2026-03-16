# 04 Prompts (프롬프트 에셋)

이 폴더에는 텍스트 기반의 프롬프트 조각들과 가이드들을 보관합니다.
새로운 이미지를 뽑을 때마다 반복해서 쓸 텍스트 블록들을 관리합니다.

### 📝 생성 권장 파일
- `negative_prompt.txt`: 공통적으로 피하고자 하는 요소들의 모음 (예: bad anatomy, missing fingers, lowres, text 등)
- `lighting_prompts.txt`: 조명 관련 프롬프트 조합 (예: cinematic lighting, rim lighting, soft focus)
- `camera_prompts.txt`: 구도 및 카메라 워크 관련 프롬프트 (예: close-up, dutch angle, looking at viewer)

- **AI 활용 목적**: 에이전트가 프롬프트를 구성할 때 이 폴더에 있는 텍스트를 불러와 빠르게 기본 뼈대를 조립할 수 있게 합니다.
