import { gql } from "@apollo/client";


export const NEW_TODO = gql`
mutation UserTodosInsertOne($input:NewTodoInfoInput!){
  userTodosInsertOne(input:$input){
    title
    _id
    createdById
    createdBy{
      _id
    }
  }
}
`