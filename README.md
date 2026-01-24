# 🚀 Sai Guru - Personal Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A modern, high-performance personal portfolio website built to showcase projects in **IoT, Embedded Systems, and Web Development**. 

Recently migrated from Create-React-App to **Vite** for blazing-fast performance and instant load times.

## 🔗 Live Demo
**[https://my-portfolio-sai-gurus-projects.vercel.app/]** 

---

## ✨ Features

* **⚡ Blazing Fast:** Powered by **Vite** (replaces standard Webpack).
* **📱 Fully Responsive:** Optimized for Desktops, Tablets, and Mobile phones.
* **🧪 Interactive Experiments Section:** Unique split-screen layout with sticky video previews.
* **📂 Data-Driven Content:** Projects and certifications are managed via a simple JSON/JS file, making updates easy without touching HTML.
* **🎨 Custom Animations:** Smooth fade-ins, card stacks, and hover effects using pure CSS.

---

## 🛠️ Tech Stack

* **Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** Custom CSS3 (Flexbox & Grid layouts)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

Follow these instructions to run the project on your local machine.

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (comes with Node.js)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Saiguru2554/portfolio-v2.git](https://github.com/Saiguru2554/portfolio-v2.git)
    cd portfolio-v2
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Click the link in the terminal (usually `http://localhost:5173`).

---

## 📂 Project Structure

Here is a quick overview of the important files:

```text
portfolio-v2/
├── public/              # Static assets (images, videos, favicons)
│   ├── experiments/     # Videos for the experiments section
│   └── badges/          # Certification images
├── src/
│   ├── components/      # Reusable React components (Hero, Badges, etc.)
│   ├── data/            # CENTRAL DATA FILE (portfolioData.js)
│   ├── App.jsx          # Main application layout
│   ├── App.css          # Main stylesheet (Animations, Grid, Flex)
│   └── main.jsx         # Entry point (Vite)
├── index.html           # Main HTML file (Root)
└── vite.config.js       # Vite configuration settings