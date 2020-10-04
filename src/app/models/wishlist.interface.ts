import { Timestamp } from '@firebase/firestore-types';

export interface WishListItem {
  createdBy: {
    uid: string;
    displayName: string;
  };
  bought: boolean;
  boughtBy: string;
  assignedUsers?: string[];
  id: string;
  name: string;
  url?: string;
  note?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
