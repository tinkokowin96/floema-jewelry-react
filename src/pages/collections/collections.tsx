//@ts-ignore
const Collections = ({ collections }) => {
  if (collections) {
    return Object.keys(collections).map((key, index) => (
      <div>
        <div> {key} </div>
        <div>
          {Object.keys(collections[key]).map((product) => {
            const img = collections[key][product]["image"]["url"];
            return <img src={img} alt="" key={product}></img>;
          })}
        </div>
      </div>
    ));
  }
  return <></>;
};

export default Collections;
