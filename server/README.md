# Files Manager API

API for managing files (lectures, advertisements, projects ...etc) for universities, with private storage for each user.

## Features

- Students can access lectures and advertisements, and upload their projects for teachers to view.
- Teachers can upload, update, and delete lectures, as well as view student projects.
- Each user has a 2GB storage limit for their files, and each file is private to its owner.

## API design:

- Built with Node.js, Express.js, and MongoDB.
- Follows an object-oriented programming (OOP) approach.
- Designed using a layered system design with dependency injection.

# NPM scripts:

### Install dependencies:

```bash
npm install
```

### Creating modules

- Use this command to execute createModule script

```bash
npm run create-module [ModuleName]
```

### Importing Development Data:

```bash
npm run import-data
```

### Deleting Data from the Database:

```bash
npm run delete-data
```

### Run in Development mode

```bash
npm start
```

### Build for Production with Babel

```bash
npm run build
```

### Run in Production Mode:

```bash
npm run start:prod
```

### Linting with ESlint

```bash
npm run lint
```

## For Developers:

- Add .env.development and .env.production files, following the variables defined in example.env
