import { gql } from "@apollo/client";


export const UPDATE_TODO = gql`
mutation UserTodosUpdateOne($input:NewTodoInfoInput!){
  userTodosUpdateOne(input:$input){
    title
    _id
    createdById
    createdBy{
      _id
    }
  }
}
`