import { FileEntites } from "@/entities/File";
import fs from "fs";
import path from "path";
import { DataSource } from "typeorm";

const sslCert = fs.readFileSync(path.join(process.cwd(), "certs", "ca.pem"));

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  entities: [FileEntites],
  ssl: {
    ca: sslCert,
  },
  synchronize: true,
  logging: true,
});
