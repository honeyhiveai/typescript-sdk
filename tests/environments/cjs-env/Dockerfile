FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package.json ./
COPY honeyhive-1.0.20.tgz ./

# Install dependencies
RUN npm install

# Copy TypeScript files
COPY tsconfig.json ./
COPY *.ts ./

# Compile TypeScript
RUN npx tsc

# Run the test
CMD ["node", "dist/index.js"] 