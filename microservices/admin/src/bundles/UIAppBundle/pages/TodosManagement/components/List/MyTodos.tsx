import {
	newSmart,
	useRouter,
	useUIComponents,
	useTranslate,
	use,
	useGuardian,
	useLiveData,
  useData,
} from '@bluelibs/x-ui';
import{DeleteOutlined}from '@ant-design/icons' 
import { useEffect, useState, useMemo } from 'react';
import { TodosAntTableSmart } from './TodosTableSmart';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import * as Ant from 'antd';
import { Routes } from '@bundles/UIAppBundle';
import { features } from '../../config/features';
import { TodosListFilters } from './TodosListFilters';
import { Todo, User } from '@root/api.types';
import {
	TodosCollection,
	UsersCollection,
} from '@bundles/UIAppBundle/collections';

export function MyTodos (props:string){
	const UIComponents = useUIComponents();
	const router = useRouter();
	const t = useTranslate();
	const [ api, Provider ] = newSmart(TodosAntTableSmart);
	const { data: myTodos, error, isLoading } = useData(
		TodosCollection,
		{},
		{ title: 1, isDone: 1, _id: 1, createdBy: { _id: 1 } },
	);
	const todosCollection = use(TodosCollection);

	const guardian = useGuardian();
	const [ user, setUser ] = useState<User>();
	useEffect(() => {
		setUser(guardian.state.user as User);
	}, []);

	const renderTodo = (todo) => (
		<Ant.Row style={{ margin: '.5rem' }} key={todo._id}>
			<Ant.Col span={12}>
				<h1>{todo.title}</h1>
			</Ant.Col>
			<Ant.Col span={6}>
				<Ant.Checkbox
					checked={todo.isDone}
					onChange={() =>
						todosCollection.updateOne(todo._id, {
							isDone: !todo.isDone,
						})}
				/>
			</Ant.Col>
			<Ant.Col span={6}>
				<Ant.Button
          onClick={() => todosCollection.deleteOne(todo._id)}
        ><DeleteOutlined /></Ant.Button>
			</Ant.Col>
		</Ant.Row>
	);
	console.log(myTodos);

	return (
		<UIComponents.AdminLayout>
			<Ant.PageHeader
				title='MyTodos'
				extra={[
					features.create ? (
						<Ant.Button
							key='1'
							onClick={() => router.go(Routes.TODOS_CREATE)}
							icon={<PlusOutlined />}>
							{t('management.todos.list.create_btn')}
						</Ant.Button>
					) : null,
				]}
			/>

			{api.state.isError && (
				<Ant.Alert
					type='error'
					message={t('generics.error_message')}
				/>
			)}

			<Ant.Layout.Content>
				<Provider>
					<div className='page-todos-list'>
						{myTodos &&
							myTodos
								.filter((todo) => todo.createdBy._id === user?._id)
								.map((todo) => renderTodo(todo))}
					</div>
				</Provider>
			</Ant.Layout.Content>
		</UIComponents.AdminLayout>
	);
}
