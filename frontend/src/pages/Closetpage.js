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
				<Clothingcard name="Nike" filename="tshirt.png" />
				<Clothingcard name="Louis" filename="tshirt2.jpeg" />
				<Clothingcard name="Gucci" filename="tshirt3.jpg" />
				<Clothingcard name="Dior" filename="tshirt4.webp" />
				<CreateClothing />
			</Clothingcollection>
			<Clothingcollection name="Hosen">
				<Clothingcard name="Fendi"/>
				<Clothingcard name="Prada"/>
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