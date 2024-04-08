#!/bin/bash

###############################################################################
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#        http://www.apache.org/licenses/LICENSE-2.0
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.
###############################################################################

echo "=== Apache DevLake Installation ==="

echo "Step 1: Prerequisites"
echo "Make sure you have Docker v19.03.10+ and docker-compose v2.2.3+ installed."
echo "If you have Docker Desktop installed, docker-compose is already included."

CURR_DEV_LAKE_VERSION="v0.20.0-beta4"
DOCKER_COMPOSE_URL="https://github.com/apache/incubator-devlake/releases/download/${CURR_DEV_LAKE_VERSION}/docker-compose.yml"
ENV_EXAMPLE_URL="https://github.com/apache/incubator-devlake/releases/download/${CURR_DEV_LAKE_VERSION}/env.example"

# Check if docker-compose.yml and env.example already exist
if [ ! -e docker-compose.yml ] && [ ! -e env.example ]; then
    echo "Step 2. Downloading docker-compose.yml and env.example"
    wget $DOCKER_COMPOSE_URL
    wget $ENV_EXAMPLE_URL

    chmod 660 docker-compose.yml
    chmod 660 env.example

    echo "Step 3. Renaming env.example to .env..."
    mv env.example .env
else
    echo "Existing docker-compose.yml and env.example found. Skipping download."
fi

echo "Step 4. Generating encryption key..."
encryption_key=$(openssl rand -base64 2000 | tr -dc 'A-Z' | fold -w 128 | head -n 1)

# Check if .env file exists
if [ -e .env ]; then
    existing_content=$(cat .env)
    printf "%s\nENCRYPTION_SECRET=\"%s\"\n" "$existing_content" "$encryption_key" >.env
else
    printf "ENCRYPTION_SECRET=\"%s\"\n" "$encryption_key" >.env
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
