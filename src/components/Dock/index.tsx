import * as React from "react";
import { useRef } from "react";
import {
  motion,
  useDragControls,
  useInView,
  useMotionValue,
} from "framer-motion";
import { useState } from "react";
import { animate } from "framer-motion";
import useWindowSize from "@/utils/useWindowSize";
import { useEffect } from "react";

function Dock() {
  const [drag, setDrag] = useState<boolean | "y" | "x" | undefined>("y");
  const [height, setHeight] = useState(0);

  const [dragElastic, setDragElastic] = useState(0.5);

  const handleRef = useRef(null);
  const isInView = useInView(handleRef);
  const dockRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const windowSize = useWindowSize();

  const y = useMotionValue(0);

  useEffect(() => {
    y.set(window.innerHeight - 20);
  }, []);

  useEffect(() => {
    if (dockRef !== null && dockRef.current !== null) {
      setHeight(dockRef.current.clientHeight - window.innerHeight);
    }
  }, [dockRef]);

  return windowSize.width /*&& windowSize.width < 500)*/ ? (
    <motion.div className="container min-h-screen w-screen max-w-full pointer-events-none fixed top-0 left-0 z-[1000]">
      <motion.div
        className="item bg-white shadow-xl border border-black border-opacity-30 w-full overflow-y-auto z-[1000] min-h-screen rounded-3xl pointer-events-auto"
        ref={dockRef}
        drag={drag}
        dragElastic={0.5}
        onPointerDown={(event) => {
          dragControls.start(event, { snapToCursor: false });
        }}
        style={{ touchAction: "none", y: y }}
        dragConstraints={{ top: -height, bottom: window.innerHeight - 20 }}
        dragControls={dragControls}
        onDragEnd={(event, info) => {
          if (isInView) {
            if (info.point.y < 600) {
              animate(".item", { y: "0%" }, { type: "spring" });
            } else {
              setDrag("y");
              animate(
                ".item",
                { y: window.innerHeight - 20 },
                { type: "spring" }
              );
            }
          }
        }}
      >
        <motion.div className="draghandle w-full py-2">
          <div
            className="bg-black opacity-25 w-3/4 h-0.5 mx-auto"
            ref={handleRef}
          ></div>
          <div className="grid grid-flow-row grid-cols-12 gap-5">
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
            <div className=" bg-red-700 border-4 border-white h-40 col-span-6"></div>
            <div className=" bg-green-700 border-4 border-white  h-40 col-span-6"></div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  ) : null;
}

export { Dock };
