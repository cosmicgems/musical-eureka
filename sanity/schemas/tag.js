export default {
    name: 'tag',
    title: 'Tag',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required().max(32),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        // validation: (Rule) => Rule.unique(),
        options: {
          source: 'name',
          maxLength: 90,
        },
      },
    ],
  };
  