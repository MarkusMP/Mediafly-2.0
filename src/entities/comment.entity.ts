import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { IsDate } from "class-validator";
import { Post } from "./post.entity";
import { Profile } from "./profile.entity";
import { CommentLike } from "./commentLike.entity";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  post_id: string;

  @Column()
  profile_id: string;

  @Column({ length: 300 })
  text: string;

  @OneToMany(() => CommentLike, (commentLike) => commentLike.comment)
  likes: CommentLike[];

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => Profile, (profile) => profile.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;
}
