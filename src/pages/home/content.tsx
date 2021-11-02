import { GroupProps, useFrame, useLoader, useThree } from "@react-three/fiber"
import { chunk, last, round, take } from "lodash"
import { useRef, useEffect } from "react"
import { TextureLoader } from "three"
// import { canvasScroll, elementScroll } from "../../utils/utils"
import { homeState } from "./home.state"

/*
FIXME:
  to fix awkward position after scroll and resize...
*/

const Content = ({ collections }: { collections: Array<string> }) => {
  const group = useRef<GroupProps>(null)

  const { viewport, size } = useThree()
  homeState.size = size
  homeState.viewport = viewport

  //768px - md breakpoint
  if (viewport.width <= homeState.breakpoint.md) {
    homeState.numColumn = 2
  } else if (viewport.width > homeState.breakpoint.md) {
    homeState.numColumn = 5
  }

  homeState.imgWidth = round(viewport.width / homeState.numColumn - homeState.gap, 4)
  const imgWidth = homeState.imgWidth - homeState.gap / (homeState.numColumn + 1)
  const imgHeight = round(imgWidth * homeState.aspect, 4)
  homeState.imgHeight = imgHeight

  let offsetX = viewport.width / 2 - imgWidth / 2
  let offsetY = viewport.height / 2 - imgHeight / 2

  const gapX = homeState.gap + imgWidth
  const gapY = homeState.gap + imgHeight

  const textures = useLoader(TextureLoader, collections)
  const numColumn = Math.ceil(textures.length / homeState.numColumn)
  const columns = chunk(textures, numColumn)
  const lastColumn = last(columns)
  if (lastColumn?.length !== columns[0].length) {
    //@ts-ignore
    const imgRequired = columns[0].length - lastColumn?.length
    const imgs = take(columns[0], imgRequired)
    const conArr = lastColumn?.concat(imgs)
    columns.pop()
    //@ts-ignore
    columns.push(conArr)
  }

  homeState.galleryHeight = round(
    ((imgHeight + homeState.gap) * (columns[0].length - 1) + homeState.gap) * homeState.pxPerUnit,
    4
  )
  homeState.page = homeState.galleryHeight / size.height
  const galleryHeightVH = homeState.galleryHeight / homeState.pxPerUnit
  homeState.galleryHeightVH = galleryHeightVH

  const gallery: any = []

  useEffect(() => {
    // console.log("rerendered....")
    //@ts-ignore
    if (group.current?.children.length > 1) {
      // console.log("Hiii....", group.current.children)
      //@ts-ignore
      homeState.numImgInColumn = group.current.children[0].children.length
      //@ts-ignore

      group.current.children.forEach((mesh_group) => {
        mesh_group.children.forEach((mesh: any) => {
          for (let i = 0; i < homeState.numImgInColumn; i++) {
            if (!mesh["addedFromOut"]) {
              mesh["addedFromOut"] = false
            }
          }
          gallery.push(mesh)
        })
      })
      homeState.gallery = gallery
    }

    if (!homeState.altered) {
      for (let i = 0; i < gallery.length; i += homeState.numColumn) {
        gallery[i + homeState.numImgInColumn - 1].position.y = homeState.imgHeight
      }
    }

    if (!homeState.altered) {
      for (let i = 0; i < homeState.numColumn; i++) {
        homeState.start = gallery[homeState.numImgInColumn - 1].position.y
        homeState.startAdd = round(homeState.start + homeState.gap + homeState.imgHeight, 4)
        homeState.end = gallery[homeState.numImgInColumn - 2].position.y
        homeState.endAdd = round(homeState.end - homeState.gap - homeState.imgHeight, 4)
      }
    }

    for (let i = 0; i < homeState.numColumn; i++) {
      const scroll = -round(homeState.offsets[i] * homeState.imgHeight, 4)
      if (!homeState.altered) {
        for (let j = 0; j < homeState.numImgInColumn; j++) {
          const scrolled = round(gallery[i * homeState.numImgInColumn + j].position.y + scroll, 4)

          if (scrolled < homeState.end - homeState.imgHeight / 2) {
            const position = round(homeState.startAdd + scrolled - homeState.end, 4)
            gallery[i * homeState.numImgInColumn + j].position.setY(position)
            gallery[i * homeState.numImgInColumn + j]["addedFromOut"] = true
          } else {
            gallery[i * homeState.numImgInColumn + j].position.setY(scrolled)
          }
        }
      }
    }
    homeState.debugChunk = chunk(gallery, 5)[0]
    homeState.altered = !homeState.altered
    console.log(homeState.start, homeState.startAdd, homeState.end, homeState.endAdd)
  })

  useFrame(() => {
    // homeState.scroll = 0.03
    // canvasScroll()
  })

  return (
    <group ref={group}>
      {columns.map((col, col_ind) => {
        const groupGapX = gapX * col_ind
        if (col_ind === 0) {
          offsetX -= homeState.gap
        }
        return (
          <group key={`col_${col_ind}`} position={[-offsetX + groupGapX, offsetY, 0]}>
            {col.map((tex, tex_ind) => {
              let meshGap = gapY * tex_ind + homeState.gap
              if (tex_ind === 0) {
                meshGap = homeState.gap
              }

              return (
                <mesh key={`col_${col_ind}_tex_${tex_ind}`} position={[0, -meshGap, 0]}>
                  <planeBufferGeometry args={[imgWidth, imgHeight]} />
                  <meshBasicMaterial map={tex} toneMapped={false} transparent opacity={homeState.altered ? 0.4 : 0.4} />
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
