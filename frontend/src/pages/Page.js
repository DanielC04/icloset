import React from 'react'
import './Page.scss'

export default function Page(props) {
	return (
		<div className={`page ${props.className}`}>
			{props.useContainer ?
				<div className='container'>
					{props.children}
				</div>
				:
				<>
					{props.children}
				</>
			}
		</div>
	)
}
