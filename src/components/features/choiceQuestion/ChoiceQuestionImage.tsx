type ChoiceQuestionImageProps = {
  src?: string
  alt?: string
}

/** 문제와 관련된 일러스트 이미지 영역 */
export default function ChoiceQuestionImage({ src, alt }: ChoiceQuestionImageProps) {
  if (!src) return null
  return (
    <div className="flex justify-center py-4">
      <img
        src={src}
        alt={alt}
        className="h-[180px] w-[240px] rounded-md object-cover"
      />
    </div>
  )
}
