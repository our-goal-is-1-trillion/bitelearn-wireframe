import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ONBOARDING_DATA } from '@/constants/onboardingData';

type OnboardingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OnboardingModal({
  isOpen,
  onClose,
}: OnboardingModalProps) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < ONBOARDING_DATA.length - 1) {
      setStep((p) => p + 1);
    } else {
      onClose();
    }
  };

  const currentData = ONBOARDING_DATA[step];
  
  // Vite BASE_URL handling for robust image loading
  const baseUrl = import.meta.env.BASE_URL;
  const imageSrc = `${baseUrl}${currentData.image}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl sm:h-[600px]"
      >
        {/* 건너뛰기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 items-center justify-center rounded-full bg-slate-50 px-3 text-xs font-bold text-slate-400 transition-colors hover:bg-slate-100 active:scale-95"
        >
          건너뛰기
        </button>

        <div className="relative flex-1 overflow-hidden bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center"
            >
              {/* 이미지 영역 (Lo-fi style) */}
              <div className="relative h-[55%] w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                <img
                  src={imageSrc}
                  alt={`온보딩 단계 ${step + 1}`}
                  className="h-full w-full object-contain p-8"
                  onError={(e) => {
                    // Fallback for broken images during development
                    console.error("Image load failed:", imageSrc);
                    e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
              </div>

              {/* 텍스트 영역 (Typography Guideline) */}
              <div className="flex w-full flex-1 flex-col px-8 pb-6 pt-10 text-center">
                <h2 className="mb-4 text-2xl font-bold leading-tight text-slate-900 tracking-tight">
                  {currentData.title}
                </h2>
                <p className="text-[15px] font-medium leading-relaxed text-slate-500 [word-break:keep-all]">
                  {currentData.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 푸터 영역 (Lo-fi & Material spacing) */}
        <div className="flex shrink-0 flex-col items-center gap-8 bg-white p-8 pt-4">
          {/* 인디케이터 */}
          <div className="flex gap-2">
            {ONBOARDING_DATA.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="h-14 w-full rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-xl shadow-slate-200 transition-all active:scale-95 hover:bg-black"
          >
            {step === ONBOARDING_DATA.length - 1
              ? '시작하기'
              : '다음'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
