#!/bin/bash

################################################################################
# Quiz Studio - Deployment Package Creator
# This script creates a deployable package for Quiz Studio
################################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="quiz-studio"
VERSION="1.0.0"
BUILD_DIR="build"
PACKAGE_DIR="${BUILD_DIR}/${PROJECT_NAME}-${VERSION}"
ARCHIVE_NAME="${PROJECT_NAME}-${VERSION}.tar.gz"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Quiz Studio - Deployment Package Builder                 ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Clean previous builds
echo -e "${YELLOW}Step 1: Cleaning previous builds...${NC}"
rm -rf ${BUILD_DIR}
mkdir -p ${PACKAGE_DIR}
echo -e "${GREEN}✓ Clean complete${NC}"
echo ""

# Step 2: Copy project files
echo -e "${YELLOW}Step 2: Copying project files...${NC}"

# Copy server files
mkdir -p ${PACKAGE_DIR}/server/{models,routes}
cp server/server.js ${PACKAGE_DIR}/server/
cp server/models/database.js ${PACKAGE_DIR}/server/models/
cp server/routes/*.js ${PACKAGE_DIR}/server/routes/

# Copy public files
mkdir -p ${PACKAGE_DIR}/public/{css,js}
cp public/index.html ${PACKAGE_DIR}/public/
cp public/admin.html ${PACKAGE_DIR}/public/
cp public/css/*.css ${PACKAGE_DIR}/public/css/
cp public/js/*.js ${PACKAGE_DIR}/public/js/

# Copy database directory
mkdir -p ${PACKAGE_DIR}/database

# Copy config files
cp package.json ${PACKAGE_DIR}/
cp package-lock.json ${PACKAGE_DIR}/

# Copy deployment scripts
cp deploy/*.sh ${PACKAGE_DIR}/ 2>/dev/null || true

# Copy documentation
cp README.md ${PACKAGE_DIR}/
cp *.md ${PACKAGE_DIR}/ 2>/dev/null || true

echo -e "${GREEN}✓ Files copied${NC}"
echo ""

# Step 3: Create .gitignore
echo -e "${YELLOW}Step 3: Creating .gitignore...${NC}"
cat > ${PACKAGE_DIR}/.gitignore << 'EOF'
node_modules/
database/quiz.db
.env
.env.local
.DS_Store
*.log
server.log
build/
*.tar.gz
EOF
echo -e "${GREEN}✓ .gitignore created${NC}"
echo ""

# Step 4: Create .env.example
echo -e "${YELLOW}Step 4: Creating .env.example...${NC}"
cat > ${PACKAGE_DIR}/.env.example << 'EOF'
# Quiz Studio Environment Configuration
NODE_ENV=production
PORT=3000
DATABASE_PATH=./database/quiz.db
EOF
echo -e "${GREEN}✓ .env.example created${NC}"
echo ""

# Step 5: Create deployment archive
echo -e "${YELLOW}Step 5: Creating deployment archive...${NC}"
cd ${BUILD_DIR}
tar -czf ../${ARCHIVE_NAME} ${PROJECT_NAME}-${VERSION}
cd ..
echo -e "${GREEN}✓ Archive created: ${ARCHIVE_NAME}${NC}"
echo ""

# Step 6: Create checksum
echo -e "${YELLOW}Step 6: Creating checksum...${NC}"
shasum -a 256 ${ARCHIVE_NAME} > ${ARCHIVE_NAME}.sha256
echo -e "${GREEN}✓ Checksum created: ${ARCHIVE_NAME}.sha256${NC}"
echo ""

# Step 7: Create deployment manifest
echo -e "${YELLOW}Step 7: Creating deployment manifest...${NC}"
cat > DEPLOYMENT_MANIFEST.txt << EOF
================================================================================
Quiz Studio - Deployment Package Manifest
================================================================================

Package:        ${PROJECT_NAME}-${VERSION}
Created:        $(date)
Archive:        ${ARCHIVE_NAME}
Archive Size:   $(du -h ${ARCHIVE_NAME} | cut -f1)
Checksum:       $(cat ${ARCHIVE_NAME}.sha256)

================================================================================
CONTENTS
================================================================================

server/
  ├── server.js              Main Express server
  ├── models/database.js     SQLite database
  └── routes/                API endpoints
      ├── characters.js
      ├── questions.js
      └── quiz.js

public/
  ├── index.html             Quiz interface
  ├── admin.html             Admin panel
  ├── css/                   Stylesheets
  └── js/                    JavaScript logic

database/                    Empty directory (created at deployment)

Configuration Files:
  ├── package.json           Dependencies
  ├── .env.example           Environment template
  ├── .gitignore             Git ignore rules
  └── deploy/                Deployment scripts

Documentation:
  ├── README.md              Full documentation
  ├── QUICK_START.md         Quick start guide
  ├── DEPLOYMENT.md          Deployment instructions
  └── *other guides*

================================================================================
PREREQUISITES
================================================================================

Before deployment, ensure your server has:
  ✓ Node.js 14+ (https://nodejs.org/)
  ✓ npm (comes with Node.js)
  ✓ bash shell
  ✓ At least 200MB free disk space
  ✓ Port 3000 available (or configure PORT env var)

================================================================================
DEPLOYMENT STEPS
================================================================================

1. Transfer Archive
   scp ${ARCHIVE_NAME} user@server:/path/to/

2. Extract Archive
   tar -xzf ${ARCHIVE_NAME}
   cd ${PROJECT_NAME}-${VERSION}

3. Install Dependencies
   npm install

4. Configure Environment
   cp .env.example .env
   nano .env  (Edit if needed)

5. Start Server
   npm start
   
   OR (for persistent background)
   nohup npm start > app.log 2>&1 &

6. Verify
   curl http://localhost:3000/api/health

7. (Optional) Setup as Service
   See DEPLOYMENT.md for systemd setup

================================================================================
PORTS & FIREWALL
================================================================================

Default Port:   3000
Configure with: PORT=3001 npm start

If behind reverse proxy (nginx, Apache):
  - Configure proxy to forward to localhost:3000
  - Enable gzip compression
  - Set appropriate timeouts

================================================================================
DATABASE
================================================================================

Location:       ./database/quiz.db
Type:           SQLite3
Size:           Auto-scales (typically < 1MB for thousands of questions)
Backup:         Copy database/quiz.db file regularly
Reset:          Delete quiz.db and restart (auto-recreates)

================================================================================
SUPPORT
================================================================================

For detailed instructions, see:
- DEPLOYMENT.md              Deployment guide
- README.md                  Full documentation
- QUICK_START.md             Quick reference

Questions? Check the documentation files included in the package.

================================================================================
EOF

echo -e "${GREEN}✓ Manifest created: DEPLOYMENT_MANIFEST.txt${NC}"
echo ""

# Step 8: Summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  ✅ DEPLOYMENT PACKAGE READY                             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Package Details:${NC}"
echo -e "  Archive:        ${ARCHIVE_NAME}"
echo -e "  Size:           $(du -h ${ARCHIVE_NAME} | cut -f1)"
echo -e "  Checksum:       $(head -c 32 ${ARCHIVE_NAME}.sha256)..."
echo -e "  Location:       $(pwd)/${ARCHIVE_NAME}"
echo ""
echo -e "${GREEN}Next Steps:${NC}"
echo -e "  1. Transfer the archive to your server:"
echo -e "     ${YELLOW}scp ${ARCHIVE_NAME} user@server:/path/to/${NC}"
echo ""
echo -e "  2. On the server, extract and deploy:"
echo -e "     ${YELLOW}tar -xzf ${ARCHIVE_NAME}${NC}"
echo -e "     ${YELLOW}cd ${PROJECT_NAME}-${VERSION}${NC}"
echo -e "     ${YELLOW}npm install${NC}"
echo -e "     ${YELLOW}npm start${NC}"
echo ""
echo -e "  3. Access the application:"
echo -e "     ${YELLOW}Quiz:  http://server-ip:3000${NC}"
echo -e "     ${YELLOW}Admin: http://server-ip:3000/admin${NC}"
echo ""
echo -e "${GREEN}Files created:${NC}"
echo -e "  ✓ ${ARCHIVE_NAME}"
echo -e "  ✓ ${ARCHIVE_NAME}.sha256"
echo -e "  ✓ DEPLOYMENT_MANIFEST.txt"
echo ""
