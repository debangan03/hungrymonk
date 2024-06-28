import What_your_mood from "./Components/What_your_mood";
import SomethingNew from "./Components/SomethingNew";
import BestSeller from "./Components/BestSeller";
import DisplayCategorywisemenu from "./Components/DisplayCategorywisemenu";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <What_your_mood />
        <SomethingNew />
        <BestSeller />
        <DisplayCategorywisemenu />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
