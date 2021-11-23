/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";
import { User } from "../";

@Schema()
export class Todo {
  @Is(an.objectId())
  _id?: any;

  createdBy: User;

  @Is(an.objectId().required())
  createdById: any;

  @Is(a.boolean().required())
  isDone: boolean;

  @Is(a.string().required())
  title: string;
}
