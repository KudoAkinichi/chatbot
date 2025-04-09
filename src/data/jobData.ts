// src/data/jobData.ts

export interface JobData {
  jobs: string[];
  skills: string[];
  resumeTips: string[];
  motivation: string[];
}

export interface JobDatabase {
  [key: string]: JobData;
}

// Static data mapping for job recommendations based on disability type
export const jobDatabase: JobDatabase = {
  hearing: {
    jobs: ["Graphic Designer", "Web Developer", "Data Analyst"],
    skills: ["Figma", "HTML/CSS", "JavaScript", "Adobe Creative Suite", "Visual Design"],
    resumeTips: [
      "Highlight visual skills and portfolio work",
      "Focus on technical certifications",
      "Emphasize written communication skills"
    ],
    motivation: [
      "Your visual creativity is a powerful asset in design roles!",
      "Remote development jobs offer great opportunities with flexible communication options."
    ]
  },
  mobility: {
    jobs: ["Data Analyst", "Content Writer", "Software Developer"],
    skills: ["Excel", "Google Docs", "Python", "Data Visualization", "SEO"],
    resumeTips: [
      "Highlight remote work capabilities",
      "Emphasize digital skills and certifications",
      "Focus on results and project outcomes"
    ],
    motivation: [
      "Your analytical thinking is highly valuable in today's data-driven world!",
      "Remote tech positions offer excellent opportunities for growth in accessible environments."
    ]
  },
  vision: {
    jobs: ["Content Writer", "Customer Service Representative", "Software Developer"],
    skills: [
      "Screen Readers",
      "JAWS proficiency",
      "Microsoft Office with accessibility tools",
      "Audio editing"
    ],
    resumeTips: [
      "Highlight adaptive technology proficiency",
      "Focus on communication skills",
      "Emphasize problem-solving abilities"
    ],
    motivation: [
      "Your listening skills and attention to detail are incredibly valuable!",
      "Many companies are actively seeking diverse perspectives like yours."
    ]
  },
  cognitive: {
    jobs: ["Quality Assurance Tester", "Data Entry Specialist", "Administrative Assistant"],
    skills: ["Attention to detail", "Organization tools", "Process documentation", "Task management"],
    resumeTips: [
      "Highlight organizational abilities",
      "Focus on completion rates and accuracy metrics",
      "Emphasize your methodical approach to work"
    ],
    motivation: [
      "Your methodical approach to tasks is a tremendous asset!",
      "Many companies value consistent, detail-oriented work."
    ]
  },
  neurodivergent: {
    jobs: ["Software Engineer", "Data Scientist", "Quality Assurance Specialist"],
    skills: ["Programming languages", "Pattern recognition", "Detailed documentation", "Analytical thinking"],
    resumeTips: [
      "Highlight pattern recognition abilities",
      "Focus on problem-solving successes",
      "Emphasize deep expertise in specific domains"
    ],
    motivation: [
      "Your unique perspective helps solve problems others might miss!",
      "Many tech companies actively recruit neurodivergent talent for innovation."
    ]
  }
};

// Function to identify disability category from input
export function identifyDisabilityType(input: string): string | null {
  const inputLower = input.toLowerCase();

  if (inputLower.includes("hearing") || inputLower.includes("deaf") || inputLower.includes("audio")) {
    return "hearing";
  } else if (
    inputLower.includes("mobil") ||
    inputLower.includes("physical") ||
    inputLower.includes("wheelchair") ||
    inputLower.includes("motor")
  ) {
    return "mobility";
  } else if (
    inputLower.includes("vision") ||
    inputLower.includes("blind") ||
    inputLower.includes("sight") ||
    inputLower.includes("visual")
  ) {
    return "vision";
  } else if (
    inputLower.includes("cognitive") ||
    inputLower.includes("learning") ||
    inputLower.includes("memory")
  ) {
    return "cognitive";
  } else if (
    inputLower.includes("autism") ||
    inputLower.includes("adhd") ||
    inputLower.includes("neuro")
  ) {
    return "neurodivergent";
  }

  return null;
}
