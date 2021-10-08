import gsap from "gsap";
import { useRef } from "react";
import { useHistory } from "react-router";

//@ts-ignore
const Home = ({ collections }) => {
  const history = useHistory();
  const container = useRef(null);
  const transition = useRef(null);
  const redirectAbout = () => {
    gsap.to(transition.current, {
      scaleY: 1,
      duration: 1,
      transformOrigin: "bottom center",
      stagger: 0.3,
      onComplete: () => history.push("/about"),
    });
  };

  const redirectCollection = () => {
    console.log("redirecting.... collections...");
  };

  if (collections) {
    return (
      <div>
        <div
          ref={transition}
          className="fixed bg-red-500 h-screen w-screen top-0 left-0 z-10 transform scale-y-0"
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
