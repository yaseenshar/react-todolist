import colorNames from 'colornames'

const Input = ({colorValue, setColorValue, hexValue, setHexValue, isDarkColor, setIsDarkValue}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <label>Add Color Name:</label>
        <input 
          autoFocus
          type='text' 
          placeholder='Add color name'
          required 
          value={colorValue} 
          onChange={(e) => {
            setColorValue(e.target.value)
            setHexValue(colorNames(e.target.value))
          }}/>
          <button 
            type='button'
            onClick={(e) => setIsDarkValue(!isDarkColor)}>
            Toggle Text Color
          </button>
    </form>
  )
}

export default Input