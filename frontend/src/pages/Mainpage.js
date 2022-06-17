import React from 'react'
import './Mainpage.scss'
import { Link } from 'react-router-dom'
import Page from './Page'

export default function Mainpage() {
  return (
    <Page className='mainpage'>
      <Link to={'/outfit'}>
        Outfit
      </Link>
      <Link to={'/closet'}>
        Kleiderschrank ansehen
      </Link>
    </Page>
  )
}
