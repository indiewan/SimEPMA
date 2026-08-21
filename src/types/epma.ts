export type UserRole = 'doctor' | 'nurse' | 'pharmacist' | 'instructor';

export type RxType = 'REGULAR' | 'PRN' | 'STAT' | 'INFUSION' | 'VARIABLE' | 'DISCHARGE';

export type RxStatus = 'ACTIVE' | 'DISCONTINUED' | 'SUSPENDED' | 'COMPLETED';

export type AdminSlotStatus = 
  | 'DUE'          // Needs administration (shows '!')
  | 'ADMINISTERED' // Given successfully
  | 'OMITTED'      // Not given due to non-admin reason (refused, NBM, etc.)
  | 'DEFERRED'     // Delayed
  | 'NOT_DUE'      // Scheduled in future or not applicable
  | 'BLANK';       // Not scheduled / outside active date

export type EpmaTabKey =
  | 'Inpatient Rx'
  | 'Discharge Rx'
  | 'Short Term Leave Rx'
  | 'Discontinued Rx'
  | 'Monitoring & Assessment'
  | 'Conflict Log'
  | 'Administration'
  | 'Medicines Reconciliation'
  | 'Instructor View';

export interface HomeMedicationItem {
  id: string;
  drugName: string;
  dose: string;
  route: string;
  frequency: string;
  source: 'GP Summary Record' | 'Patient Recall' | 'Community Pharmacy PMR' | 'Patients Own Drugs (PODs)';
  status: 'CONTINUED_INPATIENT' | 'WITHHELD' | 'DISCONTINUED' | 'UNRECONCILED';
  reconciliationNotes?: string;
  reconciledBy?: string;
}

export interface DischargeMedicationItem {
  id: string;
  prescriptionId?: string;
  drugName: string;
  dose: string;
  route: string;
  frequency: string;
  directions: string;
  supplyDays: number;
  quantityText: string;
  action: 'CONTINUE' | 'NEW_MEDICATION' | 'DOSE_CHANGED' | 'DISCONTINUE_AT_DISCHARGE';
  gpActionRequired: string;
  isHighAlert?: boolean;
  isControlledDrug?: boolean;
  status: 'PENDING_APPROVAL' | 'PHARMACY_APPROVED' | 'DISPENSED';
}

export interface ShortTermLeaveRecord {
  id: string;
  leaveStartDate: string;
  leaveStartTime: string;
  leaveReturnDate: string;
  leaveReturnTime: string;
  destination: string;
  authorizedBy: string;
  leaveMedicines: {
    drugName: string;
    dose: string;
    frequency: string;
    dosesSupplied: number;
    directions: string;
  }[];
  notes: string;
  status: 'AUTHORIZED' | 'MEDS_PACKED' | 'RETURNED';
}

export interface NonAdminReasonItem {
  code: string;
  label: string;
  category: 'patient' | 'clinical' | 'pharmacy' | 'logistical';
  requiresDoctorNotification?: boolean;
}

export const NON_ADMIN_REASONS: NonAdminReasonItem[] = [
  { code: '01', label: '01 Patient Refused', category: 'patient' },
  { code: '02', label: '02 Drug Unavailable: TELL PHARMACY', category: 'pharmacy', requiresDoctorNotification: true },
  { code: '03', label: '03 Patient is Nil By Mouth (NBM)', category: 'clinical' },
  { code: '04', label: '04 Patient Unavailable / Off Ward', category: 'logistical' },
  { code: '05', label: '05 Omitted For Clinical Reasons', category: 'clinical', requiresDoctorNotification: true },
  { code: '06', label: '06 Patient Asleep', category: 'patient' },
  { code: '07', label: '07 Unable To Swallow: TELL PHARMACY', category: 'clinical', requiresDoctorNotification: true },
  { code: '08', label: '08 Other (Record In Notes)', category: 'clinical' },
  { code: '09', label: '09 Cannula Absent / Not Patent', category: 'clinical' },
  { code: '10', label: '10 Prior Dose Delayed - OMIT dose', category: 'clinical' },
  { code: '11', label: 'Patient on Short Term Leave', category: 'logistical' },
];

export interface AllergyItem {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'MILD' | 'MODERATE' | 'SEVERE_ANAPHYLAXIS';
  recordedDate: string;
}

export interface Patient {
  id: string;
  hospitalNumber: string;
  nationalNumber: string;
  firstName: string;
  lastName: string;
  dob: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  address: string;
  ward: string;
  bayBed: string;
  consultant: string;
  weightKg: number;
  isWeightOutdated: boolean;
  heightCm: number;
  bodySurfaceArea: number; // in sqm
  eGFR: number; // mL/min/1.73m2
  creatinine: number; // umol/L
  allergies: AllergyItem[];
  allergyStatus: 'RECORDED_ALLERGIES' | 'NKDA' | 'NOT_RECORDED';
  admitDate: string;
  clinicalSummary: string;
  resuscitationStatus: 'CPR' | 'DNACPR';
  fluidBalanceTargetMl?: number;
  vitals?: {
    bp: string;
    heartRate: number;
    respRate: number;
    temp: number;
    oxygenSat: number;
    oxygenDelivery: string;
    news2Score: number;
    lastUpdated: string;
  };
}

export type PreAdminCheckType =
  | 'PULSE'            // Digoxin, Beta-blockers (e.g. check apical HR >= 60 bpm)
  | 'BLOOD_PRESSURE'  // Antihypertensives (Ramipril, Amlodipine, Bisoprolol)
  | 'BLOOD_GLUCOSE'   // Insulins & Hypoglycaemics (CBG in mmol/L)
  | 'INR'             // Warfarin
  | 'RESP_RATE'       // High-dose Opioids
  | 'RENAL_TDM';      // Gentamicin / Vancomycin (trough level check)

export interface PreAdminRequirement {
  type: PreAdminCheckType;
  label: string;
  unit: string;
  minNormal?: number;
  maxNormal?: number;
  warningText: string;
  hardStop?: boolean;
}

export interface AdministrationEvent {
  id: string;
  prescriptionId: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  actualAdminTime?: string;
  status: 'ADMINISTERED' | 'OMITTED' | 'DEFERRED';
  doseAdministered?: string;
  administeredBy: string; // Nurse name or Trainee
  role: string;
  isWardStock: boolean;
  nonAdminCode?: string;
  nonAdminReasonText?: string;
  witnessRequired?: boolean;
  witnessUsername?: string;
  witnessOverride?: boolean;
  preAdminRecordedValue?: string;
  preAdminRecordedUnit?: string;
  preAdminCheckType?: PreAdminCheckType;
  preAdminOverrideReason?: string;
  notes?: string;
  recordedAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  drugName: string;
  genericName: string;
  brandName?: string;
  formulation: string; // e.g. "Tablets", "Nebuliser Solution", "Oral Suspension"
  strength: string;    // e.g. "500 mg", "2.5 mg in 2.5mL"
  dose: string;        // e.g. "1000 mg", "1 Nebule", "30 mg"
  route: string;       // e.g. "Oral", "Nebulised", "IntraVENOUS Infusion", "Rectal", "Subcutaneous"
  rxType: RxType;
  status: RxStatus;
  prescribedDate: string;
  prescribedTime: string;
  prescriberName: string;
  prescriberGrade: string; // "FY1", "ST3", "Consultant"
  frequency: string;   // e.g. "FOUR times a day at 08:00, 12:00, 18:00 and 22:00"
  timesOfDay: string[]; // ['08:00', '12:00', '18:00', '22:00']
  directions: string;  // e.g. "Take with food in the morning"
  prnMinIntervalHours?: number; // e.g. 4 for Paracetamol
  prnMaxDailyDose?: string;     // e.g. "4000 mg in 24 hours"
  isControlledDrug?: boolean;   // Requires witness dual sign-off
  isHighAlert?: boolean;
  isTimeCritical?: boolean;    // e.g. Parkinson's, Insulin
  isNonStock?: boolean;
  preAdminRequirement?: PreAdminRequirement;
  bnfChapter?: string;
  indication?: string;
  discontinuedDate?: string;
  discontinuedReason?: string;
  discontinuedBy?: string;
  clinicalEndorsements?: {
    pharmacistName: string;
    date: string;
    status: 'SCREENED' | 'CLARIFICATION_REQUIRED' | 'HIGH_RISK';
    comment?: string;
  }[];
  administrationEvents: AdministrationEvent[];
  lastAdministration?: {
    date: string;
    time: string;
    dose: string;
  };
}

export interface DrugFormularyItem {
  id: string;
  name: string;
  genericName: string;
  bnfChapter: string;
  standardFormulations: string[];
  standardStrengths: string[];
  standardRoutes: string[];
  defaultDoses: string[];
  typicalFrequencies: { label: string; times: string[]; type: RxType }[];
  isControlledDrug: boolean;
  isHighAlert: boolean;
  isTimeCritical?: boolean;
  preAdminRequirement?: PreAdminRequirement;
  cautions: string[];
  contraindications: string[];
  allergyGroup?: 'PENICILLIN' | 'SULFONAMIDE' | 'NSAID' | 'OPIOID' | 'MACROLIDE';
  blackTriangle?: boolean;
  monitoringRequired?: string;
}

export interface ClinicalConflict {
  id: string;
  severity: 'HIGH_CONTRAINDICATION' | 'MODERATE_WARNING' | 'LOW_ADVISORY';
  title: string;
  description: string;
  sourceDrug: string;
  targetDrugOrCondition: string;
  requiresOverrideReason: boolean;
}

export interface ScenarioObjective {
  id: string;
  title: string;
  description: string;
  category: 'PRESCRIBING' | 'ADMINISTRATION' | 'SAFETY_CHECK' | 'NON_ADMIN_HANDLING';
  completed: boolean;
  requiredForPassing: boolean;
  clinicalFeedback: string;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  specialty: string;
  description: string;
  learningGoals: string[];
  patient: Patient;
  initialPrescriptions: Prescription[];
  objectives: ScenarioObjective[];
  clinicalEvents: {
    id: string;
    triggerTimeMin: number;
    title: string;
    message: string;
    type: 'VITAL_SIGN_CHANGE' | 'LAB_RESULT' | 'PHARMACY_ALERT' | 'PATIENT_REQUEST';
    applied: boolean;
  }[];
}

export interface TraineeActionLog {
  id: string;
  timestamp: string;
  role: UserRole;
  actionType: 
    | 'PRESCRIBE_DRUG'
    | 'CHART_ADMINISTRATION'
    | 'OMIT_DOSE'
    | 'OVERRIDE_CONFLICT'
    | 'DISCONTINUE_DRUG'
    | 'PHARMACY_SCREEN'
    | 'UPDATE_VITALS'
    | 'WITNESS_SIGN_OFF';
  details: string;
  drugName?: string;
  isSafetyCritical?: boolean;
  safetyScoreDelta?: number;
  feedbackNote?: string;
}
