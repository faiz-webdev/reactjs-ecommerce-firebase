import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../../../Complete-Ecommerce-Project-main/src/components/productCard/ProductCard";
import Track from "../../../../Complete-Ecommerce-Project-main/src/components/track/Track";

function Home() {
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
    </Layout>
  );
}

export default Home;
