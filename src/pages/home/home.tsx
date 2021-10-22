import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import Content from "./content";
import { state } from "./home.state";

export default function Home({ collections }: { collections: Array<string> }) {
  const scrollArea = useRef(null);
  const canvas = useRef(null);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const ele = e.target as Element;
    state.top = ele.scrollTop;
  };

  const [pages, setPages] = useState(0);

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
        onCreated={({ gl }) => gl.setClearColor("#f5f5f5")}
        style={{ height: "100vh" }}
      >
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <Content reflow={setPages} collections={collections} />
        </Suspense>
      </Canvas>

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div
          className="scroll"
          style={{
            height: `${(pages + 2) * 100}vh`,
            top: "-50%",
          }}
        />
      </div>
    </>
  );
}
