import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Follower } from "./follower.entity";
import { Post } from "./post.entity";
import { Comment } from "./comment.entity";
import { IsDate } from "class-validator";
import { User } from "./user.entity";

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 25 })
  username: string;

  @Column({ default: "" })
  firstName: string;

  @Column({ default: "" })
  lastName: string;

  @Column({ default: "" })
  bio: string;

  @Column({ default: "" })
  profile_image: string;

  @OneToMany(() => Follower, (follower) => follower.followers)
  followers: Follower[];

  @OneToMany(() => Follower, (follower) => follower.following)
  following: Follower[];

  @OneToMany(() => Post, (post) => post.profile)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.profile)
  comments: Comment[];

  @OneToOne(() => User, (user) => user.profile, {
    cascade: true,
  })
  user: User;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
