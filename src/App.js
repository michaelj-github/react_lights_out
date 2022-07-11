import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game
* use a 2x2 board to make testing a winning scenario easier
* <Board nrows = '2' ncols = '2' chanceLightStartsOn = '.25' />. 
*/

function App() {
  return (
    <div className="App">
      <Board nrows = '5' ncols = '5' chanceLightStartsOn = '.25' />
    </div>
  );
}

export default App;
