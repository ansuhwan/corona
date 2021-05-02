import "./App.css";
import Header from "./components/Header";
import Contents from "./components/Contents";
import { useState } from "react";

function App() {
    const [nameValue, setNameValue] = useState(false);

    return (
        <div className="App">
            <Header setNameValue={setNameValue}/>
            <Contents nameValue={nameValue} />
        </div>
    );
}

export default App;
