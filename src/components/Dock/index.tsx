import * as React from "react";
import { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { useState } from "react";
import { animate } from "framer-motion";
import useWindowSize from "@/utils/useWindowSize";

function Dock() {
  const [drag, setDrag] = useState<boolean | "y" | "x" | undefined>("y");

  const dragControls = useDragControls();
  const windowSize = useWindowSize();

  function startDrag(event: PointerEvent) {
    dragControls.start(event, { snapToCursor: false });
  }

  return windowSize.width && windowSize.width < 500 ? (
    <motion.div
      onPointerDown={(e) => startDrag}
      className="container h-screen w-screen pointer-events-none fixed top-0 left-0 z-[1000]"
    >
      <motion.div
        className="item bg-green-300 w-full overflow-y-auto h-screen rounded-3xl pointer-events-auto"
        dragControls={dragControls}
        //dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        drag={drag}
        dragElastic={1}
        animate={{ y: "98%" }}
        dragConstraints={{ top: 0, bottom: 280 }}
        onDragEnd={(event, info) => {
          if (info.point.y < 400) {
            //setDrag(false);
            animate(".item", { y: "0%" }, { type: "spring" });
          } else {
            setDrag("y");
            animate(".item", { y: "98%" }, { type: "spring" });
          }
        }}
      >
        <div className=" bg-red-700 m-5 h-[400vh] "></div>
      </motion.div>
    </motion.div>
  ) : null;
}

export { Dock };
