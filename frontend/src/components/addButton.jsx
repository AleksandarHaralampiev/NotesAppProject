import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Image from '../assets/button.png'

const addButton = () => {
  return (
    <Link to='/note/new'>
      <img src={Image} alt='add' className='add-button' />
    </Link>
  )
}

addButton.propTypes = {}

export default addButton