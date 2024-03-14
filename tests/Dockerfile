# Use the official Node.js image as a parent image
FROM node:20

# Set the working directory in the container for the application code
WORKDIR /usr/src/app

# Copy the entire honeyhive package to the container
COPY . .

# Install the root package dependencies first (if necessary)
RUN npm install

# Now, set up the test environment
# Navigate to the test directory inside the container
WORKDIR /usr/src/app/tests

# Copy the test directory's package.json and other test files into the container
COPY ./tests/package.json ./tests/* ./

# Install the test-specific dependencies
RUN npm install

# CMD to run the tests can be specified here
CMD ["npm", "test"]
