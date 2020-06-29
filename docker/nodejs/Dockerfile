FROM node:12.18-alpine3.12

# Create app directory
WORKDIR /var/www

# Install dependencies
COPY package*.json ./

# RUN npm install
# RUN npm ci --only-production 

# COPY . .

EXPOSE 80

CMD npm install && npm start

