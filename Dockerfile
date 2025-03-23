FROM node:23-alpine3.20

WORKDIR /uncle-book-system

# คัดลอกก่อนเพื่อ install dependency
COPY package.json package-lock.json ./

RUN npm install --only-production

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]