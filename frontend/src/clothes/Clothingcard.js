import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './Clothingcard.scss'


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

	return (
		<div className={`clothing-card ${props.className}`} style={style}>
			<span className='name-tag'>{data.name}</span>
			<div className='rating noselect'>
				<span>Rating:</span>
				<div className='button' onClick={() => updateRating(Math.min(maxScore, data.rating + 1))}>+</div>
				<div>{data.rating}</div>
				<div className='button' onClick={() => updateRating(Math.max(minScore, data.rating - 1))}>-</div>
			</div>
		</div>
	)
}