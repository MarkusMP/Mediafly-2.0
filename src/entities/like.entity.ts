import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Post } from "./post.entity";
import { Profile } from "./profile.entity";

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  post_id: string;

  @Column()
  profile_id: string;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => Profile, (profile) => profile.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;
}
