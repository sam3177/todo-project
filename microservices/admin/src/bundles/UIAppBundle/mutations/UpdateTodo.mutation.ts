import { gql } from "@apollo/client";


export const UPDATE_TODO = gql`
mutation UserTodosUpdateOne($_id:ObjectId!,$document:TodoUpdateInput!){
  userTodosUpdateOne(_id:$_id,document:$document){
    title
    _id
    createdById
    createdBy{
      _id
    }
  }
}
`