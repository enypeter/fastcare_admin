const StepNavigation = ({
    activeStep,
    setActiveStep,
    totalSteps,
  }: {
    activeStep: number;
    setActiveStep: (step: number) => void;
    totalSteps: number;
  }) => {
    return (
      <div className="flex gap-8 mt-8">
        {/* Conditionally render Quick Summary or Previous button */}
        {activeStep === 0 ? (
          <button
            className="px-4 py-2  rounded-lg border border-[#243B80] font-medium text-[#243B80]"
            onClick={() => console.log("Quick Summary clicked")}
          >
            Quick Summary
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setActiveStep(activeStep - 1)}
          >
            Previous
          </button>
        )}
        {/* Continue button */}
        {activeStep < totalSteps - 1 && (
          <button
        className="px-6 py-2 bg-[#243B80] font-medium text-white rounded-lg"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Continue
          </button>
        )}
      </div>
    );
  };
  
  export default StepNavigation;