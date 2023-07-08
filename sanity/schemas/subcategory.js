export default {
    name: 'subcategory',
    title: 'Subcategory',
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
      {
        name: 'photo',
        title: 'Photo',
        type: 'object',
        fields: [
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url',
          },
        ],
      }
      ,
      {
        name: 'createdAt',
        title: 'Creation Date and Time',
        type: 'datetime',
        readOnly: true,
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        },
      },
      {
        name: 'updatedAt',
        title: 'Update Date and Time',
        type: 'datetime',
        readOnly: true,
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        },
      },
    ],
    initialValue: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
  