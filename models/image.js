import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

const connectDB = async () => {
  if (!client.isOpen()) {
    try {
      await client.open(process.env.REDIS_HOST);
      console.log("Connected to redis !");
    } catch (error) {
      console.log("failed connecting redis", error);
    }
  }
};

class Image extends Entity {}

export const imageSchema = new Schema(
  Image,
  {
    imageUrl: {
      type: "string",
    },
    siteTitle: {
      type: "string",
      textSearch: true,
    },
    siteURL: {
      type: "string",
    },
    altTag: {
      type: "string",
      textSearch: true,
    },
  },
  {
    dataStructure: "JSON",
  }
);

export const saveImage = async (image) => {
  await connectDB();

  const repository = new Repository(imageSchema, client);

  const image = repository.createEntity(image);

  const id = await repository.save(image);

  console.log("saved image to redis");

  return id;
};
