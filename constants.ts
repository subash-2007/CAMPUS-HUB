
import { Venue } from './types';

export const VENUES: Venue[] = [
  { name: 'VISTA HALL', location: 'AI&DS Block 2nd Floor', lat: 11.0234, lon: 77.0123 },
  { name: 'COLLAB', location: 'AI&DS Block 2nd Floor', lat: 11.0236, lon: 77.0125 },
  { name: 'AUDITORIUM 1', location: 'Main Block 1st Floor', lat: 11.0210, lon: 77.0100 },
  { name: 'AUDITORIUM 2', location: 'MAIN BLOCK 2ND FLOOR', lat: 11.0212, lon: 77.0102 },
  { name: 'MAKERSPACE', location: 'ECE BLOCK 2ND FLOOR', lat: 11.0245, lon: 77.0145 },
  { name: 'CODE STUDIO', location: 'ECE BLOCK 1ST FLOOR', lat: 11.0243, lon: 77.0143 },
  { name: 'NTT LAB', location: 'AI&DS BLOCK GROUND FLOOR', lat: 11.0230, lon: 77.0120 },
  { name: 'GENAI LAB', location: 'AI&DS BLOCK 2ND FLOOR', lat: 11.0238, lon: 77.0127 },
  { name: 'ML LAB', location: 'AI&DS BLOCK 1ST FLOOR', lat: 11.0232, lon: 77.0121 },
];

export const BADGE_LEVELS = [
  { level: 0, name: "Newcomer", minEvents: 0, icon: "🌟" },
  { level: 1, name: "Contributor", minEvents: 1, icon: "🥉" },
  { level: 2, name: "Activist", minEvents: 4, icon: "🥈" },
  { level: 3, name: "Leader", minEvents: 7, icon: "🥇" },
  { level: 4, name: "Champion", minEvents: 11, icon: "🏆" },
];

export const DEPARTMENTS = ["AI&DS", "ECE", "CSE", "IT", "MECH", "CIVIL", "General"];
export const CATEGORIES = ["Technical", "Cultural", "Sports", "Workshop", "Seminar"];
