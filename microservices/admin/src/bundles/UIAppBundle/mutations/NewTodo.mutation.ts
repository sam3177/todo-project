import { gql } from "@apollo/client";


export const NEW_TODO = gql`
mutation UserTodosInsertOne($document:NewTodoInfoInput!){
  userTodosInsertOne(document:$document){
    title
    _id
    createdById
    createdBy{
      _id
    }
  }
}
`