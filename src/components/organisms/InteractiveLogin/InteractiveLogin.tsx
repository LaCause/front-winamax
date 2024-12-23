import { useEffect, useState } from 'react';
import { AnimationProps, motion } from 'framer-motion';
import { AnimatedGlobalProps } from './InteractiveLogin.model';
export const InteractiveLogin: React.FC<AnimatedGlobalProps> = ({
  showHead,
  animateEyes,
  animateHands,
}) => {
  const animatedHeadsSize = {
    height: 135,
    width: 135,
  };

  const cloudAnimation: AnimationProps = {
    initial: { x: -200 },
    animate: { x: 100 },
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  };

  const [eyesPosition, setEyesPosition] = useState({
    left: { cx: [60.9674], cy: [141.482] },
    right: { cx: [143.587], cy: [141.035] },
  });

  const hideLockersAnimation: AnimationProps = {
    initial: { y: 0 },
    animate: { y: showHead ? 200 : 0 },
  };

  const headAnimation: AnimationProps = {
    initial: { y: 150 },
    animate: { y: showHead ? 0 : 150 },
  };

  const eyeAnimation = (eye: 'left' | 'right'): AnimationProps => ({
    animate: eyesPosition[eye],
    transition: {
      ease: 'easeInOut',
      repeatType: 'reverse',
    },
  });

  const handRightAnimation = {
    initial: { transform: 'translate(90px, 90px)' },
    animate: animateHands ? { transform: 'translate(0px, 0px)' } : undefined,
  };

  const handLeftAnimation = {
    initial: { transform: 'translate(-90px, 90px)' },
    animate: animateHands ? { transform: 'translate(0px, 0px)' } : undefined,
  };

  useEffect(() => {
    if (animateEyes) {
      setEyesPosition({
        left: {
          cx: [Math.min(70, 50 + animateEyes)],
          cy: [141.482, 150],
        },
        right: {
          cx: [Math.min(153, 133.587 + animateEyes)],
          cy: [141.035, 150],
        },
      });
    } else {
      setEyesPosition({
        left: { cx: [60.9674], cy: [141.482] },
        right: { cx: [143.587], cy: [141.035] },
      });
    }
  }, [animateEyes]);

  return (
    <div className="text-center">
      <svg
        width={animatedHeadsSize.width}
        height={animatedHeadsSize.height}
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
              x="-14"
              y="-14"
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
            <motion.g {...headAnimation} id="Head">
              <circle
                id="Ellipse 4"
                cx="104.673"
                cy="173.673"
                r="105.673"
                fill="#EFB87E"
              />
              {['left', 'right'].map((side) => (
                <g key={side} id={`Oeil ${side === 'left' ? 'G' : 'D'}`}>
                  <circle
                    id={`Oeil ${side === 'left' ? 'G_2' : 'G_3'}`}
                    cx={side === 'left' ? 61.5719 : 143.587}
                    cy="141.035"
                    r="33.0791"
                    fill="#EAEAEA"
                  />
                  <motion.circle
                    id={`Pupille${side === 'right' ? '_2' : ''}`}
                    cx={side === 'left' ? 60.9674 : 143.587}
                    cy="141.035"
                    r="12.4965"
                    fill="#2F2F2F"
                    {...eyeAnimation(side as 'left' | 'right')}
                  />
                </g>
              ))}
              <g id="Hands">
                <motion.g id="Right Hand" {...handRightAnimation}>
                  <path
                    d="M110.507 144.539C105.686 139.782 113.566 132.325 118.256 136.418L112.324 130.91C109.962 127.502 113.96 120.329 120.503 122.84L119.231 121.584C112.87 115.308 120.503 107.058 127.228 113.694L130.209 116.635C128.368 113.123 132.672 106.115 139.404 110.286L152.854 123.557C150.309 121.046 151.4 111.362 160.85 115.666L175.39 130.013C188.294 140.414 188.112 162.293 175.39 171.619C168.12 178.792 150.309 183.813 137.951 171.619L110.507 144.539Z"
                    fill="#EFB87E"
                  />
                  <path
                    d="M131.589 149.561L118.504 136.648M118.504 136.648C113.851 132.057 105.6 139.697 110.507 144.539C115.535 149.501 128.064 161.863 137.951 171.619C150.309 183.813 168.12 178.792 175.39 171.619C188.112 162.293 188.294 140.414 175.39 130.013C175.269 129.893 172.191 126.857 160.85 115.666C151.4 111.362 150.309 121.046 152.854 123.557M118.504 136.648L112.324 130.91C109.962 127.502 113.96 120.329 120.503 122.84M152.854 123.557L166.121 136.648M152.854 123.557C152.551 123.258 149.437 120.185 139.404 110.286C131.589 105.444 127.046 115.666 131.589 117.998M131.589 117.998L147.401 133.6M131.589 117.998C132.377 118.775 132.607 119.002 127.228 113.694C120.503 107.058 112.87 115.308 119.231 121.584M119.231 121.584L120.503 122.84M119.231 121.584C119.624 121.973 120.05 122.393 120.503 122.84M120.503 122.84L139.404 141.49C135.156 137.299 125.906 128.171 120.503 122.84Z"
                    stroke="black"
                    strokeOpacity="0.3"
                  />
                </motion.g>
                <motion.g id="Left Hand" {...handLeftAnimation}>
                  <path
                    d="M97.4931 144.539C102.314 139.782 94.4344 132.325 89.7443 136.418L95.6756 130.91C98.0383 127.502 94.0399 120.329 87.4971 122.84L88.7693 121.584C95.1304 115.308 87.4971 107.058 80.7725 113.694L77.7913 116.635C79.6324 113.123 75.3278 106.115 68.5955 110.286L55.1464 123.557C57.6908 121.046 56.6003 111.362 47.1496 115.666L32.6099 130.013C19.706 140.414 19.8877 162.293 32.6099 171.619C39.8797 178.792 57.6908 183.813 70.0495 171.619L97.4931 144.539Z"
                    fill="#EFB87E"
                  />
                  <path
                    d="M76.4106 149.561L89.4963 136.648M89.4963 136.648C94.1489 132.057 102.4 139.697 97.4931 144.539C92.4648 149.501 79.9364 161.863 70.0495 171.619C57.6908 183.813 39.8797 178.792 32.6099 171.619C19.8877 162.293 19.706 140.414 32.6099 130.013C32.7311 129.893 35.8086 126.857 47.1496 115.666C56.6003 111.362 57.6908 121.046 55.1464 123.557M89.4963 136.648L95.6756 130.91C98.0383 127.502 94.0399 120.329 87.4971 122.84M55.1464 123.557L41.8789 136.648M55.1464 123.557C55.4493 123.258 58.5632 120.185 68.5955 110.286C76.4106 105.444 80.9542 115.666 76.4106 117.998M76.4106 117.998L60.5987 133.6M76.4106 117.998C75.623 118.775 75.3928 119.002 80.7725 113.694C87.4971 107.058 95.1304 115.308 88.7693 121.584M88.7693 121.584L87.4971 122.84M88.7693 121.584C88.3757 121.973 87.9499 122.393 87.4971 122.84M87.4971 122.84L68.5955 141.49C72.8437 137.299 82.0944 128.171 87.4971 122.84Z"
                    stroke="black"
                    strokeOpacity="0.3"
                  />
                </motion.g>
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
            x1="233.414"
            y1="198.907"
            x2="6.18381"
            y2="27.0187"
            gradientUnits="userSpaceOnUse"
          >
            <stop className="stop-blue" />
            <stop className="stop-blue-marine" offset="1" />
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
