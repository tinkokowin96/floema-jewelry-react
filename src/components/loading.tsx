const Loading = (WrappedComponent: any) => {
  //@ts-ignore
  const Spinner = ({ isLoading, ...props }) => {
    return isLoading ? <div>Loading....</div> : <WrappedComponent {...props} />;
  };
  return Spinner;
};

export default Loading;
