/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoInsertInput {
  @Is(an.objectId().required())
  createdById: any;

  @Is(a.boolean().required())
  isDone: boolean;

  @Is(a.string().required())
  title: string;
}
