FROM node:20

WORKDIR /atrevete

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn set version stable && yarn install

COPY . .

CMD [ "yarn", "develop" ]