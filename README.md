# 🎮 EduGami - AI-Powered Gamified Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Project Stage](https://img.shields.io/badge/Stage-Development-orange)
![AI Powered](https://img.shields.io/badge/AI-GPT4/Claude/Llama3-blue)

💡 Rethinking Gamification for WsCube
 <br>Instead of just leaderboards and points, we focused on high-impact, innovative features that provide real-world learning experiences.

🎯 Introducing Two Marketplaces

 1️⃣ Freelancing Simulator 🏗️
A marketplace like Upwork where students bid on dummy projects.
Winners work with an AI avatar acting as their client to simulate real freelancing gigs.

2️⃣ Job Simulation Hub 💼
Students apply for dummy job postings with a resume.
They go through AI-powered hiring rounds (GD, interviews, etc.).
Once hired, they join a team and work on projects collaboratively.


## Machine Learning Model Description:
<br>

### **Script 1: Bid Ranking Prediction**
Predicts freelancing bid ranks using a deep learning model for text clarity and a regression model for numerical features (experience, price, reputation). Combines both models to output a bid rank.

---

### **Script 2: Student Learning Style Clustering**
Clusters students into learning styles (e.g., visual, fast, slow learners) based on behavior data (clicks, time spent, scores). Uses K-Means clustering, PCA for visualization, and provides personalized recommendations.

---

### **Script 3: Topic Recommendation with BKT and Collaborative Filtering**
Recommends quiz topics by tracking skill mastery using Bayesian Knowledge Tracing (BKT) and collaborative filtering (SVD). Adjusts recommendations based on performance and time taken, focusing on weak areas.



## 📖 Table of Contents
- [🚀 Problem Statement](#-problem-statement)
- [💡 Our Solution](#-our-solution)
- [🛠️ Technical Stack](#%EF%B8%8F-technical-stack)
- [🎯 Key Features](#-key-features)
- [📅 Development Roadmap](#-development-roadmap)
- [👥 Team Structure](#-team-structure)
- [⚠️ Risks & Mitigations](#%EF%B8%8F-risks--mitigations)
- [📄 License](#-license)

---

## 🚀 Problem Statement
**Modern education systems struggle with:**
- ❌ Low student engagement
- 🧩 One-size-fits-all learning approaches
- 🌉 Gap between theoretical knowledge and real-world application
- ⏳ Lack of 24/7 personalized support

---

## 💡 Our Solution
### **Next-Gen Gamified Learning Ecosystem**
```diff
+ Combines game mechanics with AI personalization
+ Virtual career simulations with real-world relevance
+ Dynamic difficulty adjustment using reinforcement learning

```


## System Architecture

### 🛠️ Technical Stack

| Category       | Technologies  |
|---------------|--------------|
| **AI/ML Core** | Python • TensorFlow • PyTorch • RLlib • Hugging Face Transformers |
| **Generative AI** | GPT-4 • Claude 3 • Llama 3 • LangChain • Pinecone (Vector DB) |
| **Backend** | Node.js • FastAPI • GraphQL • WebSocket |
| **Database** | PostgreSQL • MongoDB • Redis • Elasticsearch |
| **Frontend** | React • Three.js • Unity • WebGL |
| **DevOps** | AWS • Docker • Kubernetes • GitHub Actions |
| **Analytics** | Mixpanel • MLflow • Power BI |

---

## 🎯 Key Features

### Core Gamification

| Feature | Status | Description |
|---------|--------|-------------|
| 🏆 **Dynamic Leaderboards** | ✅ Done | Real-time ranking with Redis sorted sets |
| 🧉 **XP Token System** | 🚧 WIP | Blockchain-based reward tracking |
| 🏅 **Skill Badges** | ✅ Done | 50+ unlockable achievements |

### AI Innovations

| Feature | Tech Used | Impact |
|---------|-----------|--------|
| 🤖 **AI Interview Coach** | GPT-4 + Unity Avatars | 90% interview simulation accuracy |
| 🧠 **Adaptive Learning** | RLlib + K-Means | 40% faster skill acquisition |
| 💬 **24/7 Tutor Bot** | RASA + LangChain | 2s avg response time |


## Career Simulators
graph LR
A[Learning Path] --> B{Level 5}
B --> C[Freelance Marketplace]
B --> D[Corporate Simulator]
C --> E[Project Bidding]
D --> F[Team Projects]

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.