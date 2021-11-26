import * as X from '@bluelibs/x-bundle';
import { IResolverMap } from '@bluelibs/graphql-bundle';

import { UserTodosDeleteInput } from '../../../services/inputs/UserTodosDelete.input';
import { TodoService } from '../../../services/Todo.service';

export default {
	Mutation: {
		UserTodosDelete: [
			X.CheckLoggedIn(),
			// X.CheckPermission(["ADMIN"]),
			X.ToModel(UserTodosDeleteInput),
			X.Validate(),
			X.ToService(TodoService, 'delete'),
		],
	},
} as IResolverMap;
