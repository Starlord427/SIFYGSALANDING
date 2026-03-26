export default function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  // El resumen (step 4) muestra la barra llena
  const displayStep = Math.min(currentStep, totalSteps)
  const progress    = (displayStep / totalSteps) * 100

  return (
    <div className="px-8 md:px-10 pt-8 pb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">Progreso</span>
        <span className="text-[#FF7420] text-[10px] font-bold">
          {currentStep > totalSteps ? 'Resumen' : `${currentStep} / ${totalSteps}`}
        </span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full mb-8">
        <div
          className="h-full bg-[#FF7420] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}