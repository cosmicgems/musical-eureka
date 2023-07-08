export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'username',
        title: 'Username',
        type: 'string',
        validation: (Rule) => Rule.max(32),
        options: {
          lowercase: true,
        },
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule) => Rule.required(),
        options: {
          lowercase: true,
        },
      },
      {
        name: 'profile',
        title: 'Profile',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'about',
        title: 'About',
        type: 'text',
      },
      {
        name: 'role',
        title: 'Role',
        type: 'number',
        options: {
          list: [
            { title: 'User', value: 0 },
            { title: 'Admin', value: 1 },
          ],
          layout: 'radio',
        },
        initialValue: 0,
      },{
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        }
      }
      ,
      {
        name: 'creationDate',
        title: 'Creation Date',
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
        name: 'confirmed_account',
        title: 'Confirmed Account',
        type: 'boolean',
      },
    ],
    initialValue: {
      confirmed_account: false,
    },
  };
  