import { ReactSpinner } from "./ReactSpinner";

const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
};

const PageLoader = () => (
  <div style={styles.loaderContainer}>
    <ReactSpinner color="#3498db" size={60} />
  </div>
);

export default PageLoader;
