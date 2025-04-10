import { jobDatabase, identifyDisabilityType } from "../data/jobData";

export type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: number;
};

export type DisabilityData = {
  type: string | null;
  jobPreference: "remote" | "onsite" | null;
};

export const INITIAL_MESSAGE: Message = {
  id: "welcome",
  content:
    "Hi there! I can help suggest job roles that suit your strengths and accessibility needs. You can also toggle to Gemini mode for general questions using the button at the bottom of the screen.",
  sender: "assistant",
  timestamp: Date.now(),
};

// Generate response based on user input
export function generateResponse(
  message: string,
  disabilityData: DisabilityData
): { response: string; updatedData: DisabilityData } {
  const inputLower = message.toLowerCase();
  const updatedData = { ...disabilityData };

  // If disability type is not identified yet
  if (!disabilityData.type) {
    const identifiedType = identifyDisabilityType(message);

    if (!identifiedType) {
      return {
        response:
          "I'm here to help, but I didn't quite catch your specific needs. Try mentioning terms like 'hearing', 'mobility', 'vision', 'cognitive', or 'neurodivergent' so I can provide better suggestions.",
        updatedData,
      };
    }

    // Update disability type
    updatedData.type = identifiedType;

    // Get job recommendations
    const recommendations = jobDatabase[identifiedType];
    let response = `Thanks for sharing. Based on your ${identifiedType}-related needs, here are some job roles that might be a good fit:\n\n`;

    // Add job suggestions
    response += `**Recommended Jobs:**\n${recommendations.jobs
      .map((job) => `• ${job}`)
      .join("\n")}\n\n`;

    // Add skill recommendations
    response += `**Helpful Skills to Develop:**\n${recommendations.skills
      .map((skill) => `• ${skill}`)
      .join("\n")}\n\n`;

    response += `**Resume Tips:**\n${recommendations.resumeTips
      .map((tip) => `• ${tip}`)
      .join("\n")}\n\n`;

    response += `**Remember:**\n${recommendations.motivation[0]}\n\n`;

    response +=
      "Would you prefer opportunities that are remote or on-site? (Just type 'remote' or 'on-site', or skip this question)";

    return { response, updatedData };
  }

  if (!disabilityData.jobPreference) {
    if (inputLower.includes("remote")) {
      updatedData.jobPreference = "remote";

      return {
        response: `Great! Remote work offers excellent flexibility. For ${disabilityData.type}-related needs, remote positions can provide a comfortable environment that you can customize to your requirements.\n\nWould you like to explore more options or start again with a new query?`,
        updatedData,
      };
    } else if (
      inputLower.includes("on-site") ||
      inputLower.includes("onsite") ||
      inputLower.includes("in office")
    ) {
      updatedData.jobPreference = "onsite";

      return {
        response: `On-site work can offer great community and structure. Many companies are improving workplace accessibility, especially for people with ${disabilityData.type}-related needs.\n\nWould you like to explore more options or start again with a new query?`,
        updatedData,
      };
    } else if (
      inputLower.includes("skip") ||
      inputLower.includes("no preference")
    ) {
      updatedData.jobPreference = null;

      return {
        response:
          "No problem! Would you like to explore more options or start again with a new query?",
        updatedData,
      };
    }
  }

  if (
    inputLower.includes("start") ||
    inputLower.includes("new") ||
    inputLower.includes("restart") ||
    inputLower.includes("again")
  ) {
    return {
      response:
        "Let's start over. Could you tell me about your condition or access needs?",
      updatedData: { type: null, jobPreference: null },
    };
  }

  if (inputLower.includes("more") || inputLower.includes("explore")) {
    const type = disabilityData.type;
    if (!type || !jobDatabase[type]) {
      return {
        response:
          "I'd be happy to explore more options. Could you remind me about your specific needs?",
        updatedData: { type: null, jobPreference: null },
      };
    }

    const recommendations = jobDatabase[type];
    let response = `Here's some additional information that might help you in your job search:\n\n`;

    if (recommendations.motivation.length > 1) {
      response += `${recommendations.motivation[1]}\n\n`;
    }

    response += `For roles like ${recommendations.jobs.join(
      ", "
    )}, consider joining online communities or forums where professionals with similar needs share their experiences and job opportunities.\n\n`;

    response +=
      "Is there anything specific about these roles you'd like to know more about?";

    return { response, updatedData };
  }

  // Default response
  return {
    response:
      "Thanks for your message. Would you like to explore more job options or start again with a different query?",
    updatedData,
  };
}
