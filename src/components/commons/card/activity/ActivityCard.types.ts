import { IActivityList } from 'components/units/activity/list/ActivityList.types';

export interface IActivityCardProps {
  el: IActivityList;
}

// export interface IActivityCardProps {
//   activitycategory: Activitycategory;
//   activityjoin: Activityjoin[];
//   createAt: string;
//   dday: string;
//   deleteAt?: string;
//   description: string;
//   id: string;
//   location: string;
//   maxpeople?: number;
//   people: number;
//   subdescription: string;
//   title: string;
//   updateAt: string;
//   url: string;
// }

// export interface Activitycategory {
//   category: string;
//   createAt: string;
//   deleteAt?: string;
//   id: string;
// }

// export interface Activityjoin {
//   admin: string;
//   id: string;
//   user: User;
// }

// export interface User {
//   address1: string;
//   address2: string;
//   addressnumber: string;
//   createAt: string;
//   delete?: string | null;
//   email: string;
//   id: string | undefined;
//   name: string | undefined;
//   password: string;
//   phone: string;
//   role: string;
//   updateAt: string;
//   url: string;
// }
