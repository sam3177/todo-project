import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";

@Service()
export class NewTodoService {
  constructor(protected readonly container: ContainerInstance) {}

  public addTodo() {
    throw new Error("Not implemented, yet.");
  }
}
