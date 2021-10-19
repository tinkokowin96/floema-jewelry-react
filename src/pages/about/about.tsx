import gsap from "gsap";
import { RichText } from "prismic-reactjs";
import { useEffect, useRef } from "react";

//@ts-ignore
const About = ({ collections, history }) => {
  const transition: any = useRef([]);
  const firstLoad = useRef(null);

  useEffect(() => {
    // to prevent transition animation trigger on initial page load directly from /about
    // instead of called from other pages...
    if (history.action === "PUSH") {
      const tl = gsap.timeline();
      tl.to(transition.current, {
        scaleY: 0,
        duration: 1,
        transformOrigin: "top",
        stagger: 0.3,
      });
    } else if (history.action === "POP") {
      gsap.to(firstLoad.current, {
        scaleX: 0,
        duration: 2,
        transformOrigin: "left",
      });
    }
  });

  if (collections) {
    // console.log(collections);
    const repeatSection = {
      gallery: 0,
      content: 0,
      highlight: 0,
      title: 0,
    };
    return (
      <div>
        {history.action === "PUSH" && (
          <div className="flex flex-row fixed h-screen w-screen top-0 left-0 z-10">
            <div
              ref={(ele) => (transition.current[0] = ele)}
              className="flex-1 bg-red-500"
            ></div>
            <div
              ref={(ele) => (transition.current[1] = ele)}
              className="flex-1 bg-green-500"
            ></div>
            <div
              ref={(ele) => (transition.current[2] = ele)}
              className="flex-1 bg-blue-500"
            ></div>
          </div>
        )}

        {history.action === "POP" && (
          <div
            ref={firstLoad}
            className="bg-red-400 h-screen w-screen fixed top-0 left-0 z-10"
          ></div>
        )}

        <div>
          {collections.body.map((section: any, index: number) => {
            if (section.slice_type === "gallery") {
              repeatSection.gallery += 1;
              return (
                <div key={`${repeatSection.gallery}_${index}`}>
                  {collections.gallery.map((img: string, gal_ind: number) => (
                    <img
                      src={img}
                      alt=""
                      key={`galimg_${repeatSection.gallery}_${gal_ind}`}
                    ></img>
                  ))}
                </div>
              );
            }

            if (section.slice_type === "content") {
              repeatSection.content += 1;
              let img = "";
              if (section.primary.type === "Right") {
                img = "bg-gray-600";
              } else if (section.primary.type === "Left") {
                img = "bg-red-300";
              }

              return (
                <div key={`${repeatSection.content}_${index}`}>
                  <h4 className={img}> {section.primary.label}</h4>
                  {RichText.render(section.primary.description)}
                  {}
                  <img src={section.primary.image.url} alt="" />
                </div>
              );
            }

            if (section.slice_type === "highlight") {
              repeatSection.highlight += 1;

              let title = "";
              let label = "";
              if (section.primary.title) {
                title = section.primary.title;
              }
              if (section.primary.label) {
                label = section.primary.label;
              }
              return (
                <div key={`${repeatSection.highlight}_${index}`}>
                  {section.items.map((img: any, hl_ind: number) => (
                    <img
                      src={img.image.url}
                      alt=""
                      key={`hlimg_${repeatSection.gallery}_${hl_ind}`}
                    ></img>
                  ))}
                  {title}
                  {label}
                </div>
              );
            }

            if (section.slice_type === "title") {
              return (
                <div key={`${repeatSection.title}_${index}`}>
                  <span>{section.primary.text}</span>
                </div>
              );
            }

            return <div key={Math.random().toString(36).substr(2, 9)}></div>;
          })}
        </div>
      </div>
    );
  }
  return <></>;
};

export default About;
