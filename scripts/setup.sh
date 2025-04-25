#!/bin/bash

# Development setup script for jeremymastering.com
# This script sets up a lightweight development environment

# Print colorful messages
print_message() {
  echo -e "\e[34m==>\e[0m \e[1m$1\e[0m"
}

print_success() {
  echo -e "\e[32m==>\e[0m \e[1m$1\e[0m"
}

print_error() {
  echo -e "\e[31m==>\e[0m \e[1m$1\e[0m"
}

# Check if Docker is installed
check_docker() {
  if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker to continue."
    exit 1
  fi
  
  if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose to continue."
    exit 1
  fi
}

# Create minimal required directories
create_directories() {
  print_message "Creating required directories..."
  
  mkdir -p public/projects
  mkdir -p public/fonts
  mkdir -p public/images
  mkdir -p public/icons
  
  print_success "Directories created!"
}

# Set up environment variables
setup_env() {
  print_message "Setting up environment variables..."
  
  if [ ! -f .env ]; then
    cat > .env << EOL
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
APP_URL=http://localhost:3000
MEDIA_URL=http://localhost:8080
EOL
    print_success "Created .env file"
  else
    print_success ".env file already exists"
  fi
}

# Set up lightweight development mode
setup_lightweight_mode() {
  print_message "Setting up lightweight development mode..."
  
  # Create placeholder files for media
  touch public/projects/.placeholder
  touch public/fonts/.placeholder
  touch public/images/.placeholder
  
  # Create symbolic link to node_modules to avoid reinstalling
  if [ ! -d node_modules ] && [ -d ../.shared-node-modules ]; then
    print_message "Using shared node modules..."
    ln -s ../.shared-node-modules node_modules
  fi
  
  print_success "Lightweight mode setup complete!"
}

# Build Docker containers
build_containers() {
  print_message "Building Docker containers (this may take a few minutes)..."
  
  docker-compose build
  
  print_success "Docker containers built successfully!"
}

# Main setup process
main() {
  print_message "Starting development setup for jeremymastering.com"
  
  check_docker
  create_directories
  setup_env
  setup_lightweight_mode
  
  print_message "Would you like to build Docker containers now? (y/n)"
  read -r response
  if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    build_containers
  else
    print_message "Skipping Docker build. You can build later with 'docker-compose build'"
  fi
  
  print_success "Setup complete! Start development with:"
  echo "  npm run dev        # For local development"
  echo "  docker-compose up  # For containerized development"
}

# Run main function
main