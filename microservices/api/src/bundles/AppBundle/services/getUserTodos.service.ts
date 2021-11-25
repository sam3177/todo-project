import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";

@Service()
export class GetUserTodosService {
  constructor(protected readonly container: ContainerInstance) {}

  public() {
    throw new Error("Not implemented, yet.");
  }
}
