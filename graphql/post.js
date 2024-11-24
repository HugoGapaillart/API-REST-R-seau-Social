import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { createPost, editPost, deletePost, addComment, deleteComment, getPost } from "../controller/post.js";

export const CommentType = new GraphQLObjectType({
    name: "comment",
    fields: () => ({
        UserId: { type: GraphQLInt },
        contenu: { type: GraphQLString }
    })
})


export const PostType = new GraphQLObjectType({
    name: "post",
    fields: () => ({
        id: { type: GraphQLInt },
        titre: { type: GraphQLString },
        contenu: { type: GraphQLString },
        UserId: { type: GraphQLInt },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: (parent, args) => {
                return parent.getComments();
            }
        }
    })
})

export const rootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        getPost: {
            type: new GraphQLList(PostType),
            args:{
                userId: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return getPost(args.userId)
            }
        }
    })
})

export const RootMutation = new GraphQLObjectType({
    name: "mutation",
    fields: () => ({
        createPost: {
            type: PostType,
            args: {
                titre: { type: GraphQLString },
                contenu: { type: GraphQLString },
                userId: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return createPost(args.titre, args.contenu, args.userId)
            }
        },
        editPost: {
            type: PostType,
            args: {
                id: { type: GraphQLInt },
                titre: { type: GraphQLString },
                contenu: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return editPost(args.id, args.titre, args.contenu)
            }
        },
        deletePost: {
            type: PostType,
            args: { 
                id: { type: GraphQLInt }, 
                userId: { type: GraphQLInt }, 
            },
            resolve: (parent, args) => {
                return deletePost(args.id, args.userId)
            }
        },
        addComment: {
            type: PostType,
            args: { 
                contenu: { type: GraphQLInt },
                postId: { type: GraphQLInt }, 
                userId: { type: GraphQLInt }, 
            },
            resolve: (parent, args) => {
                return addComment(args.contenu, args.postId, args.userId)
            }
        },
        deleteComment: {
            type: PostType,
            args: { 
                id: { type: GraphQLInt }, 
                userId: { type: GraphQLInt }, 
            },
            resolve: (parent, args) => {
                return deleteComment(args.id, args.userId)
            }
        }
    })
})