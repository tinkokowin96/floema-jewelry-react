import Loading from "./loading";

const LoadingWrapper = (WrappedComponent: any) => {
  //@ts-ignore
  const Spinner = ({ isLoading, ...props }) => {
    return isLoading ? <Loading /> : <WrappedComponent {...props} />;
  };
  return Spinner;
};

export default LoadingWrapper;
