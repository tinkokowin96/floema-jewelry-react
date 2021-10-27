import { Canvas } from "@react-three/fiber"
import { round } from "lodash"
import React, { Suspense, useRef, useState } from "react"
import Content from "./content"
import { state } from "./home.state"
import scrollMe from "./scroll"

export default function Home({ collections }: { collections: Array<string> }) {
  const scrollArea = useRef(null)
  const canvas = useRef(null)

  //@ts-ignore
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const ele = e.target as Element
    const top = ele.scrollTop

    state.scrollDir = top - state.top > 0 ? "down" : "up"

    if (state.scrollDir === "up") {
      state.scroll = round(
        (-(state.top - top) / (ele.scrollHeight - ele.clientHeight)) *
          state.pxPerUnit,
        4
      )
    } else {
      state.scroll = round(
        ((top - state.top) / (ele.scrollHeight - ele.clientHeight)) *
          state.pxPerUnit,
        4
      )
    }
    scrollMe()
    state.top = top
  }

  const [pages, setPages] = useState(0)

  return (
    <>
      <Canvas
        ref={canvas}
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], far: 100 }}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          depth: false,
        }}
        onCreated={({ gl }) => gl.setClearColor("#C8E3D4")}
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
    </>
  )
}
