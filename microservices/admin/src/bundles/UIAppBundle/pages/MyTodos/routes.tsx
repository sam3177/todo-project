import { IRoute } from '@bluelibs/x-ui';
import { SettingFilled } from '@ant-design/icons';
import { MyTodos } from './MyTodos';

export const MY_TODOS: IRoute = {
	path: '/my-todos',
	component: MyTodos,
	// roles: [ 'ADMIN' ],
	menu: {
		key: 'MY TODOS',
		// label: "management.todos.menu.title",
		icon: SettingFilled,
	},
};
