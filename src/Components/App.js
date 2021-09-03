import { useState, useEffect } from 'react';
import './App.css';
import ColorPicker from './ColorPicker';

function App() {
  const [value, setValue] = useState('#ff0000');
  const [colors, setColors] = useState([]);

  useEffect(() => {}, []);

  function handleOnChange(color) {
    setValue(color);
    console.log('value is updated');
    //here will be chosen color and addin it to the array of colors
    // if (chosenColor) {
    //   setSelectedColors([...selectedColors, chosenColor]);
    //   console.log('selectedColorsArray', selectedColors);
    // } else {
    //   return;
    // }
  }
  function handleChangePalette(newColor) {
    setColors([...colors, newColor]);
  }

  return (
    <div className="App">
      <ColorPicker
        onChange={handleOnChange}
        colors={colors}
        value={value}
        onChangePalette={handleChangePalette}
      />
    </div>
  );
}

export default App;
