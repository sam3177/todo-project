import * as X from '@bluelibs/x-bundle';
import { IResolverMap } from '@bluelibs/graphql-bundle';
import {
	TodoInsertInput,
	TodoUpdateInput,
} from '../../../services/inputs';
import { TodosCollection } from '../../../collections/Todos/Todos.collection';

export default {
	Query: [
		[],
		{
			TodosFindOne: [ X.ToNovaOne(TodosCollection) ],
			TodosFind: [
				X.ToNova(TodosCollection, async (_, args, ctx) => {
					return { filters: { createdById: ctx.userId } };
				}),
			],
			TodosCount: [ X.ToCollectionCount(TodosCollection) ],
		},
	],
	Mutation: [
		[],
		{
			TodosInsertOne: [
				X.ToModel(TodoInsertInput, { field: 'document' }),
				X.Validate({ field: 'document' }),
				X.ToDocumentInsert(TodosCollection),
				X.ToNovaByResultID(TodosCollection),
			],
			TodosUpdateOne: [
				// X.Secure([
				// 	{ match: X.Secure.Match.Roles('ADMIN') },
				// 	{
				// 		run: [
				// 			X.Secure.IsUser(TodosCollection, 'createdById', '_id'),
				// 		],
				// 	},
				// ]),
				X.ToModel(TodoUpdateInput, { field: 'document' }),
				X.Validate({ field: 'document' }),
				X.CheckDocumentExists(TodosCollection),
				X.ToDocumentUpdateByID(
					TodosCollection,
					null,
					({ document }) => ({
						$set: document,
					}),
				),
				X.ToNovaByResultID(TodosCollection),
			],
			TodosDeleteOne: [
				X.CheckDocumentExists(TodosCollection),
				X.ToDocumentDeleteByID(TodosCollection),
			],
		},
	],
	Subscription: {
		TodosSubscription: {
			resolve: (payload) => payload,
			subscribe: [ X.ToSubscription(TodosCollection) ],
		},
		TodosSubscriptionCount: {
			resolve: (payload) => payload,
			subscribe: [ X.ToSubscriptionCount(TodosCollection) ],
		},
	},
} as IResolverMap;
