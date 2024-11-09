import { MousePosition } from "@/interfaces";
import { useEffect, useState } from "react";

export default function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
    delayX: null,
    delayY: null,
  });

  useEffect(() => {
    let animationFrameId: number;

    const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      setMousePosition((prevState) => ({ ...prevState, x: clientX, y: clientY }));

      animationFrameId = requestAnimationFrame(() => {
        setMousePosition((prevState) => ({
          ...prevState,
          delayX: clientX,
          delayY: clientY,
        }));
      });
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return mousePosition;
}
