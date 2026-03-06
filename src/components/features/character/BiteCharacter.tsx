import { useMemo } from "react";
import { motion } from "framer-motion";

interface BiteCharacterProps {
  exp: number;
}

const CHARACTER_STATES = {
  POOR: {
    threshold: 1000,
    image: "/images/result/dog_fail.png",
    message: "멍멍이가 배가 고파요... 바이트를 더 모아볼까요? 🦴",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
  },
  MIDDLE: {
    threshold: 5000,
    image: "/images/result/dog_close.png",
    message: "멍멍이가 열심히 공부하고 있어요! 🐾",
    bgColor: "bg-blue-50/30",
    borderColor: "border-blue-100",
  },
  WEALTHY: {
    threshold: Infinity,
    image: "/images/result/dog_perfect.png",
    message: "우와! 멍멍이가 부자가 되었어요! 프로 어른의 길! 💰",
    bgColor: "bg-amber-50/30",
    borderColor: "border-amber-100",
  },
};

export default function BiteCharacter({ exp }: BiteCharacterProps) {
  const state = useMemo(() => {
    if (exp < CHARACTER_STATES.POOR.threshold) return CHARACTER_STATES.POOR;
    if (exp < CHARACTER_STATES.MIDDLE.threshold) return CHARACTER_STATES.MIDDLE;
    return CHARACTER_STATES.WEALTHY;
  }, [exp]);

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
            {state.message}
          </p>
          {/* Bubble Tail */}
          <div className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-slate-100 bg-white" />
        </div>
      </div>
    </motion.div>
  );
}
