
import What_your_mood from "./Components/What_your_mood";
import SomethingNew from "./Components/SomethingNew";
import BestSeller from "./Components/BestSeller";
import DisplayCategorywisemenu from "./Components/DisplayCategorywisemenu";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Orderviewer from "./Components/Orderviewer";

export default function Home() {
  return (
    <>
      <Header />
      {/* <What_your_mood /> */}
      <SomethingNew />
      <BestSeller />
      <DisplayCategorywisemenu />
      <Orderviewer />
      <Footer />
    </>
  );
}
