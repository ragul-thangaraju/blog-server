# Blog
This repo contains Blog backend code

---
## Requirements

For development, you will need Node.js latest version and a node global package installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm


Folder Structure
================

```
app
├── config
│   └── config.js
├── entity (Mongoose Collection)
│   └── index.js
│   └── post_comments.js
│   └── posts.js
│   └── profile_types.js
│   └── users.js
├── services 
│   └── blog
│       └── index.js
│       └── controller.js
│       └── modal.js
│   └── routes
│       └── index.js
│   └── util
│       └── db.js
│       └── util.js
├── package.json
└── server.js
```

