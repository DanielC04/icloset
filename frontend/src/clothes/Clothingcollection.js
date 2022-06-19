import React, { useState, useEffect } from 'react'
import './Clothingcollection.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import CreateClothing from '../clothes/CreateClothing'
import Clothingcard from './Clothingcard'
import axios from 'axios'

export default function Clothingcollection(props) {
	const [isExpanded, setIsExpanded] = useState(true)
	const [clothingItemIds, setClothingItemIds] = useState([])

	let containerStyle = {
		maxHeight: '1000vh',
		opacity: 1
	}
	let headStyle = {}
	if (!isExpanded) {
		containerStyle = {
			maxHeight: 0,
			opacity: 0
		}
		headStyle = {
			borderRadius: '10px'
		}
	}

	// lädt die Daten zur aktuellen Clothing-card aus der Datenbank
	const refresh = () => {
		console.log("refreshing")
		axios.get(`http://localhost:5000/category/${props.category}`)
			.then(response => setClothingItemIds(response.data['Clothes']))
	}

	// wenn props.openFlag wahr ist, sollte die Box geöffnet werden
	useEffect(() => {
		// if (props.selectedCard === null) return
		if (props.selectedCard?.category === props.category) setIsExpanded(false)
		else setIsExpanded(true)
	}, [props.selectedCard, props.category])

	// Daten mit einer Axios-GET Anfrage von Server holen
	useEffect(refresh, [props])

	// Clothing-Card wird angeklickt
	const onClothingCardClicked = cardData => {
		props.setSelectedCard(cardData)
	}

	const isCardOfOtherCategorySelected = props.selectedCard !== null && props.selectedCard['category'] !== props.category
	const isCardOfCurrentCategorySelected = props.selectedCard !== null && props.selectedCard['category'] === props.category

	return (
		<div className='clothing-collection' >
			<div className='heading' onClick={() => setIsExpanded(!isExpanded)} style={headStyle}>
				<span className={`expand-button ${isExpanded ? 'flipped' : ''}`}>
					<FontAwesomeIcon icon={faChevronUp} size='xs' />
				</span>
				<span className='name'>
					{props.name}
				</span>
			</div>
			<div className='clothing-container' style={containerStyle}>
				{
					isCardOfOtherCategorySelected &&
					<Clothingcard className='highlighted' id={props.selectedCard['id']} key={props.selectedCard['id']} refresh={refresh} minimal={true}/>
				}
				{
					clothingItemIds.map(id => {
						let classString = ''
						if (isCardOfCurrentCategorySelected && props.selectedCard['id'] !== id)
							classString += 'greyed-out '
						if (isCardOfCurrentCategorySelected && props.selectedCard['id'] === id)
							classString += 'highlighted'
						return <Clothingcard className={classString} id={id} key={id} refresh={refresh} selectedCard={props.selectedCard} onClick={onClothingCardClicked} />
					})
				}
				<CreateClothing category={props.category} refresh={refresh} />
			</div>
		</div>
	)
}