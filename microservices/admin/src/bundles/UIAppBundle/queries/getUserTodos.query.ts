import { gql } from "@apollo/client";

export const GET_USER_TODOS = gql`
query userTodosFind{
  userTodosFind{
    title
    _id
    createdById
    isDone
    
  }
}`