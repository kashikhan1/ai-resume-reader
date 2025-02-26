# 🚀 AI RESUME REVIEWER Node.js (Express) & Next.js (Monorepo)

This repository contains both **backend (Node.js, Express.js, LangGraph, OpenRouter AI Agents)** and **frontend (Next.js, Tailwind CSS, TypeScript)** applications within a **monorepo** structure.

---

## 📂 Project Structure

```
/ (Root)
│── backend/                # Backend (Node.js, Express, AI Agents)
│   │── src/
│   │   │── controllers/    # API Controllers
│   │   │   ├── resumeController.ts
│   │   │── llm-model/      # LLM Model Handlers
│   │   │   ├── index.ts
│   │   │   ├── ollama.ts
│   │   │── services/       # Business Logic Services
│   │   │   ├── aiService.ts
│   │   │── tasks/          # AI Tasks & Agents
│   │   │   ├── ATSScore.ts
│   │   │   ├── content.ts
│   │   │   ├── interviewSuggestions.ts
│   │   │   ├── suggestion.ts
│   │   │   ├── index.ts
│   │   │── tools/          # Utility Tools
│   │   │   ├── index.ts
│   │   │   ├── searchTool.ts
│   │   │── routes.ts       # API Routes
│   │   │── app.ts          # Express App Entry
│── frontend/               # Frontend (Next.js, Tailwind, TypeScript)
│   │── components/         # UI Components
│   │── pages/              # Next.js Pages
│   │── styles/             # Tailwind CSS Styles
│   │── public/             # Static Assets
│   │── next.config.js      # Next.js Config
│── package.json            # Monorepo Package Dependencies
│── README.md               # Project Documentation
│── .gitignore              # Git Ignore Rules
│── tsconfig.json           # TypeScript Configuration
```

---

## 🛠️ **Installation & Setup**

### **1️⃣ Prerequisites**

- **Node.js v16+**
- **NPM or Yarn**
- **Docker (for AI Models, if required)**

### **2️⃣ Clone the Repository**

```sh
git clone git@github.com:kashikhan1/ai-resume-reader.git
cd ai-resume-reader
```

### **3️⃣ Install Dependencies**

```sh
# Install dependencies for both frontend & backend
npm install
```

---

## 🚀 **Running the Application**

### **Backend (Node.js, Express, AI Agents)**

Navigate to the `backend/` directory and start the server:

```sh
cd backend
npm install 
npm run dev
```

create a `.env` file in the `backend/` directory and add the following:
```
OLLAMA_BASE_URL=https://openrouter.ai/api/v1 # or any other base URL you want to use for example OPenRouter
OLLAMA_MODEL=cognitivecomputations/dolphin3.0-mistral-24b:free # or any other model you want to use for example Mistral 24B
OLLAMA_API_KEY=sk-xxxxxxxxx # or any other API key you want to use for example OpenRouter API key
PORT=4000
```
This starts the **Express server** with:

- **AI-powered Resume Analysis**
- **ATS Score Calculation**
- **Interview Question Generation**
- **OpenRouter AI Agent Integration**

The backend runs at: **`http://localhost:5000`**

---

### **Frontend (Next.js, Tailwind, TypeScript)**

Navigate to the `frontend/` directory and start the app:

```sh
cd frontend
npm install
npm run dev
```

create a `.env` file in the `frontend/` directory and add the following:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

This starts the **Next.js application** for a **modern UI** at **`http://localhost:3000`**.

---

## 🔥 **API Endpoints**

| Method | Endpoint           | Description                                           |
| ------ | ------------------ | ----------------------------------------------------- |
| `POST` | `/api/upload`      | Upload resume for AI-based analysis                   |

---

## 📦 **Technologies Used**

### **Backend (Node.js, Express, AI)**

- **Node.js (Express.js)** - Fast & Scalable API Server
- **LangGraph & OpenRouter AI** - AI Agents & Natural Language Processing
- **TypeScript** - Strongly Typed JavaScript

### **Frontend (Next.js, Tailwind, TypeScript)**

- **Next.js** - Server-Side Rendering (SSR) & SEO Optimization
- **Tailwind CSS** - Modern Styling Framework
- **Framer Motion** - Smooth UI Animations
- **React Markdown** - Resume AI Feedback Rendering

---

## ⚡ **Contributing**

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a **Pull Request (PR)**

---

## 🛡️ **License**

This project is **MIT Licensed**.

---

## ✨ **Author**

👤 **Muhammad Kashif Khan**\
📧 Email: [imkashifkhanofficial@gmail.com](mailto\:imkashifkhanofficial@gmail.com)\
🔗 LinkedIn: [Muhammad Kashif Khan](https://linkedin.com/in/muhammad-kashif-khan)\
📂 Portfolio: [kashif.weinnovate.net](https://kashif.weinnovate.net)

---

Now your monorepo has a clear and professional **README**! Let me know if you'd like any modifications. 🚀

