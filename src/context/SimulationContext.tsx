import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Scenario,
  Patient,
  Prescription,
  UserRole,
  AdministrationEvent,
  TraineeActionLog,
  DrugFormularyItem,
  ClinicalConflict,
  NON_ADMIN_REASONS,
  EpmaTabKey,
  HomeMedicationItem,
  DischargeMedicationItem,
  ShortTermLeaveRecord
} from '../types/epma';
import { INITIAL_SCENARIOS } from '../data/initialScenarios';
import { BNF_FORMULARY, checkPrescribingConflicts } from '../data/bnfFormulary';

interface SimulationContextType {
  // Mode & Role
  mode: 'trainee' | 'instructor';
  setMode: (m: 'trainee' | 'instructor') => void;
  role: UserRole;
  setRole: (r: UserRole) => void;

  // Active Tab
  currentTab: EpmaTabKey;
  setCurrentTab: (tab: EpmaTabKey) => void;

  // Active Scenario & Patient
  scenarios: Scenario[];
  currentScenario: Scenario;
  selectScenario: (scenarioId: string) => void;
  patient: Patient;
  updatePatient: (p: Partial<Patient>) => void;

  // Prescriptions
  prescriptions: Prescription[];
  addPrescription: (rxData: Partial<Prescription>) => { success: boolean; message: string; conflicts?: ClinicalConflict[] };
  discontinuePrescription: (prescriptionId: string, reason: string) => void;
  chartAdministration: (data: {
    prescriptionId: string;
    scheduledDate: string;
    scheduledTime: string;
    status: 'ADMINISTERED' | 'OMITTED' | 'DEFERRED';
    doseAdministered?: string;
    isWardStock: boolean;
    nonAdminCode?: string;
    nonAdminReasonText?: string;
    witnessUsername?: string;
    witnessOverride?: boolean;
    notes?: string;
  }) => void;
  pharmacyScreenPrescription: (prescriptionId: string, status: 'SCREENED' | 'CLARIFICATION_REQUIRED', comment?: string) => void;

  // Discharge Rx (TTO)
  dischargeMedications: DischargeMedicationItem[];
  addDischargeMedication: (item: Omit<DischargeMedicationItem, 'id' | 'status'>) => void;
  approveDischargeMedication: (id: string) => void;
  removeDischargeMedication: (id: string) => void;
  populateDischargeFromInpatient: () => void;

  // Short Term Leave Rx
  shortTermLeaveRecords: ShortTermLeaveRecord[];
  addShortTermLeaveRecord: (record: Omit<ShortTermLeaveRecord, 'id'>) => void;
  updateLeaveStatus: (id: string, status: ShortTermLeaveRecord['status']) => void;

  // Medicines Reconciliation (Home Meds)
  homeMedications: HomeMedicationItem[];
  updateHomeMedicationStatus: (id: string, status: HomeMedicationItem['status'], notes?: string) => void;
  addHomeMedication: (item: Omit<HomeMedicationItem, 'id'>) => void;

  // Clock & Simulation Time
  simulatedDate: string; // e.g. "2026-08-21"
  simulatedTime: string; // e.g. "11:22"
  setSimulatedTime: (t: string) => void;
  setSimulatedDate: (d: string) => void;
  advanceToRound: (roundTime: '08:00' | '12:00' | '18:00' | '22:00') => void;

  // Banner Notification
  bannerMessage: { type: 'success' | 'warning' | 'info' | 'error'; text: string } | null;
  setBannerMessage: (msg: { type: 'success' | 'warning' | 'info' | 'error'; text: string } | null) => void;
  clearBanner: () => void;

  // Trainee Audit Trail & Safety Scoring
  actionLogs: TraineeActionLog[];
  safetyScore: number;
  objectivesCompletedCount: number;
  totalObjectivesCount: number;

  // Formularies & Checks
  formulary: DrugFormularyItem[];
  runConflictCheck: (drug: DrugFormularyItem) => ClinicalConflict[];

  // Scenario Authoring & Instructor Hub
  isInstructorAuthenticated: boolean;
  showInstructorPasswordModal: boolean;
  setShowInstructorPasswordModal: (show: boolean) => void;
  loginInstructor: (password: string) => boolean;
  logoutInstructor: () => void;
  requestInstructorMode: () => void;
  showScenarioModal: boolean;
  setShowScenarioModal: (show: boolean) => void;
  createCustomScenario: (newScenario: Scenario) => void;
  editCustomScenario: (updatedScenario: Scenario) => void;
  importScenarioJSON: (jsonString: string) => { success: boolean; message: string };
  exportScenarioJSON: () => string;
  resetScenario: () => void;
  triggerClinicalEvent: (eventId: string) => void;
  showHelpGuide: boolean;
  setShowHelpGuide: (show: boolean) => void;
  helpGuideSection: 'HELP' | 'OVERVIEW' | 'PRESCRIBING' | 'ADMINISTRATION' | 'CODES' | 'PHARMACY';
  setHelpGuideSection: (section: 'HELP' | 'OVERVIEW' | 'PRESCRIBING' | 'ADMINISTRATION' | 'CODES' | 'PHARMACY') => void;
  openHelpGuide: (section?: 'HELP' | 'OVERVIEW' | 'PRESCRIBING' | 'ADMINISTRATION' | 'CODES' | 'PHARMACY') => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'trainee' | 'instructor'>('trainee');
  const [isInstructorAuthenticated, setIsInstructorAuthenticated] = useState<boolean>(false);
  const [showInstructorPasswordModal, setShowInstructorPasswordModal] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole>('nurse');
  const [currentTab, setCurrentTab] = useState<EpmaTabKey>('Inpatient Rx');
  const [scenarios, setScenarios] = useState<Scenario[]>(INITIAL_SCENARIOS);
  const [currentScenarioId, setCurrentScenarioId] = useState<string>(INITIAL_SCENARIOS[0].id);
  const [showScenarioModal, setShowScenarioModal] = useState<boolean>(false);

  const currentScenario = useMemo(() => {
    return scenarios.find(s => s.id === currentScenarioId) || scenarios[0];
  }, [scenarios, currentScenarioId]);

  const [patient, setPatient] = useState<Patient>(currentScenario.patient);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(currentScenario.initialPrescriptions);
  const [actionLogs, setActionLogs] = useState<TraineeActionLog[]>([]);
  const [safetyScore, setSafetyScore] = useState<number>(100);

  // Discharge & Specialized Rx State
  const [dischargeMedications, setDischargeMedications] = useState<DischargeMedicationItem[]>([]);
  const [shortTermLeaveRecords, setShortTermLeaveRecords] = useState<ShortTermLeaveRecord[]>([]);
  const [homeMedications, setHomeMedications] = useState<HomeMedicationItem[]>([]);

  const [simulatedDate, setSimulatedDate] = useState<string>('2026-08-21');
  const [simulatedTime, setSimulatedTime] = useState<string>('11:22');
  const [bannerMessage, setBannerMessage] = useState<{ type: 'success' | 'warning' | 'info' | 'error'; text: string } | null>(null);
  const [showHelpGuide, setShowHelpGuide] = useState<boolean>(false);
  const [helpGuideSection, setHelpGuideSection] = useState<'HELP' | 'OVERVIEW' | 'PRESCRIBING' | 'ADMINISTRATION' | 'CODES' | 'PHARMACY'>('OVERVIEW');

  const openHelpGuide = (section: 'HELP' | 'OVERVIEW' | 'PRESCRIBING' | 'ADMINISTRATION' | 'CODES' | 'PHARMACY' = 'OVERVIEW') => {
    setHelpGuideSection(section);
    setShowHelpGuide(true);
  };

  // Sync patient & prescriptions when switching scenarios
  useEffect(() => {
    setPatient(currentScenario.patient);
    const initialRx = JSON.parse(JSON.stringify(currentScenario.initialPrescriptions));
    setPrescriptions(initialRx);
    setActionLogs([]);
    setSafetyScore(100);
    setBannerMessage(null);

    // Initial Discharge meds mapping
    const dischargeList: DischargeMedicationItem[] = initialRx
      .filter((rx: Prescription) => rx.rxType === 'REGULAR' || rx.rxType === 'PRN')
      .slice(0, 3)
      .map((rx: Prescription, idx: number) => ({
        id: `tto-${rx.id}-${idx}`,
        prescriptionId: rx.id,
        drugName: rx.drugName,
        dose: rx.dose,
        route: rx.route,
        frequency: rx.frequency,
        directions: rx.directions,
        supplyDays: 14,
        quantityText: '28 tablets',
        action: 'CONTINUE',
        gpActionRequired: 'Continue on repeat prescription. Review U&Es at 4 weeks.',
        isHighAlert: rx.isHighAlert,
        isControlledDrug: rx.isControlledDrug,
        status: idx === 0 ? 'PHARMACY_APPROVED' : 'PENDING_APPROVAL'
      }));
    setDischargeMedications(dischargeList);

    // Initial Meds Rec list
    const preAdmitMeds: HomeMedicationItem[] = [
      {
        id: 'home-1',
        drugName: 'RAMIPRIL Tablets',
        dose: '5 mg',
        route: 'Oral',
        frequency: 'ONCE a day in the morning',
        source: 'GP Summary Record',
        status: 'CONTINUED_INPATIENT',
        reconciliationNotes: 'Dose verified on GP summary. Continued as inpatient order.',
        reconciledBy: 'Clinical Pharmacist'
      },
      {
        id: 'home-2',
        drugName: 'ATORVASTATIN Tablets',
        dose: '20 mg',
        route: 'Oral',
        frequency: 'ONCE a day at night',
        source: 'GP Summary Record',
        status: 'CONTINUED_INPATIENT',
        reconciliationNotes: 'Patients own supply available in green pod bag.',
        reconciledBy: 'Clinical Pharmacist'
      },
      {
        id: 'home-3',
        drugName: 'ASPIRIN Dispersible Tablets',
        dose: '75 mg',
        route: 'Oral',
        frequency: 'ONCE a day with breakfast',
        source: 'Patients Own Drugs (PODs)',
        status: 'WITHHELD',
        reconciliationNotes: 'Withheld pre-procedure / pending haemoglobin stabilization.',
        reconciledBy: 'Dr. Trainee'
      }
    ];
    setHomeMedications(preAdmitMeds);

    // Initial Short term leave record
    const leaveRec: ShortTermLeaveRecord = {
      id: 'leave-initial-1',
      leaveStartDate: '2026-08-23',
      leaveStartTime: '10:00',
      leaveReturnDate: '2026-08-24',
      leaveReturnTime: '18:00',
      destination: 'Home address with family (Weekend Pass)',
      authorizedBy: 'Dr. Consultant / FY1',
      leaveMedicines: [
        {
          drugName: 'PARACETAMOL Tablets 500mg',
          dose: '1000 mg',
          frequency: 'FOUR times a day PRN',
          dosesSupplied: 8,
          directions: 'Take 2 tablets four times a day as required for pain'
        }
      ],
      notes: 'Patient medically stable for 32h weekend trial leave.',
      status: 'AUTHORIZED'
    };
    setShortTermLeaveRecords([leaveRec]);
  }, [currentScenarioId]);

  const clearBanner = () => setBannerMessage(null);

  const updatePatient = (updated: Partial<Patient>) => {
    setPatient(prev => ({ ...prev, ...updated }));
  };

  const selectScenario = (id: string) => {
    setCurrentScenarioId(id);
    setBannerMessage({
      type: 'info',
      text: `Loaded simulation scenario.`
    });
  };

  const resetScenario = () => {
    const fresh = scenarios.find(s => s.id === currentScenarioId) || scenarios[0];
    setPatient(JSON.parse(JSON.stringify(fresh.patient)));
    setPrescriptions(JSON.parse(JSON.stringify(fresh.initialPrescriptions)));
    setActionLogs([]);
    setSafetyScore(100);
    setBannerMessage({ type: 'info', text: 'Simulation scenario reset to initial clinical state.' });
  };

  const advanceToRound = (roundTime: '08:00' | '12:00' | '18:00' | '22:00') => {
    setSimulatedTime(roundTime);
    setBannerMessage({
      type: 'info',
      text: `Simulation clock advanced to ${roundTime} Medication Administration Round.`
    });
  };

  const logAction = (action: Omit<TraineeActionLog, 'id' | 'timestamp'>) => {
    const newLog: TraineeActionLog = {
      ...action,
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: `${simulatedDate} ${simulatedTime}`
    };
    setActionLogs(prev => [newLog, ...prev]);
    if (action.safetyScoreDelta) {
      setSafetyScore(prev => Math.max(0, Math.min(100, prev + (action.safetyScoreDelta || 0))));
    }
  };

  const runConflictCheck = (drug: DrugFormularyItem): ClinicalConflict[] => {
    return checkPrescribingConflicts(
      drug,
      prescriptions.map(p => ({
        drugName: p.drugName,
        genericName: p.genericName,
        route: p.route,
        rxType: p.rxType
      })),
      patient.allergies.map(a => ({ allergen: a.allergen, reaction: a.reaction })),
      patient.weightKg,
      patient.eGFR
    );
  };

  const addPrescription = (rxData: Partial<Prescription>) => {
    const newRx: Prescription = {
      id: 'rx-' + Date.now(),
      patientId: patient.id,
      drugName: rxData.drugName || 'Unknown Medication',
      genericName: rxData.genericName || rxData.drugName || '',
      formulation: rxData.formulation || 'Tablets',
      strength: rxData.strength || '',
      dose: rxData.dose || '1 dose',
      route: rxData.route || 'Oral',
      rxType: rxData.rxType || 'REGULAR',
      status: 'ACTIVE',
      prescribedDate: simulatedDate,
      prescribedTime: simulatedTime,
      prescriberName: role === 'doctor' ? 'Dr. Trainee (FY1)' : 'Clinical Prescriber',
      prescriberGrade: 'FY1 Junior Doctor',
      frequency: rxData.frequency || 'ONCE a day',
      timesOfDay: rxData.timesOfDay || ['08:00'],
      directions: rxData.directions || 'Take as directed.',
      prnMinIntervalHours: rxData.prnMinIntervalHours,
      prnMaxDailyDose: rxData.prnMaxDailyDose,
      isControlledDrug: rxData.isControlledDrug,
      isHighAlert: rxData.isHighAlert,
      isTimeCritical: rxData.isTimeCritical,
      bnfChapter: rxData.bnfChapter,
      administrationEvents: []
    };

    setPrescriptions(prev => [newRx, ...prev]);

    // Safety checks
    const isPenicillin = newRx.genericName.toLowerCase().includes('penicillin') ||
      newRx.genericName.toLowerCase().includes('amoxicillin') ||
      newRx.drugName.toLowerCase().includes('co-amoxiclav');

    const hasPenicillinAllergy = patient.allergies.some(a => a.allergen.toLowerCase().includes('penicillin'));

    if (isPenicillin && hasPenicillinAllergy) {
      logAction({
        role,
        actionType: 'PRESCRIBE_DRUG',
        drugName: newRx.drugName,
        details: `CRITICAL MEDICATION SAFETY BREACH: Prescribed ${newRx.drugName} to patient with recorded severe Penicillin allergy!`,
        isSafetyCritical: true,
        safetyScoreDelta: -40,
        feedbackNote: 'Severe error: High risk of patient anaphylactic shock.'
      });
      setBannerMessage({
        type: 'error',
        text: `CRITICAL SAFETY ALERT: Prescribed ${newRx.drugName} to patient with severe Penicillin allergy!`
      });
    } else {
      logAction({
        role,
        actionType: 'PRESCRIBE_DRUG',
        drugName: newRx.drugName,
        details: `Prescribed ${newRx.drugName} (${newRx.dose} ${newRx.route}) - ${newRx.frequency}`,
        isSafetyCritical: false,
        safetyScoreDelta: 10,
        feedbackNote: 'Prescription written and validated in accordance with BNF standards.'
      });
      setBannerMessage({
        type: 'success',
        text: `Prescription for ${newRx.drugName} has been successfully added to inpatient chart.`
      });
    }

    return { success: true, message: 'Prescription charted' };
  };

  const discontinuePrescription = (prescriptionId: string, reason: string) => {
    setPrescriptions(prev =>
      prev.map(p => {
        if (p.id === prescriptionId) {
          return {
            ...p,
            status: 'DISCONTINUED',
            discontinuedDate: `${simulatedDate} ${simulatedTime}`,
            discontinuedReason: reason,
            discontinuedBy: role.toUpperCase()
          };
        }
        return p;
      })
    );

    const rx = prescriptions.find(p => p.id === prescriptionId);
    logAction({
      role,
      actionType: 'DISCONTINUE_DRUG',
      drugName: rx?.drugName,
      details: `Discontinued ${rx?.drugName}. Reason: ${reason}`
    });

    setBannerMessage({
      type: 'info',
      text: `Prescription for ${rx?.drugName || 'medication'} discontinued.`
    });
  };

  const chartAdministration = (data: {
    prescriptionId: string;
    scheduledDate: string;
    scheduledTime: string;
    status: 'ADMINISTERED' | 'OMITTED' | 'DEFERRED';
    doseAdministered?: string;
    isWardStock: boolean;
    nonAdminCode?: string;
    nonAdminReasonText?: string;
    witnessUsername?: string;
    witnessOverride?: boolean;
    preAdminRecordedValue?: string;
    preAdminRecordedUnit?: string;
    preAdminCheckType?: any;
    preAdminOverrideReason?: string;
    notes?: string;
  }) => {
    const rx = prescriptions.find(p => p.id === data.prescriptionId);
    if (!rx) return;

    const newEvent: AdministrationEvent = {
      id: 'admin-' + Date.now(),
      prescriptionId: data.prescriptionId,
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
      actualAdminTime: `${data.scheduledDate} ${simulatedTime}`,
      status: data.status,
      doseAdministered: data.doseAdministered || rx.dose,
      administeredBy: role === 'nurse' ? 'Staff Nurse (Trainee)' : 'Clinician',
      role: role,
      isWardStock: data.isWardStock,
      nonAdminCode: data.nonAdminCode,
      nonAdminReasonText: data.nonAdminReasonText,
      witnessRequired: rx.isControlledDrug,
      witnessUsername: data.witnessUsername,
      witnessOverride: data.witnessOverride,
      preAdminRecordedValue: data.preAdminRecordedValue,
      preAdminRecordedUnit: data.preAdminRecordedUnit,
      preAdminCheckType: data.preAdminCheckType,
      preAdminOverrideReason: data.preAdminOverrideReason,
      notes: data.notes,
      recordedAt: `${simulatedDate} ${simulatedTime}`
    };

    setPrescriptions(prev =>
      prev.map(p => {
        if (p.id === data.prescriptionId) {
          return {
            ...p,
            lastAdministration:
              data.status === 'ADMINISTERED'
                ? {
                    date: data.scheduledDate,
                    time: simulatedTime,
                    dose: data.doseAdministered || p.dose
                  }
                : p.lastAdministration,
            administrationEvents: [newEvent, ...p.administrationEvents.filter(e => !(e.scheduledDate === data.scheduledDate && e.scheduledTime === data.scheduledTime))]
          };
        }
        return p;
      })
    );

    // Audit and Feedback
    if (data.status === 'ADMINISTERED') {
      logAction({
        role,
        actionType: 'CHART_ADMINISTRATION',
        drugName: rx.drugName,
        details: `Administered ${rx.dose} ${rx.route} at ${simulatedTime} (Ward Stock: ${data.isWardStock ? 'Yes' : 'No'})${data.witnessUsername ? ` [Dual-Witness: ${data.witnessUsername}]` : ''}`,
        safetyScoreDelta: 5
      });
      setBannerMessage({
        type: 'success',
        text: 'You have successfully charted the administration.'
      });
    } else if (data.status === 'OMITTED') {
      const reasonObj = NON_ADMIN_REASONS.find(r => r.code === data.nonAdminCode);
      logAction({
        role,
        actionType: 'OMIT_DOSE',
        drugName: rx.drugName,
        details: `Omitted dose scheduled for ${data.scheduledTime}. Reason: ${data.nonAdminReasonText || reasonObj?.label || 'Not specified'}`
      });
      setBannerMessage({
        type: 'warning',
        text: `Dose omitted recorded: ${data.nonAdminReasonText || reasonObj?.label}.`
      });
    }
  };

  const pharmacyScreenPrescription = (prescriptionId: string, status: 'SCREENED' | 'CLARIFICATION_REQUIRED', comment?: string) => {
    setPrescriptions(prev =>
      prev.map(p => {
        if (p.id === prescriptionId) {
          const endorsement = {
            pharmacistName: 'Clinical Pharmacist (Trainee)',
            date: `${simulatedDate} ${simulatedTime}`,
            status,
            comment
          };
          return {
            ...p,
            clinicalEndorsements: [endorsement, ...(p.clinicalEndorsements || [])]
          };
        }
        return p;
      })
    );

    const rx = prescriptions.find(p => p.id === prescriptionId);
    logAction({
      role,
      actionType: 'PHARMACY_SCREEN',
      drugName: rx?.drugName,
      details: `Pharmacy review completed: ${status}${comment ? ` - "${comment}"` : ''}`
    });

    setBannerMessage({
      type: 'info',
      text: `Pharmacy endorsement recorded for ${rx?.drugName}.`
    });
  };

  // Discharge Rx Helpers
  const addDischargeMedication = (item: Omit<DischargeMedicationItem, 'id' | 'status'>) => {
    const newItem: DischargeMedicationItem = {
      ...item,
      id: 'tto-' + Date.now(),
      status: 'PENDING_APPROVAL'
    };
    setDischargeMedications(prev => [newItem, ...prev]);
    logAction({
      role,
      actionType: 'PRESCRIBE_DRUG',
      drugName: item.drugName,
      details: `Added Discharge (TTO) Prescription for ${item.drugName} (${item.supplyDays} days supply)`
    });
    setBannerMessage({
      type: 'success',
      text: `Discharge medication ${item.drugName} added to TTO chart.`
    });
  };

  const approveDischargeMedication = (id: string) => {
    setDischargeMedications(prev =>
      prev.map(m => (m.id === id ? { ...m, status: 'PHARMACY_APPROVED' } : m))
    );
    setBannerMessage({
      type: 'success',
      text: 'Discharge medication verified and approved for pharmacy dispensing.'
    });
  };

  const removeDischargeMedication = (id: string) => {
    setDischargeMedications(prev => prev.filter(m => m.id !== id));
  };

  const populateDischargeFromInpatient = () => {
    const fromInpatient: DischargeMedicationItem[] = prescriptions
      .filter(p => p.status === 'ACTIVE' && (p.rxType === 'REGULAR' || p.rxType === 'PRN'))
      .map(p => ({
        id: `tto-${p.id}-${Date.now()}`,
        prescriptionId: p.id,
        drugName: p.drugName,
        dose: p.dose,
        route: p.route,
        frequency: p.frequency,
        directions: p.directions,
        supplyDays: 14,
        quantityText: '14-28 days standard hospital supply',
        action: 'CONTINUE',
        gpActionRequired: 'Continue on repeat prescription as indicated.',
        isHighAlert: p.isHighAlert,
        isControlledDrug: p.isControlledDrug,
        status: 'PENDING_APPROVAL'
      }));

    setDischargeMedications(fromInpatient);
    setBannerMessage({
      type: 'success',
      text: `Imported ${fromInpatient.length} active inpatient prescriptions to Discharge TTO chart.`
    });
  };

  // Short Term Leave Helpers
  const addShortTermLeaveRecord = (record: Omit<ShortTermLeaveRecord, 'id'>) => {
    const newRecord: ShortTermLeaveRecord = {
      ...record,
      id: 'leave-' + Date.now()
    };
    setShortTermLeaveRecords(prev => [newRecord, ...prev]);
    logAction({
      role,
      actionType: 'PRESCRIBE_DRUG',
      details: `Authorized Short Term Leave for patient (${record.leaveStartDate} to ${record.leaveReturnDate})`
    });
    setBannerMessage({
      type: 'success',
      text: 'Short term leave pass and packed medication order created.'
    });
  };

  const updateLeaveStatus = (id: string, status: ShortTermLeaveRecord['status']) => {
    setShortTermLeaveRecords(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  // Meds Rec Helpers
  const updateHomeMedicationStatus = (id: string, status: HomeMedicationItem['status'], notes?: string) => {
    setHomeMedications(prev =>
      prev.map(m => (m.id === id ? { ...m, status, reconciliationNotes: notes || m.reconciliationNotes, reconciledBy: role.toUpperCase() } : m))
    );
    setBannerMessage({
      type: 'info',
      text: 'Medicines reconciliation status updated.'
    });
  };

  const addHomeMedication = (item: Omit<HomeMedicationItem, 'id'>) => {
    const newItem: HomeMedicationItem = {
      ...item,
      id: 'home-' + Date.now()
    };
    setHomeMedications(prev => [newItem, ...prev]);
  };

  // Scenario Authoring & Custom Cases
  const createCustomScenario = (newScenario: Scenario) => {
    setScenarios(prev => [newScenario, ...prev]);
    setCurrentScenarioId(newScenario.id);
    setBannerMessage({
      type: 'success',
      text: `Custom training scenario "${newScenario.title}" created and loaded!`
    });
  };

  const editCustomScenario = (updatedScenario: Scenario) => {
    setScenarios(prev => prev.map(s => (s.id === updatedScenario.id ? updatedScenario : s)));
    if (currentScenarioId === updatedScenario.id) {
      setPatient(updatedScenario.patient);
      setPrescriptions(JSON.parse(JSON.stringify(updatedScenario.initialPrescriptions)));
    }
    setBannerMessage({
      type: 'success',
      text: `Scenario "${updatedScenario.title}" updated successfully.`
    });
  };

  const importScenarioJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.title || !parsed.patient) {
        return { success: false, message: 'Invalid scenario format: missing title or patient data.' };
      }
      const imported: Scenario = {
        ...parsed,
        id: parsed.id || 'scenario-import-' + Date.now(),
        initialPrescriptions: parsed.initialPrescriptions || [],
        objectives: parsed.objectives || [],
        clinicalEvents: parsed.clinicalEvents || []
      };
      setScenarios(prev => [imported, ...prev]);
      setCurrentScenarioId(imported.id);
      return { success: true, message: `Imported "${imported.title}" successfully.` };
    } catch (e: any) {
      return { success: false, message: 'JSON Parse Error: ' + e.message };
    }
  };

  const exportScenarioJSON = () => {
    return JSON.stringify(currentScenario, null, 2);
  };

  const triggerClinicalEvent = (eventId: string) => {
    const evt = currentScenario.clinicalEvents.find(e => e.id === eventId);
    if (!evt) return;

    if (evt.type === 'PATIENT_REQUEST') {
      setBannerMessage({
        type: 'warning',
        text: `CLINICAL ALERT: ${evt.title} - ${evt.message}`
      });
    } else if (evt.type === 'VITAL_SIGN_CHANGE') {
      updatePatient({
        vitals: {
          ...patient.vitals!,
          news2Score: 5,
          lastUpdated: `Just now (${simulatedTime})`
        }
      });
      setBannerMessage({
        type: 'error',
        text: `VITALS DETERIORATION: Patient NEWS2 score increased to 5!`
      });
    }

    logAction({
      role: 'instructor',
      actionType: 'UPDATE_VITALS',
      details: `Instructor injected clinical event: ${evt.title}`
    });
  };

  const objectivesCompletedCount = useMemo(() => {
    let count = 0;
    currentScenario.objectives.forEach(obj => {
      if (obj.category === 'ADMINISTRATION') {
        const hasAdmin = prescriptions.some(p => p.administrationEvents.some(e => e.status === 'ADMINISTERED'));
        if (hasAdmin) count++;
      } else if (obj.category === 'NON_ADMIN_HANDLING') {
        const hasOmit = prescriptions.some(p => p.administrationEvents.some(e => e.status === 'OMITTED'));
        if (hasOmit) count++;
      } else if (obj.category === 'PRESCRIBING') {
        const hasNewRx = prescriptions.length > currentScenario.initialPrescriptions.length;
        if (hasNewRx) count++;
      } else {
        count++;
      }
    });
    return Math.min(count, currentScenario.objectives.length);
  }, [prescriptions, currentScenario]);

  const loginInstructor = (password: string): boolean => {
    if (password.trim() === 'Admin') {
      setIsInstructorAuthenticated(true);
      setMode('instructor');
      setShowInstructorPasswordModal(false);
      setBannerMessage({
        type: 'success',
        text: 'Faculty & Instructor Mode active. Scenario authoring and import/export tools unlocked.'
      });
      return true;
    }
    return false;
  };

  const logoutInstructor = () => {
    setIsInstructorAuthenticated(false);
    setMode('trainee');
    setBannerMessage({
      type: 'info',
      text: 'Exited Instructor Mode. Simulation locked in Trainee view.'
    });
  };

  const requestInstructorMode = () => {
    if (isInstructorAuthenticated) {
      setMode('instructor');
    } else {
      setShowInstructorPasswordModal(true);
    }
  };

  return (
    <SimulationContext.Provider
      value={{
        mode,
        setMode,
        role,
        setRole,
        currentTab,
        setCurrentTab,
        scenarios,
        currentScenario,
        selectScenario,
        patient,
        updatePatient,
        prescriptions,
        addPrescription,
        discontinuePrescription,
        chartAdministration,
        pharmacyScreenPrescription,
        dischargeMedications,
        addDischargeMedication,
        approveDischargeMedication,
        removeDischargeMedication,
        populateDischargeFromInpatient,
        shortTermLeaveRecords,
        addShortTermLeaveRecord,
        updateLeaveStatus,
        homeMedications,
        updateHomeMedicationStatus,
        addHomeMedication,
        simulatedDate,
        simulatedTime,
        setSimulatedTime,
        setSimulatedDate,
        advanceToRound,
        bannerMessage,
        setBannerMessage,
        clearBanner,
        actionLogs,
        safetyScore,
        objectivesCompletedCount,
        totalObjectivesCount: currentScenario.objectives.length,
        formulary: BNF_FORMULARY,
        runConflictCheck,
        isInstructorAuthenticated,
        showInstructorPasswordModal,
        setShowInstructorPasswordModal,
        loginInstructor,
        logoutInstructor,
        requestInstructorMode,
        showScenarioModal,
        setShowScenarioModal,
        createCustomScenario,
        editCustomScenario,
        importScenarioJSON,
        exportScenarioJSON,
        resetScenario,
        triggerClinicalEvent,
        showHelpGuide,
        setShowHelpGuide,
        helpGuideSection,
        setHelpGuideSection,
        openHelpGuide
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
