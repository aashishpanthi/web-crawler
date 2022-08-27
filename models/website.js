import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

const connectDB = async () => {
  if (!client.isOpen()) {
    try {
      await client.open(process.env.REDIS_WEBSITE_URL);
      console.log("Connected to redis !");
    } catch (error) {
      console.log("failed connecting redis", error);
    }
  }
};

class Website extends Entity {}

export const websiteSchema = new Schema(
  Website,
  {
    url: {
      type: "string",
    },
    title: {
      type: "string",
      textSearch: true,
    },
    description: {
      type: "string",
      textSearch: true,
    },
    firstFewWords: {
      type: "string",
    },
    loadTime: {
      type: "number",
    },
    lastUpdated: {
      type: "date",
      default: new Date(),
    },
    backLinks: {
      type: "number",
      default: 1,
    },
    backLinkKeywords: {
      type: "string[]",
    },
    urlKeywords: {
      type: "string[]",
    },
    mainKeywords: {
      type: "string[]",
      textSearch: true,
    },
    headings: {
      type: "string[]",
      textSearch: true,
    },
  },
  {
    dataStructure: "JSON",
  }
);

export const saveWebsite = async (website) => {
  await connectDB();

  const repository = new Repository(websiteSchema, client);

  const website = repository.createEntity(website);

  const id = await repository.save(website);

  console.log("saved website to redis");

  return id;
};
