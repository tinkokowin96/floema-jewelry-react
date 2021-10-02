import { Route } from "react-router";
import CollectionsContainer from "./collections.container";

//@ts-ignore
const CollectionsPage = ({ match: { path } }) => {
  return (
    <div>
      <Route exact path={path} component={CollectionsContainer} />
    </div>
  );
};

export default CollectionsPage;
