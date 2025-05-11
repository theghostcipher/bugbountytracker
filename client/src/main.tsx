import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set the document title
document.title = "BugHunt Tracker | Bug Bounty Methodology App";

// Set meta description for SEO
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'Track and manage your bug bounty methodology with BugHunt Tracker. Organize tasks by vulnerability types, track progress, and save custom methodologies.';
document.head.appendChild(metaDescription);

// Add Open Graph tags
const ogTitle = document.createElement('meta');
ogTitle.property = 'og:title';
ogTitle.content = 'BugHunt Tracker | Bug Bounty Methodology App';
document.head.appendChild(ogTitle);

const ogDescription = document.createElement('meta');
ogDescription.property = 'og:description';
ogDescription.content = 'Track and manage your bug bounty methodology with BugHunt Tracker. Organize tasks by vulnerability types, track progress, and save custom methodologies.';
document.head.appendChild(ogDescription);

const ogType = document.createElement('meta');
ogType.property = 'og:type';
ogType.content = 'website';
document.head.appendChild(ogType);

// Add fonts
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';
document.head.appendChild(fontLink);

createRoot(document.getElementById("root")!).render(<App />);
