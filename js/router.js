/* ============================================
   LocalForge Dashboard - Router
   ============================================ */

// Simple Hash-based Router
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRouteChange());
        
        // Handle initial route
        window.addEventListener('load', () => {
            if (!location.hash) {
                location.hash = '#dashboard';
            }
            this.handleRouteChange();
        });
    }

    register(route, handler) {
        this.routes[route] = handler;
    }

    handleRouteChange() {
        const hash = location.hash.slice(1) || 'dashboard';
        this.currentRoute = hash;

        // Execute route handler if exists
        if (this.routes[hash]) {
            this.routes[hash]();
        }
    }

    navigate(route) {
        location.hash = route;
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

// Export router instance
const router = new Router();
