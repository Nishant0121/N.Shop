import { GiAbstract005 } from "react-icons/gi";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex justify-center items-center">
        <div className=" mx-2">
          <GiAbstract005 className="text-3xl" />
        </div>
        <div className="text-3xl font-bold mx-2">N.Shop</div>
      </div>
      <div className=" px-3 py-2 rounded-full bg-primary">Start Shoping</div>
    </nav>
  );
}
