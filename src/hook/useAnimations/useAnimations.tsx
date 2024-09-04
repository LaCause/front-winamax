import { useEffect, useState } from "react";
import { ANIMATION_TOKEN_TIMEOUT } from "./useAnimations.model";

export const useAnimations = (active?: boolean) => {
    const [firstAnimation, setFirstAnimation] = useState<string | null>(null);
    const [secondAnimation, setSecondAnimation] = useState<string | null>(null);
    const [thirdAnimation, setThirdAnimation] = useState<string | null>(null);

    useEffect(() => {
        const firstAnimationTimeout = setTimeout(() => {
            if (active !== undefined) {
                setFirstAnimation(active ? 'animate-running animate-moveFirstToken' : 'animate-running animate-moveFirstTokenReverse');
            }
        }, ANIMATION_TOKEN_TIMEOUT.ONE);

        const secondAnimationTimeout = setTimeout(() => {
            if (active !== undefined) {
                setSecondAnimation(active ? 'animate-running animate-moveSecondToken' : 'animate-running animate-moveSecondTokenReverse');
            }
        }, ANIMATION_TOKEN_TIMEOUT.TWO);

        const thirdAnimationTimeout = setTimeout(() => {
            if (active !== undefined) {
                setThirdAnimation(active ? 'animate-running animate-moveThirdToken' : 'animate-running animate-moveThirdTokenReverse');
            }
        }, ANIMATION_TOKEN_TIMEOUT.THREE);

        return () => {
            clearTimeout(firstAnimationTimeout);
            clearTimeout(secondAnimationTimeout);
            clearTimeout(thirdAnimationTimeout);
        };
    }, [active]);

    return {
        firstAnimation,
        secondAnimation,
        thirdAnimation
    };
};
