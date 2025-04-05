// Blog functionality for PeskyDev website
import { createApp } from 'vue';

// Blog data structure
const blogPosts = [
    {
        id: 1,
        title: "Starting My Game Dev Journey",
        date: "January 15, 2023",
        summary: "How I began my journey as a solo game developer",
        content: `<p>I've always been passionate about games since I was a kid. At 16, I started learning HTML5, JavaScript, and CSS to make simple browser games. This post details my journey from a hobbyist to releasing my first commercial game on Steam.</p>
                <p>The learning curve was steep, but every challenge taught me something new. I spent countless hours watching tutorials, reading documentation, and experimenting with different game mechanics.</p>
                <p>My advice to aspiring game developers: start small, finish projects, and don't be afraid to share your work with others for feedback.</p>`,
        tags: ["beginnings", "game development", "learning"],
        comments: [
            {
                author: "GameFan22",
                date: "January 17, 2023",
                content: "Really inspiring story! I'm just starting out myself."
            },
            {
                author: "DevMaster",
                date: "January 18, 2023",
                content: "Great advice about finishing projects. So many beginners never complete anything!"
            }
        ]
    },
    {
        id: 2,
        title: "Creating Trawlers Empire",
        date: "March 30, 2023",
        summary: "The development process behind my fishing trawler simulation game",
        content: `<p>Trawlers Empire started as a simple prototype during a game jam. I was fascinated by simulation games and wanted to create something in an underserved niche: fishing trawler management.</p>
                <p>The biggest challenge was balancing realism with fun gameplay. I spent months researching commercial fishing operations, interviewing fishermen, and iterating on the core mechanics.</p>
                <p>The game evolved significantly from its initial concept. I had to cut several features to focus on polishing the core experience, but I believe this made for a stronger final product.</p>`,
        tags: ["Trawlers Empire", "game design", "development process"],
        comments: [
            {
                author: "FishingFan",
                date: "April 2, 2023",
                content: "As someone who works in the fishing industry, I'm impressed by the attention to detail!"
            }
        ]
    },
    {
        id: 3,
        title: "The Steam Release Experience",
        date: "May 10, 2023",
        summary: "What I learned from launching my first game on Steam",
        content: `<p>After months of development, testing, and marketing, Trawlers Empire finally launched on Steam. The release process was both exciting and nerve-wracking.</p>
                <p>Marketing was my biggest weakness. As a solo developer focused on coding and design, I underestimated how much effort would be needed to get my game noticed. I started marketing too late in the development process.</p>
                <p>Despite some challenges, seeing players enjoy my creation has been incredibly rewarding. The community feedback has been invaluable for planning updates and improvements.</p>`,
        tags: ["Steam", "game marketing", "launch", "Trawlers Empire"],
        comments: []
    }
];

// Export for use in main app
export { blogPosts };

// Initialize local blog functionality if needed
document.addEventListener('DOMContentLoaded', function() {
    // Any standalone blog functionality can be initialized here
});