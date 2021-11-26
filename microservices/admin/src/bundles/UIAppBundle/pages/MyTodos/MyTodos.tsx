import {
	newSmart,
	useRouter,
	useUIComponents,
	useTranslate,
	use,
	useGuardian,
	useData,
	useLiveData,
} from '@bluelibs/x-ui';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { TodosAntTableSmart } from '@bundles/UIAppBundle/pages/TodosManagement/components/List/TodosTableSmart';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import * as Ant from 'antd';
import { NewTodoInfoInput, Todo, User } from '@root/api.types';
import { useMutation, useQuery } from '@apollo/client';
import { NEW_TODO } from '@bundles/UIAppBundle/mutations/NewTodo.mutation';
import { UPDATE_TODO } from '@bundles/UIAppBundle/mutations/UpdateTodo.mutation';
import { DELETE_TODO } from '@bundles/UIAppBundle/mutations/DeleteTodo.mutation';
import { GET_USER_TODOS } from '@bundles/UIAppBundle/queries/getUserTodos.query';

import './styles.scss';
export function MyTodos (){
	const UIComponents = useUIComponents();
	const router = useRouter();
	const t = useTranslate();
	const [ api, Provider ] = newSmart(TodosAntTableSmart);
	const user = useGuardian().state.user;
	const [ userId, setUserId ] = useState<string>();
	const [ todos, setTodos ] = useState<Todo[]>();
	const [ todoTitle, setTodoTitle ] = useState<string>();
	const { loading: isLoading, error, data } = useQuery(
		GET_USER_TODOS, {
			fetchPolicy:"network-only"
		}
	);
	const [ addTodo ] = useMutation(NEW_TODO);
	const [ updateTodo ] = useMutation(UPDATE_TODO);
	const [ removeTodo ] = useMutation(DELETE_TODO);

	useEffect(
		() => {
			if (!user) return;
			setUserId(user._id as string);
		},
		[ user ],
	);
	useEffect(
		() => {
			console.log('before if', data)
			if (isLoading) return;
			console.log('after if', data)

			setTodos(data.userTodosFind as Todo[]);
		},
		[ isLoading ],
	);
	const addNewTodo = async () => {
		const todoObj: NewTodoInfoInput = {
			title: todoTitle,
			isDone: false,
			createdById: userId,
		};
		const freshTodo = await addTodo({
			variables: { document: todoObj },
		});
		console.log(freshTodo);
		setTodos((oldTodos) => [
			...oldTodos,
			freshTodo.data.userTodosInsertOne,
		]);
		setTodoTitle('')
	};
	const checkTodo = async (id, oldVal) => {
		await updateTodo({
			variables: { _id: id, document: { isDone: !oldVal } },
		});
		setTodos((oldTodos) =>
			oldTodos.map(
				(todo) =>
					todo._id === id ? { ...todo, isDone: !todo.isDone } : todo,
			),
		);
	};
	const deleteTodo = async (id) => {
		await removeTodo({ variables: { _id: id } });
		setTodos((oldTodos) =>
			oldTodos.filter((todo) => todo._id !== id),
		);
	};

	const renderTodo = (todo) => (
		<Ant.Row style={{ margin: '.5rem' }} key={todo._id}>
			<Ant.Col span={12}>
				<h1>{todo.title}</h1>
			</Ant.Col>
			<Ant.Col span={6}>
				<Ant.Checkbox
					checked={todo.isDone}
					onChange={() => checkTodo(todo._id, todo.isDone)}
				/>
			</Ant.Col>
			<Ant.Col span={6}>
				<Ant.Button
					className='delete-todo-btn'
					onClick={() => deleteTodo(todo._id)}>
					<DeleteOutlined />
				</Ant.Button>
			</Ant.Col>
		</Ant.Row>
	);
	console.log('data',data)
console.log('todos',todos)
	return (
		<UIComponents.AdminLayout>
			<Ant.PageHeader title='MyTodos'>
				<Ant.Row>
					<Ant.Col span={12}>
						<Ant.Input
						value={todoTitle}
							size='large'
							onChange={(e) => setTodoTitle(e.target.value)}
							placeholder='add a new todo'
						/>
					</Ant.Col>
					<Ant.Col span={6}>
						<Ant.Button
							className='new-todo-btn'
							key='1'
							onClick={addNewTodo}
							icon={<PlusOutlined />}>
							{t('management.todos.list.create_btn')}
						</Ant.Button>
					</Ant.Col>
				</Ant.Row>
			</Ant.PageHeader>
			<Ant.Layout.Content>
				<Provider>
					<div className='page-todos-list'>
						{todos && todos.map((todo) => renderTodo(todo))}
					</div>
				</Provider>
			</Ant.Layout.Content>
		</UIComponents.AdminLayout>
	);
}
