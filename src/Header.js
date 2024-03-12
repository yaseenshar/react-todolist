import './Header.css';
import React from 'react'

const Header = ({ title }) => {
  return (
    <header>{title}</header>
  )
}

Header.defaultProps = {
  title: 'Groceries List'
}

export default Header;