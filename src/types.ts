export interface ApiError {
  message: string;
  status?: number;
  isAuthError: boolean;
  isNetworkError: boolean;
}

export interface ApiStatus {
  isAvailable: boolean;
  error: ApiError | null;
  isLoading: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  isAdmin: boolean;
  registrationDate: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface FormOption {
  id: string;
  option?: string;
  value?: string;
}

export interface FormQuestion {
  id: string;
  question: string;
  type?: string;
  options?: FormOption[];
}

export interface ActivityUserStatus {
  signedUp: boolean;
  signupId?: string | null;
  onWaitlist: boolean;
  waitlistId?: string | null;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  venue: string;
  startTime: string;
  endTime: string | null;
  signupDeadline: string;
  maxParticipants?: number;
  committee: string;
  poster: string | null;
  form: FormQuestion[];
  userStatus: ActivityUserStatus;
  totalSignUps: number;
  maxSignups?: number;
}

export interface ActivityDetails {
  id: string;
  title: string;
  description: string;
  venue: string;
  startTime: string;
  endTime: string | null;
  signupDeadline: string;
  maxParticipants?: number;
  committee: string;
  poster: string | null;
}

export interface Participant {
  id: string;
  name: string;
  username: string;
}

export interface FormAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface SingleActivity {
  activity: ActivityDetails;
  form: FormQuestion[];
  participants: Participant[];
  userStatus: {
    signedUp: boolean;
    onWaitlist: boolean;
    registrationId: string | null;
    answers: FormAnswer[];
  };
}

export interface ActivitySignup {
  type: "signup" | "waitlist";
  answers: Record<string, string>;
}

export interface ActivitySignupResponse {
  success: boolean;
  id?: string;
  message?: string;
  missingFields?: string[];
}

export interface RemoveRegistration {
  activityId: string;
  type?: "signup" | "waitlist";
}
