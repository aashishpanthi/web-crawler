import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

const connectDB = async () => {
  if (!client.isOpen()) {
    try {
      await client.open(process.env.REDIS_IMAGE_URL);
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

  const repository = client.fetchRepository(imageSchema);

  console.log("saving image", image);
  const img = repository.createEntity(image);

  const id = await repository.save(img);

  console.log("saved image to redis");

  return id;
};
