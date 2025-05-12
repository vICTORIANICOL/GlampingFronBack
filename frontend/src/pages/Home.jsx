import Header from "../components/header/Header";
import Sec1 from "../components/sec1/Sec1";
import Feedback from "../components/feedback/Feedback";

export default function Home() {
  return (
    <>
      <Header page="home" />
      <Sec1 />
      <Feedback />
    </>
  );
}
