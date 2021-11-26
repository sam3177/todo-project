import {
	newSmart,
	useUIComponents,
	useTranslate,
} from '@bluelibs/x-ui';
import { useEffect, useState } from 'react';
import { TodosAntTableSmart } from '@bundles/UIAppBundle/pages/TodosManagement/components/List/TodosTableSmart';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import * as Ant from 'antd';
import {
	Todo,
	UserTodosCreateInput,
	UserTodosDeleteInput,
	UserTodosUpdateInput,
} from '@root/api.types';
import { useMutation, useQuery } from '@apollo/client';
import { USER_TODOS_CREATE } from '@bundles/UIAppBundle/mutations/NewTodo.mutation';
import { USER_TODOS_UPDATE } from '@bundles/UIAppBundle/mutations/UpdateTodo.mutation';
import { USER_TODOS_DELETE } from '@bundles/UIAppBundle/mutations/DeleteTodo.mutation';
import { USER_TODOS_FIND } from '@bundles/UIAppBundle/queries/getUserTodos.query';

import './styles.scss';
import TodoComponent from './TodoComponent';
export const MyTodos = () => {
	const t = useTranslate();
	const UIComponents = useUIComponents();
	const [ todos, setTodos ] = useState<Todo[]>();
	const [ todoTitle, setTodoTitle ] = useState<string>();
	const [ UserTodosCreate ] = useMutation(USER_TODOS_CREATE);
	const [ UserTodosUpdate ] = useMutation(USER_TODOS_UPDATE);
	const [ UserTodosDelete ] = useMutation(USER_TODOS_DELETE);
	const { loading: isLoading, data } = useQuery(USER_TODOS_FIND, {
		fetchPolicy: 'network-only',
	});

	useEffect(
		() => {
			if (isLoading) return;
			setTodos(data.UserTodosFind as Todo[]);
		},
		[ isLoading ],
	);

	const addNewTodo = async () => {
		const input: UserTodosCreateInput = { title: todoTitle };
		const freshTodo = await UserTodosCreate({
			variables: { input },
		});
		console.log(freshTodo);
		setTodos((oldTodos) => [
			...oldTodos,
			freshTodo.data.UserTodosCreate,
		]);
		setTodoTitle('');
	};

	const updateTodo = async (id, data) => {
		const input: UserTodosUpdateInput = {
			todoId: id,
			...data,
		};
		await UserTodosUpdate({
			variables: { input },
		});
		setTodos((oldTodos) =>
			oldTodos.map(
				(todo) => (todo._id === id ? { ...todo, ...data } : todo),
			),
		);
	};

	const deleteTodo = async (id) => {
		const input: UserTodosDeleteInput = {
			todoId: id,
		};
		await UserTodosDelete({ variables: { input } });
		setTodos((oldTodos) =>
			oldTodos.filter((todo) => todo._id !== id),
		);
	};
	return (
		<UIComponents.AdminLayout>
			<Ant.PageHeader title='MyTodos'>
				<Ant.Row>
					<Ant.Col span={12}>
						<Ant.Input
							value={todoTitle}
							size='large'
							onChange={(e) => setTodoTitle(e.target.value)}
							placeholder='Add a new todo title'
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
				<div className='page-todos-list'>
					{todos &&
						todos.map((todo) => (
							<TodoComponent
								key={todo._id}
								todo={todo}
								updateTodo={updateTodo}
								deleteTodo={deleteTodo}
							/>
						))}
				</div>
			</Ant.Layout.Content>
		</UIComponents.AdminLayout>
	);
};
