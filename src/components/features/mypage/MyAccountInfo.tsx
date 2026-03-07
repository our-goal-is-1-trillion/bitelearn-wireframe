import { Camera, ChevronLeft, ChevronRight, Pencil } from "lucide-react"

type AccountInfoPageProps = {
  onBack: () => void
}

export default function AccountInfoPage({ onBack }: AccountInfoPageProps) {
  return (
    <section className="relative h-full overflow-y-auto pb-24">
      <header className="absolute left-0 right-0 top-0 z-20 flex h-14 items-center justify-between border-b border-slate-100 bg-white/90 px-2 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition-colors hover:bg-slate-100"
          aria-label="마이페이지로 돌아가기"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-slate-900">계정 정보</h1>
        <div className="h-10 w-10" />
      </header>

      <div className="pt-14">
        <section className="px-5 py-5 bg-slate-50">
          <article className="px-4 py-4">
            <div className="mt-4 flex flex-col items-center gap-3 pb-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl">
                  👤
                </div>
                <button
                  type="button"
                  aria-label="프로필 이미지 변경하기"
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <p className="rounded-full px-1 py-1 text-md text-bold text-slate-700">BiteLearn</p>
                <button
                  type="button"
                  aria-label="닉네임 변경하기"
                  className="flex items-center justify-center text-slate-600"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        </section>

        <section className="my-5 mx-5">
          <article className="px-4 py-6">
          <h2 className="text-sm font-semibold">기본 정보</h2>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="rounded-full px-1 py-1 text-xs text-slate-700">이메일</p>
              <p className="cursor-not-allowed rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">bitelearn@bitelearn.com</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="rounded-full px-1 py-1 text-xs text-slate-700">비밀번호 변경</p>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>
          </div>
          </article>
        </section>

        <section className="mt-4 mx-5 border-t border-slate-200 pt-5">
          <article className="px-4 py-6">
          <h2 className="text-sm font-semibold">계정 관리</h2>
          <div className="mt-4 flex flex-col gap-3 pb-4">
            <button
              type="button"
              className="w-full rounded-full px-1 py-1 text-left text-xs text-slate-700"
            >
              로그아웃
            </button>
            <button
              type="button"
              className="w-full rounded-full px-1 py-1 text-left text-xs text-slate-700"
            >
              회원 탈퇴
            </button>
          </div>
          </article>
        </section>
      </div>
    </section>
  )
}
