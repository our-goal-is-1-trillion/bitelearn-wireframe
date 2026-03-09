import { useMemo } from "react";
import { motion } from "framer-motion";

interface BiteCharacterProps {
  exp: number;
  mistakeCount?: number;
}

const CHARACTER_STATES = {
  POOR: {
    threshold: 1000,
    image: "/images/result/dog_fail.png",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
  },
  MIDDLE: {
    threshold: 5000,
    image: "/images/result/dog_close.png",
    bgColor: "bg-blue-50/30",
    borderColor: "border-blue-100",
  },
  WEALTHY: {
    threshold: Infinity,
    image: "/images/result/dog_perfect.png",
    bgColor: "bg-amber-50/30",
    borderColor: "border-amber-100",
  },
};

const getMessage = (stateKey: keyof typeof CHARACTER_STATES, mistakeCount?: number) => {
  const countText = mistakeCount ? ` 오답 ${mistakeCount}개를 복습하면 되찾을 수 있어요!` : ""
  if (stateKey === "POOR") return `오답으로 잃은 바이트가 있어요 🦴${countText}`
  if (stateKey === "MIDDLE") return `아직 회수 못 한 바이트가 남아있어요 🐾${countText}`
  return mistakeCount ? `복습으로 ${mistakeCount}개의 오답을 정복해줘요 💰` : "우와! 멍멍이가 부자가 되었어요! 프로 어른의 길! 💰"
}

export default function BiteCharacter({ exp, mistakeCount }: BiteCharacterProps) {
  const { state, stateKey } = useMemo(() => {
    if (exp < CHARACTER_STATES.POOR.threshold) return { state: CHARACTER_STATES.POOR, stateKey: "POOR" as const }
    if (exp < CHARACTER_STATES.MIDDLE.threshold) return { state: CHARACTER_STATES.MIDDLE, stateKey: "MIDDLE" as const }
    return { state: CHARACTER_STATES.WEALTHY, stateKey: "WEALTHY" as const }
  }, [exp])

  const message = getMessage(stateKey, mistakeCount)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative mb-8 flex items-center gap-4 rounded-[32px] border pb-4 pl-4 pr-6 pt-4 shadow-sm transition-colors duration-500 ${state.bgColor} ${state.borderColor}`}
    >
      {/* Dog Illustration with Floating Animation */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-24 w-24 shrink-0"
      >
        <img
          src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${state.image}`}
          alt="Character Status"
          className="h-full w-full object-contain"
        />
      </motion.div>

      {/* Speech Bubble / Message */}
      <div className="relative flex-1">
        <div className="relative rounded-2xl bg-white p-3 shadow-sm border border-slate-100">
          <p className="text-[13px] font-bold leading-tight text-slate-700 whitespace-pre-line">
            {message}
          </p>
          {/* Bubble Tail */}
          <div className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-slate-100 bg-white" />
        </div>
      </div>
    </motion.div>
  );
}
