#!/bin/bash
sleep 5 && npx sequelize-cli db:migrate && npm test