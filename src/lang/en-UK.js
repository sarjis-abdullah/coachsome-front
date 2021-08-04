import axios from "axios";

export default async () => {
  const { data } = await axios.get(process.env.API_BASE_URL + "/translations?locale=en");
  return {
    ...data.translations
  };
};

