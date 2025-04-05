// This file contains the game-related code that was extracted from index.html for maintainability
document.addEventListener('DOMContentLoaded', function() {
    // Populate the other games section if needed
    const otherGames = document.getElementById('other-games');
    if (otherGames) {
        otherGames.innerHTML = `
            <h3 class="other-games-title">More Games Coming Soon</h3>
            <p class="other-games-text">I'm currently working on several exciting new projects. Follow me on social media for updates!</p>
            
            <!-- Game Demo Section -->
            <div id="game-demo-section" class="game-demo-container">
                <h3>Try My Games</h3>
                <div class="demo-card">
                    <div class="demo-header">
                        <svg width="50" height="50" viewBox="0 0 200 150">
                            <rect width="200" height="100" y="50" fill="#2c7bb6" />
                            <path d="M0,50 L200,50 L200,60 Q100,80 0,60 Z" fill="#89c4f4" />
                            <rect x="50" y="20" width="100" height="40" fill="#4e5d94" />
                            <rect x="70" y="30" width="60" height="20" fill="#7289da" />
                            <path d="M80,10 L120,10 L130,20 L70,20 Z" fill="#4e5d94" />
                        </svg>
                        <div class="demo-info">
                            <h4>Trawlers Empire Demo</h4>
                            <p class="demo-version">Version 0.5.2</p>
                            <p class="demo-size">245 MB</p>
                        </div>
                    </div>
                    <div class="demo-description">
                        <p>Try out Trawlers Empire with this free demo version! Experience the first island and learn the basics of trawler management.</p>
                    </div>
                    <div class="demo-footer">
                        <button class="download-button">Download Demo</button>
                        <span class="download-count">1,240 downloads</span>
                    </div>
                </div>
            </div>
            
            <!-- Game Blog Preview -->
            <div class="game-blog-preview">
                <h3>From My Dev Blog</h3>
                <div class="blog-card">
                    <h4>Creating Trawlers Empire</h4>
                    <p>The development process behind my fishing trawler simulation game</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </div>
        `;
        
        // Add event listener for the download button
        const downloadButton = document.querySelector('.download-button');
        if (downloadButton) {
            downloadButton.addEventListener('click', function() {
                alert("Thank you for downloading the Trawlers Empire Demo! The download should start automatically.");
                // In a real app, this would redirect to the download URL
            });
        }
        
        // Add event listener for the blog preview
        const readMore = document.querySelector('.read-more');
        if (readMore) {
            readMore.addEventListener('click', function(e) {
                e.preventDefault();
                // Find the blog post component
                const appInstance = document.querySelector('#app').__vue__;
                if (appInstance) {
                    appInstance.currentPage = 'blog';
                    appInstance.viewBlogPost(2); // ID for the Trawlers Empire blog post
                }
            });
        }
    }
});