import Footer from "./components/Footer";
import MailButton from "./components/MailButton";
import SearchBanner from "./components/SearchBanner";
import Top from "./components/Top";
import TopButton from "./components/TopButton";

export default function App() {
  
  return (
    <>
      <Top logoImg="/logo.png" />
      <SearchBanner bgColor="bg-black-color" bgImg="aquaroad.png" />
      <Footer logoImg="/logo.png" logoCreator="하풍다풍" />
      <TopButton />
      <MailButton />
    </>
  );
}
