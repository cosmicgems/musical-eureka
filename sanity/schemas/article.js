import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

export default {
    name: 'article',
    title: 'Article',
    type: 'document',
    fields: [
      
      {
        name: 'image',
        title: 'Image',
        type: 'string',
        options: {
          isHighlighted: true,
        },
        validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
      }
      ,
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 90,
        },
      },
      {
        name: 'desc',
        title: 'Desc',
        type: 'string',
      },
      {
        name: 'body',
        title: 'Body',
        type: 'text',
      },
      {
        name: 'postedBy',
        title: 'Posted By',
        type: 'reference',
        to: [{ type: 'user' }], // Replace 'author' with the actual document type for the reference
      },
      {
        name: 'createdAt',
        title: 'Creation Date and Time',
        type: 'datetime',
        readOnly: true, // Set the field as readonly
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        },
        initialValue: () => new Date().toISOString(), // Set initial value to the current date and time
      },
      {
        name: 'lastUpdated',
        title: 'Last Updated',
        type: 'datetime',
        hidden: true, // Hide the field from the editor
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        },
        initialValue: () => new Date().toISOString(), // Set initial value to the current date and time
        prepare: () => ({
          // Use a prepare function to update the field value when the document is modified
          title: 'Last Updated',
          subtitle: 'Automatically generated',
          media: <AccessTimeRoundedIcon />, // Use an appropriate icon
        }),
      },
      {
        name: 'postClicks',
        title: 'Post Clicks',
        type: 'number',
      },
      {
        name: 'postShares',
        title: 'Post Shares',
        type: 'number',
      },
      {
        name: 'saves',
        title: 'Saves',
        type: 'number',
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
      },
      {
        name: 'excerptMobile',
        title: 'Excerpt (Mobile)',
        type: 'text',
      },
      {
        name: 'metaTitle',
        title: 'Meta Title',
        type: 'string',
      },
      {
        name: 'metaDescription',
        title: 'Meta Description',
        type: 'text',
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }], // Replace 'category' with the actual document type for the reference
      },
      {
        name: 'subcategories',
        title: 'Subcategories',
        type: 'array', // Set the type as an array
        of: [{ type: 'reference', to: { type: 'subcategory' } }], // Use 'reference' type for the array elements
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'reference',
        to: [{ type: 'tag' }], // Replace 'tag' with the actual document type for the reference
      },
      {
        name: 'alternative_photo',
        title: 'Alternative Photo',
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
    ],
  };
  