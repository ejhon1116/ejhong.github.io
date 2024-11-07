// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar scroll handling
const navbar = document.querySelector('.navbar');
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    // Update scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
    
    // Add shadow to navbar on scroll
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project details modal
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-body"></div>
    </div>
`;
document.body.appendChild(modal);

// Project details content
const projectDetails = {
    'Machine Learning': {
        title: 'Machine Learning Sign Language Translator',
        description: `
            <h3>Project Overview</h3>
            <p>Developed a convolutional neural network for translating American Sign Language (ASL) to English text with 99.9% accuracy.</p>
            
            <h3>Technical Details</h3>
            <ul>
                <li>Implemented using TensorFlow and Python</li>
                <li>Custom learning rate scheduler with warmup and cosine decay</li>
                <li>Dropout layers for preventing overfitting</li>
                <li>Trained on MNIST ASL dataset</li>
            </ul>
            
            <h3>Key Achievements</h3>
            <ul>
                <li>Achieved 99.9% accuracy on test set</li>
                <li>Optimized model architecture for real-time translation</li>
                <li>Implemented data augmentation techniques</li>
            </ul>
        `
    },
    'Algorithmic Trading Program': {
        title: 'LSTM-based Trading System',
        description: `
            <h3>Project Overview</h3>
            <p>Developed a sophisticated trading system using LSTM neural networks for short-term market predictions.</p>
            
            <h3>Technical Details</h3>
            <ul>
                <li>LSTM neural network implementation in Python</li>
                <li>Integration with Backtrader for strategy testing</li>
                <li>Technical indicators implementation</li>
                <li>Risk management system</li>
            </ul>
            
            <h3>Features</h3>
            <ul>
                <li>Real-time market data processing</li>
                <li>Multiple timeframe analysis</li>
                <li>Transaction cost optimization</li>
                <li>Automated trading signals</li>
            </ul>
        `
    },
    'PC Parts Website': {
        title: 'PC Part Builder Platform',
        description: `
            <h3>Project Overview</h3>
            <p>Full-stack web application for comparing and selecting PC components with real-time price tracking.</p>
            
            <h3>Technical Stack</h3>
            <ul>
                <li>Frontend: HTML, CSS, JavaScript</li>
                <li>Backend: Python, Express</li>
                <li>Database: MongoDB</li>
                <li>Deployment: AWS EC2</li>
            </ul>
            
            <h3>Key Features</h3>
            <ul>
                <li>Real-time price comparison</li>
                <li>Component compatibility checker</li>
                <li>User build saving and sharing</li>
                <li>Automated price alerts</li>
            </ul>
        `
    }
};

// Handle project detail button clicks
document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        const details = projectDetails[projectTitle];
        
        if (details) {
            modal.querySelector('.modal-body').innerHTML = details.description;
            modal.style.display = 'flex';
        }
    });
});

// Close modal
modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Add loading animation for project demo links
document.querySelectorAll('.demo-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading';
        button.appendChild(loadingSpinner);
        
        // Remove loading spinner after page loads
        window.addEventListener('blur', () => {
            loadingSpinner.remove();
        });
    });
});