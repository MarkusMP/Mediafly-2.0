import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsDate } from "class-validator";
import { Profile } from "./profile.entity";

@Entity()
export class Follower extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  following_id: string;

  @Column()
  follower_id: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @ManyToOne(() => Profile, (profile) => profile.followers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "follower_id" })
  followers: Profile;

  @ManyToOne(() => Profile, (profile) => profile.following, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "following_id" })
  following: Profile;
}
