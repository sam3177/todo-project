import * as X from '@bluelibs/x-bundle';
import { IResolverMap } from '@bluelibs/graphql-bundle';

import { UserTodosUpdateInput } from '../../../services/inputs/UserTodosUpdate.input';
import { TodoService } from '../../../services/Todo.service';

export default {
	Mutation: {
		UserTodosUpdate: [
			X.CheckLoggedIn(),
			// X.CheckPermission(["ADMIN"]),
			X.ToModel(UserTodosUpdateInput),
			X.Validate(),
			X.ToService(TodoService, 'update'),
		],
	},
} as IResolverMap;
