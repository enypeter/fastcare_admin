/* eslint-disable @typescript-eslint/no-explicit-any */

export type SignUpT = {
  email: string;
  password: string;
  school: string;
  year: string;
};


export type FileType = {
  name: string;
  format: string;
  url: string;
};

export type ApiResponseT = {
  message: string;
  status: number;
  data: any;
};

export type ApiErrorT = {
  response: {
    data: {
      message: string;
    };
  };
};

export type UserT = {
  admin_id: string;
  verified: boolean;
  email: string;
  first_name: string;
  last_name: string;
  type: string;
  role_id: string;
};

export type CreatePasswordT = {
  password: string;
  token: string;
};

export type LoginT = {
  email: string;
  password: string;
};

export type CourseT = {
  id: string;
  name: string;
  description: string;
  tagline: string;
  image_url: string;
  completion_percentage: string;
  total_enrolled: string;
  total_chapters: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  published: boolean;
  status: CourseStatusT;
  is_deleted: boolean;
  chapters: ChapterT[];
};

export type CourseStatusT = 'started' | 'completed';

export type CourseOverviewT = {
  completion_percentage: string;
  total_enrolled: string;
  fully_completed_count: string;
  chat: string | null;
};

export type CourseDetailsT = {
  course: CourseT;
  course_completion_rate: CompletedLessonT[];
  quiz_completion_rate: AssessmentQuestionT[];
  top_user_data: TopStudentT[];
};

export type AddChapterT = {
  course_id: string;
  ordered_completion: boolean;
};

export type ChapterT = {
  id: string;
  completion_percentage: string;
  created_at: string;
  description: string;
  ordered_completion: string;
  status: string;
  updated_at: string;
  lessons: LessonT[];
};

export type AddLessonT = {
  uid: string;
  type: string;
  chapter_id: string;
  description: string;
  authenticated: boolean;
};

export type EditLessonT = {
  uid: string;
  type: string;
  chapter_id: string;
  description: string;
  authenticated?: boolean;
};

export type LessonT = {
  id: string;
  chapter_id: string;
  uid: string;
  created_by: string;
  description: string;
  video_url: string;
  type: LessonTypeT;
  uploaded_at: string;
  size: number;
  thumbnail_url: string;
  duration: string | null;
  question: string | null;
  meta: {
    name: string;
    filetype: 'video/mp4';
    firebase_media_id: string;
  };
};

export type LessonTypeT = 'video' | 'quiz';

export type QuizT = {
  questions: QuestionT[];
};

export type QuestionT = {
  text: string;
  options: QuestionOptionT[];
  field_type: QuestionTypeT;
  answer: any;
};

export type QuestionOptionT = {
  text: string;
};

export type QuestionTypeT = 'single choice' | 'multiple choice' | 'toggle';

export type CompletedLessonT = {
  name: string;
  completions: string;
};

export type AssessmentQuestionT = {
  assessment: string;
  question: string;
  average_score: string;
};

export type TopStudentT = {
  user_id: string;
  user_name: string;
  total_courses_enrolled: string;
  average_completion_percentage: string;
};

export type TopCourseT = {
  id: string;
  name: string;
  completion_percentage: string;
  average_rating: string;
};

export type UserEngagementT = {
  month: string;
  active_members: string;
  inactive_members: string;
};

export type NewRegT = {
  month: string;
  user_count: string;
};

export type AddCourseT = {
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  ingenium_unlimited: boolean;
  price?: string;
};

export type ForumChatT = {
  id: string;
  senderId: string;
  messageText: string;
  sentAt: string;
};

export type IndividualT = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  last_login: string;
  status: boolean;
  total_course_enrolled: string;
  subscription: boolean;
};

export type IndividualDetailsT = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: boolean;
  last_login: string;
  avatar: string | null;
  created_at: string;
  courses: {
    name: string;
    tagline: string;
    lesson_completed: number;
    total_video_lesson: number;
    total_quiz_lesson: number;
    total_enrolled: number;
    started_at: string;
  }[];
  transactions: {
    id: string;
    transaction_id: string;
    amount: string;
    method: string;
    status: PaymentStatusT;
    date: string;
  }[];
};

export type RoleT = {
  name: string;
  permissions: string[];
  description?: string | null;
};

export type UserStatusT = 'pending' | 'active' | 'inactive';

export type SubscriptionT = 'subscribed' | 'not subscribed';

export type PaymentStatusT = 'pending' | 'success' | 'failed';

export type BusinessT = {
  id: string;
  user_id: string;
  business_name: string;
  business_email: string;
  created_at: string;
  status: boolean;
  team_members: string;
  courses_enrolled: string;
};

export type BusinessDetailsT = {
  id: string;
  business_name: string;
  business_email: string;
  created_at: string;
  team_members: string;
  status: boolean;
  courses_enrolled: string;
  member: IndividualT[];
  courses_details: {
    id: string;
    course_name: string;
    status: string;
    member: number;
  }[];
  transactions: {
    id: string;
    transaction_id: string;
    amount: string;
    method: string;
    status: PaymentStatusT;
    date: string;
  }[];
};

export type MemberT = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: UserStatusT;
  last_usage: string;
  created_at: string;
};

export type TransactionT = {
  id: string;
  transaction_id: string;
  user_name: string;
  email: string;
  subscription_plan: SubscriptionPlanT;
  method: string;
  status: PaymentStatusT;
  date: string;
};

export type SubscriptionPlanT = 'pro plan' | 'basic plan' | 'free plan';

export type ApplicationT = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: ApplicationStatusT;
  job_title: string;
  created_by: string;
  date_applied: string;
};

export type ApplicationStatusT = 'applied';

export type JobT = {
  id: string;
  job_title: string;
  applications: string;
  status: boolean;
  created_by: string;
  created_at: string;
  page_view: string;
};

export type JobStatusT = 'pending' | 'active' | 'inactive';

export type AdminT = {
  id: string;
  total: string;
  first_name: string;
  last_name: string;
  status: boolean;
  last_login: string;
  created_at: string;
};

export type DeleteAdmin = {
  adminId: string;
};

export type Question = {
  question: string;
  answer: string;
  field_type: string;
  options: string[];
};

export type AddQuizT = {
  chapter_id: string;
  questions: Question[];
  description: string;
};

export type VideoUrlPollingT = {
  id: string;
  video_url: string;
  signToken: string;
} | null;
