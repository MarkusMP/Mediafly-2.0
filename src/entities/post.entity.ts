import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { IsDate } from "class-validator";
import { Comment } from "./comment.entity";
import { Profile } from "./profile.entity";
import { Like } from "./like.entity";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 300 })
  text: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  profile_id: string;

  @ManyToOne(() => Profile, (profile) => profile.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @CreateDateColumn()
  @IsDate()
  created_at: Date;
}
