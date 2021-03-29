import gql from 'graphql-tag';

export const GET_ME = gql `
    {
        me {
            username
            _id
            bookCount
            email
            savedBooks{
                image
                title
                authors
                link
                bookId
                description
                
            }
        }
    }
`
;