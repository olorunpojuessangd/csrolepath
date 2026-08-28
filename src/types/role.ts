export interface PrereqCheckItem {
  id: string;
  label: string;
  isCourse?: boolean;
  courseCode?: string;
}

export interface Role {
  id: string;
  title: string;
  category: string;
  skills: string[];
  prerequisites: string[];
  prerequisiteChecklist: PrereqCheckItem[];
  bestFor: string[];
  description: string;
  whatYouLearn: string[];
  typicalBackground: string;
  commonNextSteps: string[];
  whyGoodFit: string;
  timeCommitment: string;
  /** Whether this role can be held as a 5 hr/week secondary position
   *  alongside a primary 10 hr/week contract. Only TA roles qualify. */
  secondaryEligible: boolean;
  /** Whether this role uses the 10–15 hr/week lead/senior contract structure
   *  rather than the standard 10 hr/week contract. */
  isLeadStructure?: boolean;
  department: string;
  location: string;
  contactPerson: string;
  hiringCycle: string;
  handshakeQuery: string;
  internshipAlignment: string;
  applicationMaterials: string[];
}


export interface UserPreferences {
  year: string;
  goals: string[];
  constraints?: string;
}

export type CareerTrackId = 
  | 'all' 
  | 'swe' 
  | 'ai-data' 
  | 'systems' 
  | 'teaching' 
  | 'ux';

export interface CareerTrack {
  id: CareerTrackId;
  label: string;
  description: string;
}
