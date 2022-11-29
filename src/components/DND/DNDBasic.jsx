import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import theSimpsonsCharacters from './simpsons';

import styles from './DNDBasic.module.scss';

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
const DNDBasic = () => {
	const [simpsons, setSimpsons] = useState(theSimpsonsCharacters);
	const handleOnDragEnd = (result) => {
		console.log(result);
		if (!result.destination) return;
		const items = Array.from(simpsons);
		const [movedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, movedItem);

		setSimpsons(items);
	};
	return (
		<div className='container'>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='simpsons'>
					{(provided) => (
						<div
							className={styles.Draggable}
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{simpsons.map((car, index) => (
								<Card
									key={car.fName}
									fName={car.fName}
									lName={car.lName}
									imgUrl={car.img}
									index={index}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				
			</DragDropContext>
		</div>
	);
};

export default DNDBasic;
