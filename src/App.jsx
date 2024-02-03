import SearchBanner from "./components/SearchBanner";
import Top from "./components/Top";
import TopButton from "./components/TopButton";

export default function App() {
  
  return (
    <>
      <Top logoImg="logo.png" />
      <SearchBanner bgColor="bg-black-color" bgImg="aquaroad.png" />
      <TopButton />
    </>
  );
}
