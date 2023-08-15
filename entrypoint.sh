#!/bin/bash


# Run migrations
npx sequelize-cli db:migrate

#waits for migrations
sleep 5

# Start server
npm start

