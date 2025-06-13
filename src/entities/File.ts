import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "files" })
export class FileEntites {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  originalName!: string;

  @Column({ type: "varchar", length: 255 })
  storedName!: string;

  @Column({ type: "varchar", length: 255 })
  url!: string;

  @Column({ type: "bigint" })
  size!: number;

  @Column({ type: "boolean", default: true })
  isPublic!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  password?: string | null;

  @Column({ type: "timestamp", nullable: true })
  expiresAt!: Date;

  @Column({ type: "int", default: 0 })
  downloadCount!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;
}
