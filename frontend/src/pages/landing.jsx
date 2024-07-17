import Banner from "../components/banner";
import DisProduct from "../components/discount";
import Navbar from "../components/navbar";

export default function Landing() {
  return (
    <div className=" p-3 ">
      <Navbar />
      <Banner />
      <DisProduct />
    </div>
  );
}
