import {
  Canvas,
  GroupProps,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Box, Flex, useFlexSize } from "@react-three/flex";
import React, {
  SetStateAction,
  Suspense,
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { Texture, TextureLoader, Vector3 } from "three";
import { state } from "./home.state";

const Gallery = ({
  textures,
  onReflow,
}: {
  textures: Array<Texture>;
  onReflow: any;
}) => {
  const size = useFlexSize();
  useLayoutEffect(() => {
    onReflow && onReflow(...size);
  }, [onReflow, size]);
  const boxProps = {
    centerAnchor: true,
    grow: 1,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    width: "auto",
    height: "auto",
    minWidth: 3,
    minHeight: 4.23,
    maxWidth: 6,
    maxHeight: 8.52,
  };
  return (
    <Box
      dir="row"
      width="100%"
      height="auto"
      justify="flex-start"
      grow={1}
      wrap="wrap"
      margin="auto"
    >
      {textures.map((texture: Texture, index: number) => {
        return (
          <Box key={index} {...boxProps}>
            {(width, height) => {
              // console.log(width, height);
              return (
                <mesh>
                  <planeBufferGeometry args={[width, height]} />
                  <meshBasicMaterial map={texture} toneMapped={false} />
                </mesh>
              );
            }}
          </Box>
        );
      })}
    </Box>
  );
};

const Content = ({
  reflow,
  collections,
}: {
  reflow: React.Dispatch<SetStateAction<number>>;
  collections: Array<string>;
}) => {
  const group = useRef<GroupProps>(null);
  const { viewport, size } = useThree();
  const vec = new Vector3();
  const textures = useLoader(TextureLoader, collections);

  useFrame(() => {
    const page = state.top / size.height;
    const y = page * viewport.height;
    //@ts-ignore
    group.current?.position?.lerp(vec.set(0, y + 1.0, 0), 1.0);
  });
  const handleReflow = useCallback(
    (w: number, h: number) => {
      return reflow((state.page = h / viewport.height));
    },
    [reflow, viewport.height]
  );

  return (
    <group ref={group}>
      <Flex
        dir="row"
        position={[-viewport.width / 2, viewport.height / 2, 0]}
        size={[viewport.width, viewport.height, 0]}
        onReflow={handleReflow}
      >
        <Gallery
          textures={textures}
          onReflow={(w: number, h: number) => {
            console.log(w, h);
            state.imgWidth = w;
            state.imgHeight = h;
          }}
        />
      </Flex>
    </group>
  );
};

export default function Home({ collections }: { collections: Array<string> }) {
  const scrollArea = useRef(null);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const ele = e.target as Element;
    state.top = ele.scrollTop;
    // console.log(state.top);
  };
  const [pages, setPages] = useState(0);

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], far: 1000 }}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: true,
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
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </>
  );
}
