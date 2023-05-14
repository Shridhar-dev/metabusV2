import React, { useEffect, useState } from 'react'

function useWindowSize() {
 const [windowSize, setWindowSize] = useState<{width:number|undefined, height:number|undefined}>({
    height:undefined,
    width:undefined
 })

 useEffect(()=>{
    if(typeof window === "undefined") return;
    function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

 
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
 },[])

 return windowSize;
}


export default useWindowSize