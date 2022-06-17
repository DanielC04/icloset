import React from 'react'
import './Outfitpage.scss'
import Page from './Page'
import Clothingcard from '../clothes/Clothingcard'

export default function Outfitpage() {
  return (
    <Page className='outfit-page'>
      <div className='outfit-container'>
        <Clothingcard className='outfit'/>
        <Clothingcard className='outfit'/>
        <Clothingcard className='outfit'/>
        <Clothingcard className='outfit'/>
      </div>
    </Page>
  )
}