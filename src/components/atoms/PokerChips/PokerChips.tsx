import { motion } from 'framer-motion';
import { PokerChipsInterface } from './PokerChips.model';

const PokerChips: React.FC<PokerChipsInterface> = ({
  isAnimating = false,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className={`relative ${className}`}
      width={30}
      height={30}
      fill="none"
    >
      <motion.g
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          rotate: isAnimating ? 360 : 0,
          opacity: isAnimating ? 1 : 0,
          scale: isAnimating ? 1 : 0,
          y: isAnimating ? [0, -15, 0] : 0,
        }}
        transition={{
          duration: 0.3,
          y: {
            delay: 0.2,
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          },
        }}
      >
        <circle cx={40.5} cy={40.5} r={40.5} fill="#A90000" />
        <circle
          cx={40.5}
          cy={40.5}
          r={37}
          fill="#A90000"
          stroke="#fff"
          strokeDasharray="16 16"
          strokeWidth={3}
        />
        <circle cx={40.5} cy={40.5} r={30.5} fill="#520005" />
        <path
          fill="#fff"
          d="m30.488 54-6.867-24h5.543l3.973 16.676h.199L37.719 30h4.746l4.37 16.71h.212L51.02 30h5.542l-6.867 24H44.75l-4.57-15.691h-.188L35.434 54h-4.946Z"
        />
      </motion.g>
    </svg>
  );
};
export default PokerChips;
