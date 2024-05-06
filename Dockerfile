# # Stage 1: Building the app
# FROM node:18-alpine as builder

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json (or yarn.lock) to workdir
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of your app's source code from your host to your container workspace
# COPY . .

# # Build the application
# RUN npm run build

# # Stage 2: Serve the app using nginx
# FROM nginx:alpine

# # Copy the built assets from the build stage to the appropriate nginx folder for static files
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .

# # Expose port 80 to the Docker host, so we can access it from the outside
# EXPOSE 80

# # Start Nginx and keep it running in the foreground
# ENTRYPOINT ["nginx", "-g", "daemon off;"]


#Stage 1
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json .
COPY yarn*.lock .
RUN yarn install
COPY . .
RUN yarn build

#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]