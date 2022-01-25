FROM cypress/base:12.1.0
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install --save-dev cypress
RUN npm install --no-progress
RUN $(npm bin)/cypress verify
CMD npm run cucumber-run-specific-tags -- $TAGS
