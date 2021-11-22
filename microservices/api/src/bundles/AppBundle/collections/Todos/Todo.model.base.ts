/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class Todo {
  @Is(an.objectId())
  _id?: any;

  @Is(a.boolean().required())
  isDone: boolean;

  @Is(a.string().required())
  title: string;
}
