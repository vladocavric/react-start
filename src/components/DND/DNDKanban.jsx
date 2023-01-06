import React, { useEffect, useState, useCallback } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

import { statusOptions } from '../Tasks/options';
import DNDKanbanCard from './DNDKanbanCard';
import Modal from '../UI/Modal/Modal';
import useHttp from '../../hooks/http';

import styles from './DNDKanban.module.scss';
import LoadingSpinier from '../../pages/UI/LoadingSpiner/LoadingSpinier';

let initObj = {};
for (const key of statusOptions) {
	initObj[key.value] = [];
}

const DNDKanban = () => {
	const { error, setError, sendRequest, isLoading } = useHttp();
	const [cards, setCards] = useState(initObj);
	const [selectCardForDel, setSelectCardForDel] = useState();

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		if (result.destination.droppableId === result.source.droppableId) {
			const [movedItem] = cards[result.source.droppableId].splice(
				result.source.index,
				1
			);
			cards[result.source.droppableId].splice(
				result.destination.index,
				0,
				movedItem
			);
		}

		if (result.destination.droppableId !== result.source.droppableId) {
			let daredCard = cards[result.source.droppableId].find(
				(card) => card.id === result.draggableId
			);
			const url = `${process.env.REACT_APP_FIREBASE_DOMAIN}tasks/${daredCard.id}.json`;
			const body = { status: result.destination.droppableId };
			const [movedItem] = cards[result.source.droppableId].splice(
				result.source.index,
				1
			);

			const convertData = () => {};
			sendRequest({
				url,
				method: 'PATCH',
				body,
				convertData,
				loader: false,
			});
			cards[result.destination.droppableId].splice(
				result.destination.index,
				0,
				movedItem
			);
		}
	};

	const convertData = useCallback((data) => {
		const loadedTasks = [];
		for (const taskKey in data) {
			loadedTasks.push({ id: taskKey, ...data[taskKey] });
		}

		let newObj = {};
		for (const key of statusOptions) {
			newObj[key.value] = [];
		}
		for (const board in newObj) {
			const boardTasks = loadedTasks.filter(
				(task) => task.status === board
			);
			newObj[board].push(...boardTasks);
		}

		setCards(() => newObj);
	}, []);

	const handleSelectForDel = (dataCard) => {
		setSelectCardForDel(dataCard);
	};

	const removeSelectionForDel = () => {
		setSelectCardForDel(null);
	};

	const handleRemoveTask = (id) => {
		let newCards = {};
		for (const status of statusOptions) {
			newCards[status.value] = cards[status.value].filter(
				(card) => card.id !== id
			);
		}
		setCards(newCards);
	};

	const handleDelete = () => {
		const url = `${process.env.REACT_APP_FIREBASE_DOMAIN}tasks/${selectCardForDel.id}.json`;
		const convertData = () => {
			handleRemoveTask(selectCardForDel.id);
		};

		sendRequest({ url, method: 'DELETE', convertData, loader: false });
		setSelectCardForDel(null);
	};

	const removeError = () => {
		setError(null);
	};

	useEffect(() => {
		const url = `${process.env.REACT_APP_FIREBASE_DOMAIN}tasks.json`;
		sendRequest({ url, convertData });

		return () => {
			setCards({});
		};
	}, [sendRequest, convertData]);

	if (isLoading) {
		return <LoadingSpinier />;
	}

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
								{(provided, snapshot) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										className={
											snapshot.isDraggingOver
												? styles.ActiveColumn
												: ''
										}>
										{cards[status.value].map(
											(card, index) => (
												<DNDKanbanCard
													key={card.id}
													{...card}
													index={index}
													selectCardForDel={
														handleSelectForDel
													}
												/>
											)
										)}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					))}
				</DragDropContext>
			</div>
			{selectCardForDel && (
				<Modal onClose={removeSelectionForDel}>
					<h2 className={styles.ModalTitle}>
						You are about to delete task {selectCardForDel.title}
					</h2>
					<div className={styles.Actions}>
						<button
							onClick={removeSelectionForDel}
							className='btn btn-primary'>
							Canceli <i></i>
							<i></i>
						</button>
						<button
							onClick={handleDelete}
							className='btn btn-primary'
							style={{
								'--primary-a': '256, 0, 0',
								'--primary': 'red',
							}}>
							Delete<i></i>
							<i></i>
						</button>
					</div>
				</Modal>
			)}
			{error && (
				<Modal onClose={removeError}>
					<h3 className='center red mb-30'>{error}</h3>
					<div className='center'>
						<button
							className='btn btn-primary'
							onClick={removeError}>
							OK
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default DNDKanban;
