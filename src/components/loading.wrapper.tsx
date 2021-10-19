import Loading from "./loading";

const LoadingWrapper = (WrappedComponent: any) => {
  //@ts-ignore
  const Spinner = ({ isLoading, collections }) => {
    return isLoading || !collections ? (
      <Loading />
    ) : (
      <WrappedComponent collections={collections} />
    );
  };
  return Spinner;
};

export default LoadingWrapper;
