FROM node:18-slim

WORKDIR /app

# Copy package files first
COPY honeyhive.tgz \
    package.json \
    tsconfig.json \
    .env \
    index.ts \
    ./

# Set npm to show verbose output
# ENV NPM_CONFIG_LOGLEVEL=verbose

# Install dependencies with verbose output
RUN npm install ./honeyhive.tgz --verbose

# ----------------------------------------------------------------------------
# Add additional testing dependencies here
RUN npm install openai --verbose
# ...

# ----------------------------------------------------------------------------

# Install package.json dependencies with verbose output
RUN npm install --verbose

# Build the application with verbose output and ensure errors are shown
RUN npm run build --verbose
#  || (echo "Build failed!" && npm run build --verbose && exit 1)

# Run the test
CMD ["npm", "run", "test"] 