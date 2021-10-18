# pull official base image
FROM node:12.13.0-alpine

# set working directory
WORKDIR /ct-dashboard

# add `/app/node_modules/.bin` to $PATH
ENV PATH /ct-dashboard/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
# RUN yarn global add react-scripts@3.4.1  --silent

# add app
COPY . ./

# start app
# CMD ["npm", "start"]
CMD yarn start
# CMD tail -f /dev/null
