import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";
import {  TodoUpdateInput } from "../../../services/inputs";
import { TodosCollection } from "../../../collections/Todos/Todos.collection";
import { NewTodoInfoInput } from "../../../services/inputs/NewTodoInfo.input";


export default {
  Query: [
    [],
    {
      userTodosFindOne: [X.ToNovaOne(TodosCollection)],
      userTodosFind: [X.ToNova(TodosCollection, async (_, args, ctx) => {
        return { filters: { createdById: ctx.userId } };
      })],
      userTodosCount: [X.ToCollectionCount(TodosCollection)],
    },
  ],
  Mutation: [
    [],
    {
      userTodosInsertOne: [
        X.ToModel(NewTodoInfoInput,{ field: 'input'}),
        X.Validate({ field: 'input' }),
        X.ToDocumentInsert(TodosCollection, "input"),
        X.ToNovaByResultID(TodosCollection),
        // X.ToService(NewTodoService, "addTodo"),
      ],
      userTodosUpdateOne: [
        X.ToModel(TodoUpdateInput, { field: "document" }),
        X.Validate({ field: "document" }),
        X.CheckDocumentExists(TodosCollection),
        X.ToDocumentUpdateByID(TodosCollection, null, ({ document }) => ({
          $set: document,
        })),
        X.ToNovaByResultID(TodosCollection),
      ],
      userTodosDeleteOne: [
        X.CheckDocumentExists(TodosCollection),
        X.ToDocumentDeleteByID(TodosCollection),
      ],
    },
  ],
  Subscription: {
    userTodosSubscription: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscription(TodosCollection)],
    },
    userTodosSubscriptionCount: {
      resolve: (payload) => payload,
      subscribe: [X.ToSubscriptionCount(TodosCollection)],
    },
  },
} as IResolverMap;
