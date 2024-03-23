"use client"

import { useEffect, useRef, useState } from "react";

export default function Page(){

    const [coords, setCoords] = useState({x: 0, y: 0});
    const divRef = useRef()
    const aRef = useRef()

    useEffect(() => {
        const handleWindowMouseMove = event => {
        setCoords({
            x: event.clientX,
            y: event.clientY,
        });
        };
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
        window.removeEventListener(
            'mousemove',
            handleWindowMouseMove,
        );
        };
    }, []);


    return (
        <>
        <br />
        <br />
        <br />
                <div className="ml-20 max-w-[144px] mt-4 w-36 h-11 bg-cyan-300">
                    <div className="relative ml-auto mr-auto bg-yellow rounded-md w-28 h-10 align-baseline"
                    onMouseEnter={(e) => {
                        divRef.current.style.left = `0px`
                        divRef.current.style.top = `${coords.y}px`
                        divRef.current.style.width = `170px`
                        divRef.current.style.height = `170px`
                        divRef.current.style.opacity = `1`
                        divRef.current.style.transform = "translate(-50%, -50%)"
                    }}
                    onMouseLeave={() =>{
                        divRef.current.style.height = "4px"
                        divRef.current.style.width = "4px"
                        divRef.current.style.opacity = `1`
                        divRef.current.style.transform = ""
                    }} ref={aRef}>
                        Ketik disini
                        <div className="absolute rounded-full" style={{
                            transition: "opacity 200ms ease-in-out,  width 600ms ease-in-out, height 600ms ease-in-out, transform 50ms ease-in-out",
                            backgroundColor: 'red',
                        }}  ref={divRef}></div>


                    </div>
                </div>
        </>
    )
}