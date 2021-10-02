//@ts-ignore
const Home = ({ collections }) => {
  if (collections) {
    return collections.map((img: string) => (
      <img key={img} src={img} alt=""></img>
    ));
  }
  return <div></div>;
};

export default Home;
