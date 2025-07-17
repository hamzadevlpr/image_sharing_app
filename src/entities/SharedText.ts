import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from "typeorm";
import { nanoid } from 'nanoid';

@Entity()
export class SharedText {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'longtext' })
  content!: string;

  @Column({ type: 'boolean', default: false })
  isPasswordProtected!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordHash?: string | null;

  @Column({ type: 'boolean', default: false })
  burnAfterReading!: boolean;

  @Column({ type: 'int', default: 0 })
  shareCount!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @BeforeInsert()
  generateSlug() {
    if (!this.slug) {
      this.slug = nanoid(9);
    }
  }
}
