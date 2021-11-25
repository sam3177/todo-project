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
import {
	TodosCollection,
	UsersCollection,
} from '@bundles/UIAppBundle/collections';
import { useMutation } from '@apollo/client';
import { NEW_TODO } from '@bundles/UIAppBundle/mutations/NewTodo.mutation';
import './styles.scss'

export function MyTodos (){
	const UIComponents = useUIComponents();
	const router = useRouter();
	const t = useTranslate();
	const [ api, Provider ] = newSmart(TodosAntTableSmart);
	const user = useGuardian().state.user;
	const [ userId, setUserId ] = useState<string>();
	const [ todos, setTodos ] = useState<Todo[]>([]);
	const [ todoTitle, setTodoTitle ] = useState<string>();

	const [
		addTodo,
		{ data: mutationData, loading, error: mutationError },
	] = useMutation(NEW_TODO);

	useEffect(
		() => {
			if (!user) return;
			setUserId(user._id as string);
		},
		[ user ],
	);

	const { data, error, isLoading } = useData(
		TodosCollection,
		{},
		{ title: 1, isDone: 1, _id: 1, createdBy: { _id: 1 } },
	);
	const todosCollection = use(TodosCollection);
	useEffect(
		() => {
			if (isLoading) return;
			setTodos(data as Todo[]);
		},
		[ isLoading ],
	);

	const addNewTodo = async () => {
		const todoObj: NewTodoInfoInput = {
			title: todoTitle,
			isDone: false,
			createdById: userId,
		};
		// console.log(todos)
		// console.log('&&&&&&', userId, todoTitle);
		const freshTodo = await addTodo({
			variables: { input: todoObj },
		});
		setTodos((oldTodos) => [ ...oldTodos, freshTodo.data.NewTodo ]);
	};
	const checkTodo = async (id, oldVal) => {
		await todosCollection.updateOne(id, {
			isDone: !oldVal,
		});
		setTodos((oldTodos) =>
			oldTodos.map(
				(todo) =>
					todo._id === id ? { ...todo, isDone: !todo.isDone } : todo,
			),
		);
	};
	const deleteTodo = async (id) => {
		await todosCollection.deleteOne(id);
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
				<Ant.Button className="delete-todo-btn" onClick={() => deleteTodo(todo._id)}>
					<DeleteOutlined />
				</Ant.Button>
			</Ant.Col>
		</Ant.Row>
	);

	return (
		<UIComponents.AdminLayout>
			<Ant.PageHeader title='MyTodos'>
				<Ant.Row>
					<Ant.Col span={12}>
						<Ant.Input
							size='large'
							onChange={(e) => setTodoTitle(e.target.value)}
							placeholder='add a new todo'
						/>
					</Ant.Col>
					<Ant.Col span={6}>
						<Ant.Button
						className="new-todo-btn"
							key='1'
							onClick={addNewTodo}
							icon={<PlusOutlined />}>
							{t('management.todos.list.create_btn')}
						</Ant.Button>
					</Ant.Col>
				</Ant.Row>
			</Ant.PageHeader>

			{api.state.isError && (
				<Ant.Alert
					type='error'
					message={t('generics.error_message')}
				/>
			)}

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
