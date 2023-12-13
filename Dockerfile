FROM mcr.microsoft.com/playwright:v1.39.0-jammy

ARG HTTP_CREDENTIALS_USERNAME
ARG HTTP_CREDENTIALS_PASSWORD

ENV HTTP_CREDENTIALS_USERNAME=HTTP_CREDENTIALS_USERNAME
ENV HTTP_CREDENTIALS_PASSWORD=HTTP_CREDENTIALS_PASSWORD

COPY . /playwright
WORKDIR /playwright

RUN npm ci

CMD ["npm", "test"]