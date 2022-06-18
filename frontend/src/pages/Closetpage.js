import React from 'react'
import './Closetpage.scss'
import Page from './Page'
import Clothingcard from '../clothes/Clothingcard'
import Clothingcollection from '../clothes/Clothingcollection'
import CreateClothing from '../clothes/CreateClothing'

export default function Closetpage() {
	return (
		<Page useContainer={true} className='closet-page'>
			<Clothingcollection name="T-shirts">
				<Clothingcard />
				<Clothingcard />
				<Clothingcard />
				<Clothingcard />
				<CreateClothing />
			</Clothingcollection>
			<Clothingcollection name="Hosen">
				<Clothingcard />
				<Clothingcard />
				<Clothingcard />
				<Clothingcard />
				<Clothingcard />
				<CreateClothing />
			</Clothingcollection>
			<Clothingcollection name="Socken">
				<Clothingcard />
				<Clothingcard />
				<Clothingcard />
				<Clothingcard />
				<CreateClothing />
			</Clothingcollection>

		</Page>
	)
}