weights.benloe.com {
    # Handle API requests
    handle /api/* {
        reverse_proxy localhost:3003
    }

    # Handle static files
    handle {
        root * /var/apps/static/weights.benloe.com
        try_files {path} {path}/ /index.html
        file_server
    }
    
    # Enable compression
    encode gzip
    
    # Security headers
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        X-XSS-Protection "1; mode=block"
        Referrer-Policy strict-origin-when-cross-origin
    }
    
    # Cache static assets
    @static {
        file
        path *.css *.js *.png *.jpg *.jpeg *.gif *.webp *.svg *.ico
    }
    header @static Cache-Control "public, max-age=31536000"
}