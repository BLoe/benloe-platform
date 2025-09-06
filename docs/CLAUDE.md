# System Context for benloe.com VPS

## Environment Overview

You are operating on Ben's experimental VPS that hosts multiple web projects under benloe.com. This server is designed for rapid prototyping, learning, and experimentation with various technologies.

**IMPORTANT: You are running as ROOT user on this system. Do NOT use 'sudo' in commands - you have full administrative access.**

**Your Role:**
- Build and deploy experimental web applications
- Manage multiple subdomains with different technology stacks
- Optimize for fast iteration and learning
- Leverage your training data by using well-documented technologies

## System Architecture

The server uses Caddy as the main reverse proxy, routing traffic to:
- Static files at `/var/www/[subdomain].benloe.com/`
- PHP applications via PHP-FPM
- Node.js applications on various ports (managed by PM2)
- Docker containers when needed
- Any other runtimes as experiments require

Each subdomain operates independently with its own technology choices.

## Directory Conventions

```
/var/www/               # Static sites and PHP applications
/var/apps/              # Node.js/full applications
/var/repos/             # Git bare repositories for deployment
/var/data/              # SQLite databases and persistent data
/etc/caddy/Caddyfile.d/ # Per-subdomain Caddy configurations
~/scripts/              # Utility and automation scripts
```

## Technology Preferences

**Choose technologies with strong representation in training data:**
- React with Next.js (Pages Router) over newer/exotic frameworks
- Node.js with Express for APIs
- PostgreSQL with Prisma for complex data needs
- SQLite for simple projects
- Tailwind CSS with Shadcn UI for interfaces
- Standard patterns over creative solutions

**For rapid experiments:**
- Single HTML files with inline CSS/JS
- CDN-loaded libraries over npm packages
- PHP for quick server-side logic
- SQLite for simple persistence

## Project Creation Guidelines

When creating new projects:

1. **Check if subdomain exists** before creating directories
2. **Start minimal** - single file if possible
3. **Use git** - initialize repository immediately
4. **Create project-specific CLAUDE.md** in project directory
5. **Choose boring technology** unless specifically asked otherwise
6. **Comment thoroughly** - future debugging depends on it

## Deployment Approach

**For static sites:**
- Place files directly in `/var/www/[subdomain].benloe.com/`
- Configure Caddy to serve with file_server

**For PHP applications:**
- Place in `/var/www/[subdomain].benloe.com/`
- Caddy already routes *.php to PHP-FPM

**For Node.js applications:**
- Place in `/var/apps/[subdomain].benloe.com/`
- Choose port 3000+ (check which are in use)
- Use PM2: `pm2 start app.js --name [subdomain]`
- Add Caddy reverse proxy configuration

**For experiments:**
- Use `/var/www/experiments/` for single-file tests
- These don't need full project structure

## Database Strategy

- **Default to SQLite** - it's sufficient for most experiments
- Store in `/var/data/[project].db`
- Only use PostgreSQL when specifically needed:
  - Complex relationships
  - Concurrent writes
  - Specific PostgreSQL features required

## Git Repository Pattern

All projects use GitHub (github.com/BLoe) as the remote repository:

1. **For new projects:**
   ```bash
   # Initialize local repository
   cd /var/www/[subdomain].benloe.com
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create GitHub repo (using GitHub CLI if installed, or manually)
   # Then add remote:
   git remote add origin https://github.com/BLoe/[project-name].git
   git push -u origin main
   ```

2. **For deployment:**
   - Work directly on VPS for experiments
   - Push changes to GitHub for backup
   - For production-like projects, can set up GitHub Actions for deployment

3. **Repository naming convention:**
   - `benloe-[subdomain]` for subdomain projects
   - `experiment-[name]` for quick experiments
   - Keep names clear and searchable

## Security Considerations

- Firewall is configured (ports 22, 80, 443 only)
- SSH uses key authentication only
- Caddy handles SSL automatically
- This is a personal experimental server, not production
- Focus on learning over hardening

## Resource Management

- Server has 8GB RAM and 4 CPUs - use them freely
- Run multiple experiments simultaneously
- Don't optimize prematurely
- Check resource usage with htop if things feel slow
- PM2 handles Node.js process management

## Error Handling

When things break:
- Check logs first (journalctl, PM2 logs, Caddy logs)
- Simple solutions preferred over complex fixes
- OK to delete and rebuild experiments
- Document solutions in project CLAUDE.md files

## Backup Approach

- All code should be in git (local and remote)
- Database dumps can be committed for small datasets
- Configuration files should be version controlled
- Manual DigitalOcean snapshots for milestones
- Experimental data loss is acceptable

## Key Principles

1. **Working code over perfect code**
2. **Single files are valid solutions**
3. **Static HTML is powerful enough for many things**
4. **Boring technology with good documentation**
5. **Each subdomain is independent**
6. **Experiments can fail and be abandoned**
7. **Learning and fun are primary goals**

## Current Infrastructure

To check what's installed and running:
- `nvm current` - Node.js version
- `php -v` - PHP version
- `pm2 list` - Running Node applications
- `caddy version` - Caddy version
- `ls /var/www/` - Active static/PHP sites
- `ls /var/apps/` - Node.js applications

## Owner Context

Ben is an experienced developer (15+ years) exploring personal projects for the first time. He's comfortable with web technologies but new to DevOps/infrastructure. He values:
- Fast iteration and experimentation
- Learning by building
- Trying different approaches
- LLM-assisted development

## Standard Responses

When asked to create something new:
1. Confirm the subdomain is available
2. Start with simplest possible implementation
3. Create git repository
4. Add to Caddy configuration if needed
5. Test that it works
6. Document in project-specific CLAUDE.md

When asked to modify something:
1. Check current implementation first
2. Make minimal necessary changes
3. Commit changes to git
4. Test thoroughly
5. Update documentation

## Important Notes

- This server prioritizes experimentation over production readiness
- Multiple technology stacks coexisting is intentional
- Abandoned projects are normal and acceptable
- Simple solutions are preferred over complex ones
- The goal is learning and fun, not perfection

---

*This document provides system context. Query the system directly for current state, versions, and specific configurations.*