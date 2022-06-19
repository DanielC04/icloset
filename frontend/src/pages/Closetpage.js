import React from 'react'
import './Closetpage.scss'
import Page from './Page'
import Clothingcollection from '../clothes/Clothingcollection'

const clothing_categories = { 'tshirt': 'T-shirts', 'trousers': 'Hosen', 'jacket': 'Jacken', 'pullover': 'Pullover' }

export default function Closetpage() {

	return (
		<Page useContainer={true} className='closet-page'>
			{
				Object.keys(clothing_categories)
					.map(category =>
						<Clothingcollection name={clothing_categories[category]} category={category} key={category} />
					)
			}
		</Page>
	)
}