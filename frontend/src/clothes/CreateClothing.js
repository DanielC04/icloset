import React, { useState } from 'react'
import './CreateClothing.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const sendRequest = (refresh, category, name, color, length, rating, url, isTrouserLong) => {
	axios.post('http://localhost:5000/clothes', {
		'category': category,
		'name': name,
		'color': color,
		'length': length,
		'rating': rating,
		'imgUrl': url,
		'isTrouserLong': isTrouserLong
	}).then(refresh)
}

const defaultRating = 5;

export default function CreateClothing(props) {
	const [name, setName] = useState('')
	const [url, setUrl] = useState('')
	const [color, setColor] = useState('')
	const [length, setLength] = useState(0)
	const [isTrouserLong, setIsTrouserLong] = useState(false)

	const submit = (name, url, color, length, isTrouserLong) => {
		if (name === '' && url === '') {
			alert('Es muss mindestens der Name oder ein Bild des Kleidungsstücks angegeben werden!')
			return;
		}
		sendRequest(props.refresh, props.category, name, color, length, defaultRating, url, isTrouserLong)
		setName('')
		setUrl('')
		setColor('')
		setLength(0)
	}

	return (
		<div className={`clothing-card ${props.className} create-clothing`}>
			<h3>Kleidungsstück hinzufügen</h3>
			<input type={'text'} placeholder='Name des Kleidungsstücks' value={name} onChange={e => setName(e.target.value)} />
			<input type={'text'} placeholder='Bildurl' value={url} onChange={e => setUrl(e.target.value)} />
			<div className='color-input'>
				<label htmlFor='clothing-color'>Farbe</label>
				<input type={'color'} id='clothing-color' value={color} onChange={e => setColor(e.target.value)} />
			</div>
			{
				props.category === 'trousers' &&
				<>
					<div className='length-input'>
						<label htmlFor='length-input'>Länge</label>
						<div>
							<label htmlFor='short-trousers'>Kurz</label>
							<input className='checkbox' type={'checkbox'} id='long-trousers' checked={!isTrouserLong} onChange={() => setIsTrouserLong(false)} />
						</div>
						<div>
							<label htmlFor='long-trousers'>Lang</label>
							<input className='checkbox' type={'checkbox'} id='long-trousers' checked={isTrouserLong} onChange={() => setIsTrouserLong(true)} />
						</div>
					</div>
				</>
			}

			<FontAwesomeIcon icon={faPlusCircle} size='3x' onClick={() => submit(name, url, color, length, isTrouserLong)} />
		</div>
	)
}