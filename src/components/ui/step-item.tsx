interface StepItemProps {
    label: string;
    isActive: boolean;
    isCompleted: boolean;
  }
  
  export const StepItem = ({ label, isActive, isCompleted }: StepItemProps) => (
    <div className="flex items-center gap-4">
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${isCompleted ? "bg-primary border-primary text-white" : "border-gray-600 text-gray-800"}`}
      >
        {isCompleted && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`font-medium text-xl ${isActive ? "text-primary" : "text-gray-600"}`}>
        {label}
      </span>
    </div>
  );