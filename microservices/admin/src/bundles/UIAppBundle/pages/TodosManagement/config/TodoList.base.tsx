/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import { Todo, TodosCollection } from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class TodoList extends XList<Todo> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "title",
        title: t("management.todos.fields.title"),
        key: "management.todos.fields.title",
        dataIndex: ["title"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "string",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "isDone",
        title: t("management.todos.fields.isDone"),
        key: "management.todos.fields.isDone",
        dataIndex: ["isDone"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "boolean",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
    ]);
  }

  static getSortMap() {
    return {};
  }

  static getRequestBody(): QueryBodyType<Todo> {
    return {
      _id: 1,
      title: 1,
      isDone: 1,
    };
  }
}
