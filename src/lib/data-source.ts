import { FileEntites } from "@/entities/File";
import { SharedText } from "@/entities/SharedText";
import { DataSource } from "typeorm";

const caPemBase64 = process.env.CA_PEM_BASE64 || "";

const sslCert = Buffer.from(caPemBase64, 'base64').toString('utf-8');

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
  entities: [FileEntites, SharedText],
  ssl: {
    ca: sslCert,
  },
  synchronize: false,
  logging: true,
});
