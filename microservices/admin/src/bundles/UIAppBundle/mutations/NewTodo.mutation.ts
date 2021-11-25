import { gql } from "@apollo/client";


export const NEW_TODO = gql`
mutation NewTodo($input:NewTodoInfoInput!){
  NewTodo(input:$input){
    title
    _id
    createdById
  }
}
`