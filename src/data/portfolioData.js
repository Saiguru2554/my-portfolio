// src/data/portfolioData.js
//  Experiments Data

export const experiments = [
  {
    id: 1,
    title: "Underwater ROV",
    src: "/experiments/rov-demo.mp4",
    type: "video"
  },
  {
    id: 2,
    title: "IoT AWS System",
    src: "/experiments/aws-demo.mp4",
    type: "video"
  },
  {
    id: 3,
    title: "Healthcare Assistant ",
    type: "stack",
    images: [
      "/experiments/health-2.png", 
      "/experiments/health-3.png", 
      "/experiments/health-1.png", 
    ]
  },
  {
    id: 4,
    title: "Scheme Bridge",
    src: "/experiments/kaggle.mp4",
    type: "video"
  }
];


export const badges = [
  // Add your image paths here. 
  // For now, Save your images in public/badges/ folder.
  { id: 8, img: "/badges/Gen-ai-completion.jpg", title: "AWS Cloud Practitioner" },
  { id: 2, img: "/badges/LLM-completion.jpg", title: "Python Basic" },
  { id: 3, img: "/badges/Res-ai-completion.jpg", title: "IoT Specialist" },
  { id: 4, img: "/badges/RAG-skill.png", title: "Google Cloud" },
  { id: 5, img: "/badges/Vertex-skill.png", title: "Cisco Networking" },
  { id: 6, img: "/badges/Streamlit-skill.png", title: "Streamlit" },
  { id: 7, img: "/badges/5-kaggle.png", title: "Kaggle" },
  { id: 1, img: "/badges/swecha-cer.png", title: "Swecha Intern" }
];