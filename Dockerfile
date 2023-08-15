FROM node:16

WORKDIR /app

# copy app content
COPY . .

# install and cache app dependencies
RUN npm install --silent

# start app
CMD [ "sh", "entrypoint.sh" ]

