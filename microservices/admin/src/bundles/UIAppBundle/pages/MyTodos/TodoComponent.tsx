import React, { RefObject, useRef, useState } from 'react';
import { Row, Col, Checkbox, Button, Input } from 'antd';
import {
	DeleteOutlined,
	EditOutlined,
	CheckOutlined,
	RollbackOutlined,
} from '@ant-design/icons';

const TodoComponent = ({ todo, updateTodo, deleteTodo }) => {
	const [ todoTitle, setTodoTitle ] = useState(null);
	const [ showForm, setShowForm ] = useState(false);
	const input: RefObject<Input> = useRef();
	const toggleShowForm = () => {
		setShowForm((oldState) => !oldState);
		setTodoTitle(null);
		setTimeout(() => input.current.focus(), 50);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		updateTodo(todo._id, { title: todoTitle || todo.title });
		toggleShowForm();
	};
	return (
		<Row className='todo-container' key={todo._id}>
			<Col span={12}>
				{showForm ? (
					<form onSubmit={handleSubmit}>
						<Input
							ref={input}
							value={todoTitle === null ? todo.title : todoTitle}
							required
							className='edit-todo-input'
							onChange={(e) => setTodoTitle(e.target.value)}
							placeholder='Edit todo'
						/>
						<Button htmlType='submit' className='edit-todo-btn'>
							<CheckOutlined />
						</Button>
					</form>
				) : (
					<h1 className='todo-title'>{todo.title}</h1>
				)}
			</Col>
			<Col span={2}>
				<Button className='edit-todo-btn' onClick={toggleShowForm}>
					{showForm ? <RollbackOutlined /> : <EditOutlined />}
				</Button>
			</Col>
			<Col span={2}>
				<Checkbox
					className='todo-check'
					checked={todo.isDone}
					onChange={() =>
						updateTodo(todo._id, { isDone: !todo.isDone })}
				/>
			</Col>
			<Col span={2}>
				<Button
					className='delete-todo-btn'
					onClick={() => deleteTodo(todo._id)}>
					<DeleteOutlined />
				</Button>
			</Col>
		</Row>
	);
};

export default TodoComponent;
