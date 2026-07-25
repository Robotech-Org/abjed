export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FDF9F1] dark:bg-slate-950 font-sans flex flex-col transition-colors duration-300">
      
      {/* Skeleton Navbar - Better structure */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-2">
          {/* Logo skeleton with shimmer */}
          <div className="relative w-8 h-8 bg-neutral-200 dark:bg-slate-800 rounded-md overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          <div className="relative w-24 h-6 bg-neutral-200 dark:bg-slate-800 rounded overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative w-16 h-4 bg-neutral-200 dark:bg-slate-800 rounded overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
          <div className="relative w-28 h-10 bg-neutral-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
        
        {/* Mobile menu icon */}
        <div className="md:hidden relative w-8 h-8 bg-neutral-200 dark:bg-slate-800 rounded overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </nav>

      {/* Skeleton Main Content - Much more detailed */}
      <main className="flex flex-col items-center px-4 sm:px-6 pt-8 sm:pt-12 pb-24 max-w-7xl mx-auto w-full flex-1">
        
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl w-full">
          <div className="flex flex-col items-center gap-4">
            {/* Badge skeleton */}
            <div className="relative w-32 h-7 bg-neutral-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            
            {/* Main heading skeleton */}
            <div className="relative w-full max-w-2xl h-12 sm:h-16 bg-neutral-200 dark:bg-slate-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            
            {/* Sub heading skeleton */}
            <div className="relative w-3/4 max-w-md h-8 sm:h-10 bg-neutral-200 dark:bg-slate-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            
            {/* Description lines */}
            <div className="mt-4 space-y-2 w-full max-w-sm">
              <div className="relative w-full h-4 bg-neutral-200 dark:bg-slate-800 rounded overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
              <div className="relative w-3/4 h-4 bg-neutral-200 dark:bg-slate-800 rounded mx-auto overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
            
            {/* CTA Button skeleton */}
            <div className="relative mt-6 w-48 h-12 bg-neutral-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Cards Grid - Much better skeletons */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
          {[1, 2, 3].map((index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-slate-900 rounded-[32px] p-6 border border-neutral-100 dark:border-slate-800 ${
                index === 1 ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              <div className="flex flex-col h-full gap-4">
                {/* Card image skeleton */}
                <div className="relative w-full h-40 bg-neutral-200 dark:bg-slate-700 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
                
                {/* Card content */}
                <div className="flex-1 space-y-3">
                  {/* Title skeleton */}
                  <div className="relative w-3/4 h-6 bg-neutral-200 dark:bg-slate-700 rounded overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                  
                  {/* Description lines */}
                  <div className="space-y-2">
                    <div className="relative w-full h-3 bg-neutral-200 dark:bg-slate-700 rounded overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                    <div className="relative w-5/6 h-3 bg-neutral-200 dark:bg-slate-700 rounded overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                    <div className="relative w-4/6 h-3 bg-neutral-200 dark:bg-slate-700 rounded overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Card footer skeleton */}
                  <div className="flex items-center justify-between pt-3">
                    <div className="relative w-20 h-4 bg-neutral-200 dark:bg-slate-700 rounded overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                    <div className="relative w-8 h-8 bg-neutral-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Optional: Featured card at bottom */}
        <div className="mt-12 w-full max-w-6xl">
          <div className="relative w-full h-48 bg-neutral-200 dark:bg-slate-800 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
      </main>
    </div>
  );
}