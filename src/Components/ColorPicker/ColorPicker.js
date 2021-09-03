import { useState, useEffect, useRef } from 'react';
import style from './ColorPicker.module.css';
import { ChevronDown } from 'react-feather';
import Palette from '../Palette';
import UserPalette from '../UserPalette';

function ColorPicker({ value, onChange, colors, onChangePalette }) {
  const [showPalette, setShowPalette] = useState(false);
  const [showUserPalette, setShowUserPalette] = useState(false);
  const [temporaryColor, setTemporaryColor] = useState('#00ff00');
  const [squareColor, setSquareColor] = useState(value);

  const elRef = useRef();

  useEffect(() => {
    function handleMouseUp(event) {
      const isElementChild = elRef.current.contains(event.target);
      if (!isElementChild) {
        setShowPalette(false);
        setShowUserPalette(false);
      }
    }
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
    togglePalette();
  };

  const handleArrowClick = event => {
    event.preventDefault();
    toggleUserPalette();
  };

  const handleColorChange = color => {
    onChange(color);
    setSquareColor(color);
    localStorage.setItem('currentColor', color);
  };

  const addToPalette = color => {
    onChangePalette(color);
    setSquareColor(color);
    onChange(color);
    localStorage.setItem('currentColor', color);
  };

  const handleTemporaryColorChange = tempColor => {
    setSquareColor(tempColor);
  };

  return (
    <div className={style.Container} ref={elRef}>
      <div className={style.Menu}>
        <div className={style.Number}>{squareColor}</div>
        <div className={style.Square} onClick={handleSquareClick}>
          <div
            style={{ backgroundColor: squareColor }}
            className={style.Color}
          ></div>
        </div>
        <div className={style.Arrow} onClick={handleArrowClick}>
          <ChevronDown className={style.Icon} />
        </div>
      </div>

      {showPalette && (
        <Palette
          value={value}
          togglePalette={togglePalette}
          onColorChange={handleColorChange}
          addColorToUsersPalette={addToPalette}
          onTemporaryColorChange={handleTemporaryColorChange}
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
