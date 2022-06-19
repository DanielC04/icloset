import React, { useState } from 'react'
import './Closetpage.scss'
import Page from './Page'
import Clothingcollection from '../clothes/Clothingcollection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const clothing_categories = { 'tshirt': 'T-shirts', 'trousers': 'Hosen', 'jacket': 'Jacken', 'pullover': 'Pullover' }

export default function Closetpage() {
	const [selectedCard, setSelectedCard] = useState(null)

	return (
		<Page useContainer={true} className='closet-page'>
			{
				Object.keys(clothing_categories)
					.map(category =>
						<Clothingcollection name={clothing_categories[category]} category={category} key={category} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
					)
			}
			{
				selectedCard !== null &&
				<div className='finish-selection pointer' onClick={() => setSelectedCard(null)}>
						<FontAwesomeIcon icon={faCheckCircle} size={'8x'} />
				</div>
			}
		</Page>
	)
}