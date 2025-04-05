import { createApp } from 'vue';
import { blogPosts } from './blog.js';

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
            }
        };
    },
    created() {
        // Load data from localStorage
        this.loadUsers();
        this.loadPosts();
        this.loadSuggestions();
        this.checkAuthentication();
        
        // Initialize gallery when available
        if (window.peskydevGallery) {
            this.galleryItems = window.peskydevGallery.items;
        }
    },
    methods: {
        // Authentication methods
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
            
            // Basic validation
            if (!this.loginForm.username || !this.loginForm.password) {
                this.loginError = 'Please enter both username and password.';
                return;
            }
            
            // Find user
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
                
                // Load user-specific data
                this.loadUserVotes();
            } else {
                this.loginError = 'Invalid username or password.';
            }
        },
        register() {
            this.registerError = null;
            
            // Basic validation
            if (!this.registerForm.username || !this.registerForm.email || 
                !this.registerForm.password || !this.registerForm.confirmPassword) {
                this.registerError = 'Please fill in all fields.';
                return;
            }
            
            if (this.registerForm.password !== this.registerForm.confirmPassword) {
                this.registerError = 'Passwords do not match.';
                return;
            }
            
            // Check if username already exists
            if (this.users.some(u => u.username.toLowerCase() === this.registerForm.username.toLowerCase())) {
                this.registerError = 'Username already taken.';
                return;
            }
            
            // Create new user
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
            
            // Initialize user data
            localStorage.setItem(`peskydev_votes_${userInfo.id}`, JSON.stringify([]));
            this.userVotes = [];
        },
        logout() {
            localStorage.removeItem('peskydev_current_user');
            this.currentUser = null;
            this.isLoggedIn = false;
            
            // If on members page, redirect to home
            if (this.currentPage === 'members') {
                this.currentPage = 'home';
            }
        },
        
        // Forum methods
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
            
            // Reset form
            this.newPost = { title: '', content: '' };
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
                
                // Reset reply form
                this.$set(this.replyContent, postId, '');
            }
        },
        
        // Feedback methods
        submitFeedback() {
            if (!this.feedback.title || !this.feedback.content) {
                alert('Please fill in all fields.');
                return;
            }
            
            // In a real app, this would send an email or API request
            // For this demo, we'll simulate it
            alert(`Feedback submitted! A message has been sent to support@peskydev.com\n\nSubject: ${this.feedback.title}\nType: ${this.feedback.type}\nMessage: ${this.feedback.content}`);
            
            // Reset form
            this.feedback = {
                title: '',
                type: 'improvement',
                content: ''
            };
        },
        
        // Game suggestions methods
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
            
            // Format game name for display
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
            
            // Reset form
            this.suggestion = {
                game: this.suggestion.game,
                title: '',
                description: ''
            };
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
        
        // New blog methods
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
            
            // In a real app, we would save this to a database
            this.newComment = '';
        },
        
        // Game demo download methods
        trackDownload() {
            this.downloadableDemo.downloadCount++;
            // In a real app, this would be saved server-side
            alert(`Thank you for downloading the ${this.downloadableDemo.name}! The download should start automatically.`);
            
            // For demo purposes, we're not actually downloading anything
            // In a real app, this would redirect to the download URL
        },
        
        // Gallery methods
        toggleGalleryView() {
            this.showGallery = !this.showGallery;
            if (this.showGallery && window.peskydevGallery) {
                window.peskydevGallery.init();
            }
        }
    }
});

app.mount('#app');