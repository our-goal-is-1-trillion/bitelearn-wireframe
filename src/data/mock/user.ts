export interface UserProfile {
  id: string;
  name: string;
  totalExp: number;
  level: number;
  consecutiveDays: number;
}

export const MOCK_USER: UserProfile = {
  id: "user_1",
  name: "코딩하는 멍멍이",
  totalExp: 1250,
  level: 5,
  consecutiveDays: 12,
};
