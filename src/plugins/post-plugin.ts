import gql from 'graphql-tag'
import { VendurePlugin, PluginCommonModule } from '@vendure/core'
import { PostResolver } from './post-resolver'
import { PostRewiew } from './post-review.entity'
import { PostService } from './post.servises'

const schemagql = gql`
    type PostRewiew implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        deletedAt: DateTime!
        title: String!
        content: String!
        authorName: String!
    }

    type PostsList {
        items: [PostRewiew]
        totalItems: Int
    }

    input PostRewiewInput{
        title: String!
        content: String!
        authorName: String!
    }

    input UpdatePostRewiewInput{
        id: String!
        title: String
        content: String
        authorName: String
    }

    extend type Query {
        getAllPosts: PostsList
        getOnePost(postId: ID!): PostRewiew
    }

    extend type Mutation {
        createPost(input: PostRewiewInput): PostRewiew
        updatePost(input: UpdatePostRewiewInput): PostRewiew
        deletePost(postId: ID!): PostRewiew
    }
`

@VendurePlugin({
    imports: [PluginCommonModule],
    adminApiExtensions: {
        schema: schemagql,
        resolvers: [PostResolver]
        },
    
    entities: [PostRewiew],
    providers: [PostService]
})
    
export class PostPlugin {}