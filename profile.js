// User Profile Customization System for PeskyDev
import { createApp } from 'vue';

// Available profile icons (SVG-based)
const profileIcons = [
    {
        id: 'default',
        name: 'Default',
        svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="40" r="25" fill="#7289da" />
            <rect x="25" y="70" width="50" height="25" rx="10" fill="#7289da" />
        </svg>`
    },
    {
        id: 'developer',
        name: 'Game Dev',
        svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="35" r="20" fill="#4e5d94" />
            <rect x="30" y="55" width="40" height="20" rx="5" fill="#4e5d94" />
            <rect x="25" y="75" width="50" height="15" rx="5" fill="#4e5d94" />
            <rect x="40" y="15" width="20" height="10" rx="3" fill="#7289da" />
            <rect x="15" y="60" width="10" height="25" rx="3" fill="#7289da" />
            <rect x="75" y="60" width="10" height="25" rx="3" fill="#7289da" />
        </svg>`
    },
    {
        id: 'fishing',
        name: 'Fisherman',
        svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="30" r="20" fill="#43b581" />
            <rect x="35" y="50" width="30" height="25" rx="5" fill="#43b581" />
            <path d="M30,75 Q50,95 70,75" fill="#43b581" />
            <path d="M60,25 L85,10 L80,20 L90,25 L60,25" fill="#faa61a" />
        </svg>`
    },
    {
        id: 'astronaut',
        name: 'Astronaut',
        svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="40" r="25" fill="#99AAB5" />
            <circle cx="50" cy="40" r="18" fill="#2C2F33" />
            <circle cx="42" cy="35" r="3" fill="#FFFFFF" />
            <circle cx="58" cy="35" r="3" fill="#FFFFFF" />
            <rect x="35" y="65" width="30" height="25" rx="10" fill="#99AAB5" />
            <rect x="25" y="50" width="50" height="20" rx="10" fill="#99AAB5" />
        </svg>`
    },
    {
        id: 'ninja',
        name: 'Ninja',
        svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="40" r="25" fill="#2C2F33" />
            <rect x="35" y="32" width="30" height="5" fill="#f04747" />
            <circle cx="40" cy="35" r="3" fill="#FFFFFF" />
            <circle cx="60" cy="35" r="3" fill="#FFFFFF" />
            <rect x="30" y="60" width="40" height="25" rx="5" fill="#2C2F33" />
        </svg>`
    },
    {
        id: 'robot',
        name: 'Robot',
        svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="25" width="40" height="40" rx="5" fill="#7289da" />
            <rect x="40" y="65" width="20" height="15" rx="3" fill="#7289da" />
            <rect x="25" y="80" width="50" height="10" rx="3" fill="#7289da" />
            <circle cx="40" cy="40" r="5" fill="#f04747" />
            <circle cx="60" cy="40" r="5" fill="#f04747" />
            <rect x="35" y="50" width="30" height="5" rx="2" fill="#4e5d94" />
        </svg>`
    }
];

// Color themes for profile customization
const profileThemes = [
    { id: 'default', name: 'Default Blue', primary: '#7289da', secondary: '#4e5d94' },
    { id: 'green', name: 'Forest Green', primary: '#43b581', secondary: '#2e7d32' },
    { id: 'red', name: 'Ruby Red', primary: '#f04747', secondary: '#b33939' },
    { id: 'purple', name: 'Royal Purple', primary: '#9b59b6', secondary: '#8e44ad' },
    { id: 'orange', name: 'Sunset Orange', primary: '#faa61a', secondary: '#e67e22' },
    { id: 'teal', name: 'Ocean Teal', primary: '#00b0b3', secondary: '#008385' }
];

// Profile badges that users can earn
const profileBadges = [
    { id: 'new_member', name: 'New Member', description: 'Recently joined the community', icon: '🌟' },
    { id: 'forum_contributor', name: 'Forum Contributor', description: 'Created 5+ forum posts', icon: '📝' },
    { id: 'feedback_provider', name: 'Feedback Provider', description: 'Submitted valuable feedback', icon: '💡' },
    { id: 'idea_generator', name: 'Idea Generator', description: 'Suggested 3+ game features', icon: '✨' },
    { id: 'early_supporter', name: 'Early Supporter', description: 'Joined during the website launch', icon: '🚀' }
];

// Initialize profile system and export components
export { profileIcons, profileThemes, profileBadges };

// Handle profile customization logic
document.addEventListener('DOMContentLoaded', function() {
    // This code will interact with the main app.js
    // The actual rendering and state management is handled by Vue in app.js
});