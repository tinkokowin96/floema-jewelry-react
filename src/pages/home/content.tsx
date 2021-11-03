import { GroupProps, useFrame, useLoader, useThree } from "@react-three/fiber"
import { chunk, last, round, take } from "lodash"
import { useRef, useEffect } from "react"
import { TextureLoader } from "three"
import { canvasScroll } from "../../utils/utils"
// import { canvasScroll, elementScroll } from "../../utils/utils"
import { homeState } from "./home.state"

/*
FIXME:
  to fix awkward position after scroll and resize...
*/

const Content = ({
  // reflow,
  collections,
}: {
  // reflow: React.Dispatch<SetStateAction<number>>
  collections: Array<string>
}) => {
  console.log("Again.....")

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
  //@ts-ignore
  if (lastColumn.length !== columns[0].length) {
    //@ts-ignore
    const imgRequired = columns[0].length - lastColumn?.length
    const imgs = take(columns[0], imgRequired)
    //@ts-ignore
    const conArr = lastColumn.concat(imgs)
    columns.pop()
    //@ts-ignore
    columns.push(conArr)
  }

  const gallery: any = []

  useEffect(() => {
    if (homeState.prevImgWidth !== imgWidth) {
      if (group.current) {
        //@ts-ignore
        console.log(group.current.children[0].children[0].position.y)
        //@ts-ignore
        homeState.numImgInColumn = group.current.children[0].children.length
        //@ts-ignore
        group.current.children.forEach((mesh_group, ind) => {
          mesh_group.children.forEach((mesh: any) => {
            for (let i = 0; i < homeState.numImgInColumn; i++) {
              mesh["addedFromOut"] = false
            }
            gallery.push(mesh)
          })
        })
        homeState.gallery = gallery
      }

      for (let i = 0; i < gallery.length; i += homeState.numImgInColumn) {
        gallery[i + homeState.numImgInColumn - 1].position.y = homeState.imgHeight

        /* TODO: find out why every first position of columns don't reset on rerender and
        fix postioning like the following without particular reason(reseting to ori pos as
        don't reset automatically only for first img of the column...)
        */
        gallery[i].position.y = -homeState.gap
      }

      for (let i = 0; i < homeState.numColumn; i++) {
        homeState.galleryStartPos[i] = 0
        homeState.galleryStartAddPos[i] = 0
        homeState.galleryEndPos[i] = 0
        homeState.galleryEndAddPos[i] = 0
      }

      for (let i = 0; i < homeState.numColumn; i++) {
        for (let j = 0; j < homeState.numImgInColumn; j++) {
          gallery[i * homeState.numImgInColumn + j]["column"] = i
        }
      }

      for (let i = 0; i < homeState.numColumn; i++) {
        const scroll = homeState.offsets[i]
        for (let j = 0; j < homeState.numImgInColumn; j++) {
          const scrolled = round(gallery[i * homeState.numImgInColumn + j].position.y + scroll, 4)
          gallery[i * homeState.numImgInColumn + j].position.setY(scrolled)

          if (j === homeState.numImgInColumn - 1) {
            homeState.galleryStartPos[i] = round(gallery[i * homeState.numImgInColumn + j].position.y + scroll, 4)
            homeState.galleryStartAddPos[i] = round(
              homeState.galleryStartPos[i] + homeState.gap + homeState.imgHeight,
              4
            )
          }

          if (j === homeState.numImgInColumn - 2) {
            homeState.galleryEndPos[i] = round(gallery[i * homeState.numImgInColumn + j].position.y + scroll, 4)
            homeState.galleryEndAddPos[i] = round(homeState.galleryEndPos[i] - homeState.gap - homeState.imgHeight, 4)
          }
        }
      }
      homeState.debugChunk = chunk(gallery, 5)[0]
    }
    homeState.prevImgWidth = imgWidth
  })

  useFrame(() => {
    // homeState.scroll = 0.018
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
                  <meshBasicMaterial map={tex} toneMapped={false} transparent opacity={0.4} />
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
