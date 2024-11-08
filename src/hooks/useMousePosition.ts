import { MousePosition } from "@/interfaces";

import { useEffect, useState } from "react";

const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
    delayX: null,
    delayY: null,
  });

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition((prevState) => ({ ...prevState, x: clientX, y: clientY }));
      setTimeout(() => {
        setMousePosition((prevState) => ({ ...prevState, delayX: clientX, delayY: clientY }));
      }, 100);
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
