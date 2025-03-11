export const fetchJobs = async (filters) => {
    // Mock job data
    const mockJobs = [
      {
        id: 1,
        title: "AI Model Trainer",
        difficulty: "Intermediate",
        paymentRange: [200, 500],
        xpPoints: 300,
        duration: "2 weeks",
        location: "Remote",
        requiredExperience: "Intermediate",
        skills: ["Python", "Machine Learning", "TensorFlow"],
        proposals: [{ id: 1 }, { id: 2 }],
        postedTime: "3 days ago"
      },
      {
        id: 2,
        title: "Data Annotation Specialist",
        difficulty: "Beginner",
        paymentRange: [100, 300],
        xpPoints: 150,
        duration: "1 week",
        location: "Remote",
        requiredExperience: "Beginner",
        skills: ["Data Labeling", "Image Annotation", "Bounding Box"],
        proposals: [{ id: 3 }],
        postedTime: "1 day ago"
      },
      {
        id: 3,
        title: "NLP Chatbot Developer",
        difficulty: "Expert",
        paymentRange: [500, 1000],
        xpPoints: 500,
        duration: "1 month",
        location: "Hybrid",
        requiredExperience: "Expert",
        skills: ["NLP", "Transformers", "Python", "Hugging Face"],
        proposals: [{ id: 4 }, { id: 5 }, { id: 6 }],
        postedTime: "5 days ago"
      }
    ];
  
    // Simulate filtering logic (For now, just returning all jobs)
    let filteredJobs = mockJobs;
  
    if (filters.skillLevel !== "all") {
      filteredJobs = filteredJobs.filter(job =>
        job.requiredExperience.toLowerCase() === filters.skillLevel.toLowerCase()
      );
    }
  
    if (filters.category !== "all") {
      filteredJobs = filteredJobs.filter(job =>
        job.skills.some(skill => skill.toLowerCase().includes(filters.category.toLowerCase()))
      );
    }
  
    return new Promise(resolve => setTimeout(() => resolve(filteredJobs), 500)); // Simulating API delay
  };
  