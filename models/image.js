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
      type: "text",
      textSearch: true,
    },
    siteURL: {
      type: "string",
    },
    altTag: {
      type: "text",
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

export const getImages = async (url) => {
  await connectDB();

  const repository = client.fetchRepository(imageSchema);

  await repository.createIndex();

  const images = await repository
    .search()
    .where("imageUrl")
    .equals(url)
    .return.all();

  console.log("got images from redis", images);

  return images;
};
