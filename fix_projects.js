const fs = require('fs');

let content = fs.readFileSync('components/apps/jeevan.jsx', 'utf8');

const newProjectList = `    const project_list = [
        {
            name: "RaftKV: Distributed Key-Value Store",
            date: "2024",
            link: "https://github.com/jeevanu345/raftkv",
            description: [
                "A Raft-replicated key-value store, written in Rust, with a Redis-compatible (RESP2/RESP3) wire protocol and gRPC peer-to-peer transport."
            ],
            domains: ["rust", "distributed-systems"]
        },
        {
            name: "SWE-bench Code Repair Agent",
            date: "2024",
            link: "https://github.com/jeevanu345/Code-Repair-Agent-with-Execution-Grounded-RL-on-SWE-Bench",
            description: [
                "Code-Repair Agent with Execution-Grounded RL on SWE-Bench.",
                "Trains an LLM agent to resolve real GitHub issues from SWE-bench Lite/Verified using GRPO."
            ],
            domains: ["python", "AI_ML", "docker"]
        },
        {
            name: "NCERT RAG Bot: AI-Powered NCERT Tutor",
            date: "2024",
            link: "https://github.com/jeevanu345/NCERT-RAG-Bot",
            description: [
                "Built an intelligent AI tutor using a RAG pipeline for conversational Q&A from NCERT Class 10 PDFs with local LLM integration, smart text chunking, vector search, and memory-based context retention."
            ],
            domains: ["python", "langchain", "AI_ML"]
        },
        {
            name: "CalorieFit",
            date: "2024",
            link: "https://github.com/jeevanu345/CalorieFit",
            description: [
                "A comprehensive full-stack calorie tracking and nutrition management application built with Node.js, Express, and PostgreSQL."
            ],
            domains: ["node.js", "postgresql"]
        },
        {
            name: "MacOS Automation Tool",
            date: "2024",
            link: "https://github.com/jeevanu345/MacOS-Automation-tool-",
            description: [
                "A powerful Automator-based application that runs on a schedule to handle repetitive file tasks automatically."
            ],
            domains: ["macos", "automation"]
        },
        {
            name: "ML-based Stock Price Predictor",
            date: "2024",
            link: "https://github.com/jeevanu345/ML-based-Stock-Price-Predictor",
            description: [
                "A machine learning-powered web application for forecasting stock prices over the next 10 days using Streamlit and scikit-learn."
            ],
            domains: ["python", "AI_ML"]
        },
        {
            name: "Music Recommendation Chatbot",
            date: "2024",
            link: "https://github.com/jeevanu345/Music--Recommendation-using-chatbot",
            description: [
                "An intelligent music recommendation system powered by AI that provides personalized song suggestions through a conversational chatbot interface."
            ],
            domains: ["python", "AI_ML"]
        },
        {
            name: "Instant Canteen: Smart Campus Food Ordering",
            date: "2023",
            link: "https://github.com/jeevanu345/Canteen-Management-Application",
            description: [
                "Built a full-stack web app streamlining campus canteen operations — enabling students to pre-order meals and make instant UPI-based QR payments."
            ],
            domains: ["react.js", "typescript", "tailwindcss"]
        },
        {
            name: "TapCart: NFC-Based Smart Retail System",
            date: "2023",
            link: "https://github.com/jeevanu345/TapCart",
            description: [
                "Designed an IoT-integrated retail platform enabling 'tap-to-shop' purchases and real-time inventory sync across devices.",
                "Research Paper: Proposed secure NFC-based merchant payment architecture for contactless transactions without extra hardware."
            ],
            domains: ["react-native", "node.js", "iot"]
        },
        {
            name: "COVID-19 Genome Mutation Visualization Tool",
            date: "2022",
            link: "https://github.com/jeevanu345/Covid-19-Genome-Mutation-Analysis",
            description: [
                "Built a visualization tool to compare genome sequences of COVID-19 variants and visualize protein structure mutations via ChimeraX."
            ],
            domains: ["python", "matplotlib", "biopython"]
        }
    ];

    const tag_colors = {
        "python": "green-400",
        "langchain": "purple-500",
        "AI_ML": "blue-500",
        "react.js": "blue-300",
        "typescript": "blue-400",
        "tailwindcss": "green-300",
        "react-native": "purple-400",
        "node.js": "green-500",
        "iot": "gray-400",
        "matplotlib": "red-400",
        "biopython": "yellow-500",
        "rust": "orange-500",
        "distributed-systems": "blue-600",
        "docker": "blue-400",
        "postgresql": "blue-400",
        "macos": "gray-500",
        "automation": "purple-500"
    }`;

// Find the start and end of project_list
const startStr = 'const project_list = [';
const endStr = '    const tag_colors = {';
const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf(endStr, startIdx);

// Find the end of tag_colors
const endOfTagColors = content.indexOf('}', endIdx) + 1;

if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + newProjectList + content.substring(endOfTagColors);
    fs.writeFileSync('components/apps/jeevan.jsx', content, 'utf8');
    console.log('Successfully updated project_list and tag_colors');
} else {
    console.log('Failed to find project_list in jeevan.jsx');
}
