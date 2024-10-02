# Step 1: Use an official Node.js image to build the React app
FROM node:16-alpine AS build

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use a lightweight nginx image to serve the built app
FROM nginx:alpine

# Copy the built React app from the previous stage to the nginx web server
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
