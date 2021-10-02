import { isEmpty } from "lodash";

//@ts-ignore
const About = ({ collections }) => {
  if (collections) {
    console.log(collections["gallery"], collections["body"]);
    // for (const content in collections.body) {
    //   console.log(content);
    // }
    return (
      <div>
        {collections.gallery.map((img: string, index: number) => (
          <img src={img} alt="" key={index}></img>
        ))}

        {Object.keys(collections.body).map((key: string, index: number) => {})}
        {/* {collections.body.map((key: string, index: number) => {
          const body = collections["body"];
          return body.map((key: string, index: number) => {
            if (body[key]["items"].length < 0) {
              const images = collections["body"]["items"];
              images.map((img: string, index: number) => (
                <img src={img} alt="" key={index}></img>
              ));
            } else if (!isEmpty(body[key]["primary"])) {
              <div> tmp for primary</div>;
            }
            return <></>;
          });
        })} */}
      </div>
    );
  }
  return <></>;
};

export default About;
