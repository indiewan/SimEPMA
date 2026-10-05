import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Patient, AllergyItem } from '../../types/epma';
import {
  User,
  UserCog,
  ShieldAlert,
  Activity,
  Scale,
  Ruler,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  X,
  Plus,
  Trash2,
  Sparkles,
  RefreshCw,
  Save,
  Check,
  Stethoscope,
  Info,
  Download
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'demographics' | 'ward' | 'biometrics' | 'allergies' | 'vitals';
}

// Preset templates for quick instructor crafting
interface PatientPreset {
  name: string;
  badge: string;
  description: string;
  data: Partial<Patient>;
}

const PATIENT_PRESETS: PatientPreset[] = [
  {
    name: 'Jane Trevor (72F) - COPD & HF',
    badge: 'Standard Inpatient',
    description: 'Moderate renal function, mild hypertension, typical multi-morbidity inpatient.',
    data: {
      firstName: 'Jane',
      lastName: 'Trevor',
      dob: '1954-05-12',
      age: 72,
      gender: 'Female',
      address: '14 Acorn Way, Oxford, OX2 7HG',
      hospitalNumber: 'HOSP-94821',
      nationalNumber: 'NHS 482 910 3841',
      ward: 'Ward 4B (Acute Care)',
      bayBed: 'Bed 12',
      consultant: 'Dr. Sarah Jenkins (Cardiology)',
      weightKg: 68.5,
      isWeightOutdated: false,
      heightCm: 165,
      bodySurfaceArea: 1.77,
      eGFR: 58,
      creatinine: 92,
      allergyStatus: 'RECORDED_ALLERGIES',
      allergies: [
        {
          id: 'alg-pen',
          allergen: 'PENICILLIN',
          reaction: 'Anaphylaxis (swollen lips/tongue, wheeze)',
          severity: 'SEVERE_ANAPHYLAXIS',
          recordedDate: '2024-01-15'
        }
      ],
      clinicalSummary: 'Admitted with acute infective exacerbation of COPD with mild right-sided heart failure. Requires empirical antibiotic therapy avoiding beta-lactams.',
      resuscitationStatus: 'CPR'
    }
  },
  {
    name: 'Arthur Pendelton (84M) - Severe CKD 4',
    badge: 'Renal Dose Alert',
    description: 'eGFR 18 mL/min, Cr 245 µmol/L. Ideal for testing trainee adjustment of renally cleared drugs (Enoxaparin, Gentamicin, Vancomycin).',
    data: {
      firstName: 'Arthur',
      lastName: 'Pendelton',
      dob: '1942-09-28',
      age: 84,
      gender: 'Male',
      address: '8 Willow Crescent, Headington, OX3 9PQ',
      hospitalNumber: 'HOSP-81204',
      nationalNumber: 'NHS 194 820 5731',
      ward: 'Renal Medicine Ward 3',
      bayBed: 'Bed 04',
      consultant: 'Dr. Michael Thorne (Nephrology)',
      weightKg: 74.0,
      isWeightOutdated: false,
      heightCm: 172,
      bodySurfaceArea: 1.88,
      eGFR: 18,
      creatinine: 245,
      allergyStatus: 'NKDA',
      allergies: [],
      clinicalSummary: 'Stage 4 Chronic Kidney Disease secondary to diabetic nephropathy. Volume overloaded with peripheral oedema. High risk for nephrotoxic drug accumulation.',
      resuscitationStatus: 'DNACPR'
    }
  },
  {
    name: 'David Miller (59M) - Sepsis & High NEWS2',
    badge: 'Emergency / High Acuity',
    description: 'NEWS2 of 8, hypotensive and tachycardic. Tests urgent resuscitation and STAT antimicrobial prescribing.',
    data: {
      firstName: 'David',
      lastName: 'Miller',
      dob: '1967-03-14',
      age: 59,
      gender: 'Male',
      address: '42 Highfield Road, Abingdon, OX14 1EB',
      hospitalNumber: 'HOSP-72941',
      nationalNumber: 'NHS 902 481 6273',
      ward: 'Acute Assessment Unit (AAU)',
      bayBed: 'Resus Bay 2',
      consultant: 'Dr. Rachel Vance (Emergency Medicine)',
      weightKg: 82.0,
      isWeightOutdated: false,
      heightCm: 178,
      bodySurfaceArea: 2.01,
      eGFR: 42,
      creatinine: 135,
      allergyStatus: 'NKDA',
      allergies: [],
      clinicalSummary: 'Presenting with Sepsis secondary to right lower lobe pneumonia. NEWS2 score is 8. Urgent blood cultures, IV fluids, and broad-spectrum antibiotics required.',
      resuscitationStatus: 'CPR',
      vitals: {
        bp: '88/54',
        heartRate: 118,
        respRate: 26,
        temp: 38.9,
        oxygenSat: 92,
        oxygenDelivery: '4L Nasal Cannula',
        news2Score: 8,
        lastUpdated: '10 mins ago'
      }
    }
  },
  {
    name: 'Sophie Chen (46F) - Low Weight Oncology',
    badge: 'BSA Dosing Scenario',
    description: 'Weight 43.5kg, BSA 1.37 sqm. Ideal for calculating exact body surface area chemotherapy or narrow-index dosages.',
    data: {
      firstName: 'Sophie',
      lastName: 'Chen',
      dob: '1980-11-04',
      age: 46,
      gender: 'Female',
      address: '7 Meadowbrook Lane, Cowley, OX4 2ZZ',
      hospitalNumber: 'HOSP-60382',
      nationalNumber: 'NHS 319 840 9265',
      ward: 'Oncology Inpatient Ward 5',
      bayBed: 'Side Room 3',
      consultant: 'Dr. Fiona Patel (Medical Oncology)',
      weightKg: 43.5,
      isWeightOutdated: false,
      heightCm: 156,
      bodySurfaceArea: 1.37,
      eGFR: 88,
      creatinine: 58,
      allergyStatus: 'RECORDED_ALLERGIES',
      allergies: [
        {
          id: 'alg-met',
          allergen: 'METOCLOPRAMIDE',
          reaction: 'Oculogyric crisis / acute dystonia',
          severity: 'SEVERE_ANAPHYLAXIS',
          recordedDate: '2023-08-11'
        }
      ],
      clinicalSummary: 'Admitted for Cycle 3 adjuvant chemotherapy. Significant cachexia and nausea. Dosing must be strictly calibrated to Body Surface Area (BSA).',
      resuscitationStatus: 'CPR'
    }
  },
  {
    name: 'George Evans (78M) - Missing/Outdated Weight',
    badge: 'Mandatory Weighing Alert',
    description: 'Weight flagged as missing/outdated. Tests whether trainees identify and resolve the warning banner before charting high-alert meds.',
    data: {
      firstName: 'George',
      lastName: 'Evans',
      dob: '1948-02-20',
      age: 78,
      gender: 'Male',
      address: '19 St Giles Avenue, Oxford, OX1 3LY',
      hospitalNumber: 'HOSP-55109',
      nationalNumber: 'NHS 572 109 8432',
      ward: 'Care of the Elderly Ward 6',
      bayBed: 'Bed 08',
      consultant: 'Dr. Kenneth Clarke (Geriatric Medicine)',
      weightKg: 65.0,
      isWeightOutdated: true,
      heightCm: 168,
      bodySurfaceArea: 1.74,
      eGFR: 64,
      creatinine: 88,
      allergyStatus: 'NOT_RECORDED',
      allergies: [],
      clinicalSummary: 'Admitted following mechanical fall at residential home. No recorded weight on admission. Mandatory weighing required prior to paracetamol IV or enoxaparin.',
      resuscitationStatus: 'CPR'
    }
  }
];

const COMMON_WARDS = [
  'Ward 4B (Acute Care)',
  'Acute Medical Unit (AMU)',
  'Emergency Assessment Unit (EAU)',
  'Oncology Inpatient Ward 5',
  'Gastroenterology Ward 2',
  'Respiratory Medicine Ward 4',
  'Care of the Elderly Ward 6',
  'Surgical Assessment Unit (SAU)',
  'Intensive Care Unit (ICU)',
  'High Dependency Unit (HDU)',
  'ENT & Head & Neck Ward',
  'Obstetrics & Maternity'
];

const COMMON_CONSULTANTS = [
  'Dr. Sarah Jenkins (Cardiology)',
  'Dr. Michael Thorne (Nephrology)',
  'Dr. Fiona Patel (Medical Oncology)',
  'Dr. Kenneth Clarke (Geriatric Medicine)',
  'Dr. Rachel Vance (Emergency Medicine)',
  'Mr. Roger Vance (General Surgery)',
  'Dr. Alistair Henderson (Respiratory)',
  'Dr. Priya Sharma (Gastroenterology)'
];

const QUICK_ALLERGENS = [
  { name: 'Penicillin', reaction: 'Anaphylaxis & bronchospasm', severity: 'SEVERE_ANAPHYLAXIS' as const },
  { name: 'Amoxicillin / Co-amoxiclav', reaction: 'Facial swelling & severe rash', severity: 'SEVERE_ANAPHYLAXIS' as const },
  { name: 'Cephalosporins', reaction: 'Urticaria & angioedema', severity: 'MODERATE' as const },
  { name: 'NSAIDs (Ibuprofen / Naproxen)', reaction: 'Bronchospasm & severe asthma exacerbation', severity: 'SEVERE_ANAPHYLAXIS' as const },
  { name: 'Morphine / Opiates', reaction: 'Severe pruritus, nausea & vomiting', severity: 'MODERATE' as const },
  { name: 'Trimethoprim / Sulphonamides', reaction: 'Extensive maculopapular rash', severity: 'MODERATE' as const },
  { name: 'Latex', reaction: 'Contact dermatitis & wheezing', severity: 'MILD' as const }
];

export const InstructorPatientModal: React.FC<Props> = ({ isOpen, onClose, initialTab = 'demographics' }) => {
  const {
    patient,
    updatePatient,
    setBannerMessage,
    downloadPatientJSON,
    downloadScenarioJSON
  } = useSimulation();

  const [activeTab, setActiveTab] = useState<'demographics' | 'ward' | 'biometrics' | 'allergies' | 'vitals'>(initialTab);

  // Form State initialized with current patient
  const [firstName, setFirstName] = useState(patient.firstName);
  const [lastName, setLastName] = useState(patient.lastName);
  const [dob, setDob] = useState(patient.dob);
  const [age, setAge] = useState(patient.age);
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>(patient.gender);
  const [address, setAddress] = useState(patient.address);
  const [hospitalNumber, setHospitalNumber] = useState(patient.hospitalNumber);
  const [nationalNumber, setNationalNumber] = useState(patient.nationalNumber);

  // Ward & Clinical
  const [ward, setWard] = useState(patient.ward);
  const [bayBed, setBayBed] = useState(patient.bayBed);
  const [consultant, setConsultant] = useState(patient.consultant);
  const [admitDate, setAdmitDate] = useState(patient.admitDate);
  const [resuscitationStatus, setResuscitationStatus] = useState<'CPR' | 'DNACPR'>(patient.resuscitationStatus);
  const [clinicalSummary, setClinicalSummary] = useState(patient.clinicalSummary);

  // Biometrics & Renal
  const [weightKg, setWeightKg] = useState(patient.weightKg);
  const [isWeightOutdated, setIsWeightOutdated] = useState(patient.isWeightOutdated);
  const [heightCm, setHeightCm] = useState(patient.heightCm);
  const [bodySurfaceArea, setBodySurfaceArea] = useState(patient.bodySurfaceArea);
  const [autoCalcBsa, setAutoCalcBsa] = useState(true);
  const [eGFR, setEGFR] = useState(patient.eGFR);
  const [creatinine, setCreatinine] = useState(patient.creatinine);

  // Allergies
  const [allergyStatus, setAllergyStatus] = useState<'RECORDED_ALLERGIES' | 'NKDA' | 'NOT_RECORDED'>(patient.allergyStatus);
  const [allergies, setAllergies] = useState<AllergyItem[]>(patient.allergies || []);
  const [newAllergen, setNewAllergen] = useState('');
  const [newReaction, setNewReaction] = useState('');
  const [newSeverity, setNewSeverity] = useState<'MILD' | 'MODERATE' | 'SEVERE_ANAPHYLAXIS'>('MODERATE');

  // Vitals
  const [bp, setBp] = useState(patient.vitals?.bp || '138/82');
  const [heartRate, setHeartRate] = useState(patient.vitals?.heartRate || 78);
  const [respRate, setRespRate] = useState(patient.vitals?.respRate || 18);
  const [temp, setTemp] = useState(patient.vitals?.temp || 37.1);
  const [oxygenSat, setOxygenSat] = useState(patient.vitals?.oxygenSat || 96);
  const [oxygenDelivery, setOxygenDelivery] = useState(patient.vitals?.oxygenDelivery || 'Room Air');
  const [news2Score, setNews2Score] = useState(patient.vitals?.news2Score || 1);

  // Sync when patient changes or modal opens with new initialTab
  useEffect(() => {
    if (isOpen) {
      setFirstName(patient.firstName);
      setLastName(patient.lastName);
      setDob(patient.dob);
      setAge(patient.age);
      setGender(patient.gender);
      setAddress(patient.address);
      setHospitalNumber(patient.hospitalNumber);
      setNationalNumber(patient.nationalNumber);
      setWard(patient.ward);
      setBayBed(patient.bayBed);
      setConsultant(patient.consultant);
      setAdmitDate(patient.admitDate);
      setResuscitationStatus(patient.resuscitationStatus);
      setClinicalSummary(patient.clinicalSummary);
      setWeightKg(patient.weightKg);
      setIsWeightOutdated(patient.isWeightOutdated);
      setHeightCm(patient.heightCm);
      setBodySurfaceArea(patient.bodySurfaceArea);
      setEGFR(patient.eGFR);
      setCreatinine(patient.creatinine);
      setAllergyStatus(patient.allergyStatus);
      setAllergies(patient.allergies || []);
      if (patient.vitals) {
        setBp(patient.vitals.bp);
        setHeartRate(patient.vitals.heartRate);
        setRespRate(patient.vitals.respRate);
        setTemp(patient.vitals.temp);
        setOxygenSat(patient.vitals.oxygenSat);
        setOxygenDelivery(patient.vitals.oxygenDelivery);
        setNews2Score(patient.vitals.news2Score);
      }
      if (initialTab) setActiveTab(initialTab);
    }
  }, [isOpen, initialTab, patient]);

  // Recalculate BSA when height or weight changes if autoCalc is on
  useEffect(() => {
    if (autoCalcBsa && heightCm > 0 && weightKg > 0) {
      const bsa = Math.sqrt((heightCm * weightKg) / 3600);
      setBodySurfaceArea(parseFloat(bsa.toFixed(2)));
    }
  }, [heightCm, weightKg, autoCalcBsa]);

  // Auto calculate age when DOB changes
  const handleDobChange = (newDob: string) => {
    setDob(newDob);
    try {
      const birth = new Date(newDob);
      if (!isNaN(birth.getTime())) {
        const today = new Date('2026-08-21'); // using sim date or current
        let calculatedAge = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          calculatedAge--;
        }
        if (calculatedAge >= 0 && calculatedAge < 130) {
          setAge(calculatedAge);
        }
      }
    } catch {
      // ignore
    }
  };

  const handleApplyPreset = (preset: PatientPreset) => {
    const d = preset.data;
    if (d.firstName !== undefined) setFirstName(d.firstName);
    if (d.lastName !== undefined) setLastName(d.lastName);
    if (d.dob !== undefined) setDob(d.dob);
    if (d.age !== undefined) setAge(d.age);
    if (d.gender !== undefined) setGender(d.gender);
    if (d.address !== undefined) setAddress(d.address);
    if (d.hospitalNumber !== undefined) setHospitalNumber(d.hospitalNumber);
    if (d.nationalNumber !== undefined) setNationalNumber(d.nationalNumber);
    if (d.ward !== undefined) setWard(d.ward);
    if (d.bayBed !== undefined) setBayBed(d.bayBed);
    if (d.consultant !== undefined) setConsultant(d.consultant);
    if (d.clinicalSummary !== undefined) setClinicalSummary(d.clinicalSummary);
    if (d.resuscitationStatus !== undefined) setResuscitationStatus(d.resuscitationStatus);
    if (d.weightKg !== undefined) setWeightKg(d.weightKg);
    if (d.isWeightOutdated !== undefined) setIsWeightOutdated(d.isWeightOutdated);
    if (d.heightCm !== undefined) setHeightCm(d.heightCm);
    if (d.bodySurfaceArea !== undefined) setBodySurfaceArea(d.bodySurfaceArea);
    if (d.eGFR !== undefined) setEGFR(d.eGFR);
    if (d.creatinine !== undefined) setCreatinine(d.creatinine);
    if (d.allergyStatus !== undefined) setAllergyStatus(d.allergyStatus);
    if (d.allergies !== undefined) setAllergies([...d.allergies]);
    if (d.vitals) {
      setBp(d.vitals.bp);
      setHeartRate(d.vitals.heartRate);
      setRespRate(d.vitals.respRate);
      setTemp(d.vitals.temp);
      setOxygenSat(d.vitals.oxygenSat);
      setOxygenDelivery(d.vitals.oxygenDelivery);
      setNews2Score(d.vitals.news2Score);
    }
    setBannerMessage({
      type: 'info',
      text: `Loaded patient preset: "${preset.name}". Click "Apply Patient Data" to activate.`
    });
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllergen.trim()) return;
    const item: AllergyItem = {
      id: 'alg-' + Date.now(),
      allergen: newAllergen.trim().toUpperCase(),
      reaction: newReaction.trim() || 'Unspecified allergic reaction',
      severity: newSeverity,
      recordedDate: '2026-08-21'
    };
    setAllergies(prev => [...prev, item]);
    setAllergyStatus('RECORDED_ALLERGIES');
    setNewAllergen('');
    setNewReaction('');
  };

  const handleRemoveAllergy = (id: string) => {
    setAllergies(prev => {
      const updated = prev.filter(a => a.id !== id);
      if (updated.length === 0) {
        setAllergyStatus('NKDA');
      }
      return updated;
    });
  };

  const getPreparedPatientData = (): Partial<Patient> => {
    return {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob: dob.trim(),
      age: Number(age) || 0,
      gender,
      address: address.trim(),
      hospitalNumber: hospitalNumber.trim(),
      nationalNumber: nationalNumber.trim(),
      ward: ward.trim(),
      bayBed: bayBed.trim(),
      consultant: consultant.trim(),
      admitDate: admitDate.trim(),
      resuscitationStatus,
      clinicalSummary: clinicalSummary.trim(),
      weightKg: Number(weightKg) || 0,
      isWeightOutdated,
      heightCm: Number(heightCm) || 0,
      bodySurfaceArea: Number(bodySurfaceArea) || 1.7,
      eGFR: Number(eGFR) || 0,
      creatinine: Number(creatinine) || 0,
      allergyStatus,
      allergies,
      vitals: {
        bp: bp.trim(),
        heartRate: Number(heartRate) || 75,
        respRate: Number(respRate) || 16,
        temp: Number(temp) || 37.0,
        oxygenSat: Number(oxygenSat) || 98,
        oxygenDelivery: oxygenDelivery.trim(),
        news2Score: Number(news2Score) || 0,
        lastUpdated: 'Just now by Instructor'
      }
    };
  };

  const handleSaveAndApply = () => {
    const updatedPatient = getPreparedPatientData();
    updatePatient(updatedPatient);
    setBannerMessage({
      type: 'success',
      text: `Patient profile updated: ${lastName.toUpperCase()}, ${firstName.toUpperCase()} (${age} y, ${gender}). All clinical parameters active.`
    });
    onClose();
  };

  const handleDownloadPatient = () => {
    const updatedPatient = getPreparedPatientData();
    updatePatient(updatedPatient);
    downloadPatientJSON();
  };

  const handleDownloadFullScenario = () => {
    const updatedPatient = getPreparedPatientData();
    updatePatient(updatedPatient);
    downloadScenarioJSON();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 sm:p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="flex flex-col w-full max-w-4xl max-h-[92vh] bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden text-slate-900">
        
        {/* Top Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 px-4 py-3 text-white">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-600/80 border border-amber-400/40 shadow-inner">
              <UserCog className="h-5 w-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold tracking-tight">Instructor Patient Studio</h2>
                <span className="rounded bg-amber-500/30 text-amber-200 border border-amber-400/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-bold">
                  Faculty Crafting Mode
                </span>
              </div>
              <p className="text-[11px] text-amber-100/90">
                Customise demographics, hospital identifiers, weight, height, renal labs, and clinical status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-amber-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            title="Close editor"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Banner Preview */}
        <div className="bg-slate-100 border-b border-slate-300 px-3 py-2 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-600" /> Live Trainee Banner Preview:
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Updates in real time as you adjust fields below
            </span>
          </div>
          
          <div className="bg-white rounded border border-slate-300 shadow-xs divide-y divide-slate-200">
            {/* Top row */}
            <div className="px-3 py-1.5 flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-black tracking-wide text-slate-900 uppercase">
                  {lastName || 'SURNAME'}, {firstName || 'FORENAME'}
                </span>
                <span className="text-slate-500 text-[11px]">
                  Born <strong className="text-slate-800">{dob || 'YYYY-MM-DD'}</strong> ({age} y)
                </span>
                <span className="text-slate-600 text-[11px]">Gender: <strong>{gender}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span>Hosp No: <strong className="font-mono text-slate-800">{hospitalNumber || 'N/A'}</strong></span>
                <span>NHS: <strong className="font-mono text-slate-700">{nationalNumber || 'N/A'}</strong></span>
                <div>
                  {allergyStatus === 'RECORDED_ALLERGIES' ? (
                    <span className="rounded bg-red-100 border border-red-300 text-red-800 font-bold px-1.5 py-0.5 text-[10px]">
                      Recorded Allergies ({allergies.length})
                    </span>
                  ) : allergyStatus === 'NKDA' ? (
                    <span className="rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold px-1.5 py-0.5 text-[10px]">
                      NKDA
                    </span>
                  ) : (
                    <span className="rounded bg-amber-100 border border-amber-300 text-amber-800 font-bold px-1.5 py-0.5 text-[10px]">
                      Not Recorded
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom info row */}
            <div className="px-3 py-1 bg-slate-50 text-[11px] flex flex-wrap items-center justify-between text-slate-700 gap-x-4">
              <span><strong>Cons:</strong> {consultant}</span>
              <span><strong>Ward/Bed:</strong> {ward} • {bayBed}</span>
              <span><strong>Weight:</strong> {weightKg} kg {isWeightOutdated && <span className="text-amber-700 font-bold">(Outdated!)</span>}</span>
              <span><strong>Height:</strong> {heightCm} cm</span>
              <span><strong>BSA:</strong> {bodySurfaceArea} sqm</span>
              <span>
                <strong>Renal:</strong>{' '}
                <span className={eGFR < 30 ? 'text-red-700 font-bold' : eGFR < 60 ? 'text-amber-700 font-bold' : 'text-emerald-700 font-bold'}>
                  eGFR {eGFR} mL/min
                </span>{' '}
                • Cr {creatinine} µmol/L
              </span>
            </div>

            {isWeightOutdated && (
              <div className="bg-amber-50 border-t border-amber-200 px-3 py-0.5 text-[10px] text-amber-900 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 text-amber-600 flex-shrink-0" />
                <span>The weight is missing or outdated. You should record a weight before prescribing or administering medicines.</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="border-b border-slate-200 bg-amber-50/60 px-4 py-2 text-xs flex flex-wrap items-center gap-2">
          <span className="font-bold text-amber-950 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            1-Click Patient Presets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PATIENT_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="rounded-md bg-white hover:bg-amber-100/80 border border-amber-300/80 px-2 py-1 text-[11px] font-semibold text-slate-800 transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
                title={`${p.badge}: ${p.description}`}
              >
                <span>{p.name.split(' - ')[0]}</span>
                <span className="rounded bg-amber-200 text-amber-900 px-1 py-0.2 text-[9px] font-mono">
                  {p.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('demographics')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'demographics'
                ? 'border-amber-600 bg-white text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <User className="h-3.5 w-3.5 text-amber-600" />
            <span>Demographics & IDs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ward')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'ward'
                ? 'border-amber-600 bg-white text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Building2 className="h-3.5 w-3.5 text-teal-600" />
            <span>Ward, Bed & Consultant</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('biometrics')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'biometrics'
                ? 'border-amber-600 bg-white text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Scale className="h-3.5 w-3.5 text-indigo-600" />
            <span>Weight, Height & Renal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('allergies')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'allergies'
                ? 'border-amber-600 bg-white text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5 text-red-600" />
            <span>Allergies ({allergies.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vitals')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'vitals'
                ? 'border-amber-600 bg-white text-amber-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Activity className="h-3.5 w-3.5 text-emerald-600" />
            <span>Clinical Handover & Vitals</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-xs text-slate-800">
          
          {/* TAB 1: Demographics & IDs */}
          {activeTab === 'demographics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    First Name / Forename *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Jane"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-medium focus:border-amber-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Last Name / Surname *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Trevor"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-bold uppercase focus:border-amber-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-amber-600 focus:outline-none"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other / Non-specified</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => handleDobChange(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-mono focus:border-amber-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                    min="0"
                    max="125"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-mono focus:border-amber-600 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Auto-calculated from DOB or manual override</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hospital Number (MRN) *
                  </label>
                  <input
                    type="text"
                    value={hospitalNumber}
                    onChange={(e) => setHospitalNumber(e.target.value)}
                    placeholder="e.g. HOSP-94821"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-mono font-bold focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    National NHS Number *
                  </label>
                  <input
                    type="text"
                    value={nationalNumber}
                    onChange={(e) => setNationalNumber(e.target.value)}
                    placeholder="e.g. NHS 482 910 3841"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Residential Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 14 Acorn Way, Oxford, OX2 7HG"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block text-xs">Instructor Note on Demographics:</span>
                <p className="text-[11px] leading-relaxed">
                  The patient surname, forename, age, gender, hospital number, and NHS identifier appear permanently on the top banner in all NHS EPMA views (Inpatient, eMAR Administration, Medicines Reconciliation, Discharge TTO).
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Ward, Bed & Consultant */}
          {activeTab === 'ward' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hospital Ward / Unit *
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    placeholder="e.g. Ward 4B (Acute Care)"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-medium focus:border-amber-600 focus:outline-none"
                  />
                  <div className="mt-1 flex flex-wrap gap-1">
                    <span className="text-[10px] text-slate-500 py-0.5">Quick wards:</span>
                    {COMMON_WARDS.slice(0, 5).map((w, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setWard(w)}
                        className="rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-700 cursor-pointer"
                      >
                        {w.split(' (')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Bay / Bed Location *
                  </label>
                  <input
                    type="text"
                    value={bayBed}
                    onChange={(e) => setBayBed(e.target.value)}
                    placeholder="e.g. Bed 12 or Side Room 1"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-semibold focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Responsible Consultant *
                  </label>
                  <input
                    type="text"
                    value={consultant}
                    onChange={(e) => setConsultant(e.target.value)}
                    placeholder="e.g. Dr. Sarah Jenkins (Cardiology)"
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-medium focus:border-amber-600 focus:outline-none"
                  />
                  <div className="mt-1 flex flex-wrap gap-1">
                    <span className="text-[10px] text-slate-500 py-0.5">Quick consultants:</span>
                    {COMMON_CONSULTANTS.slice(0, 4).map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setConsultant(c)}
                        className="rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-700 cursor-pointer"
                      >
                        {c.split(' (')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    value={admitDate}
                    onChange={(e) => setAdmitDate(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Resuscitation Status (CPR / DNACPR)
                  </label>
                  <select
                    value={resuscitationStatus}
                    onChange={(e) => setResuscitationStatus(e.target.value as any)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-bold focus:border-amber-600 focus:outline-none"
                  >
                    <option value="CPR">For Full Cardiopulmonary Resuscitation (CPR)</option>
                    <option value="DNACPR">Do Not Attempt CPR (DNACPR in place)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Biometrics & Renal */}
          {activeTab === 'biometrics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                
                {/* Weight */}
                <div className="rounded-lg border border-slate-300 p-3 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                      <Scale className="h-3.5 w-3.5 text-teal-700" /> Weight (kg) *
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">kg</span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="350"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-base font-bold font-mono focus:border-amber-600 focus:outline-none bg-white"
                  />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setWeightKg(prev => Math.max(1, parseFloat((prev - 1).toFixed(1))))}
                      className="flex-1 rounded bg-white hover:bg-slate-100 border border-slate-200 py-1 text-[11px] font-bold text-slate-700"
                    >
                      -1 kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeightKg(prev => parseFloat((prev + 1).toFixed(1)))}
                      className="flex-1 rounded bg-white hover:bg-slate-100 border border-slate-200 py-1 text-[11px] font-bold text-slate-700"
                    >
                      +1 kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeightKg(prev => parseFloat((prev + 5).toFixed(1)))}
                      className="flex-1 rounded bg-white hover:bg-slate-100 border border-slate-200 py-1 text-[11px] font-bold text-slate-700"
                    >
                      +5 kg
                    </button>
                  </div>

                  {/* Outdated Weight Flag Toggle */}
                  <div className="pt-2 border-t border-slate-200">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isWeightOutdated}
                        onChange={(e) => setIsWeightOutdated(e.target.checked)}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 h-4 w-4 mt-0.5 cursor-pointer"
                      />
                      <div className="text-[11px]">
                        <span className="font-bold text-amber-900 block">Flag Weight as Missing/Outdated</span>
                        <span className="text-slate-500 text-[10px]">
                          Triggers amber warning bar: &quot;The weight is missing or outdated.&quot;
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Height */}
                <div className="rounded-lg border border-slate-300 p-3 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                      <Ruler className="h-3.5 w-3.5 text-indigo-700" /> Height (cm) *
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">cm</span>
                  </div>
                  <input
                    type="number"
                    min="30"
                    max="250"
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseInt(e.target.value) || 0)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-base font-bold font-mono focus:border-amber-600 focus:outline-none bg-white"
                  />
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setHeightCm(155)}
                      className="flex-1 rounded bg-white hover:bg-slate-100 border border-slate-200 py-1 text-[10px] font-medium text-slate-700"
                    >
                      155 cm
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeightCm(168)}
                      className="flex-1 rounded bg-white hover:bg-slate-100 border border-slate-200 py-1 text-[10px] font-medium text-slate-700"
                    >
                      168 cm
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeightCm(180)}
                      className="flex-1 rounded bg-white hover:bg-slate-100 border border-slate-200 py-1 text-[10px] font-medium text-slate-700"
                    >
                      180 cm
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1">
                    Used to calculate Body Surface Area (BSA) and ideal body weight.
                  </div>
                </div>

                {/* Body Surface Area */}
                <div className="rounded-lg border border-slate-300 p-3 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                      Body Surface Area (BSA)
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">sqm</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0.5"
                    max="3.5"
                    value={bodySurfaceArea}
                    onChange={(e) => {
                      setAutoCalcBsa(false);
                      setBodySurfaceArea(parseFloat(e.target.value) || 1.7);
                    }}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-base font-bold font-mono focus:border-amber-600 focus:outline-none bg-white"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-1.5 text-[10px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoCalcBsa}
                        onChange={(e) => setAutoCalcBsa(e.target.checked)}
                        className="rounded border-slate-300 text-teal-600"
                      />
                      <span>Auto-calc (Mosteller formula)</span>
                    </label>
                    <span className="text-[9px] font-mono text-slate-500">√(H×W/3600)</span>
                  </div>
                </div>

                {/* Renal: eGFR */}
                <div className="rounded-lg border border-slate-300 p-3 bg-slate-50/50 space-y-2 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      Estimated GFR (eGFR) *
                    </label>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      eGFR >= 60
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : eGFR >= 30
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-red-100 text-red-800 border-red-300 animate-pulse'
                    }`}>
                      {eGFR >= 90 ? 'Stage 1: Normal' : eGFR >= 60 ? 'Stage 2: Mild Impairment' : eGFR >= 30 ? 'Stage 3: Moderate CKD' : eGFR >= 15 ? 'Stage 4: Severe CKD' : 'Stage 5: Renal Failure'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="150"
                      value={eGFR}
                      onChange={(e) => setEGFR(parseInt(e.target.value) || 0)}
                      className="w-32 rounded border border-slate-300 px-3 py-1.5 text-base font-bold font-mono focus:border-amber-600 focus:outline-none bg-white"
                    />
                    <span className="text-xs text-slate-500 font-mono">mL/min/1.73m²</span>

                    <div className="flex-1 flex gap-1 justify-end">
                      <button
                        type="button"
                        onClick={() => { setEGFR(95); setCreatinine(68); }}
                        className="rounded bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-1 text-[10px] font-bold text-emerald-800"
                        title="Normal renal function"
                      >
                        Normal (95)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setEGFR(45); setCreatinine(130); }}
                        className="rounded bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 text-[10px] font-bold text-amber-800"
                        title="Moderate CKD (triggers dose check)"
                      >
                        Moderate (45)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setEGFR(18); setCreatinine(245); }}
                        className="rounded bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-1 text-[10px] font-bold text-red-800"
                        title="Severe CKD (triggers hard alert)"
                      >
                        Severe (18)
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500">
                    EPMA prescribing safety engine evaluates eGFR against BNF renal monographs (e.g., Gentamicin, Vancomycin, Ramipril, Metformin, Enoxaparin).
                  </p>
                </div>

                {/* Creatinine */}
                <div className="rounded-lg border border-slate-300 p-3 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                      Serum Creatinine *
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">µmol/L</span>
                  </div>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={creatinine}
                    onChange={(e) => setCreatinine(parseInt(e.target.value) || 0)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 text-base font-bold font-mono focus:border-amber-600 focus:outline-none bg-white"
                  />
                  <div className="text-[10px] text-slate-500">
                    Normal reference: 60 - 110 µmol/L
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Allergies */}
          {activeTab === 'allergies' && (
            <div className="space-y-4">
              {/* Allergy Status Selector */}
              <div className="rounded-lg border border-slate-300 p-3 bg-slate-50/60">
                <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Patient Allergy Master Status:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAllergyStatus('RECORDED_ALLERGIES')}
                    className={`rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                      allergyStatus === 'RECORDED_ALLERGIES'
                        ? 'bg-red-50 border-red-400 text-red-900 ring-2 ring-red-400/30'
                        : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <ShieldAlert className="h-4 w-4 text-red-600" />
                      Recorded Allergies ({allergies.length})
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Patient has documented drug or substance allergies
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAllergyStatus('NKDA');
                      setAllergies([]);
                    }}
                    className={`rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                      allergyStatus === 'NKDA'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-400/30'
                        : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      No Known Allergies (NKDA)
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Confirmed by patient or clinical history
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAllergyStatus('NOT_RECORDED')}
                    className={`rounded-lg border p-2.5 text-left transition-all cursor-pointer ${
                      allergyStatus === 'NOT_RECORDED'
                        ? 'bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-400/30'
                        : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Not Recorded / Pending
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Allergy status has not been confirmed yet
                    </span>
                  </button>
                </div>
              </div>

              {/* Recorded Allergies List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Active Documented Allergies ({allergies.length}):
                </span>
                {allergies.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-slate-500 text-xs">
                    No individual drug allergies recorded. Use the form below or quick chips to add clinical allergy entries.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {allergies.map(a => (
                      <div
                        key={a.id}
                        className="flex items-start justify-between rounded-lg border border-red-200 bg-red-50/70 p-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <strong className="text-red-900 font-mono text-sm">{a.allergen}</strong>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                              a.severity === 'SEVERE_ANAPHYLAXIS'
                                ? 'bg-red-200 text-red-900 border-red-400 font-mono'
                                : a.severity === 'MODERATE'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-slate-100 text-slate-800 border-slate-300'
                            }`}>
                              {a.severity === 'SEVERE_ANAPHYLAXIS' ? 'ANAPHYLAXIS' : a.severity}
                            </span>
                          </div>
                          <p className="text-red-800 text-[11px]"><strong>Reaction:</strong> {a.reaction}</p>
                          <span className="text-[10px] text-slate-500 block font-mono">Recorded: {a.recordedDate}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(a.id)}
                          className="flex items-center gap-1 rounded bg-white hover:bg-red-100 border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-700 shadow-2xs transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add New Allergy Form */}
              <div className="rounded-lg border border-slate-300 p-3 bg-slate-50 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Add New Allergy / Adverse Reaction:</span>
                
                {/* Quick Add Chips */}
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1">Quick Select Common Clinical Allergies:</span>
                  <div className="flex flex-wrap gap-1">
                    {QUICK_ALLERGENS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setNewAllergen(item.name.toUpperCase());
                          setNewReaction(item.reaction);
                          setNewSeverity(item.severity);
                        }}
                        className="rounded bg-white hover:bg-slate-200 border border-slate-300 px-2 py-0.5 text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        + {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAddAllergy} className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase">
                        Allergen / Drug Name *
                      </label>
                      <input
                        type="text"
                        value={newAllergen}
                        onChange={(e) => setNewAllergen(e.target.value)}
                        placeholder="e.g. PENICILLIN, LATEX, NSAIDs"
                        className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs font-mono uppercase bg-white focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase">
                        Clinical Reaction Description
                      </label>
                      <input
                        type="text"
                        value={newReaction}
                        onChange={(e) => setNewReaction(e.target.value)}
                        placeholder="e.g. Anaphylaxis, Rash, Bronchospasm"
                        className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs bg-white focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] font-semibold text-slate-700">Severity:</label>
                      <select
                        value={newSeverity}
                        onChange={(e) => setNewSeverity(e.target.value as any)}
                        className="rounded border border-slate-300 px-2 py-1 text-xs bg-white focus:border-amber-600 focus:outline-none"
                      >
                        <option value="MILD">Mild (Rash / Nausea / Pruritus)</option>
                        <option value="MODERATE">Moderate (Urticaria / Bronchospasm)</option>
                        <option value="SEVERE_ANAPHYLAXIS">Severe (Anaphylaxis / Angioedema)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={!newAllergen.trim()}
                      className="flex items-center gap-1 rounded bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-bold px-3 py-1.5 text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Allergy</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: Handover, Notes & Vitals */}
          {activeTab === 'vitals' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Summary & Admission Diagnosis *
                </label>
                <textarea
                  rows={3}
                  value={clinicalSummary}
                  onChange={(e) => setClinicalSummary(e.target.value)}
                  placeholder="Summarise clinical reason for admission, co-morbidities, and immediate treatment goals..."
                  className="w-full rounded border border-slate-300 p-2.5 text-xs leading-relaxed focus:border-amber-600 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Displayed in the expandable &quot;Communication Zone & Clinical Handover Summary&quot; at the top of the EPMA workspace.
                </span>
              </div>

              <div className="rounded-lg border border-slate-300 p-3 bg-slate-50 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Simulated Vitals & Baseline Observations:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">
                      Blood Pressure (BP)
                    </label>
                    <input
                      type="text"
                      value={bp}
                      onChange={(e) => setBp(e.target.value)}
                      placeholder="e.g. 138/82"
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">
                      Heart Rate (HR bpm)
                    </label>
                    <input
                      type="number"
                      value={heartRate}
                      onChange={(e) => setHeartRate(parseInt(e.target.value) || 0)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">
                      Resp Rate (breaths/m)
                    </label>
                    <input
                      type="number"
                      value={respRate}
                      onChange={(e) => setRespRate(parseInt(e.target.value) || 0)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={temp}
                      onChange={(e) => setTemp(parseFloat(e.target.value) || 0)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">
                      SpO2 Oxygen Sat (%)
                    </label>
                    <input
                      type="number"
                      value={oxygenSat}
                      onChange={(e) => setOxygenSat(parseInt(e.target.value) || 0)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">
                      Oxygen Delivery
                    </label>
                    <input
                      type="text"
                      value={oxygenDelivery}
                      onChange={(e) => setOxygenDelivery(e.target.value)}
                      placeholder="e.g. Room Air or 2L Cannula"
                      className="w-full rounded border border-slate-300 px-2 py-1 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">
                      NEWS2 Total Score
                    </label>
                    <input
                      type="number"
                      value={news2Score}
                      onChange={(e) => setNews2Score(parseInt(e.target.value) || 0)}
                      className={`w-full rounded border px-2 py-1 text-xs font-bold font-mono bg-white ${
                        news2Score >= 7
                          ? 'border-red-400 text-red-700'
                          : news2Score >= 5
                          ? 'border-amber-400 text-amber-700'
                          : 'border-slate-300 text-slate-800'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPatient}
              className="flex items-center gap-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-2 text-xs font-bold text-amber-900 transition-colors shadow-2xs cursor-pointer"
              title="Save & Download this crafted patient profile as JSON"
            >
              <Download className="h-3.5 w-3.5 text-amber-700" />
              <span>Download Patient (.json)</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadFullScenario}
              className="flex items-center gap-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-300 px-3 py-2 text-xs font-bold text-teal-900 transition-colors shadow-2xs cursor-pointer"
              title="Save & Download full scenario including this patient and prescriptions as JSON"
            >
              <Download className="h-3.5 w-3.5 text-teal-700" />
              <span>Download Scenario with Patient (.json)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAndApply}
              className="flex items-center gap-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 active:bg-teal-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
            >
              <Save className="h-3.5 w-3.5 text-amber-300" />
              <span>Apply & Save Patient Data</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
