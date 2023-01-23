import { Injectable } from '@nestjs/common';
import { ID, ListQueryBuilder, PaginatedList, RequestContext, TransactionalConnection, ListQueryOptions } from '@vendure/core';
import { PostRewiew } from './post-review.entity';

export type CreatePost = {
    id: ID
    title: string
    content: string
    authorName: string
}

export type UpdatePost = {
    id: ID
    title: string
    content: string
    authorName: string
}

@Injectable()
export class PostService {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder,
    ) {}

    async getAllPosts(
        ctx: RequestContext,
        options?: ListQueryOptions<PostRewiew>,
    ): Promise<PaginatedList<PostRewiew>> {
        return this.listQueryBuilder
            .build(PostRewiew, options, { ctx })
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    async getOnePost(ctx: RequestContext, id: string): Promise<PostRewiew | undefined> {
        return await this.connection.getRepository(ctx, PostRewiew).findOne(id);
    }

    async createPost(ctx: RequestContext, input: CreatePost): Promise<PostRewiew> {
        return await this.connection.getRepository(ctx, PostRewiew).save(new PostRewiew(input));
    }

    async updatePost(ctx: RequestContext, input: UpdatePost): Promise<PostRewiew> {
        await this.connection.getRepository(ctx, PostRewiew).update(input.id, input)        
        return await this.connection.getEntityOrThrow(ctx, PostRewiew, input.id)
    }

    async deletePost(ctx: RequestContext, id: string): Promise<PostRewiew | undefined> {
        const result = await this.connection.getEntityOrThrow(ctx, PostRewiew, id)
        await this.connection.getRepository(ctx, PostRewiew).delete(id)
        return result
    }
}