type ChoiceQuestionImageProps = {
  src: string
  alt: string
}

export default function ChoiceQuestionImage({ src, alt }: ChoiceQuestionImageProps) {
  return (
    <div className="flex justify-center py-4">
      <img src={src} alt={alt} className="h-[180px] w-[240px] rounded-md object-cover" />
    </div>
  )
}
