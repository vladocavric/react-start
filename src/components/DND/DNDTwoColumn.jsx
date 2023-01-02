import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useHttp from '../../hooks/http';
// import theSimpsonsCharacters from './simpsons';

import Card from './Card';
import styles from './DNDTwoColumn.module.scss';


const DNDTwoColumn = () => {
	const {sendRequest} = useHttp()
	const [simpsons, setSimpsons] = useState([]);
	const [dropSimpsons, setDropSimpsons] = useState([]);

	const url = `${process.env.REACT_APP_FIREBASE_DOMAIN}simpsons.json`;
	const handleOnDragEnd = (result) => {	
		if (!result.destination) return;
		const items = Array.from(simpsons);
		const newItems = Array.from(dropSimpsons)
		if (result.source.droppableId === 'simpsons') {
			if (result.source.droppableId === result.destination.droppableId) {
				const [movedItem] = items.splice(result.source.index, 1);
				items.splice(result.destination.index, 0, movedItem);
			} else {
				const [movedItem] = items.splice(result.source.index, 1);
				newItems.splice(result.destination.index, 0, movedItem)
			}

			
		}

		if(result.source.droppableId === 'dropTarget') {
			if (result.source.droppableId === result.destination.droppableId) {
				const [movedItemDrop] = newItems.splice(result.source.index, 1);
				newItems.splice(result.destination.index, 0, movedItemDrop);
			} else {
				const [movedItem] = newItems.splice(result.source.index, 1);
				items.splice(result.destination.index, 0, movedItem)
			}
		}

		items.forEach((element, i) => element.index = i);
		newItems.forEach((element, i) => element.index = i);

		sendRequest({url, method: 'PUT', body: {items, newItems}})
		
		setSimpsons(items);
		setDropSimpsons(newItems)
	};

	useEffect(() => {
		const convertData = (data) => {
			const firstCol = data.items ? data.items : []
			const secondCol = data.newItems ? data.newItems : []
			setSimpsons([...firstCol])
			setDropSimpsons([...secondCol])
		}
		sendRequest({url, convertData})
	}, [sendRequest, url]);

	return (
		<div className={`container ${styles.DNDTwoColumn}`}>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='simpsons'>
					{(provided) => (
						<div
						className={`${simpsons.length ? styles.Draggable : styles.DropTargetDiv}`}
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
				<Droppable droppableId='dropTarget'>
					{(provided) => (
						<div
							className={`${dropSimpsons.length ? styles.Draggable : styles.DropTargetDiv}`}
							{...provided.droppableProps}
							ref={provided.innerRef}>
								{dropSimpsons.map((car, index) => (
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

export default DNDTwoColumn;