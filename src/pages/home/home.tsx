import gsap, { Power3 } from "gsap";
import { useRef } from "react";
import { useHistory } from "react-router";

//@ts-ignore
const Home = ({ collections }) => {
  const history = useHistory();
  const container = useRef(null);
  const transition = useRef(null);
  const redirectAbout = () => {
    const tl = gsap.timeline();
    tl.set(container.current, {
      pointerEvents: "none",
    });

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
    );

    tl.to(
      transition.current,
      {
        clipPath: "circle(150% at 50% 30%)",
        duration: 1,
        ease: "linear",
        onComplete: () => history.push("/about"),
      },
      0.4
    );
  };

  const redirectCollection = () => {
    console.log("redirecting.... collections...");
  };

  if (collections) {
    return (
      <div>
        <div
          ref={transition}
          className="fixed bg-red-500 h-full w-full z-10 clippy"
        ></div>
        <div ref={container}>
          <button onClick={redirectAbout}>About</button>
          <button onClick={redirectCollection}>Collections</button>
          {collections.map((img: string) => (
            <img key={img} src={img} alt=""></img>
          ))}
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default Home;
