export interface IEvents {
  _id: string;
  title: string;
  description: string;
  eventType: 'environment' | 'community' | 'education' | 'health' | 'food' | 'fundraising';
  thumbnail: string;
  location: string;
  eventDate: string;
  email?: string;
  creatorName?: string;
  creatorImage?: string;
}