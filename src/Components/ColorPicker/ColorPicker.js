import { useState, useEffect, useRef } from 'react';
import style from './ColorPicker.module.css';
import { ChevronDown } from 'react-feather';
import Palette from '../Palette';
import UserPalette from '../UserPalette';
import PropTypes from 'prop-types';

function ColorPicker({ value, onChange, colors }) {
  const [showPalette, setShowPalette] = useState(false);
  const [showUserPalette, setShowUserPalette] = useState(false);
  const [squareColor, setSquareColor] = useState(value);

  const elRef = useRef();

  useEffect(() => {
    function handleMouseUp(event) {
      const isElementChild = elRef.current.contains(event.target);

      if (!isElementChild) {
        setSquareColor(value);
        setShowPalette(false);
        setShowUserPalette(false);
      }
    }
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [value, onChange]);

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

  const dismissDropdowns = () => {
    setShowPalette(false);
    setShowUserPalette(false);
  };

  const handleColorChange = color => {
    onChange(color);
    dismissDropdowns();
  };

  const handleTemporaryColorChange = tempColor => {
    setSquareColor(tempColor);
  };

  return (
    <div className={style.Container} ref={elRef}>
      <div className={style.Menu}>
        <div className={style.Number} onClick={dismissDropdowns}>
          {squareColor}
        </div>
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
          onColorChange={handleColorChange}
          onTemporaryColorChange={handleTemporaryColorChange}
          onCancelColorSelection={dismissDropdowns}
        />
      )}
      {showUserPalette && (
        <UserPalette
          colors={colors}
          onColorChange={handleColorChange}
          onTemporaryColorChange={handleTemporaryColorChange}
        />
      )}
    </div>
  );
}
export default ColorPicker;

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
