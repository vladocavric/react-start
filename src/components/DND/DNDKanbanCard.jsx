import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/http';

import styles from './DNDKanbanCard.module.scss';

const DNDKanbanCard = ({
	id,
	assignee,
	environment,
	targetVersion,
	title,
	index,
	onTaskRemove,
}) => {
	const { sendRequest } = useHttp();
	const navigate = useNavigate();
	const handleEdit = () => {
		navigate(`/tasks/${id}/edit`);
	};

	const handleDelete = () => {
		const url = `${process.env.REACT_APP_FIREBASE_DOMAIN}tasks/${id}.json`;

		sendRequest({ url, method: 'DELETE' });
		onTaskRemove(id);
	};
	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided, snapshot) => (
				<div
					className={`${styles.DNDKanbanCard} ${
						snapshot.isDragging ? styles.Active : ''
					}`}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<h4>{title}</h4>
					<div>Environment: {environment}</div>
					<div>Assignee: {assignee}</div>
					<div>Target: {targetVersion}</div>
					<div className={styles.Actions}>
						<button
							onClick={handleEdit}
							className={styles.EditBtn}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'>
								<path d='M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z' />
							</svg>
						</button>
						<button
							onClick={handleDelete}
							className={styles.DeleteBtn}>
							<span></span>
							<span></span>
						</button>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default DNDKanbanCard;
