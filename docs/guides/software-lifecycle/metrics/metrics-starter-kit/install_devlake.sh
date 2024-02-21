#!/bin/bash

# Apache DevLake Installation Script
echo "=== Apache DevLake Installation ==="

# Step 1: Prerequisites
echo "Step 1: Prerequisites"
echo "Make sure you have Docker v19.03.10+ and docker-compose v2.2.3+ installed."
echo "If you have Docker Desktop installed, docker-compose is already included."

DOCKER_COMPOSE_URL="https://github.com/apache/incubator-devlake/releases/download/v0.20.0-beta4/docker-compose.yml"
ENV_EXAMPLE_URL="https://github.com/apache/incubator-devlake/releases/download/v0.20.0-beta4/env.example"

# Check if docker-compose.yml and env.example already exist
if [ ! -e docker-compose.yml ] && [ ! -e env.example ]; then
    # Step 2: Launch DevLake
    echo "Step 2. Downloading docker-compose.yml and env.example"
    wget $DOCKER_COMPOSE_URL
    wget $ENV_EXAMPLE_URL

    # Change permissions to allow read and write
    chmod 660 docker-compose.yml
    chmod 660 env.example

    echo "Step 3. Renaming env.example to .env..."
    mv env.example .env
else
    echo "Existing docker-compose.yml and env.example found. Skipping download."
fi

echo "Step 4. Generating encryption key..."
encryption_key=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)

# Method 2: Alternatively, you can set the ENCRYPTION_SECRET environment variable in the .env file
echo "Method 2: Setting in .env file"

# Check if .env file exists
if [ -e .env ]; then
    # Read existing content
    existing_content=$(cat .env)
    # Append new content to existing content
    printf "%s\nENCRYPTION_SECRET=\"%s\"\n" "$existing_content" "$encryption_key" >.env
else
    # If .env doesn't exist, create it with the new content
    printf "ENCRYPTION_SECRET=\"%s\"\n" "$encryption_key" >.env
    # Change permissions to allow read and write
    chmod 660 .env
fi

# Step 5: Run Docker Compose to launch DevLake
echo "Step 5: Launching DevLake with Docker Compose"
docker-compose down
docker-compose up -d

# Step 6: Collect data and view dashboards
echo "Step 6: Collect data and view dashboards"

echo "Visit http://localhost:4000 in your browser to configure DevLake and collect data."
echo "=== Installation Completed ==="
