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
      type: "text",
      textSearch: true,
    },
    description: {
      type: "text",
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
    },
    backLinks: {
      type: "number",
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

export const saveWebsiteData = async (website) => {
  const repository = await getRepository();
  const site = repository.createEntity(website);
  const id = await repository.save(site);

  return id;
};

export const getWebsiteData = async (link) => {
  const repository = await getRepository();

  await repository.createIndex();

  try {
    const url = new URL(link);
    const baseUrl = `${url.protocol}//${url.hostname}${url.pathname}`;

    console.log("url to search", baseUrl);

    const sites = await repository
      .search()
      .where("url")
      .eq(baseUrl)
      .return.all();
    console.log("got website from redis", sites);
    return sites;
  } catch (error) {
    console.log(error);
    console.log("failed to get", link);
    return [];
  }
};

export const getRepository = async () => {
  await connectDB();
  return client.fetchRepository(websiteSchema);
};
