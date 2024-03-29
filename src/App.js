import React, { useState } from "react";

import { Group, Layer, Stage } from "react-konva";
import Rectangle from "./Rectangle";
import Konva from "konva";
function generateShapes() {
  return [...Array(10)].map((star, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    color: Konva.Util.getRandomColor(),
  }));
}
const INITIAL_STATE = generateShapes();
function App() {
  const [sheklha, setSheklha] = useState(INITIAL_STATE);
  const [selectShape, setSelectShape] = useState(null);
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectShape(null);
    }
  };

  return (
    <>
      {/*<button onClick={handelCreateBlob}> CreateBlob</button>*/}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{
          backgroundColor: "pink",
        }}
      >
        <Layer>
          <Group>
            {sheklha.map((item, i) => {
              return (
                <Rectangle
                  key={i}
                  id={item.id}
                  shapeProps={item}
                  isSelected={item.id === selectShape}
                  onSelect={() => {
                    setSelectShape(item.id);
                  }}
                  onChange={(newAttrs) => {
                    const copyOfSheklha = sheklha.slice();
                    copyOfSheklha[i] = newAttrs;
                    console.log(newAttrs);
                    setSheklha(copyOfSheklha);
                  }}
                />
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </>
  );
}

export default App;
