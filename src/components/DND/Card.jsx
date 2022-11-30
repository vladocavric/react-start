import React from 'react'
import {  Draggable } from 'react-beautiful-dnd';


import styles from './Card.module.scss';
const Card = ({ fName, lName, imgUrl, index }) => {
	return (
		<Draggable key={fName} draggableId={fName} index={index}>
			{(provided) => (
				<div
					className={styles.Card}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<div>
						<img src={imgUrl} alt={fName} />
					</div>
					<div>
						{fName} {lName}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Card