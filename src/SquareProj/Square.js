
const Square = ({colorValue, hexValue, isDarkColor }) => {
  return (
    <section 
      className='square' 
      style={{
        background:colorValue,
        color: isDarkColor ? "#000" : "#FFF"
      }}>
      <p>{colorValue ? colorValue : "Empty Value"}</p>
      <p>{hexValue ? hexValue : null }</p>
      {isDarkColor}
    </section>
  )
}

Square.defaultProps = {
  colorValue: "Empty Color Value"
}
export default Square;