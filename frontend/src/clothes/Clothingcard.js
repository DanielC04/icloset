import React, { useState } from 'react'
import './Clothingcard.scss'


const minScore = 0
const maxScore = 10

export default function Clothingcard(props) {

	const [score, setScore] = useState((minScore + maxScore) / 2);

	let filename = props.filename
	if (!filename)
		filename = 'tshirt.png'

	const style = {
		backgroundImage: `url(${filename})`
	}

	console.log(style)

	return (
		<div className={`clothing-card ${props.className}`} style={style}>
			<span className='name-tag'>{props.name}</span>
			<div className='rating'>
				<div onClick={() => setScore(Math.min(maxScore, score + 1))}>+</div>
				<div>{score}</div>
				<div onClick={() => setScore(Math.max(minScore, score - 1))}>-</div>
			</div>
		</div>
	)
}
