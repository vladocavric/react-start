import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {
	statusOptions,
	assigneeOptions,
	environmentOptions,
	targetVersionOptions,
} from './options';

import Input from '../UI/Input';

import styles from './TasksForm.module.scss';
import useHttp from '../../hooks/http';

const TasksForm = () => {
	const {isLoading, sendRequest} = useHttp()
	const navigate = useNavigate()
	const animatedComponents = makeAnimated();
	const [title, setTitle] = useState({
		value: '',
		error: '',
		touched: false,
	});
	const [description, setDescription] = useState({
		value: '',
		error: '',
		touched: false,
	});
	const [status, setStatus] = useState({
		value: '',
		error: '',
		touched: false,
	});
	const [assignee, setAssignee] = useState({
		value: '',
		error: '',
		touched: false,
	});
	const [environment, setEnvironment] = useState({
		value: '',
		error: '',
		touched: false,
	});
	const [target, setTarget] = useState({
		value: '',
		error: '',
		touched: false,
	});

	const anyErrors =
		!!title.error ||
		!!description.error ||
		!!status.error ||
		!!assignee.error ||
		!!environment.error ||
		!!target.error;
	const allTouched =
		title.touched &&
		description.touched &&
		status.touched &&
		assignee.touched &&
		environment.touched &&
		target.touched;
	const allValues =
		!!title.value &&
		!!description.value &&
		!!status.value &&
		!!assignee.value &&
		!!environment.value &&
		!!target.value;

		


	const selectStyles = {
		control: (styles, { isFocused }) => ({
			...styles,
			backgroundColor: '#F9FAFB',
			border: 0,
			borderBottom: isFocused ? '2px solid #287928' : '2px solid #a1a1a1',
			'&:hover': {
				borderColor: 'inherent',
			},
			borderRadius: 0,
			height: '50px',
			boxShadow: 'none',
		}),
		option: (styles, { isFocused, isSelected }) => ({
			...styles,
			backgroundColor: isSelected
				? '#287928'
				: isFocused
				? '#28792868'
				: '',
			borderRadius: 0,
			boxShadow: 'none',
		}),
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const url = `${process.env.REACT_APP_FIREBASE_DOMAIN}tasks.json`;
		const body =  {
			title: title.value,
			description: description.value,
			status: status.value,
			assignee: assignee.value,
			environment: environment.value,
			targetVersion: target.value
		}
		const convertData = data => {
			navigate('/dnd/kanban')
		}
		sendRequest({url, method: 'POST', body, convertData})
	};

	const handleChangeTitle = (title) => {
		setTitle({ value: title, error: '', touched: true });
	};

	const handleDescriptionChange = (e, editor) => {
		const enteredDescription = editor.getData();
		setDescription({ value: enteredDescription, error: '', touched: true });
	};

	const handleStatusChange = (e) => {
		setStatus({ value: e.value, error: '', touched: true });
	};

	const handleAssigneeChange = (e) => {
		setAssignee({ value: e.value, error: '', touched: true });
	};

	const handleEnvChange = (e) => {
		setEnvironment({ value: e.value, error: '', touched: true });
	};
	const handleTargetChange = (e) => {
		setTarget({ value: e.value, error: '', touched: true });
	};
	return (
		<div className={styles.TasksForm}>
			<h1>Create a new Task</h1>
			<form onSubmit={handleFormSubmit}>
				<Input
					label={'Title'}
					input={{
						type: 'text',
						id: 'title',
						value: title.value,
					}}
					valueChange={handleChangeTitle}
					error={title.error}
				/>

				<CKEditor
					editor={ClassicEditor}
					data=''
					onChange={handleDescriptionChange}
				/>

				<div className={styles.TasksForm__Grid}>
					<Select
						placeholder={'Select Status'}
						components={animatedComponents}
						options={statusOptions}
						styles={selectStyles}
						onChange={handleStatusChange}
					/>

					<Select
						placeholder={'Select Assignee'}
						components={animatedComponents}
						options={assigneeOptions}
						styles={selectStyles}
						onChange={handleAssigneeChange}
					/>

					<Select
						placeholder={'Select Environment'}
						components={animatedComponents}
						options={environmentOptions}
						styles={selectStyles}
						onChange={handleEnvChange}
					/>

					<Select
						placeholder={'Select Target Version'}
						components={animatedComponents}
						options={targetVersionOptions}
						styles={selectStyles}
						onChange={handleTargetChange}
					/>
				</div>

				<div className={styles.TasksForm__Actions}>
					<Link className='btn btn-primary' to='/dnd/kanban'>
						Go back to Kanban<i></i>
					</Link>
					<button
						type='submit'
						className='btn btn-primary'
						disabled={!allTouched || anyErrors || !allValues || isLoading}>
						{isLoading ? 'Submiting...' : 'Submit'}
						<i></i>
					</button>
				</div>
			</form>
		</div>
	);
};

export default TasksForm;
