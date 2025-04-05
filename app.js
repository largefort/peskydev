import { createApp } from 'vue';
import { blogPosts } from './blog.js';
import { profileIcons, profileThemes, profileBadges } from './profile.js';

const app = createApp({
    data() {
        return {
            currentPage: 'home',
            showLoginModal: false,
            showRegisterModal: false,
            isLoggedIn: false,
            currentUser: null,
            users: [],
            loginForm: {
                username: '',
                password: ''
            },
            registerForm: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            loginError: null,
            registerError: null,
            activeTab: 'forum',
            forumPosts: [],
            replyContent: {},
            newPost: {
                title: '',
                content: ''
            },
            feedback: {
                title: '',
                type: 'improvement',
                content: ''
            },
            suggestion: {
                game: 'pixel-adventure',
                title: '',
                description: ''
            },
            gameSuggestions: [],
            userVotes: [],
            blogPosts: blogPosts,
            currentBlogPost: null,
            newComment: '',
            showGallery: false,
            galleryItems: [],
            downloadableDemo: {
                name: 'Trawlers Empire Demo',
                version: '0.5.2',
                size: '245 MB',
                releaseDate: '2023-05-01',
                downloadCount: 1240,
                minRequirements: {
                    os: 'Windows 7/10/11, macOS 10.14+',
                    processor: 'Intel Core i3 2.0GHz or equivalent',
                    memory: '4 GB RAM',
                    graphics: 'DirectX 11 compatible GPU with 1GB VRAM',
                    storage: '500 MB available space'
                }
            },
            profileTab: 'customize',
            profileIcons: profileIcons,
            profileThemes: profileThemes,
            profileBadges: profileBadges,
            selectedIcon: 'default',
            selectedTheme: 'default',
            customFields: {
                bio: '',
                location: '',
                website: '',
                favoriteGame: '',
            },
            showUsernameEdit: false,
            newUsername: '',
            userActivities: []
        };
    },
    created() {
        this.loadUsers();
        this.loadPosts();
        this.loadSuggestions();
        this.checkAuthentication();
        
        if (window.peskydevGallery) {
            this.galleryItems = window.peskydevGallery.items;
        }
        
        if (this.isLoggedIn && this.currentUser) {
            this.loadProfileData();
        }
    },
    methods: {
        loadUsers() {
            const storedUsers = localStorage.getItem('peskydev_users');
            if (storedUsers) {
                this.users = JSON.parse(storedUsers);
            }
        },
        saveUsers() {
            localStorage.setItem('peskydev_users', JSON.stringify(this.users));
        },
        checkAuthentication() {
            const userData = localStorage.getItem('peskydev_current_user');
            if (userData) {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
            }
        },
        login() {
            this.loginError = null;
            
            if (!this.loginForm.username || !this.loginForm.password) {
                this.loginError = 'Please enter both username and password.';
                return;
            }
            
            const user = this.users.find(u => 
                u.username.toLowerCase() === this.loginForm.username.toLowerCase() && 
                u.password === this.loginForm.password
            );
            
            if (user) {
                const userInfo = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
                localStorage.setItem('peskydev_current_user', JSON.stringify(userInfo));
                this.currentUser = userInfo;
                this.isLoggedIn = true;
                this.showLoginModal = false;
                this.loginForm = { username: '', password: '' };
                
                this.loadUserVotes();
                this.addUserActivity('login', 'Logged in to account');
                this.loadProfileData();
            } else {
                this.loginError = 'Invalid username or password.';
            }
        },
        register() {
            this.registerError = null;
            
            if (!this.registerForm.username || !this.registerForm.email || 
                !this.registerForm.password || !this.registerForm.confirmPassword) {
                this.registerError = 'Please fill in all fields.';
                return;
            }
            
            if (this.registerForm.password !== this.registerForm.confirmPassword) {
                this.registerError = 'Passwords do not match.';
                return;
            }
            
            if (this.users.some(u => u.username.toLowerCase() === this.registerForm.username.toLowerCase())) {
                this.registerError = 'Username already taken.';
                return;
            }
            
            const newUser = {
                id: Date.now().toString(),
                username: this.registerForm.username,
                email: this.registerForm.email,
                password: this.registerForm.password,
                dateJoined: new Date().toISOString()
            };
            
            this.users.push(newUser);
            this.saveUsers();
            
            const userInfo = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            };
            
            localStorage.setItem('peskydev_current_user', JSON.stringify(userInfo));
            this.currentUser = userInfo;
            this.isLoggedIn = true;
            this.showRegisterModal = false;
            this.registerForm = { username: '', email: '', password: '', confirmPassword: '' };
            
            localStorage.setItem(`peskydev_votes_${userInfo.id}`, JSON.stringify([]));
            this.userVotes = [];
            
            localStorage.setItem(`peskydev_profile_${newUser.id}`, JSON.stringify({
                icon: 'default',
                theme: 'default',
                fields: {
                    bio: '',
                    location: '',
                    website: '',
                    favoriteGame: ''
                }
            }));
            
            const firstActivity = {
                id: Date.now().toString(),
                type: 'login',
                description: 'Created account and logged in',
                date: new Date().toISOString()
            };
            localStorage.setItem(`peskydev_activities_${newUser.id}`, JSON.stringify([firstActivity]));
            this.userActivities = [firstActivity];
        },
        logout() {
            localStorage.removeItem('peskydev_current_user');
            this.currentUser = null;
            this.isLoggedIn = false;
            
            if (this.currentPage === 'members') {
                this.currentPage = 'home';
            }
        },
        loadPosts() {
            const storedPosts = localStorage.getItem('peskydev_forum_posts');
            if (storedPosts) {
                this.forumPosts = JSON.parse(storedPosts);
            }
        },
        savePosts() {
            localStorage.setItem('peskydev_forum_posts', JSON.stringify(this.forumPosts));
        },
        addForumPost() {
            if (!this.newPost.title || !this.newPost.content) {
                alert('Please fill in both title and content for your post.');
                return;
            }
            
            const post = {
                id: Date.now().toString(),
                author: this.currentUser.username,
                authorId: this.currentUser.id,
                title: this.newPost.title,
                content: this.newPost.content,
                date: new Date().toISOString(),
                replies: []
            };
            
            this.forumPosts.unshift(post);
            this.savePosts();
            
            this.newPost = { title: '', content: '' };
            this.addUserActivity('forum_post', `Created forum post: ${this.newPost.title}`);
        },
        addReply(postId) {
            const content = this.replyContent[postId];
            if (!content) {
                alert('Please enter a reply.');
                return;
            }
            
            const post = this.forumPosts.find(p => p.id === postId);
            if (post) {
                const reply = {
                    id: Date.now().toString(),
                    author: this.currentUser.username,
                    authorId: this.currentUser.id,
                    content: content,
                    date: new Date().toISOString()
                };
                
                post.replies.push(reply);
                this.savePosts();
                
                this.$set(this.replyContent, postId, '');
                this.addUserActivity('forum_reply', `Replied to a forum post`);
            }
        },
        submitFeedback() {
            if (!this.feedback.title || !this.feedback.content) {
                alert('Please fill in all fields.');
                return;
            }
            
            alert(`Feedback submitted! A message has been sent to support@peskydev.com\n\nSubject: ${this.feedback.title}\nType: ${this.feedback.type}\nMessage: ${this.feedback.content}`);
            
            this.feedback = {
                title: '',
                type: 'improvement',
                content: ''
            };
            this.addUserActivity('feedback', `Submitted feedback: ${this.feedback.title}`);
        },
        loadSuggestions() {
            const storedSuggestions = localStorage.getItem('peskydev_game_suggestions');
            if (storedSuggestions) {
                this.gameSuggestions = JSON.parse(storedSuggestions);
            }
        },
        saveSuggestions() {
            localStorage.setItem('peskydev_game_suggestions', JSON.stringify(this.gameSuggestions));
        },
        loadUserVotes() {
            if (this.currentUser) {
                const userVotes = localStorage.getItem(`peskydev_votes_${this.currentUser.id}`);
                if (userVotes) {
                    this.userVotes = JSON.parse(userVotes);
                } else {
                    this.userVotes = [];
                }
            }
        },
        saveUserVotes() {
            if (this.currentUser) {
                localStorage.setItem(`peskydev_votes_${this.currentUser.id}`, JSON.stringify(this.userVotes));
            }
        },
        submitSuggestion() {
            if (!this.suggestion.title || !this.suggestion.description) {
                alert('Please fill in all fields.');
                return;
            }
            
            let displayGameName = this.suggestion.game;
            if (displayGameName === 'pixel-adventure') {
                displayGameName = 'Pixel Adventure';
            } else if (displayGameName === 'space-blaster') {
                displayGameName = 'Space Blaster';
            } else if (displayGameName === 'puzzle-master') {
                displayGameName = 'Puzzle Master';
            }
            
            const suggestion = {
                id: Date.now().toString(),
                author: this.currentUser.username,
                authorId: this.currentUser.id,
                game: displayGameName,
                title: this.suggestion.title,
                description: this.suggestion.description,
                date: new Date().toISOString(),
                upvotes: 0
            };
            
            this.gameSuggestions.unshift(suggestion);
            this.saveSuggestions();
            
            this.suggestion = {
                game: this.suggestion.game,
                title: '',
                description: ''
            };
            this.addUserActivity('suggestion', `Suggested new feature: ${this.suggestion.title}`);
        },
        upvoteSuggestion(suggestionId) {
            if (this.hasVoted(suggestionId)) {
                return;
            }
            
            const suggestion = this.gameSuggestions.find(s => s.id === suggestionId);
            if (suggestion) {
                suggestion.upvotes += 1;
                this.userVotes.push(suggestionId);
                
                this.saveSuggestions();
                this.saveUserVotes();
            }
        },
        hasVoted(suggestionId) {
            return this.userVotes.includes(suggestionId);
        },
        viewBlogPost(postId) {
            this.currentBlogPost = this.blogPosts.find(post => post.id === postId);
        },
        addBlogComment() {
            if (!this.newComment.trim() || !this.isLoggedIn || !this.currentBlogPost) {
                return;
            }
            
            this.currentBlogPost.comments.push({
                author: this.currentUser.username,
                date: new Date().toLocaleDateString(),
                content: this.newComment
            });
            
            this.newComment = '';
        },
        trackDownload() {
            this.downloadableDemo.downloadCount++;
            alert(`Thank you for downloading the ${this.downloadableDemo.name}! The download should start automatically.`);
        },
        toggleGalleryView() {
            this.showGallery = !this.showGallery;
            if (this.showGallery && window.peskydevGallery) {
                window.peskydevGallery.init();
            }
        },
        loadProfileData() {
            const profileData = localStorage.getItem(`peskydev_profile_${this.currentUser.id}`);
            if (profileData) {
                const data = JSON.parse(profileData);
                this.selectedIcon = data.icon || 'default';
                this.selectedTheme = data.theme || 'default';
                this.customFields = data.fields || {
                    bio: '',
                    location: '',
                    website: '',
                    favoriteGame: ''
                };
                
                if (data.theme) {
                    this.applyTheme(data.theme);
                }
                
                this.loadUserActivities();
            }
        },
        saveProfileData() {
            if (!this.isLoggedIn || !this.currentUser) return;
            
            const profileData = {
                icon: this.selectedIcon,
                theme: this.selectedTheme,
                fields: this.customFields
            };
            
            localStorage.setItem(`peskydev_profile_${this.currentUser.id}`, JSON.stringify(profileData));
            
            this.addUserActivity('profile_update', 'Updated profile settings');
            
            this.applyTheme(this.selectedTheme);
            
            alert('Profile settings saved successfully!');
        },
        selectIcon(iconId) {
            this.selectedIcon = iconId;
        },
        selectTheme(themeId) {
            this.selectedTheme = themeId;
        },
        applyTheme(themeId) {
            const theme = this.profileThemes.find(t => t.id === themeId);
            if (!theme) return;
            
            document.documentElement.style.setProperty('--primary-color', theme.primary);
            document.documentElement.style.setProperty('--primary-dark', theme.secondary);
            document.documentElement.style.setProperty('--primary-light', this.getLighterColor(theme.primary));
        },
        getLighterColor(hexColor) {
            const r = parseInt(hexColor.slice(1, 3), 16);
            const g = parseInt(hexColor.slice(3, 5), 16);
            const b = parseInt(hexColor.slice(5, 7), 16);
            
            const lighterR = Math.min(255, r + 40);
            const lighterG = Math.min(255, g + 40);
            const lighterB = Math.min(255, b + 40);
            
            return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;
        },
        editUsername() {
            this.showUsernameEdit = true;
            this.newUsername = this.currentUser.username;
        },
        saveUsername() {
            if (!this.newUsername.trim()) {
                alert('Username cannot be empty');
                return;
            }
            
            if (this.users.some(u => u.id !== this.currentUser.id && u.username.toLowerCase() === this.newUsername.toLowerCase())) {
                alert('Username already taken');
                return;
            }
            
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users[userIndex].username = this.newUsername;
                this.saveUsers();
                
                this.currentUser.username = this.newUsername;
                localStorage.setItem('peskydev_current_user', JSON.stringify(this.currentUser));
                
                this.addUserActivity('username_change', 'Changed username');
                
                this.showUsernameEdit = false;
            }
        },
        cancelUsernameEdit() {
            this.showUsernameEdit = false;
        },
        loadUserActivities() {
            const activities = localStorage.getItem(`peskydev_activities_${this.currentUser.id}`);
            if (activities) {
                this.userActivities = JSON.parse(activities);
            } else {
                this.userActivities = [];
            }
        },
        addUserActivity(type, description) {
            const activity = {
                id: Date.now().toString(),
                type: type,
                description: description,
                date: new Date().toISOString()
            };
            
            this.userActivities.unshift(activity);
            
            if (this.userActivities.length > 20) {
                this.userActivities = this.userActivities.slice(0, 20);
            }
            
            localStorage.setItem(`peskydev_activities_${this.currentUser.id}`, JSON.stringify(this.userActivities));
        },
        formatActivityDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            
            const diffInMs = now - date;
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            
            if (diffInDays === 0) {
                return 'Today';
            } else if (diffInDays === 1) {
                return 'Yesterday';
            } else if (diffInDays < 7) {
                return `${diffInDays} days ago`;
            } else {
                return date.toLocaleDateString();
            }
        },
        getActivityIcon(type) {
            switch(type) {
                case 'profile_update': return '⚙️';
                case 'username_change': return '📝';
                case 'forum_post': return '💬';
                case 'forum_reply': return '↩️';
                case 'suggestion': return '💡';
                case 'feedback': return '📢';
                case 'login': return '🔑';
                default: return '📌';
            }
        },
    }
});

app.mount('#app');