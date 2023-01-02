import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styles from './DNDKanbanCard.module.scss';

const DNDKanbanCard = ({
	id,
	assignee,
	environment,
	targetVersion,
	title,
	index,
}) => {
	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided) => (
				<div
					className={styles.DNDKanbanCard}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<h4>{title}</h4>
					<div>Environment: {environment}</div>
					<div>Assignee: {assignee}</div>
					<div>Target: {targetVersion}</div>
				</div>
			)}
		</Draggable>
	);
};

export default DNDKanbanCard;
