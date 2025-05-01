import React from "react";
import Topbar from "../../Components/Home/Topbar";
import Logohead from "../../Components/Home/Logohead";
import Header from "../../Components/Home/header";
import Slider from "../../Components/Home/Slider";
import Category from "../../Components/Home/Category";
import BannerAdd from "../../Components/Home/BannerAdd";
import LatestBlog from "../../Components/Home/LatestBlog";
import SpecialOffer from "../../Components/Home/SpecialOffer";
import DiscoverCollection from "../../Components/Home/DiscoverCollection";
import ProductsSection from "../../Components/Home/ProductsSection";
import RecentView from "../../Components/Home/RecentView";
import FooterSec from "../../Components/Home/FooterSec";

// import NewProducts from './NewProducts'

function Home() {
  return (
    <>
      <Slider /> 
      <Category />
      <BannerAdd />
      <ProductsSection />
      <LatestBlog />
      <SpecialOffer />
      <DiscoverCollection />
      <RecentView />
    </>
  );
}
export default Home;
