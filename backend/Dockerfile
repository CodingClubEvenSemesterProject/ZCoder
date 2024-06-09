# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Rebuild native modules
RUN npm rebuild --build-from-source

# Install Python, Java, and C++ compilers
RUN apt-get update && apt-get install -y python3 python3-pip default-jdk g++

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]