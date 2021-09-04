import style from './UserPalette.module.css';
import PropTypes from 'prop-types';

function UserPalette({ colors, onColorChange, onTemporaryColorChange }) {
  function handleClickChooseColor(color, event) {
    event.preventDefault();
    onColorChange(color);
    onTemporaryColorChange(color);
  }

  return (
    <div className={style.Container}>
      <div className={style.Triangle}></div>
      <h2 className={style.Text}>Your color collection</h2>
      <ul className={style.List}>
        {colors.map(color => (
          <li
            key={color}
            className={style.Item}
            onClick={handleClickChooseColor.bind(this, color)}
          >
            <h2 className={style.ItemText}>{color}</h2>
            <div
              style={{ backgroundColor: color }}
              className={style.Square}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserPalette;

UserPalette.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onColorChange: PropTypes.func.isRequired,
  onTemporaryColorChange: PropTypes.func.isRequired,
};
