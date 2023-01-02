import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import styles from './DNDKanban.module.scss';

import useHttp from '../../hooks/http';

import DNDKanbanCard from './DNDKanbanCard';

import { statusOptions } from '../Tasks/options';

const kanbanCardsReducer = (currentCards, action) => {
	switch (action.type) {
		case 'SET':
			return [...action.data];
		case 'CHANGE_STATUS':
			return {};
		case 'CHANGE_IN_STATUS':
			return {};
		default:
			throw new Error('Should not get here');
	}
};
let initObj = [];
// for (const key of statusOptions) {
//   initObj[key.value] = []
// }

// console.log(initObj)

const DNDKanban = () => {
	const {
		// error, isLoading,
		sendRequest,
	} = useHttp();
	const [cards, dispatchCards] = useReducer(kanbanCardsReducer, initObj);

	useEffect(() => {
		const url = `${process.env.REACT_APP_FIREBASE_DOMAIN}tasks.json`;
		const convertData = (data) => {
			const loadedTasks = [];
			for (const taskKey in data) {
				loadedTasks.push({ id: taskKey, ...data[taskKey] });
			}
			dispatchCards({ type: 'SET', data: loadedTasks });
		};
		sendRequest({ url, convertData });
	}, [sendRequest]);

	const handleOnDragEnd = () => {
		console.log('drag ended');
	};
	return (
		<div className={styles.DNDKanban}>
			<div className={styles.DNDKanban__titleSection}>
				<h1>Kanban Table</h1>
				<Link to='/tasks/new' className='btn btn-primary'>
					New Tasks<i></i>
				</Link>
			</div>
			<div className={styles.DNDKanban__Board}>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					{statusOptions.map((status) => (
						<div
							className={styles.DNDKanban__BoardSection}
							key={status.value}>
							<h3>{status.label}</h3>
							<Droppable droppableId={status.value}>
								{(provided) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}>
										{cards.map((card, index) => {
											if (card.status === status.value) {
												return (
													<DNDKanbanCard
														key={card.id}
														{...card}
														index={index}
													/>
												);
											} else {
												return null;
											}
										})}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					))}
				</DragDropContext>
			</div>
		</div>
	);
};

export default DNDKanban;
