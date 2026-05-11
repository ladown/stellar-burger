# Stellar Burger — React + Redux SPA

A burger constructor application with drag-and-drop ordering, user authentication, and real-time order tracking via WebSocket.

## Tech Stack

![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat&logo=jest&logoColor=white)
![Cypress](https://img.shields.io/badge/-Cypress-17202C?style=flat&logo=cypress&logoColor=white)

## Features

- Drag-and-drop burger constructor with custom ingredients
- JWT-based authentication: registration, login, password recovery, profile editing
- Order history and real-time order feed via WebSocket
- Protected routes and persistent sessions
- Unit tests with Jest, E2E tests with Cypress

## Getting Started

```bash
npm install
npm run start
```

The app will run on `http://localhost:3000`.

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run cypress:open
```

## About

This is a learning project from the **Web Development Master's program at NUST MISIS in partnership with Yandex Practicum**, covering the full React ecosystem: state management, routing, authentication, real-time data, and testing strategy.
