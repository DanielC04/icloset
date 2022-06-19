import React, { useState, useEffect } from 'react'
import './Clothingcard.scss'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const minScore = 1
const maxScore = 10

export default function Clothingcard(props) {
	const [data, setData] = useState({
		rating: (minScore + maxScore) / 2,
		name: '',
		imgUrl: ''
	})
	const updateRating = newRating => {
		const copy = { ...data }
		copy.rating = newRating
		setData(copy)
		axios.put(`http://localhost:5000/clothes/${props.id}`, {
			...copy
		})
	}

	const style = {
		backgroundImage: `url(${data.imgUrl}`
	}
	if (!data.imgUrl) style.backgroundImage = 'url(no-image-icon-15.png)'

	useEffect(() => {
		axios.get(`http://localhost:5000/clothes/${props.id}`)
			.then(response => {
				const data = response.data[0]
				setData(data)
			})
	}, [props])

	const deleteCard = () => {
		axios.delete(`http://localhost:5000/clothes/${props.id}`)
			.then(() => props.refresh())
	}

	const onClick = () => {
		props.onClick(data)
	}

	const changeCompatibility = newCompatibility => {
		axios.put('http://localhost:5000/compatibility', {
			'id_1': props.selectedCard.id,
			'id_2': props.id,
			'are_compatible': newCompatibility
		}).then(() => props.refresh())
	}

	let compatibilityScore = 1
	if (props.selectedCard != null) {
		console.log("the selected card-id: ", props.selectedCard.id)
		console.log("id: ", props.id)
		console.log(data)
		if (data.compatibleWith.includes(props.selectedCard.id)) compatibilityScore = 2;
		if (data.notCompatibleWith.includes(props.selectedCard.id)) compatibilityScore = 0;
	}

	return (
		<div className={`clothing-card ${props.className}`} style={style} >
			<div className='click-box' onClick={onClick}></div>
			<span className='name-tag'>{data.name}</span>
			{
				!props.minimal &&
				<>
					<div className='rating noselect' onClick={e => e.preventDefault()}>
						<span>Rating:</span>
						<div className='button' onClick={() => updateRating(Math.min(maxScore, data.rating + 1))}>+</div>
						<div>{data.rating}</div>
						<div className='button' onClick={() => updateRating(Math.max(minScore, data.rating - 1))}>-</div>
					</div>
					<div className='delete-button' onClick={deleteCard}>
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</>
			}
			{
				props.selectedCard && props.selectedCard['category'] !== data.category &&
				<div className='combination-rating'>
					<div className={compatibilityScore === 2 ? 'selected' : ''} onClick={() => changeCompatibility(true)}>+</div>
					<div className={compatibilityScore === 1 ? 'selected' : ''} onClick={() => changeCompatibility(null)}>O</div>
					<div className={compatibilityScore === 0 ? 'selected' : ''} onClick={() => changeCompatibility(false)} >-</div>
				</div>
			}
		</div>
	)
}