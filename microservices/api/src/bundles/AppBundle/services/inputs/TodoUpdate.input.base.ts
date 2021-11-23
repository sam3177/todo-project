/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoUpdateInput {
  @Is(an.objectId().nullable())
  createdById?: any;

  @Is(a.boolean().nullable())
  isDone?: boolean;

  @Is(a.string().nullable())
  title?: string;
}
