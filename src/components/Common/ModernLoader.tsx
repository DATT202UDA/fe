import { GiGarlic } from 'react-icons/gi';

const ModernLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Spinning Gradient Ring */}
          <span className="block w-20 h-20 rounded-full border-8 border-t-8 border-[#B86B2B] border-t-[#FFD600] animate-spin shadow-lg bg-gradient-to-tr from-[#F5E9DA] to-[#FFD600]/30" />
          {/* Center Icon */}
          <span className="absolute text-[#B86B2B] drop-shadow-lg">
            <GiGarlic size={38} />
          </span>
          {/* Shine Effect */}
          <span className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-white/40 to-transparent animate-pulse pointer-events-none" />
        </div>
        <div className="mt-6 text-lg font-semibold text-[#B86B2B] flex items-center gap-2">
          <span className="animate-pulse">Đang tải</span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: '0.1s' }}
          >
            .
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: '0.2s' }}
          >
            .
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: '0.3s' }}
          >
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModernLoader;
