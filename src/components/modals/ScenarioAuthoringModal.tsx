import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Scenario, Patient, Prescription, AllergyItem } from '../../types/epma';
import { BNF_FORMULARY } from '../../data/bnfFormulary';
import {
  BookOpen,
  Plus,
  Sparkles,
  Upload,
  Download,
  Check,
  AlertCircle,
  User,
  Pill,
  ShieldAlert,
  Target,
  FileCode,
  Layers,
  X,
  Play,
  Copy,
  Trash2,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

export const ScenarioAuthoringModal: React.FC = () => {
  const {
    showScenarioModal,
    setShowScenarioModal,
    scenarios,
    currentScenario,
    selectScenario,
    createCustomScenario,
    importScenarioJSON,
    exportScenarioJSON,
    downloadScenarioJSON,
    downloadPatientJSON,
    patient,
    setBannerMessage,
    mode,
    isInstructorAuthenticated,
    requestInstructorMode,
    logoutInstructor
  } = useSimulation();

  const [activeTab, setActiveTab] = useState<'BROWSE' | 'CREATE' | 'JSON'>('BROWSE');

  // Scenario Creation Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('INTERMEDIATE');
  const [specialty, setSpecialty] = useState('Acute Medicine');

  // Patient State
  const [patientName, setPatientName] = useState('Trainee Demo Patient');
  const [hospitalNo, setHospitalNo] = useState('H892019');
  const [dob, setDob] = useState('1954-04-12');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [ward, setWard] = useState('Ward 4B (Acute Care)');
  const [bed, setBed] = useState('Bed 08');
  const [weightKg, setWeightKg] = useState(72);
  const [isWeightOutdated, setIsWeightOutdated] = useState(false);
  const [egfr, setEgfr] = useState(65);
  const [creatinine, setCreatinine] = useState(90);
  const [news2, setNews2] = useState(2);

  // Allergies State
  const [allergies, setAllergies] = useState<AllergyItem[]>([
    { id: 'alg-1', allergen: 'PENICILLIN', reaction: 'Anaphylaxis (facial swelling, bronchospasm)', severity: 'SEVERE_ANAPHYLAXIS', recordedDate: '2024-01-10' }
  ]);
  const [newAllergen, setNewAllergen] = useState('');
  const [newReaction, setNewReaction] = useState('');
  const [newSeverity, setNewSeverity] = useState<AllergyItem['severity']>('SEVERE_ANAPHYLAXIS');

  // Initial Prescriptions State
  const [rxList, setRxList] = useState<Partial<Prescription>[]>([
    {
      id: 'rx-init-1',
      drugName: 'PARACETAMOL Tablets 500mg',
      genericName: 'Paracetamol',
      dose: '1000 mg',
      route: 'Oral',
      rxType: 'REGULAR',
      frequency: 'FOUR times a day',
      timesOfDay: ['08:00', '12:00', '18:00', '22:00'],
      directions: 'Take 2 tablets four times a day with water.',
      status: 'ACTIVE'
    }
  ]);

  const [selectedDrugIndex, setSelectedDrugIndex] = useState(0);

  // Learning Objectives
  const [objectives, setObjectives] = useState<string[]>([
    'Review patient allergy record before prescribing antibiotics',
    'Administer scheduled 12:00 medication round accurately',
    'Document clinical rationale for any omitted doses'
  ]);
  const [newObjective, setNewObjective] = useState('');

  // JSON Import State
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!showScenarioModal) return null;

  const handleAddAllergy = () => {
    if (!newAllergen.trim()) return;
    setAllergies(prev => [
      ...prev,
      {
        id: 'alg-' + Date.now(),
        allergen: newAllergen.trim().toUpperCase(),
        reaction: newReaction.trim() || 'Rash / Urticaria',
        severity: newSeverity,
        recordedDate: '2026-08-21'
      }
    ]);
    setNewAllergen('');
    setNewReaction('');
  };

  const handleRemoveAllergy = (id: string) => {
    setAllergies(prev => prev.filter(a => a.id !== id));
  };

  const handleAddDrugToScenario = (drugName: string) => {
    const formularyItem = BNF_FORMULARY.find(f => f.name.toLowerCase() === drugName.toLowerCase() || f.genericName.toLowerCase() === drugName.toLowerCase());
    if (!formularyItem) return;

    const freq = formularyItem.typicalFrequencies[0] || { label: 'ONCE a day', times: ['08:00'], type: 'REGULAR' };

    setRxList(prev => [
      ...prev,
      {
        id: 'rx-custom-' + Date.now(),
        drugName: formularyItem.name,
        genericName: formularyItem.genericName,
        formulation: formularyItem.standardFormulations[0] || 'Tablets',
        strength: formularyItem.standardStrengths[0] || '',
        dose: formularyItem.defaultDoses[0] || '1 dose',
        route: formularyItem.standardRoutes[0] || 'Oral',
        rxType: freq.type,
        frequency: freq.label,
        timesOfDay: freq.times,
        directions: 'Take as directed.',
        isHighAlert: formularyItem.isHighAlert,
        isControlledDrug: formularyItem.isControlledDrug,
        isTimeCritical: formularyItem.isTimeCritical,
        bnfChapter: formularyItem.bnfChapter,
        status: 'ACTIVE',
        administrationEvents: []
      }
    ]);
  };

  const handleRemoveDrug = (id: string) => {
    setRxList(prev => prev.filter(r => r.id !== id));
  };

  const handleAddObjective = () => {
    if (!newObjective.trim()) return;
    setObjectives(prev => [...prev, newObjective.trim()]);
    setNewObjective('');
  };

  const handleCreateScenarioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const names = patientName.split(' ');
    const firstName = names[0] || 'Trainee';
    const lastName = names.slice(1).join(' ') || 'Patient';

    const newScenario: Scenario = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      subtitle: `${patientName} (${dob}) - Custom Authoring`,
      difficulty: difficulty === 'BEGINNER' ? 'Beginner' : difficulty === 'ADVANCED' ? 'Advanced' : 'Intermediate',
      specialty: specialty || 'Acute Medicine',
      description: description.trim() || 'Custom training simulation authored by faculty.',
      learningGoals: objectives,
      patient: {
        id: 'pat-custom-' + Date.now(),
        hospitalNumber: hospitalNo,
        nationalNumber: '948 201 9921',
        firstName,
        lastName,
        dob,
        age: 70,
        gender,
        address: '14 Simulation Way, Health Park',
        ward,
        bayBed: bed,
        consultant: `Dr. Lead Clinician (${specialty})`,
        weightKg,
        isWeightOutdated,
        heightCm: 172,
        bodySurfaceArea: 1.85,
        eGFR: egfr,
        creatinine: creatinine,
        allergies,
        allergyStatus: allergies.length > 0 ? 'RECORDED_ALLERGIES' : 'NKDA',
        admitDate: '2026-08-20',
        clinicalSummary: description || 'Admitted for acute management.',
        resuscitationStatus: 'CPR',
        vitals: {
          news2Score: news2,
          bp: '128/78',
          heartRate: 76,
          respRate: 16,
          oxygenSat: 98,
          oxygenDelivery: 'Room air',
          temp: 36.8,
          lastUpdated: '10:00 Today'
        }
      },
      initialPrescriptions: rxList as Prescription[],
      objectives: objectives.map((obj, i) => ({
        id: `obj-${i + 1}`,
        title: `Goal ${i + 1}`,
        description: obj,
        category: i === 0 ? 'PRESCRIBING' : 'ADMINISTRATION',
        completed: false,
        requiredForPassing: true,
        clinicalFeedback: 'Demonstrate competent execution of this EPMA clinical objective.'
      })),
      clinicalEvents: []
    };

    createCustomScenario(newScenario);
    setShowScenarioModal(false);
  };

  const handleImportJSON = () => {
    setJsonError(null);
    const res = importScenarioJSON(jsonText);
    if (!res.success) {
      setJsonError(res.message);
    } else {
      setShowScenarioModal(false);
      setBannerMessage({ type: 'success', text: res.message });
    }
  };

  const handleCopyJSON = () => {
    const exported = exportScenarioJSON();
    navigator.clipboard.writeText(exported);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setJsonText(text);
        setJsonError(null);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-3 sm:p-6 backdrop-blur-xs">
      <div className="flex flex-col w-full max-w-4xl max-h-[92vh] rounded-xl bg-white shadow-2xl border border-slate-300 overflow-hidden text-slate-900 text-xs">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-teal-900 text-white border-b border-teal-950">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold tracking-tight">Clinical Scenarios & Custom Authoring Studio</h2>
              <p className="text-[11px] text-teal-200">
                Select pre-configured clinical simulations or build custom training cases for students.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowScenarioModal(false)}
            className="p-1 rounded-md text-teal-200 hover:text-white hover:bg-teal-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-100 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('BROWSE')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                activeTab === 'BROWSE'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Browse Scenarios ({scenarios.length})</span>
            </button>

            {/* Author Custom Scenario - Gated */}
            {isInstructorAuthenticated ? (
              <button
                onClick={() => setActiveTab('CREATE')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  activeTab === 'CREATE'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Author Custom Scenario</span>
              </button>
            ) : (
              <button
                onClick={() => requestInstructorMode()}
                title="Unlock with Faculty Passcode"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold text-slate-500 bg-slate-200/80 hover:bg-slate-300 border border-slate-300 transition-colors cursor-pointer"
              >
                <Lock className="h-3.5 w-3.5 text-slate-500" />
                <span>Author Custom Scenario</span>
              </button>
            )}

            {/* Import / Export JSON - Gated */}
            {isInstructorAuthenticated ? (
              <button
                onClick={() => setActiveTab('JSON')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  activeTab === 'JSON'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
                }`}
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>Import / Export JSON</span>
              </button>
            ) : (
              <button
                onClick={() => requestInstructorMode()}
                title="Unlock with Faculty Passcode"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold text-slate-500 bg-slate-200/80 hover:bg-slate-300 border border-slate-300 transition-colors cursor-pointer"
              >
                <Lock className="h-3.5 w-3.5 text-slate-500" />
                <span>Import / Export JSON</span>
              </button>
            )}
          </div>

          {/* Instructor Mode Status / Unlock Trigger */}
          <div className="flex items-center gap-2">
            {isInstructorAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
                  Instructor Unlocked
                </span>
                <button
                  onClick={logoutInstructor}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
                >
                  <Lock className="h-3 w-3" />
                  Lock
                </button>
              </div>
            ) : (
              <button
                onClick={() => requestInstructorMode()}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 border border-amber-500 shadow-xs transition-colors cursor-pointer"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span>Instructor Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          {/* TAB 1: BROWSE SCENARIOS */}
          {activeTab === 'BROWSE' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-600 mb-2">
                Click <strong>"Launch Scenario"</strong> on any clinical case to instantly switch the simulator patient, active prescriptions, and safety validation rules.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scenarios.map((sc) => {
                  const isCurrent = sc.id === currentScenario.id;
                  return (
                    <div
                      key={sc.id}
                      className={`rounded-lg border p-3.5 shadow-xs transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-600/30'
                          : 'border-slate-300 bg-white hover:border-slate-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span
                              className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase mb-1 ${
                                sc.difficulty === 'ADVANCED'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : sc.difficulty === 'INTERMEDIATE'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-blue-100 text-blue-800 border border-blue-300'
                              }`}
                            >
                              {sc.difficulty}
                            </span>
                            <h3 className="font-bold text-slate-900 text-sm">{sc.title}</h3>
                          </div>
                          {isCurrent && (
                            <span className="rounded bg-teal-700 text-white px-2 py-0.5 text-[10px] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {sc.description}
                        </p>

                        <div className="mt-2.5 bg-slate-100 rounded p-2 text-[11px] space-y-1">
                          <div className="font-semibold text-slate-800">
                            Patient: {sc.patient.firstName} {sc.patient.lastName} ({sc.patient.age}y, {sc.patient.ward})
                          </div>
                          <div className="text-rose-700 font-semibold">
                            Allergies: {sc.patient.allergies.length > 0 ? sc.patient.allergies.map(a => a.allergen).join(', ') : 'None recorded'}
                          </div>
                          <div className="text-slate-600">
                            Initial Rx: {sc.initialPrescriptions.length} medications charted
                          </div>
                        </div>

                        <div className="mt-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Learning Objectives:
                          </span>
                          <ul className="list-disc list-inside text-[11px] text-slate-700 mt-0.5 space-y-0.5">
                            {sc.learningGoals.slice(0, 3).map((goal, i) => (
                              <li key={i}>{goal}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">ID: {sc.id}</span>
                        <button
                          onClick={() => {
                            selectScenario(sc.id);
                            setShowScenarioModal(false);
                          }}
                          disabled={isCurrent}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded font-bold text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                          }`}
                        >
                          <Play className="h-3.5 w-3.5" />
                          <span>{isCurrent ? 'Currently Loaded' : 'Launch Scenario'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!isInstructorAuthenticated && (
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-950 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-amber-100 rounded-lg border border-amber-300">
                      <KeyRound className="h-4 w-4 text-amber-800" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">Faculty & Simulation Instructors</h4>
                      <p className="text-[11px] text-amber-800">
                        Unlock Instructor Mode using your faculty passcode to author custom cases, design initial drug charts, and import/export scenario JSON.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => requestInstructorMode()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Unlock Authoring & JSON</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AUTHOR CUSTOM SCENARIO */}
          {activeTab === 'CREATE' && (
            <form onSubmit={handleCreateScenarioSubmit} className="space-y-4">
              {/* Step 1: Overview */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-300 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-teal-900">
                  <Sparkles className="h-4 w-4 text-teal-700" />
                  1. Scenario Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="block font-bold text-slate-700 mb-0.5">Scenario Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acute Pulmonary Embolism & Anticoagulant Dosing"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Difficulty Level</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                    >
                      <option value="BEGINNER">Beginner (Foundational)</option>
                      <option value="INTERMEDIATE">Intermediate (Core FY1/Nurse)</option>
                      <option value="ADVANCED">Advanced (High Alert / Complex)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Clinical Case Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief background of clinical presentation and educational focus..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Step 2: Patient Demographics */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-300 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-teal-900">
                  <User className="h-4 w-4 text-teal-700" />
                  2. Patient Demographics & Physiology
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Patient Full Name</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Hospital Number (MRN)</label>
                    <input
                      type="text"
                      value={hospitalNo}
                      onChange={(e) => setHospitalNo(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Ward & Bed</label>
                    <input
                      type="text"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Weight (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(parseFloat(e.target.value) || 70)}
                      className="w-full rounded border border-slate-300 px-2 py-1 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">eGFR (mL/min/1.73m²)</label>
                    <input
                      type="number"
                      value={egfr}
                      onChange={(e) => setEgfr(parseFloat(e.target.value) || 60)}
                      className="w-full rounded border border-slate-300 px-2 py-1 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">Serum Creatinine (µmol/L)</label>
                    <input
                      type="number"
                      value={creatinine}
                      onChange={(e) => setCreatinine(parseFloat(e.target.value) || 80)}
                      className="w-full rounded border border-slate-300 px-2 py-1 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5">NEWS2 Baseline Score</label>
                    <input
                      type="number"
                      value={news2}
                      onChange={(e) => setNews2(parseInt(e.target.value) || 0)}
                      className="w-full rounded border border-slate-300 px-2 py-1 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Allergies */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-300 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-teal-900">
                  <ShieldAlert className="h-4 w-4 text-rose-700" />
                  3. Recorded Allergies & Reactions
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Allergen (e.g. PENICILLIN, CODEINE)"
                    value={newAllergen}
                    onChange={(e) => setNewAllergen(e.target.value)}
                    className="flex-1 rounded border border-slate-300 px-3 py-1.5"
                  />
                  <input
                    type="text"
                    placeholder="Reaction description (e.g. Anaphylaxis, rash)"
                    value={newReaction}
                    onChange={(e) => setNewReaction(e.target.value)}
                    className="flex-1 rounded border border-slate-300 px-3 py-1.5"
                  />
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="rounded border border-slate-300 px-3 py-1.5"
                  >
                    <option value="SEVERE_ANAPHYLAXIS">Severe (Anaphylaxis)</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="MILD">Mild</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="rounded bg-rose-700 hover:bg-rose-800 text-white font-bold px-3 py-1.5 cursor-pointer"
                  >
                    + Add Allergy
                  </button>
                </div>

                <div className="space-y-1 mt-2">
                  {allergies.map(alg => (
                    <div key={alg.id} className="flex items-center justify-between p-2 rounded bg-rose-50 border border-rose-200">
                      <div>
                        <strong className="text-rose-900 font-bold">{alg.allergen}</strong>
                        <span className="text-slate-600 text-[11px] ml-2">— {alg.reaction}</span>
                        <span className="ml-2 rounded bg-rose-200 text-rose-900 px-1 py-0.2 text-[9px] font-bold">
                          {alg.severity}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(alg.id)}
                        className="text-rose-700 hover:text-rose-900 cursor-pointer p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4: Initial Prescriptions */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-300 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-teal-900">
                  <Pill className="h-4 w-4 text-teal-700" />
                  4. Initial Prescription Orders
                </h3>

                <div className="flex items-center gap-2">
                  <select
                    className="flex-1 rounded border border-slate-300 px-3 py-1.5"
                    onChange={(e) => handleAddDrugToScenario(e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select medication from BNF formulary to add to initial chart...
                    </option>
                    {BNF_FORMULARY.map(f => (
                      <option key={f.id} value={f.name}>
                        {f.name} ({f.genericName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="divide-y divide-slate-200 border rounded overflow-hidden">
                  {rxList.map(rx => (
                    <div key={rx.id} className="p-2 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <strong className="text-slate-900">{rx.drugName}</strong>
                        <span className="text-slate-600 ml-2">({rx.dose} • {rx.route} • {rx.frequency})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDrug(rx.id!)}
                        className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 5: Learning Objectives */}
              <div className="bg-white p-3.5 rounded-lg border border-slate-300 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-teal-900">
                  <Target className="h-4 w-4 text-teal-700" />
                  5. Student Learning Objectives
                </h3>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter student competency goal..."
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    className="flex-1 rounded border border-slate-300 px-3 py-1.5"
                  />
                  <button
                    type="button"
                    onClick={handleAddObjective}
                    className="rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-3 py-1.5 cursor-pointer"
                  >
                    + Add Goal
                  </button>
                </div>

                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {objectives.map((obj, i) => (
                    <li key={i} className="text-[11px]">{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScenarioModal(false)}
                  className="rounded px-4 py-2 text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-5 py-2 cursor-pointer shadow-md text-xs"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Save & Launch Scenario</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: IMPORT / EXPORT JSON */}
          {activeTab === 'JSON' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Download className="h-4 w-4 text-teal-700" />
                      Export &amp; Download Scenario / Patient Data
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Download JSON configuration containing all active patient demographics, height, weight, renal labs, allergies, and prescriptions.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopyJSON}
                      className="flex items-center gap-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 font-bold cursor-pointer transition-colors"
                      title="Copy JSON string to clipboard"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                    </button>
                    <button
                      onClick={() => downloadPatientJSON()}
                      className="flex items-center gap-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 font-bold cursor-pointer transition-colors shadow-2xs"
                      title="Download patient profile JSON only"
                    >
                      <User className="h-3.5 w-3.5 text-amber-700" />
                      <span>Download Patient Only (.json)</span>
                    </button>
                    <button
                      onClick={() => downloadScenarioJSON()}
                      className="flex items-center gap-1.5 rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-3.5 py-1.5 cursor-pointer shadow-xs transition-colors"
                      title="Download complete scenario JSON with patient details and prescriptions"
                    >
                      <Download className="h-3.5 w-3.5 text-amber-300" />
                      <span>Download Full Scenario (.json)</span>
                    </button>
                  </div>
                </div>

                {/* Patient Inclusions Checklist */}
                <div className="rounded-lg bg-teal-50/70 border border-teal-200 p-3 text-[11px] text-teal-950 space-y-1.5">
                  <span className="font-bold flex items-center gap-1 text-teal-900 text-xs">
                    <Check className="h-3.5 w-3.5 text-teal-700" />
                    Verified: Downloading JSON includes all active patient data:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-700 pl-4 list-disc">
                    <div>• <strong>Demographics:</strong> {patient.lastName}, {patient.firstName} ({patient.gender}, {patient.age}y, DOB: {patient.dob})</div>
                    <div>• <strong>Address:</strong> {patient.address}</div>
                    <div>• <strong>Identifiers:</strong> Hosp #{patient.hospitalNumber} | NHS #{patient.nationalNumber}</div>
                    <div>• <strong>Ward &amp; Consultant:</strong> {patient.ward} • {patient.bayBed} ({patient.consultant})</div>
                    <div>• <strong>Biometrics:</strong> Weight: {patient.weightKg}kg | Height: {patient.heightCm}cm | BSA: {patient.bodySurfaceArea}sqm</div>
                    <div>• <strong>Renal Labs:</strong> eGFR {patient.eGFR} mL/min | Creatinine {patient.creatinine} µmol/L</div>
                    <div>• <strong>Allergies:</strong> Status: {patient.allergyStatus} ({patient.allergies.length} recorded)</div>
                    <div>• <strong>Clinical Status:</strong> {patient.resuscitationStatus} | Vitals &amp; NEWS2: {patient.vitals?.news2Score ?? 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Upload className="h-4 w-4 text-teal-700" />
                      Import Custom Scenario or Patient JSON
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Upload a downloaded JSON file or paste scenario/patient payload to load into EPMA.
                    </p>
                  </div>
                  <div>
                    <label className="flex items-center gap-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 font-bold cursor-pointer transition-colors text-slate-700">
                      <Upload className="h-3.5 w-3.5 text-teal-700" />
                      <span>Upload JSON File</span>
                      <input
                        type="file"
                        accept=".json,application/json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <textarea
                  rows={6}
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder="Paste Scenario or Patient JSON here or click 'Upload JSON File' above..."
                  className="w-full font-mono text-[11px] rounded border border-slate-300 p-2.5 focus:border-teal-600 focus:outline-none"
                />

                {jsonError && (
                  <div className="p-2 rounded bg-rose-50 border border-rose-300 text-rose-800 text-[11px] flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" />
                    <span>{jsonError}</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleImportJSON}
                    disabled={!jsonText.trim()}
                    className="flex items-center gap-1.5 rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Import &amp; Apply JSON</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
