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
  mostWanted?: boolean;
  public: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
