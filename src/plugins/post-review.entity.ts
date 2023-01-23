import { DeepPartial, ID } from '@vendure/common/lib/shared-types'
import { VendureEntity } from '@vendure/core'
import { Column, 
         Entity, 
         PrimaryGeneratedColumn,
         CreateDateColumn,
         UpdateDateColumn,
         DeleteDateColumn
    } from 'typeorm'
import 'dotenv/config'

@Entity({database: process.env.DB_NAME})
export class PostRewiew extends VendureEntity {
    constructor(input?: DeepPartial<PostRewiew>){
        super(input)
    }

    @PrimaryGeneratedColumn()
    id: ID

    @CreateDateColumn("date") 
    createdAt: Date
    
    @UpdateDateColumn("date") 
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @Column("varchar", { length: 200 })
    title: string

    @Column("varchar")
    content: string

    @Column("varchar", { length: 55 })
    authorName: string
}
