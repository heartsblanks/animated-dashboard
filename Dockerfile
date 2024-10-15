# Step 1: Build the React frontend
FROM node:16 AS build

# Create app directory
WORKDIR /app

# Copy both package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Step 2: Set up the backend server
FROM node:16

# Create app directory
WORKDIR /app

# Copy only server files and build directory from the previous step
COPY --from=build /app/server /app/server
COPY --from=build /app/build /app/build
COPY --from=build /app/package*.json ./

# Install backend dependencies only
RUN npm install --only=production

# Expose the port that the backend server listens on
EXPOSE 5000

# Start the backend server
CMD ["node", "server/server.js"]