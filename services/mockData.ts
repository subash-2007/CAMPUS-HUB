
import { User, Event, Registration, Attendance, Role } from '../types';

// In a real app, use bcrypt. For simulation, we use plaintext.
export const users: User[] = [
  {
    id: 1, email: 'admin@campus.edu', passwordHash: 'admin123', role: Role.ADMIN, profile: null
  },
  {
    id: 2, email: 'organizer1@campus.edu', passwordHash: 'org123', role: Role.ORGANIZER, profile: null
  },
  {
    id: 3, email: 'student1@campus.edu', passwordHash: 'stu123', role: Role.STUDENT, 
    profile: { firstName: 'Vijay', lastName: 'Sri', rollNumber: '24AD247', year: 2, contactNumber: '7904459918', points: 30, attendedEvents: 3 }
  },
  {
    id: 4, email: 'student2@campus.edu', passwordHash: 'stu123', role: Role.STUDENT, 
    profile: { firstName: 'Subash', lastName: 'S', rollNumber: '24AD221', year: 3, contactNumber: '9597683038', points: 70, attendedEvents: 7 }
  },
   {
    id: 5, email: 'student3@campus.edu', passwordHash: 'stu123', role: Role.STUDENT, 
    profile: { firstName: 'Sudharsini', lastName: 'R', rollNumber: '24AD222', year: 1, contactNumber: '9976775825', points: 0, attendedEvents: 0 }
  },
];

export const events: Event[] = [
  { id: 1, title: 'AI Hackathon 2024', description: 'A 24-hour hackathon focused on generative AI.', department: 'AI&DS', category: 'Technical', dateTime: new Date('2024-10-26T09:00:00'), maxParticipants: 100, venue: 'GENAI LAB', organizerId: 2 },
  { id: 2, title: 'Annual Tech Symposium', description: 'Presentations on the latest tech trends.', department: 'CSE', category: 'Seminar', dateTime: new Date('2024-11-05T10:00:00'), maxParticipants: 200, venue: 'AUDITORIUM 1', organizerId: 2 },
  { id: 3, title: 'Robotics Workshop', description: 'Hands-on workshop to build a line-following robot.', department: 'ECE', category: 'Workshop', dateTime: new Date('2024-11-12T13:00:00'), maxParticipants: 40, venue: 'MAKERSPACE', organizerId: 2 },
  { id: 4, title: 'Cultural Night', description: 'An evening of music, dance, and drama.', department: 'General', category: 'Cultural', dateTime: new Date('2024-11-18T18:00:00'), maxParticipants: 300, venue: 'AUDITORIUM 2', organizerId: 2 },
  { id: 5, title: 'Campus Cleanup Drive', description: 'Volunteer to help keep our campus beautiful.', department: 'General', category: 'Social', dateTime: new Date('2024-10-30T08:00:00'), maxParticipants: 150, venue: 'VISTA HALL', organizerId: 2 },
  { id: 6, title: 'Advanced Machine Learning Talk', description: 'A deep dive into transformer models.', department: 'AI&DS', category: 'Technical', dateTime: new Date('2024-12-02T16:00:00'), maxParticipants: 75, venue: 'ML LAB', organizerId: 2 },
];

export const registrations: Registration[] = [
  { id: 1, userId: 3, eventId: 1, registrationDate: new Date('2024-10-15') },
  { id: 2, userId: 3, eventId: 5, registrationDate: new Date('2024-10-20') },
  { id: 3, userId: 4, eventId: 1, registrationDate: new Date('2024-10-16') },
  { id: 4, userId: 4, eventId: 2, registrationDate: new Date('2024-10-22') },
  { id: 5, userId: 4, eventId: 3, registrationDate: new Date('2024-10-25') },
  { id: 6, userId: 4, eventId: 4, registrationDate: new Date('2024-10-28') },
  { id: 7, userId: 4, eventId: 5, registrationDate: new Date('2024-10-21') },
];

export const attendance: Attendance[] = [
  { id: 1, userId: 3, eventId: 1, checkInTime: new Date('2024-10-26T09:05:00')},
  { id: 2, userId: 4, eventId: 1, checkInTime: new Date('2024-10-26T09:02:00')},
  { id: 3, userId: 4, eventId: 2, checkInTime: new Date('2024-11-05T10:01:00')},
  { id: 4, userId: 4, eventId: 3, checkInTime: new Date('2024-11-12T13:05:00')},
];
