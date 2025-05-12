import Header from "../components/header/Header";
import ImgComponent from "../components/imgcomponent/ImgComponent";
import Sec1 from "../components/sec1/Sec1";

export default function ophold() {
  return (
    <>
      <Header page="ophold" />

      <Sec1
        title="Vi har ophold til enhver smag"
        text="Vores glampingophold er skabt til at tilbyde en kombination af eventyr og afslapning. Det er den ideelle flugt fra byens støj og stress, og det perfekte sted at genoplade batterierne i en naturskøn indstilling.
Book dit ophold i dag og giv dig selv lov til at fordybe dig i naturen og nyde luksus i det fri. Vi ser frem tid at byde dig velkommen til en oplevelse fyldt med komfort, eventyr og skønhed."
        showImage={false}
        showButton={false}
      />

      <ImgComponent page="ophold" />
    </>
  );
}
