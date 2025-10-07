
export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
}

export interface User {
  id: number;
  email: string;
  passwordHash: string; // In a real app, this would be a hash. Here, it's plaintext for simulation.
  role: Role;
  profile: StudentProfile | null;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
  rollNumber: string;
  year: number;
  contactNumber: string;
  points: number;
  attendedEvents: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  department: string;
  category: string;
  dateTime: Date;
  maxParticipants: number;
  venue: string;
  organizerId: number;
}

export interface Registration {
  id: number;
  userId: number;
  eventId: number;
  registrationDate: Date;
}

export interface Attendance {
  id: number;
  userId: number;
  eventId: number;
  checkInTime: Date;
}

export interface Venue {
  name: string;
  location: string;
  lat: number;
  lon: number;
}
