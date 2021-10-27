import { GroupProps, useLoader, useThree } from "@react-three/fiber"
import { chunk, last, round } from "lodash"
import React, { useRef, useEffect, SetStateAction } from "react"
import { Mesh, TextureLoader } from "three"
import { state } from "./home.state"

const Content = ({
  reflow,
  collections,
}: {
  reflow: React.Dispatch<SetStateAction<number>>
  collections: Array<string>
}) => {
  const group = useRef<GroupProps>(null)

  const { viewport, size } = useThree()
  state.size = size
  state.viewport = viewport

  state.imgWidth = round(viewport.width / state.numColumn - state.gap, 4)
  const imgWidth = state.imgWidth - state.gap / (state.numColumn + 1)
  const imgHeight = round(imgWidth * state.aspect, 4)
  state.imgHeight = imgHeight

  let offsetX = viewport.width / 2 - imgWidth / 2
  let offsetY = viewport.height / 2 - imgHeight / 2

  const gapX = state.gap + imgWidth
  const gapY = state.gap + imgHeight

  const textures = useLoader(TextureLoader, collections)
  const numColumn = Math.floor(textures.length / state.numColumn)
  const columns = chunk(textures, numColumn)
  const lastColumn = last(columns)
  if (lastColumn?.length !== columns[0].length) {
    lastColumn?.forEach((tex, index) => columns[index].push(tex))
    columns.pop()
  }

  state.galleryHeight = round(
    ((imgHeight + state.gap) * (columns[0].length - 1) + state.gap) *
      state.pxPerUnit,
    4
  )
  state.page = state.galleryHeight / size.height
  const galleryHeightVH = state.galleryHeight / state.pxPerUnit
  state.galleryHeightVH = galleryHeightVH

  //768px - md breakpoint
  if (viewport.width <= state.breakpoint.md) {
    state.numColumn = 2
  } else if (viewport.width > state.breakpoint.md) {
    state.numColumn = 5
  }

  const gallery: any = []
  const galleryPosY: number[] = []
  const firstColumnIndex: number[] = []
  const galleryPosYCol: number[] = []
  let colIndex = 0

  useEffect(() => {
    if (group.current) {
      //@ts-ignore
      state.numImgInColumn = group.current.children[0].children.length
      //@ts-ignore
      group.current.children.forEach((mesh_group) => {
        mesh_group.children.forEach((mesh: any) => {
          mesh.isBeforeViewport = false
          mesh.isAfterViewport = false
          mesh.isBeforeViewport = false
          mesh.prevPos = mesh.position.y
          mesh.prevWithinViewport = false

          for (let i = 0; i < state.numImgInColumn; i++) {
            mesh[i] = false
          }
          gallery.push(mesh)
        })
      })
    }

    for (let i = 0; i < gallery.length; i += 5) {
      for (let j = 0; j < state.numImgInColumn; j++) {
        gallery[i + j][j] = true
        gallery[i + j]["column"] = colIndex
      }
      gallery[i + state.numImgInColumn - 1].position.y = state.imgHeight
      colIndex++
    }

    for (let i = 0; i < state.numColumn; i++) {
      firstColumnIndex.push(i * state.numImgInColumn)
    }

    for (let i = 0; i < state.numImgInColumn; i++) {
      galleryPosYCol.push(gallery[i].position.y)
    }

    gallery.forEach((img: Mesh) => galleryPosY.push(img.position.y))

    state.galleryStartPos = gallery[state.numImgInColumn - 1].position.y
    state.galleryEndPos = gallery[state.numImgInColumn - 2].position.y

    state.gallery = gallery

    state.firstColumnIndex = firstColumnIndex

    state.firstColumnIndexOri = [...firstColumnIndex]

    state.debugChunk = chunk(gallery, 5)[0]

    state.galleryPosY = [...galleryPosY]

    state.galleryOriPosY = [...galleryPosY]

    // console.log(gallery)
    // console.log(galleryPosY)

    reflow(state.page)
  })

  // useFrame(() => {

  //     // img.position.y += 0.001;
  // });
  return (
    <group ref={group}>
      {columns.map((col, col_ind) => {
        const groupGapX = gapX * col_ind
        if (col_ind === 0) {
          offsetX -= state.gap
        }
        return (
          <group
            key={`col_${col_ind}`}
            position={[-offsetX + groupGapX, offsetY, 0]}>
            {col.map((tex, tex_ind) => {
              let meshGap = gapY * tex_ind + state.gap
              if (tex_ind === 0) {
                meshGap = state.gap
              }
              return (
                <mesh
                  key={`col_${col_ind}_tex_${tex_ind}`}
                  position={[0, -meshGap, 0]}>
                  <planeBufferGeometry args={[imgWidth, imgHeight]} />
                  <meshBasicMaterial map={tex} toneMapped={false} />
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
