import { gql } from "@apollo/client";


export const DELETE_TODO = gql`
mutation UserTodosDeleteOne($_id:ObjectId!){
  userTodosDeleteOne(_id:$_id)
}
`