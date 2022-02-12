import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Comment } from "./comment.entity";
import { Profile } from "./profile.entity";

@Entity()
export class CommentLike extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  comment_id: string;

  @Column()
  profile_id: string;

  @ManyToOne(() => Comment, (comment) => comment.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "comment_id" })
  comment: Comment;

  @ManyToOne(() => Profile, (profile) => profile.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;
}
