FROM node:20-alpine

WORKDIR /app

# Copy package definition files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Expose Metro bundler and web dev ports
EXPOSE 8081 19006

# Start Expo dev server
CMD ["npx", "expo", "start", "--web"]
