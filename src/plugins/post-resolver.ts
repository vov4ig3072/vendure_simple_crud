import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Ctx, PaginatedList, RequestContext , ListQueryOptions} from '@vendure/core';

import { CreatePost, PostService, UpdatePost } from './post.servises';
import { PostRewiew } from './post-review.entity';

@Resolver()
export class PostResolver {
    constructor(private exampleService: PostService) {}

    @Query()
    getAllPosts(
        @Ctx() ctx: RequestContext,
        @Args() args: ListQueryOptions<PostRewiew>,
    ): Promise<PaginatedList<PostRewiew>> {
        return this.exampleService.getAllPosts(ctx, args || undefined);
    }

    @Query()
    getOnePost(@Ctx() ctx: RequestContext, @Args() args: { postId: string }): Promise<PostRewiew | undefined> {     
        return this.exampleService.getOnePost(ctx, args.postId);
    }

    @Mutation()
    createPost(@Ctx() ctx: RequestContext, @Args() args: { input: CreatePost }){
        return this.exampleService.createPost(ctx, args.input);
    }

    @Mutation()
    updatePost(@Ctx() ctx: RequestContext, @Args() args: { input: UpdatePost }){
        return this.exampleService.updatePost(ctx, args.input);
    }

    @Mutation()
    deletePost(@Ctx() ctx: RequestContext, @Args() args: { postId: string }){
        return this.exampleService.deletePost(ctx, args.postId);
    }
}
