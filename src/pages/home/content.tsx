import { GroupProps, useLoader, useThree } from "@react-three/fiber"
import { chunk, last, round } from "lodash"
import React, { useRef, useEffect, SetStateAction } from "react"
import { TextureLoader } from "three"
import { clampPos } from "../../utils/utils"
import { homeState } from "./home.state"

/*
FIXME:
  to fix awkward position after scroll and resize...
*/

let prevScroll = 0

export const scrollMe = () => {
  let dirStateChange = false
  homeState.gallery.forEach((img: any, ind: number) => {
    // homeState.debugChunk.forEach((img: any, ind: number) => {
    if (homeState.scrollDir !== homeState.prevScrollDir) {
      dirStateChange = true
    }

    if (homeState.scroll < -3 || homeState.scroll > 3) {
      homeState.scroll = prevScroll
    }

    console.log(
      ind,
      "is added ->",
      img.addedFromOut,
      "state change->",
      dirStateChange,
      "scrollDir ->",
      homeState.scrollDir,
      img.position.y
    )
    const scrolled = clampPos(
      ind,
      round(img.position.y + homeState.scroll, 4),
      img.addedFromOut,
      img,
      dirStateChange,
      homeState.scrollDir
    )
    // console.log(ind, "got this from clamp..", scrolled, img.addedFromOut)
    img.position.setY(scrolled)
    prevScroll = homeState.scroll
    homeState.prevScrollDir = homeState.scrollDir
  })
}

const Content = ({
  reflow,
  collections,
}: {
  reflow: React.Dispatch<SetStateAction<number>>
  collections: Array<string>
}) => {
  const group = useRef<GroupProps>(null)

  const { viewport, size } = useThree()
  homeState.size = size
  homeState.viewport = viewport

  homeState.imgWidth = round(
    viewport.width / homeState.numColumn - homeState.gap,
    4
  )
  const imgWidth =
    homeState.imgWidth - homeState.gap / (homeState.numColumn + 1)
  const imgHeight = round(imgWidth * homeState.aspect, 4)
  homeState.imgHeight = imgHeight

  let offsetX = viewport.width / 2 - imgWidth / 2
  let offsetY = viewport.height / 2 - imgHeight / 2

  const gapX = homeState.gap + imgWidth
  const gapY = homeState.gap + imgHeight

  const textures = useLoader(TextureLoader, collections)
  const numColumn = Math.floor(textures.length / homeState.numColumn)
  const columns = chunk(textures, numColumn)
  const lastColumn = last(columns)
  if (lastColumn?.length !== columns[0].length) {
    lastColumn?.forEach((tex, index) => columns[index].push(tex))
    columns.pop()
  }

  homeState.galleryHeight = round(
    ((imgHeight + homeState.gap) * (columns[0].length - 1) + homeState.gap) *
      homeState.pxPerUnit,
    4
  )
  homeState.page = homeState.galleryHeight / size.height
  const galleryHeightVH = homeState.galleryHeight / homeState.pxPerUnit
  homeState.galleryHeightVH = galleryHeightVH

  //768px - md breakpoint
  if (viewport.width <= homeState.breakpoint.md) {
    homeState.numColumn = 2
  } else if (viewport.width > homeState.breakpoint.md) {
    homeState.numColumn = 5
  }

  const gallery: any = []

  useEffect(() => {
    if (group.current) {
      //@ts-ignore
      homeState.numImgInColumn = group.current.children[0].children.length
      //@ts-ignore
      group.current.children.forEach((mesh_group) => {
        mesh_group.children.forEach((mesh: any) => {
          for (let i = 0; i < homeState.numImgInColumn; i++) {
            mesh["addedFromOut"] = false
            mesh["prevScroll"] = 0
          }
          gallery.push(mesh)
        })
      })
    }

    if (homeState.galleryEndAddPos === 0) {
      homeState.galleryEndAddPos =
        gallery[homeState.numImgInColumn - 1].position.y
    }

    for (let i = 0; i < gallery.length; i += 5) {
      gallery[i + homeState.numImgInColumn - 1].position.y = homeState.imgHeight
    }

    homeState.galleryStartPos = gallery[homeState.numImgInColumn - 1].position.y
    homeState.galleryStartAddPos =
      homeState.galleryStartPos + homeState.gap + homeState.imgHeight
    homeState.galleryEndPos = gallery[homeState.numImgInColumn - 2].position.y

    homeState.gallery = gallery

    homeState.debugChunk = chunk(gallery, 5)[0]

    reflow(homeState.page)
  })

  // useFrame(() => {
  //   homeState.scroll = 0.03
  //   scrollMe()
  // })

  return (
    <group ref={group}>
      {columns.map((col, col_ind) => {
        const groupGapX = gapX * col_ind
        if (col_ind === 0) {
          offsetX -= homeState.gap
        }
        return (
          <group
            key={`col_${col_ind}`}
            position={[-offsetX + groupGapX, offsetY, 0]}>
            {col.map((tex, tex_ind) => {
              let meshGap = gapY * tex_ind + homeState.gap
              if (tex_ind === 0) {
                meshGap = homeState.gap
              }
              return (
                <mesh
                  key={`col_${col_ind}_tex_${tex_ind}`}
                  position={[0, -meshGap, 0]}>
                  <planeBufferGeometry args={[imgWidth, imgHeight]} />
                  <meshBasicMaterial
                    map={tex}
                    toneMapped={false}
                    transparent
                    opacity={0.4}
                  />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </group>
  )
}

export default Content
