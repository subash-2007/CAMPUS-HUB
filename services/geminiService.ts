
import { GoogleGenAI } from "@google/genai";
import { Event, StudentProfile, Venue } from "../types";
import { VENUES } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getEventRecommendations = async (profile: StudentProfile, events: Event[]): Promise<string> => {
  try {
    const simplifiedEvents = events.map(e => `ID: ${e.id}, Title: ${e.title}, Department: ${e.department}, Category: ${e.category}, Date: ${e.dateTime.toLocaleDateString()}`).join('\n');

    const prompt = `
      Based on the following student profile and list of available events, please recommend 2-3 events that would be a good fit. Provide a brief, one-sentence reason for each recommendation.

      Student Profile:
      - Year: ${profile.year}
      - Department: Assume the student is in a department related to "AI&DS" or "Computer Science".

      Available Events:
      ${simplifiedEvents}

      Format your response as a simple text paragraph. Be enthusiastic and encouraging. Do not use markdown.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error getting event recommendations:", error);
    return "Could not fetch recommendations at this time. Please browse the Volunteer Hub!";
  }
};

export const getNavigationDirections = async (startVenueName: string, endVenueName: string): Promise<string> => {
  try {
    const startVenue = VENUES.find(v => v.name === startVenueName);
    const endVenue = VENUES.find(v => v.name === endVenueName);

    if (!startVenue || !endVenue) {
      return "Invalid venue selection.";
    }

    const euclideanDistance = Math.sqrt(
      Math.pow(endVenue.lat - startVenue.lat, 2) + Math.pow(endVenue.lon - startVenue.lon, 2)
    ) * 111000; // Rough conversion from lat/lon diff to meters

    const steps = Math.round(euclideanDistance / 0.8);
    const timeMinutes = Math.round(euclideanDistance / 1.4 / 60);

    const prompt = `
      Provide concise, friendly walking directions from a start location to a destination on a university campus.
      The estimated distance is ${Math.round(euclideanDistance)} meters.

      Start: ${startVenue.name} (${startVenue.location})
      Destination: ${endVenue.name} (${endVenue.location})

      Based on this information, create a plausible, easy-to-follow route description. Mention one or two landmarks someone might pass. Do not use markdown.
      Finally, append the following estimation to your response on a new line:
      "Estimated Steps: ${steps} | Estimated Time: ${timeMinutes} minutes."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error getting navigation directions:", error);
    return "Could not generate directions at this time. Please try again.";
  }
};
