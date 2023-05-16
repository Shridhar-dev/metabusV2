import * as React from "react";
import { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { useState } from "react";
import { animate } from "framer-motion";
import useWindowSize from "@/utils/useWindowSize";
import { useEffect } from "react";

function Dock() {
  const [drag, setDrag] = useState<boolean | "y" | "x" | undefined>("y");
  const [height, setHeight] = useState(100);

  const dockRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const windowSize = useWindowSize();

  useEffect(() => {
    if (dockRef !== null && dockRef.current !== null) {
      setHeight(dockRef.current.clientHeight - window.innerHeight);
    }
  }, [dockRef]);

  return windowSize.width /*&& windowSize.width < 500)*/ ? (
    <motion.div className="container min-h-screen w-screen max-w-full pointer-events-none fixed top-0 left-0 z-[1000]">
      <motion.div
        className="item bg-white shadow-xl border border-black border-opacity-30 w-full overflow-y-auto h-screen rounded-3xl pointer-events-auto"
        ref={dockRef}
        drag={drag}
        dragElastic={0.5}
        animate={{ y: "97%" }}
        dragConstraints={{ top: -height, bottom: 550 }}
      >
        <motion.div
          onPointerDown={(event) => {
            dragControls.start(event, { snapToCursor: false });
          }}
          className="draghandle w-full py-2 cursor-grab"
          dragControls={dragControls}
          onDragEnd={(event, info) => {
            console.log(info);
            if (info.point.y < 200) {
              animate(".item", { y: "0%" }, { type: "spring" });
            } else {
              setDrag("y");
              animate(".item", { y: "97%" }, { type: "spring" });
            }
          }}
        >
          <div className="bg-black opacity-25 w-3/4 h-0.5 mx-auto"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  ) : null;
}

export { Dock };
