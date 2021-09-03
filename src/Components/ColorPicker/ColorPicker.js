import { useState, useEffect } from 'react';
import style from './ColorPicker.module.css';
import { ChevronDown } from 'react-feather';
import Palette from '../Palette';
import UserPalette from '../UserPalette';

function ColorPicker({ value, onChange, colors, onChangePalette }) {
  const [showPalette, setShowPalette] = useState(false);
  const [showUserPalette, setShowUserPalette] = useState(false);

  // const elementRef = useRef();
  useEffect(() => {}, []);

  function togglePalette() {
    if (showUserPalette) {
      setShowUserPalette(false);
    }
    setShowPalette(!showPalette);
  }

  function toggleUserPalette() {
    if (showPalette) {
      setShowPalette(false);
    }
    setShowUserPalette(!showUserPalette);
  }

  const handleSquareClick = event => {
    event.preventDefault();
    event.stopPropagation();
    togglePalette();
  };

  const handleArrowClick = event => {
    event.preventDefault();
    toggleUserPalette();
  };

  const handleColorChange = color => {
    onChange(color);
  };
  const addToPalette = color => {
    onChangePalette(color);
  };
  return (
    <div className={style.Container}>
      <div className={style.Menu}>
        <div className={style.Number}>{value}</div>
        <div className={style.Square} onClick={handleSquareClick}>
          <div style={{ backgroundColor: value }} className={style.Color}></div>
        </div>
        <div className={style.Arrow} onClick={handleArrowClick}>
          <ChevronDown className={style.Icon} />
        </div>
      </div>

      {showPalette && (
        <Palette
          togglePalette={togglePalette}
          onColorChange={handleColorChange}
          addColorToUsersPalette={addToPalette}
        />
      )}
      {showUserPalette && (
        <UserPalette
          colors={colors}
          onColorChange={handleColorChange}
          toggleUserPalette={toggleUserPalette}
        />
      )}
    </div>
  );
}
export default ColorPicker;
