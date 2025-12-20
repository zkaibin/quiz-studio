#!/bin/bash

################################################################################
# Quiz Studio - Deployment Script
# Deploys Quiz Studio on an existing server
# Usage: ./deploy-server.sh [options]
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Default configuration
APP_DIR="/opt/quiz-studio"
APP_USER="quiz"
APP_GROUP="quiz"
PORT=3000
ENVIRONMENT="production"
ENABLE_SERVICE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --app-dir)
      APP_DIR="$2"
      shift 2
      ;;
    --app-user)
      APP_USER="$2"
      shift 2
      ;;
    --port)
      PORT="$2"
      shift 2
      ;;
    --service)
      ENABLE_SERVICE=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Quiz Studio - Server Deployment Script                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Verify prerequisites
echo -e "${YELLOW}Step 1: Verifying prerequisites...${NC}"

if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js is not installed${NC}"
  echo "  Install from: https://nodejs.org/"
  exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

if ! command -v npm &> /dev/null; then
  echo -e "${RED}✗ npm is not installed${NC}"
  exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

echo ""

# Step 2: Create application directory
echo -e "${YELLOW}Step 2: Setting up application directory...${NC}"

if [ ! -d "$APP_DIR" ]; then
  sudo mkdir -p "$APP_DIR"
  echo -e "${GREEN}✓ Created $APP_DIR${NC}"
else
  echo -e "${GREEN}✓ $APP_DIR exists${NC}"
fi

echo ""

# Step 3: Check if current directory has package.json
echo -e "${YELLOW}Step 3: Verifying installation files...${NC}"

if [ ! -f "package.json" ]; then
  echo -e "${RED}✗ package.json not found in current directory${NC}"
  echo "  Make sure you're in the Quiz Studio directory"
  exit 1
fi
echo -e "${GREEN}✓ package.json found${NC}"

echo ""

# Step 4: Copy files to app directory
echo -e "${YELLOW}Step 4: Copying files...${NC}"

sudo cp -r . "$APP_DIR/"
echo -e "${GREEN}✓ Files copied to $APP_DIR${NC}"

echo ""

# Step 5: Set permissions
echo -e "${YELLOW}Step 5: Setting permissions...${NC}"

sudo chown -R "$APP_USER:$APP_GROUP" "$APP_DIR" 2>/dev/null || {
  echo -e "${YELLOW}⚠ Couldn't set ownership to $APP_USER:$APP_GROUP${NC}"
  echo "  Using current user permissions instead"
}

sudo chmod -R 755 "$APP_DIR"
echo -e "${GREEN}✓ Permissions set${NC}"

echo ""

# Step 6: Install dependencies
echo -e "${YELLOW}Step 6: Installing Node.js dependencies...${NC}"

cd "$APP_DIR"
npm install --production
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo ""

# Step 7: Create .env file
echo -e "${YELLOW}Step 7: Configuring environment...${NC}"

if [ ! -f "$APP_DIR/.env" ]; then
  cat > "$APP_DIR/.env" << EOF
NODE_ENV=${ENVIRONMENT}
PORT=${PORT}
DATABASE_PATH=./database/quiz.db
EOF
  echo -e "${GREEN}✓ .env file created${NC}"
else
  echo -e "${YELLOW}⚠ .env file already exists${NC}"
fi

echo ""

# Step 8: Create database directory
echo -e "${YELLOW}Step 8: Setting up database...${NC}"

mkdir -p "$APP_DIR/database"
chmod 755 "$APP_DIR/database"
echo -e "${GREEN}✓ Database directory ready${NC}"

echo ""

# Step 9: Create systemd service (optional)
if [ "$ENABLE_SERVICE" = true ]; then
  echo -e "${YELLOW}Step 9: Creating systemd service...${NC}"
  
  sudo tee /etc/systemd/system/quiz-studio.service > /dev/null << EOF
[Unit]
Description=Quiz Studio - Math Quiz Generator
After=network.target

[Service]
Type=simple
User=$APP_USER
WorkingDirectory=$APP_DIR
Environment="NODE_ENV=$ENVIRONMENT"
Environment="PORT=$PORT"
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
  
  sudo systemctl daemon-reload
  echo -e "${GREEN}✓ Systemd service created${NC}"
  echo ""
fi

# Step 10: Final summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  ✅ DEPLOYMENT COMPLETE                                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${GREEN}Application Location:${NC}  $APP_DIR"
echo -e "${GREEN}Application Port:${NC}      $PORT"
echo -e "${GREEN}Environment:${NC}          $ENVIRONMENT"
echo ""

echo -e "${YELLOW}To start the application:${NC}"
echo ""

if [ "$ENABLE_SERVICE" = true ]; then
  echo "  1. As a service:"
  echo -e "     ${YELLOW}sudo systemctl start quiz-studio${NC}"
  echo -e "     ${YELLOW}sudo systemctl enable quiz-studio${NC}"
  echo ""
  echo "  2. Check status:"
  echo -e "     ${YELLOW}sudo systemctl status quiz-studio${NC}"
  echo ""
  echo "  3. View logs:"
  echo -e "     ${YELLOW}sudo journalctl -u quiz-studio -f${NC}"
else
  echo "  1. Development mode:"
  echo -e "     ${YELLOW}cd $APP_DIR && npm start${NC}"
  echo ""
  echo "  2. Production background:"
  echo -e "     ${YELLOW}cd $APP_DIR && nohup npm start > app.log 2>&1 &${NC}"
fi

echo ""
echo -e "${YELLOW}Access the application:${NC}"
echo ""
echo -e "  Quiz Interface:  ${YELLOW}http://localhost:$PORT${NC}"
echo -e "  Admin Panel:     ${YELLOW}http://localhost:$PORT/admin${NC}"
echo -e "  Health Check:    ${YELLOW}http://localhost:$PORT/api/health${NC}"
echo ""

echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo "  1. Verify the application is running"
echo "  2. Configure firewall to allow port $PORT"
echo "  3. (Optional) Configure reverse proxy (nginx/Apache)"
echo "  4. Add initial data via Admin panel"
echo "  5. Backup database regularly"
echo ""

echo -e "${GREEN}For more details, see README.md${NC}"
echo ""
