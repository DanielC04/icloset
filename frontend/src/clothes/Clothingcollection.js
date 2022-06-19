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

	const refresh = () => {
		console.log("refreshing")
		axios.get(`http://localhost:5000/category/${props.category}`)
			.then(response => setClothingItemIds(response.data['Clothes']))
	}

	// Daten mit einer Axios-GET Anfrage von Server holen
	useEffect(refresh, [props])

	return (
		<div className='clothing-collection' >
			<div className='heading' onClick={() => setIsExpanded(!isExpanded)} style={headStyle}>
				<span className={`expand-button ${isExpanded ? 'flipped': ''}`}>
					<FontAwesomeIcon icon={faChevronUp} size='xs' />
				</span>
				<span className='name'>
					{props.name}
				</span>
			</div>
			<div className='clothing-container' style={containerStyle}>
				{
					clothingItemIds.map(id => <Clothingcard id={id} key={id} />)
				}
				<CreateClothing category={props.category} refresh={refresh} />
			</div>
		</div>
	)
}