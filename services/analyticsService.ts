
import { Event, Registration, User } from '../types';
import { users as allUsers, events as allEvents } from './mockData';

export const getVolunteersPerDepartment = (registrations: Registration[]) => {
    const departmentCounts: { [key: string]: number } = {};
    registrations.forEach(reg => {
        const event = allEvents.find(e => e.id === reg.eventId);
        if (event) {
            departmentCounts[event.department] = (departmentCounts[event.department] || 0) + 1;
        }
    });

    return Object.entries(departmentCounts).map(([name, value]) => ({ name, value }));
};

export const getEventParticipationTrends = (registrations: Registration[]) => {
    const trendData: { [key: string]: number } = {};
    const sortedRegistrations = [...registrations].sort((a, b) => a.registrationDate.getTime() - b.registrationDate.getTime());

    sortedRegistrations.forEach(reg => {
        const dateStr = reg.registrationDate.toISOString().split('T')[0];
        trendData[dateStr] = (trendData[dateStr] || 0) + 1;
    });

    return Object.entries(trendData).map(([name, value]) => ({ name, value }));
};

export const getVenueUsage = (events: Event[]) => {
    const venueCounts: { [key: string]: number } = {};
    events.forEach(event => {
        venueCounts[event.venue] = (venueCounts[event.venue] || 0) + 1;
    });

    return Object.entries(venueCounts).map(([name, count]) => ({ name, count }));
};
