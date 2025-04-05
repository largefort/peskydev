// Game showcase gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Define gallery items
    const galleryItems = [
        {
            title: "Trawlers Empire",
            thumbnail: createThumbnailSVG("trawler", "#4e5d94", "#7289da"),
            description: "A fishing trawler management simulation game",
            tags: ["Simulation", "Management", "Steam"]
        },
        {
            title: "Pixel Adventure",
            thumbnail: createThumbnailSVG("platformer", "#43b581", "#6edb9a"),
            description: "A challenging 2D pixel art platformer",
            tags: ["Platformer", "Pixel Art", "Browser Game"]
        },
        {
            title: "Space Blaster",
            thumbnail: createThumbnailSVG("space", "#f04747", "#f47c7c"),
            description: "Retro-style space shooter with modern mechanics",
            tags: ["Shooter", "Arcade", "Mobile"]
        },
        {
            title: "Puzzle Master",
            thumbnail: createThumbnailSVG("puzzle", "#faa61a", "#fbc55e"),
            description: "Brain-teasing puzzle game with unique mechanics",
            tags: ["Puzzle", "Casual", "Browser Game"]
        }
    ];

    // Create SVG thumbnails instead of using external images
    function createThumbnailSVG(type, color1, color2) {
        let svgContent = '';
        
        switch(type) {
            case "trawler":
                svgContent = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="100" y="50" fill="#2c7bb6" />
                    <path d="M0,50 L200,50 L200,60 Q100,80 0,60 Z" fill="#89c4f4" />
                    <rect x="50" y="20" width="100" height="40" fill="${color1}" />
                    <rect x="70" y="30" width="60" height="20" fill="${color2}" />
                    <path d="M80,10 L120,10 L130,20 L70,20 Z" fill="${color1}" />
                    <path d="M50,60 L150,60 L140,100 L60,100 Z" fill="${color2}" />
                    <circle cx="100" cy="80" r="10" fill="#f9f9f9" />
                </svg>`;
                break;
            case "platformer":
                svgContent = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="150" fill="#2e3338" />
                    <rect x="0" y="120" width="200" height="30" fill="${color1}" />
                    <rect x="40" y="90" width="60" height="30" fill="${color1}" />
                    <rect x="140" y="70" width="40" height="50" fill="${color1}" />
                    <circle cx="30" cy="70" r="15" fill="${color2}" />
                    <rect x="25" y="85" width="10" height="15" fill="${color2}" />
                    <rect x="15" y="100" width="30" height="10" fill="${color2}" />
                    <rect x="15" y="100" width="10" height="20" fill="${color2}" />
                    <rect x="35" y="100" width="10" height="20" fill="${color2}" />
                </svg>`;
                break;
            case "space":
                svgContent = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="150" fill="#131862" />
                    <circle cx="30" cy="30" r="15" fill="#f9f9f9" />
                    <circle cx="160" cy="40" r="5" fill="#f9f9f9" />
                    <circle cx="90" cy="20" r="3" fill="#f9f9f9" />
                    <circle cx="120" cy="60" r="2" fill="#f9f9f9" />
                    <circle cx="40" cy="80" r="4" fill="#f9f9f9" />
                    <circle cx="170" cy="90" r="3" fill="#f9f9f9" />
                    <path d="M95,80 L105,80 L100,60 Z" fill="${color1}" />
                    <rect x="90" y="80" width="20" height="30" fill="${color1}" />
                    <path d="M90,110 L85,120 L115,120 L110,110 Z" fill="${color2}" />
                    <rect x="80" y="90" width="10" height="5" fill="${color2}" />
                    <rect x="110" y="90" width="10" height="5" fill="${color2}" />
                </svg>`;
                break;
            case "puzzle":
                svgContent = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="150" fill="#f6f8fa" />
                    <rect x="40" y="30" width="40" height="40" rx="5" fill="${color1}" />
                    <rect x="90" y="30" width="40" height="40" rx="5" fill="${color2}" />
                    <rect x="140" y="30" width="40" height="40" rx="5" fill="${color1}" />
                    <rect x="40" y="80" width="40" height="40" rx="5" fill="${color2}" />
                    <rect x="90" y="80" width="40" height="40" rx="5" fill="${color1}" />
                    <rect x="140" y="80" width="40" height="40" rx="5" fill="${color2}" />
                </svg>`;
                break;
            default:
                svgContent = `<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="150" fill="#f6f8fa" />
                    <circle cx="100" cy="75" r="50" fill="${color1}" />
                    <text x="100" y="80" text-anchor="middle" fill="#fff" font-family="Arial" font-size="14">Game</text>
                </svg>`;
        }
        
        return svgContent;
    }

    // Set up event listeners for the gallery
    function initGallery() {
        // This will be called from the main app.js when the gallery tab is shown
    }

    // Make functions available globally or for import
    window.peskydevGallery = {
        items: galleryItems,
        init: initGallery
    };
});