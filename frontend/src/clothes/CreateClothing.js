import React, { useState } from 'react'
import './CreateClothing.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const sendRequest = (refresh, category, name, color, length, rating, url) => {
	axios.post('http://localhost:5000/clothes', {
		'category': category,
		'name': name,
		'color': color,
		'length': length,
		'rating': rating,
		'imgUrl': url
	}).then(refresh)
}

const defaultRating = 5;

export default function CreateClothing(props) {
	const [name, setName] = useState('')
	const [url, setUrl] = useState('')
	const [color, setColor] = useState('')
	const [length, setLength] = useState(0)

	const submit = (name, url, color, length) => {
		sendRequest(props.refresh, props.category, name, color, length, defaultRating, url)
	}

	return (
		<div className={`clothing-card ${props.className} create-clothing`}>
			<h3>Kleidungsstück hinzufügen</h3>
			<input type={'text'} placeholder='Name des Kleidungsstücks' value={name} onChange={e => setName(e.target.value)} />
			<input type={'text'} placeholder='Bildurl' value={url} onChange={e => setUrl(e.target.value)} />
			<div className='color-input'>
				<label htmlFor='clothing-color'>Farbe des Kleidungsstücks</label>
				<input type={'color'} id='clothing-color' value={color} onChange={e => setColor(e.target.value)} />
			</div>
			<div className='length-input'>
				<label htmlFor='length-input'>Länge</label>
				<input type={'number'} id='length-input' value={length} onChange={e => setLength(e.target.value)} />
			</div>
			<FontAwesomeIcon icon={faPlusCircle} size='3x' onClick={() => submit(name, url, color, length)} />
		</div>
	)
}