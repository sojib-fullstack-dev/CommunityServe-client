export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FBF9]">
      
      {/* Animated Logo/Loader Container */}
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute h-24 w-24 animate-ping rounded-full bg-[#008C45] opacity-20"></div>
        
        {/* Inner Spinning Ring */}
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-solid border-[#008C45] border-t-transparent"></div>
        
        {/* Center Text/Icon */}
        <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-[#008C45] text-white shadow-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="mt-8 text-xl font-bold text-[#063E35] tracking-widest uppercase">
        Loading...
      </h2>
      <p className="mt-2 text-sm font-medium text-[#687A75]">
        Getting things ready for you
      </p>
      
    </div>
  );
}