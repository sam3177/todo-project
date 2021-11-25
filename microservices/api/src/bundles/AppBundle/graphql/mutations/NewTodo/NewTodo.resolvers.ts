import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { NewTodoInfoInput } from "../../../services/inputs/NewTodoInfo.input";
// import { NewTodoService } from "../../../services/NewTodo.service";
import { TodosCollection } from "../../../collections/Todos/Todos.collection";

export default {
  Mutation: {
    NewTodo: [
      // X.CheckLoggedIn(),
      X.ToModel(NewTodoInfoInput,{ field: 'input'}),
      X.Validate({ field: 'input' }),
			X.ToDocumentInsert(TodosCollection, "input"),
      X.ToNovaByResultID(TodosCollection),
      // X.ToService(NewTodoService, "addTodo"),
    ],
  },
} as IResolverMap;
