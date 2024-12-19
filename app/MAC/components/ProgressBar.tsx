export default function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
      <div
        className="h-full bg-black rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

