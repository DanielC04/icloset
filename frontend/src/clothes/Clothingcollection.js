import React, { useState } from 'react'
import './Clothingcollection.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function Clothingcollection(props) {
	const [isExpanded, setIsExpanded] = useState(true)

	let containerStyle = {
		height: 'auto',
		opacity: 1
	}
	let headStyle = {}
	if (!isExpanded) {
		containerStyle = {
			height: 0,
			opacity: 0
		}
		headStyle = {
			borderRadius: '10px'
		}
	}


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
				{props.children}
			</div>
		</div>
	)
}