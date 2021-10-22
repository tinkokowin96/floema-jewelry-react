import {
  Canvas,
  GroupProps,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Box, Flex, useFlexSize } from "@react-three/flex";
import { chunk, last } from "lodash";
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

const InnerSize = ({ onReflow }: any) => {
  const size = useFlexSize();

  useLayoutEffect(() => {
    onReflow && onReflow(...size);
  }, [onReflow, size]);

  return null;
};

const Gallery = ({
  textures,
  onReflow,
}: {
  textures: Array<Texture>;
  onReflow: any;
}) => {
  const gallery = useRef<GroupProps>(null);

  const numColumn = Math.floor(textures.length / state.numColumn);
  const columns = chunk(textures, numColumn);
  const lastColumn = last(columns);
  if (lastColumn?.length !== columns[0].length) {
    lastColumn?.forEach((tex, index) => columns[index].push(tex));
    columns.pop();
  }

  const boxProps = {
    centerAnchor: true,
    marginTop: state.gap / 2,
    marginBottom: state.gap / 2,
    width: state.imgWidth,
    height: state.imgWidth * state.aspect,
  };
  return (
    <group ref={gallery}>
      <Box dir="row" width="100%" height="auto" wrap="no-wrap">
        <InnerSize onReflow={onReflow} />
        {columns.map((column, col_ind) => {
          return (
            <Box
              key={`column_${col_ind}`}
              dir="row"
              width={`${100 / state.numColumn}%`}
              height="auto"
              wrap="wrap"
              justify="center"
            >
              {column.map((texture, tex_ind) => {
                return (
                  <Box key={`tex_${col_ind}_${tex_ind}`} {...boxProps}>
                    {(width, height) => {
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
        })}
      </Box>
    </group>
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
  const gallery1 = useRef<GroupProps>(null);
  const gallery2 = useRef<GroupProps>(null);

  const { viewport, size } = useThree();
  // console.log(viewport.height);
  const vec = new Vector3();
  const textures = useLoader(TextureLoader, collections);

  state.galleryHeight = viewport.height;
  //768px - md breakpoint
  if (viewport.width <= state.breakpoint.md) {
    state.numColumn = 2;
  } else if (viewport.width > state.breakpoint.md) {
    state.numColumn = 5;
  }
  state.imgWidth = viewport.width / state.numColumn - state.gap;

  // console.log()

  useFrame(({ clock }) => {
    const page = state.top / size.height;
    // console.log(page);
    const y = page * viewport.height;
    // console.log(y);
    //@ts-ignore
    group.current?.position?.lerp(vec.set(0, y + 1.0, 0), 0.15);
    console.log(group.current?.position);

    // auto-scroll
    // const timeElaplsed = clock.getElapsedTime();
    // const scrollY = Math.cos(timeElaplsed) + viewport.height;
    //@ts-ignore
    // group.current?.translateY(scrollY);
    // group.current?.position?.lerp(vec.set(0, scrollY, 0), 1.0);
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
        dir="column"
        position={[-viewport.width / 2, viewport.height / 2, 0]}
        size={[viewport.width, viewport.height, 0]}
        onReflow={handleReflow}
      >
        <group ref={gallery1}>
          <Gallery
            textures={textures}
            onReflow={(w: number, h: number) => {
              // console.log(h);
            }}
          />
        </group>
        <group ref={gallery2}>
          <Gallery
            textures={textures}
            onReflow={(w: number, h: number) => {
              // console.log(h);
            }}
          />
        </group>
      </Flex>
    </group>
  );
};

export default function Home({ collections }: { collections: Array<string> }) {
  const scrollArea = useRef(null);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const ele = e.target as Element;
    state.top = ele.scrollTop;
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
