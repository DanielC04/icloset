import React, { useState, useEffect } from 'react'
import './Outfitpage.scss'
import Page from './Page'
import Clothingcard from '../clothes/Clothingcard'
import axios from 'axios'

export default function Outfitpage() {
  const [outfitIds, setOutfitIds] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:5000/outfit')
      .then(response => setOutfitIds(response.data))
  }, [])

  return (
    <Page className='outfit-page'>
      <div className='outfit-container'>
        {
          outfitIds.map(id => <Clothingcard className='outfit' id={id} key={id} minimal={true} />)
        }
      </div>
    </Page>
  )
}