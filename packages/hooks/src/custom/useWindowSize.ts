import { windowSizeAtom } from "@dosoul/states";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// 버전 2
export const useWindowSize = (): {
  windowWidth: number;
  windowHeight: number;
} => {
  const windowSize = useRecoilValue(windowSizeAtom); // 단순히 값을 읽기만 함
  return windowSize;
};

export const WindowSizeListener = (): null => {
  const setWindowSize = useSetRecoilState(windowSizeAtom);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(prevState => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        if (
          prevState.windowWidth !== newWidth ||
          prevState.windowHeight !== newHeight
        ) {
          return { windowWidth: newWidth, windowHeight: newHeight };
        }
        return prevState;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowSize]);

  return null; // UI를 렌더링하지 않음
};
