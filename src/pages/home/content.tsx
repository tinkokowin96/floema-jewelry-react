import { GroupProps, useFrame, useLoader, useThree } from "@react-three/fiber";
import { chunk, last } from "lodash";
import React, { useRef, useEffect, SetStateAction } from "react";
import { Mesh, TextureLoader } from "three";
import { state } from "./home.state";

const Content = ({
  reflow,
  collections,
}: {
  reflow: React.Dispatch<SetStateAction<number>>;
  collections: Array<string>;
}) => {
  const group = useRef<GroupProps>(null);

  const { viewport, size } = useThree();
  state.size = size;
  state.viewport = viewport;

  let scrollUp = false;
  let scrollDown = false;
  let lastPos = 0;

  state.imgWidth = viewport.width / state.numColumn - state.gap;
  const imgWidth = state.imgWidth - state.gap / (state.numColumn + 1);
  const imgHeight = imgWidth * state.aspect;
  state.imgHeight = imgHeight;

  let offsetX = viewport.width / 2 - imgWidth / 2;
  let offsetY = viewport.height / 2 - imgHeight / 2;

  const gapX = state.gap + imgWidth;
  const gapY = state.gap + imgHeight;

  const textures = useLoader(TextureLoader, collections);
  const numColumn = Math.floor(textures.length / state.numColumn);
  const columns = chunk(textures, numColumn);
  const lastColumn = last(columns);
  if (lastColumn?.length !== columns[0].length) {
    lastColumn?.forEach((tex, index) => columns[index].push(tex));
    columns.pop();
  }

  state.galleryHeight =
    ((imgHeight + state.gap) * columns[0].length + state.gap) * state.pxPerUnit;
  state.page = state.galleryHeight / size.height;
  const galleryHeightVH = state.galleryHeight / state.pxPerUnit;

  //768px - md breakpoint
  if (viewport.width <= state.breakpoint.md) {
    state.numColumn = 2;
  } else if (viewport.width > state.breakpoint.md) {
    state.numColumn = 5;
  }

  const gallery: any = [];
  const galleryOriPosY: number[] = [];

  useEffect(() => {
    if (group.current) {
      //@ts-ignore
      group.current.children.forEach((mesh_group) => {
        mesh_group.children.forEach((mesh: any) => {
          mesh.isBeforeViewport = false;
          mesh.isAfterViewport = false;
          mesh.isBeforeViewport = false;
          mesh.prevScrollPos = 0;
          mesh.isScrollEnd = false;
          mesh.prevScroll = 0;
          mesh.isPosFreezed = false;
          mesh.newPos = 0;
          mesh.prevState = null;
          mesh.stateChange = false;
          mesh.addNewPos = false;
          mesh.activate = true;
          gallery.push(mesh);
        });
      });
    }
    state.gallery = gallery;

    gallery.forEach((img: Mesh) => galleryOriPosY.push(img.position.y));

    reflow(state.page);
  });

  useFrame(() => {
    if (lastPos < state.top) {
      scrollDown = true;
      scrollUp = false;
    }
    if (lastPos > state.top) {
      scrollDown = false;
      scrollUp = true;
    }

    lastPos = state.top;

    let scrolled = state.top / state.pxPerUnit;
    const scrolledCpy = scrolled;

    if (gallery.length > 0) {
      // gallery.forEach((img: any, ind: number) => {
      const img = gallery[2];

      img.isBeforeViewport = img.position.y - imgHeight > 0;
      img.isAfterViewport = img.position.y < -viewport.height;

      const currentState = img.isBeforeViewport
        ? "before"
        : img.isAfterViewport
        ? "after"
        : "inside";

      console.log(
        img.isBeforeViewport,
        img.isAfterViewport,
        currentState,
        img.position.y
      );

      if (img.prevScrollPos === scrolledCpy) {
        scrolled = 0;
        img.isScrollEnd = true;
        if (!img.isPosFreezed) {
          img.prevScroll = img.position.y;
          img.isPosFreezed = true;
        }
      } else {
        img.isScrollEnd = false;
        img.isPosFreezed = false;
      }

      if (currentState !== img.prevState) {
        img.stateChange = true;
      } else {
        img.stateChange = false;
      }

      const scroll = viewport.height - galleryOriPosY[2] - scrolled;
      img.prevScrollPos = scrolledCpy;

      if (scrollDown && img.isBeforeViewport && img.stateChange) {
        console.log("down entered again...");
        console.log(`down before ${img.newPos}`);
        img.newPos -= galleryHeightVH;
        console.log(`newPos from down->${img.newPos}`);
        img.isBeforeViewport = false;
        img.isAfterViewport = false;
        img.prevState = currentState;
        img.addNewPos = true;
        img.activate = false;
      }

      if (scrollUp && img.isAfterViewport && img.stateChange) {
        console.log("up enter again");
        console.log(`up before ${img.newPos}`);
        img.newPos += galleryHeightVH;
        console.log(`newPos from up->${img.newPos}`);
        img.isBeforeViewport = false;
        img.isAfterViewport = false;
        img.prevState = currentState;
        img.addNewPos = true;
        img.activate = false;
      }

      if (currentState === "inside") {
        img.deactivateToggle = false;
        img.activate = true;
      }

      if (!img.isScrollEnd && img.activate) {
        img.position.setY(viewport.height - scroll);
      }

      if (
        img.isScrollEnd ||
        currentState === "before" ||
        currentState === "after"
      ) {
        img.position.setY(img.prevScroll);
      }

      if (img.addNewPos) {
        img.position.setY(galleryOriPosY[2] + img.newPos);
        // console.log(galleryOriPosY[2], img.newPos, img.position.y);
        img.addNewPos = false;
        galleryOriPosY[2] -= galleryHeightVH;
        img.prevScroll = img.position.y;
      }
      // });

      // img.position.y += 0.001;
    }
  });
  return (
    <group ref={group}>
      {columns.map((col, col_ind) => {
        const groupGapX = gapX * col_ind;
        if (col_ind === 0) {
          offsetX -= state.gap;
        }
        return (
          <group
            key={`col_${col_ind}`}
            position={[-offsetX + groupGapX, offsetY, 0]}
          >
            {col.map((tex, tex_ind) => {
              let meshGap = gapY * tex_ind + state.gap;
              if (tex_ind === 0) {
                meshGap = state.gap;
              }
              return (
                <mesh
                  key={`col_${col_ind}_tex_${tex_ind}`}
                  position={[0, -meshGap, 0]}
                >
                  <planeBufferGeometry args={[imgWidth, imgHeight]} />
                  <meshBasicMaterial map={tex} toneMapped={false} />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
};

export default Content;
