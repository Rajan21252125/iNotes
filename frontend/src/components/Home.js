import Notes from "./Notes";

export default function Home(props) {
  const {showAlert} = props
  return (
    <div className="container">
      <Notes showAlert={showAlert}/>
    </div>
  );
}
