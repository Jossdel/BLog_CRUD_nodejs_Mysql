import { EntitySchema } from "typeorm";

export const userBD = new EntitySchema({
  name: "Blog",
  tableName: "blogusers",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    title: {
      type: "varchar",
    },
    description: {
      type: "varchar",
    },
    create_At: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});
