import { Timestamp } from '@firebase/firestore-types';

export interface WishListItem {
  createdBy: {
    uid: string;
    displayName: string;
  };
  id: string;
  name: string;
  note?: string;
  url?: string;
  mostWanted?: boolean;
  public: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
