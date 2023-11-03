import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-100 z-50">
      <PropagateLoader color="#000000" size={15} speedMultiplier={1} />
    </div>
  );
};

export default Loader;
