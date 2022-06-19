import React from 'react'
import './Clothingcard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function CreateClothing(props) {
	return (
		<div className={`clothing-card ${props.className} create-clothing`}>
			<h3>Kleidungsstück hinzufügen</h3>
			<input type={'text'} placeholder='Name des Kleidungsstücks'/>
			<FontAwesomeIcon icon={faPlusCircle} size='5x' />
		</div>
	)
}
