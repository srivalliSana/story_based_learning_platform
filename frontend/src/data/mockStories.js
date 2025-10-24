// Mock data for stories with module associations
export const mockStories = {
  // Mathematics stories
  "1": { // Subject ID
    "1": [ // Module ID (Algebra)
      {
        id: "1-1-1",
        title: "The Mystery of X",
        description: "A detective story that explains variables and equations through a mystery narrative.",
        content: "Once upon a time in the city of Algebraville, Detective X was called to solve a mysterious equation...",
        readTime: "5 min",
        difficulty: "Beginner"
      },
      {
        id: "1-1-2",
        title: "The Polynomial Family",
        description: "Meet the Polynomial family and learn how different degrees of polynomials behave.",
        content: "The Polynomial family was one of the most respected families in all of Mathematics Land...",
        readTime: "8 min",
        difficulty: "Intermediate"
      }
    ],
    "2": [ // Module ID (Geometry)
      {
        id: "1-2-1",
        title: "The Circle's Secret",
        description: "Discover the relationship between radius, diameter, and pi through an adventure story.",
        content: "In the round city of Circleville, everything was measured by a special number called Pi...",
        readTime: "6 min",
        difficulty: "Beginner"
      },
      {
        id: "1-2-2",
        title: "Triangle Treasure Hunt",
        description: "Join a treasure hunt that teaches the Pythagorean theorem and triangle properties.",
        content: "Captain Right Angle had a map with three points forming a perfect right triangle...",
        readTime: "10 min",
        difficulty: "Intermediate"
      }
    ]
  },
  
  // Physics stories
  "2": { // Subject ID
    "1": [ // Module ID (Mechanics)
      {
        id: "2-1-1",
        title: "Newton's Apple Adventure",
        description: "Follow Sir Isaac Newton as he discovers the laws of motion through everyday observations.",
        content: "It was a sunny afternoon when Isaac was sitting under his favorite apple tree...",
        readTime: "7 min",
        difficulty: "Beginner"
      },
      {
        id: "2-1-2",
        title: "The Gravity Games",
        description: "Athletes compete in the Gravity Games, demonstrating principles of force and acceleration.",
        content: "Welcome to the annual Gravity Games, where contestants from around the world demonstrate the power of physics...",
        readTime: "9 min",
        difficulty: "Intermediate"
      }
    ],
    "2": [ // Module ID (Thermodynamics)
      {
        id: "2-2-1",
        title: "The Heat Merchants",
        description: "A tale of merchants trading heat and energy, explaining the laws of thermodynamics.",
        content: "In the bustling market of Thermoville, merchants traded a precious commodity: heat...",
        readTime: "8 min",
        difficulty: "Intermediate"
      },
      {
        id: "2-2-2",
        title: "Entropy's Puzzle",
        description: "Solve a puzzle alongside Professor Entropy to understand the second law of thermodynamics.",
        content: "Professor Entropy challenged his students with a peculiar puzzle box that seemed to only get more disorganized...",
        readTime: "12 min",
        difficulty: "Advanced"
      }
    ]
  },
  
  // Biology stories
  "3": { // Subject ID
    "1": [ // Module ID (Cell Biology)
      {
        id: "3-1-1",
        title: "City of Cells",
        description: "Explore a city where each building represents a different cell organelle and its function.",
        content: "Welcome to Cellville, a bustling metropolis where every building and structure has a vital role...",
        readTime: "6 min",
        difficulty: "Beginner"
      },
      {
        id: "3-1-2",
        title: "The Mitochondria Power Plant",
        description: "Visit the power plant of the cell and learn how energy is generated.",
        content: "Deep within every cell of your body lies an incredible power plant called the mitochondria...",
        readTime: "7 min",
        difficulty: "Intermediate"
      }
    ],
    "2": [ // Module ID (Genetics)
      {
        id: "3-2-1",
        title: "The DNA Detectives",
        description: "Join the DNA Detectives as they solve crimes using genetic evidence and principles.",
        content: "The DNA Detective Agency specialized in solving the most mysterious cases using the genetic code...",
        readTime: "9 min",
        difficulty: "Intermediate"
      },
      {
        id: "3-2-2",
        title: "Mendel's Garden Secrets",
        description: "Walk through Mendel's garden and discover the principles of inheritance through his pea plants.",
        content: "Gregor Mendel tended his garden with extraordinary care, noting every detail about his pea plants...",
        readTime: "8 min",
        difficulty: "Intermediate"
      }
    ]
  },
  
  // Computer Science stories
  "5": { // Subject ID
    "1": [ // Module ID (Programming Fundamentals)
      {
        id: "5-1-1",
        title: "The Algorithm Kingdom",
        description: "Visit a kingdom where every citizen follows algorithms to complete their daily tasks.",
        content: "In the Algorithm Kingdom, every citizen started their day by following a precise set of instructions...",
        readTime: "7 min",
        difficulty: "Beginner"
      },
      {
        id: "5-1-2",
        title: "The Loop Carnival",
        description: "Experience a carnival where rides demonstrate different types of loops in programming.",
        content: "At the Loop Carnival, visitors could ride attractions that went round and round in fascinating patterns...",
        readTime: "8 min",
        difficulty: "Beginner"
      }
    ],
    "3": [ // Module ID (Algorithms)
      {
        id: "5-3-1",
        title: "The Sorting Hat",
        description: "A magical hat demonstrates different sorting algorithms by organizing students.",
        content: "The famous Sorting Hat had a difficult job: organizing hundreds of students efficiently...",
        readTime: "10 min",
        difficulty: "Intermediate"
      },
      {
        id: "5-3-2",
        title: "The Shortest Path Home",
        description: "Follow a traveler using Dijkstra's algorithm to find the shortest path through a fantasy land.",
        content: "Traveler Dijkstra needed to find the quickest route home through the Land of Graphs...",
        readTime: "12 min",
        difficulty: "Advanced"
      }
    ]
  }
};

// Helper function to get stories for a specific subject and module
export const getStoriesBySubjectAndModule = (subjectId, moduleId) => {
  if (mockStories[subjectId] && mockStories[subjectId][moduleId]) {
    return mockStories[subjectId][moduleId];
  }
  return [];
};

// Helper function to get a specific story
export const getStoryById = (subjectId, moduleId, storyId) => {
  const moduleStories = getStoriesBySubjectAndModule(subjectId, moduleId);
  return moduleStories.find(story => story.id === storyId);
};