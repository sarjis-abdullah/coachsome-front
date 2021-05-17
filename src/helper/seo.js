export default {
  createSocialMeta: data => [
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: data.title
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: data.description
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: data.image
    },
    {
      hid: "twitter:image:alt",
      name: "twitter:image:alt",
      content: data.title
    },
    {
      hid: "og:title",
      property: "og:title",
      content: data.title
    },
    {
      hid: "og:description",
      property: "og:description",
      content: data.description
    },
    {
      hid: "og:image",
      property: "og:image",
      content: data.image
    },
    {
      hid: "og:image:secure_url",
      property: "og:image:secure_url",
      content: data.image
    },
    {
      hid: "og:image:alt",
      property: "og:image:alt",
      content: data.title
    }
  ]
};
