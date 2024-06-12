# Step 1: Use an official Node runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 3000

# Step 8: Define the command to run the app
CMD ["npm", "run", "start:prod"]