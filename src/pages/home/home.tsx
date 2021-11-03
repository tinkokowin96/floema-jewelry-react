import { Canvas } from "@react-three/fiber"
import gsap, { Power3 } from "gsap"
import { round } from "lodash"
import React, { Suspense, useEffect, useRef } from "react"
import { useHistory } from "react-router"
import Button from "../../assets/button.svg"
import { canvasScroll } from "../../utils/utils"
import Content from "./content"
import { homeState } from "./home.state"

const Home = ({ collections }: { collections: Array<string> }) => {
  const history = useHistory()
  const scrollArea = useRef<HTMLDivElement>(null)
  const canvas = useRef(null)
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

    // console.log(window.innerWidth)
    const stagger = 0.25
    const duration = 1
    const cols = gsap.utils.toArray(".col-item")

    const loop = gsap.timeline({
      paused: true,
      repeat: -1,
    })

    const shift = [...cols, ...cols, ...cols]

    shift.forEach((col: any, index) => {
      const tl = gsap.timeline().fromTo(
        col,
        {
          y: 0,
        },
        {
          y: "150vw",
          // y: "300%",
          duration: 1,
          ease: "none",
          immediateRender: false,
        },
        0
      )

      loop.add(tl, index * stagger)
    })

    const cycleDuration = stagger * cols.length
    const startTime = cycleDuration + duration * 0.2
    const endTime = startTime + cycleDuration

    gsap.fromTo(
      loop,
      {
        totalTime: startTime,
      },
      {
        totalTime: endTime,
        duration: 15,
        ease: "none",
        repeat: -1,
      }
    )
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

    canvasScroll()
    homeState.top = top
  }

  // const [pages, setPages] = useState(0)

  return (
    <div className="relative">
      <div ref={container} className="bg-home w-full h-full canvas-container">
        <Canvas
          ref={canvas}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 10], far: 100 }}
          style={{ height: "100vh" }}>
          <ambientLight intensity={0.4} />
          <Suspense fallback={null}>
            <Content collections={collections} />
          </Suspense>
        </Canvas>

        <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
          <div
            className="scroll"
            style={{
              height: `${5 * 100}vh`,
            }}
          />
        </div>
      </div>

      <div className="fixed top-0 left-0 h-full w-full pointer-events-none">
        <div
          ref={transition}
          className=" bg-red-500 h-screen w-screen z-20 clippy"></div>
      </div>

      <div className="absolute top-7 w-full flex flex-row justify-between z-20">
        <button>
          <img className="w-vw h-vw pl-7 " src="logo.png" alt="logo" />
        </button>

        <button className="pr-7 group btn-about" onClick={redirectAbout}>
          <h4 className="text-white text-center font-dosis text-xl ">About</h4>
          <div className="w-full h-0.25 bg-white transform scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left"></div>
        </button>
      </div>

      {/* <div className=""> */}
      <div className="col-item">
        <h2>Vita</h2>
        <p>
          Collection <br />
          One
        </p>
      </div>
      <div className="col-item">
        <h2>Treccia</h2>
        <p>
          Collection <br />
          Two
        </p>
      </div>
      <div className="col-item">
        <h2>Onde</h2>
        <p>
          Collection <br />
          Three
        </p>
      </div>
      <div className="col-item">
        <h2>Aria</h2>
        <p>
          Collection <br />
          Four
        </p>
      </div>
      {/* </div> */}

      <button className="" onClick={redirectCollection}>
        <Button />
      </button>
    </div>
  )
}

export default Home
