FROM node:18-slim

WORKDIR /app


# Copy package files
COPY ./ ./

# Install dependencies
RUN npm install
RUN npm run build

# Run the test
CMD ["npm", "run", "test"] 