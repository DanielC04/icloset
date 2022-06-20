import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'

// weist URL-Path die jewelige Seitenüberschrift zu
const headingsOfPaths = {
  '/': 'Intelligent Closet',
  '/outfit': 'Dein Outfit',
  '/closet': 'Dein Kleiderschrank'
}

export default function Header() {
  const location = useLocation()

  return (
    <header>
      {
        location.pathname !== '/' &&
        <Link to={'/'}>
          <FontAwesomeIcon icon={faHome} size='2x' />
        </Link>
      }
      <h1>{headingsOfPaths[location.pathname]}</h1>
    </header >
  )
}
