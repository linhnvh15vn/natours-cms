export const EXAMPLE = 'EXAMPLE';

export enum QUERY_KEY {
  TOURS = 'tours',
  USERS = 'users',
}

export const TOUR_DIFFICULTY_OPTIONS = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Difficult', value: 'difficult' },
];

export const DIFFICULT_COLOR: { [key: string]: string } = {
  easy: 'green',
  medium: 'blue',
  difficult: 'red',
};

export const USER_ROLE_COLOR: { [key: string]: string } = {
  user: 'cyan',
  guide: 'gold',
  'lead-guide': 'volcano',
  admin: 'magenta',
};

export const DATE_FORMAT = 'YYYY/MM/DD';
