import { Timestamp } from '@firebase/firestore-types';

export interface WishListItem {
  createdBy: {
    uid: string;
    displayName: string;
  };
  name: string;
  note?: string;
  url?: string;
  mostWanted?: boolean;
  public: boolean;
  updatedAt: Timestamp;
}
