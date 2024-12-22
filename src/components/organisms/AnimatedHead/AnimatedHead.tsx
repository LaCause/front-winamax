import { useEffect, useState } from 'react';
import { AnimationProps, motion } from 'framer-motion';
import { AnimatedGlobalProps } from './AnimatedHead.model';
export const AnimatedHead: React.FC<AnimatedGlobalProps> = ({
  showHead,
  animateEyes,
}) => {
  const cloudAnimation: AnimationProps = {
    initial: { x: -200 },
    animate: { x: 100 },
    transition: {
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  };
  const [leftEye, setLeftEyesPosition] = useState({
    cx: [60.9674],
    cy: [141.482],
  });

  const [rightEye, setRightEyesPosition] = useState({
    cx: [143.587],
    cy: [141.035],
  });

  console.log('------> execute AnimatedHead');

  const hideLockersAnimation: AnimationProps = {
    initial: { y: 0 },
    animate: showHead ? { y: 200 } : { y: 0 },
  };

  const headAnimation: AnimationProps = {
    initial: { y: 150 },
    animate: showHead ? { y: 0 } : { y: 150 },
  };

  const leftEyeAnimation: AnimationProps = {
    animate: leftEye,
    transition: {
      ease: 'easeInOut',
      repeatType: 'reverse',
    },
  };

  const rightEyeAnimation: AnimationProps = {
    animate: rightEye,
    transition: {
      ease: 'easeInOut',
      repeatType: 'reverse',
    },
  };

  useEffect(() => {
    if (animateEyes) {
      setLeftEyesPosition(() => {
        const animation = 50 + animateEyes > 70 ? 70 : 50 + animateEyes;
        return {
          cx: [animation],
          cy: [141.482, 150],
        };
      });
      setRightEyesPosition(() => {
        const animation =
          133.587 + animateEyes > 153 ? 153 : 133.587 + animateEyes;
        return {
          cx: [animation],
          cy: [141.035, 150],
        };
      });
    } else {
      setLeftEyesPosition({
        cx: [60.9674],
        cy: [141.482],
      });

      setRightEyesPosition({
        cx: [143.587],
        cy: [141.035],
      });
    }
  }, [animateEyes]);

  return (
    <div className="text-center">
      <svg
        width="135"
        height="135"
        viewBox="0 0 209 209"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Light mode">
          <mask
            id="mask0_294_22"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="209"
            height="209"
          >
            <circle
              id="Ellipse 6"
              cx="104.5"
              cy="104.5"
              r="104.5"
              fill="#51BEED"
            />
          </mask>
          <g mask="url(#mask0_294_22)">
            <rect
              id="Rectangle 3"
              x="-28.648"
              y="1.30219"
              width="237.648"
              height="237.648"
              fill="url(#paint0_linear_294_22)"
            />
            <motion.path
              {...cloudAnimation}
              id="Vector 4"
              opacity="0.2"
              d="M186.02 111.336H83.1735C47.3374 101.844 61.233 60.2223 83.1735 60.2223C106.028 4.54428 155.394 31.9269 160.422 45.6182C173.952 45.6182 183.125 55.3543 186.02 60.2223C215.274 63.4169 218.016 108.142 186.02 111.336Z"
              fill="#FAFAFA"
            />
            <motion.path
              {...cloudAnimation}
              id="Vector 5"
              opacity="0.4"
              d="M102.68 202.489H-0.166052C-36.0022 192.996 -22.1065 151.375 -0.166052 151.375C22.6886 95.6969 72.0547 123.08 77.0827 136.771C90.6127 136.771 99.7851 146.507 102.68 151.375C131.934 154.57 134.677 199.294 102.68 202.489Z"
              fill="#FAFAFA"
            />
            <motion.path
              {...cloudAnimation}
              id="Vector 6"
              opacity="0.6"
              d="M268.057 174.492H165.211C129.375 165 143.27 123.378 165.211 123.378C188.066 67.7 237.432 95.0826 242.46 108.774C255.99 108.774 265.162 118.51 268.057 123.378C297.311 126.573 300.053 171.298 268.057 174.492Z"
              fill="#FAFAFA"
            />
            <motion.path
              {...cloudAnimation}
              id="Vector 7"
              opacity="0.6"
              d="M71.4277 108.732H-31.4184C-67.2545 99.2395 -53.3589 57.6179 -31.4184 57.6179C-8.56371 1.93992 40.8024 29.3225 45.8304 43.0138C59.3604 43.0138 68.5327 52.7499 71.4277 57.6179C100.682 60.8125 103.424 105.537 71.4277 108.732Z"
              fill="#FAFAFA"
            />
            <motion.g id="head winamax" {...headAnimation}>
              <circle
                id="Ellipse 4"
                cx="103.673"
                cy="173.673"
                r="105.673"
                fill="#EFB87E"
              />
              <g id="Oeil G">
                <circle
                  id="Oeil G_2"
                  cx="61.5719"
                  cy="141.035"
                  r="33.0791"
                  fill="#EAEAEA"
                />
                <motion.circle
                  id="Pupille"
                  cx="60.9674"
                  cy="141.482"
                  r="12.4965"
                  fill="#2F2F2F"
                  {...leftEyeAnimation}
                />
              </g>
              <g id="Oeil D">
                <circle
                  id="Oeil G_3"
                  cx="143.587"
                  cy="141.035"
                  r="33.0791"
                  fill="#EAEAEA"
                />
                <motion.circle
                  id="Pupille_2"
                  cx="143.587"
                  cy="141.035"
                  r="12.4965"
                  fill="#2F2F2F"
                  {...rightEyeAnimation}
                />
              </g>
            </motion.g>
          </g>
          <motion.g
            {...hideLockersAnimation}
            id="Frame"
            clipPath="url(#clip0_294_22)"
          >
            <g id="Vector" filter="url(#filter0_d_294_22)">
              <path
                d="M138.31 87.4321H131.195V63.9929C131.195 56.5949 125.199 50.599 117.801 50.599H91.8502C84.4522 50.599 78.4564 56.5949 78.4564 63.9929V87.4321H71.3409C69.4888 87.4321 67.9924 88.9285 67.9924 90.7806V130.962C67.9924 132.814 69.4888 134.311 71.3409 134.311H138.31C140.162 134.311 141.659 132.814 141.659 130.962V90.7806C141.659 88.9285 140.162 87.4321 138.31 87.4321ZM107.755 112.232V117.778C107.755 118.238 107.379 118.615 106.918 118.615H102.733C102.272 118.615 101.896 118.238 101.896 117.778V112.232C101.032 111.612 100.387 110.733 100.054 109.723C99.7214 108.714 99.7176 107.624 100.043 106.612C100.369 105.6 101.008 104.717 101.867 104.091C102.726 103.464 103.762 103.127 104.826 103.127C105.889 103.127 106.925 103.464 107.784 104.091C108.644 104.717 109.282 105.6 109.608 106.612C109.934 107.624 109.93 108.714 109.597 109.723C109.264 110.733 108.619 111.612 107.755 112.232ZM123.661 87.4321H85.9904V63.9929C85.9904 60.7595 88.6169 58.1331 91.8502 58.1331H117.801C121.034 58.1331 123.661 60.7595 123.661 63.9929V87.4321Z"
                fill="#FBFBFB"
              />
            </g>
          </motion.g>
        </g>
        <defs>
          <filter
            id="filter0_d_294_22"
            x="56.9924"
            y="43.599"
            width="95.6662"
            height="105.712"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="5.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_294_22"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_294_22"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_294_22"
            x1="218.766"
            y1="214.209"
            x2="-8.46417"
            y2="42.3209"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9ADAFD" />
            <stop offset="1" stopColor="#70B2EB" />
          </linearGradient>
          <clipPath id="clip0_294_22">
            <rect
              width="93.757"
              height="93.757"
              fill="white"
              transform="translate(57.947 45.5763)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
