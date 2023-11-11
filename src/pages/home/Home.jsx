import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useContext } from "react";

function Home() {
  const context = useContext(myContext);
  const {name, rollNumber} = context;
  console.log(context);
  return <Layout>
    <h1>Name: {name}</h1>
    <h1>Roll: {rollNumber}</h1>
  </Layout>;
}

export default Home;
