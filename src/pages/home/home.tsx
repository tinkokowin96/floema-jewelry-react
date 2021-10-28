import { Canvas } from "@react-three/fiber"
import gsap, { Power3 } from "gsap"
import { round } from "lodash"
import React, { Suspense, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router"
import Content, { scrollMe } from "./content"
import { homeState } from "./home.state"

const Home = ({ collections }: { collections: Array<string> }) => {
  const scrollArea = useRef<HTMLDivElement>(null)
  const canvas = useRef(null)
  const history = useHistory()
  const container = useRef(null)
  const transition = useRef(null)

  const redirectAbout = () => {
    const tl = gsap.timeline()
    tl.set(container.current, {
      pointerEvents: "none",
    })

    tl.fromTo(
      transition.current,
      {
        clipPath: "circle(90% at 50% -70%)",
      },
      {
        clipPath: "circle(70% at 50% 30%)",
        duration: 1,
        ease: Power3.easeOut,
      }
    )

    tl.to(
      transition.current,
      {
        clipPath: "circle(150% at 50% 30%)",
        duration: 1,
        ease: "linear",
        onComplete: () => history.push("/about"),
      },
      0.4
    )
  }

  const redirectCollection = () => {
    console.log("redirecting.... collections...")
  }

  useEffect(() => {
    const ele = scrollArea.current as Element
    ele.scrollTop = ele.scrollHeight / 2 - ele.clientHeight
  })

  //@ts-ignore
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const ele = e.target as Element
    let top = ele.scrollTop

    homeState.scrollDir = top - homeState.top > 0 ? "down" : "up"

    if (homeState.scrollDir === "up") {
      homeState.scroll = round(
        (-(homeState.top - top) / (ele.scrollHeight - ele.clientHeight)) *
          homeState.pxPerUnit,
        4
      )
    }

    if (homeState.scrollDir === "down") {
      homeState.scroll = round(
        ((top - homeState.top) / (ele.scrollHeight - ele.clientHeight)) *
          homeState.pxPerUnit,
        4
      )
    }

    if (ele.scrollHeight === ele.scrollTop + ele.clientHeight) {
      ele.scrollTop = ele.scrollHeight / 2 - ele.clientHeight
    }

    if (ele.scrollTop === 0) {
      ele.scrollTop = ele.scrollHeight / 2 - ele.clientHeight
    }

    scrollMe()
    homeState.top = top
  }

  const [pages, setPages] = useState(0)

  return (
    <div className="relative">
      <div ref={container} className="bg-gray-300 w-full h-full">
        <Canvas
          ref={canvas}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 10], far: 100 }}
          style={{ height: "100vh" }}>
          <ambientLight intensity={0.4} />
          <Suspense fallback={null}>
            <Content reflow={setPages} collections={collections} />
          </Suspense>
        </Canvas>

        <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
          <div
            className="scroll"
            style={{
              height: `${(pages + 4) * 100}vh`,
            }}
          />
        </div>
      </div>

      <div className="fixed top-0 left-0 h-full w-full pointer-events-none">
        <div
          ref={transition}
          className=" bg-red-500 h-screen w-screen z-20 clippy"></div>

        <div
          ref={container}
          className="absolute top-0 z-10 pointer-events-auto">
          <button onClick={redirectAbout}>About</button>
          <button onClick={redirectCollection}>Collections</button>
        </div>
      </div>
    </div>
  )
}

export default Home
