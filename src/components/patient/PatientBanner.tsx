import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Edit2,
  X,
  Plus
} from 'lucide-react';

export const PatientBanner: React.FC = () => {
  const { patient, updatePatient, bannerMessage, clearBanner } = useSimulation();
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [newWeight, setNewWeight] = useState(patient.weightKg.toString());
  const [showCommZone, setShowCommZone] = useState(false);

  // New allergy form
  const [newAllergen, setNewAllergen] = useState('');
  const [newReaction, setNewReaction] = useState('');
  const [newSeverity, setNewSeverity] = useState<'MILD' | 'MODERATE' | 'SEVERE_ANAPHYLAXIS'>('MODERATE');

  const handleUpdateWeight = () => {
    const parsed = parseFloat(newWeight);
    if (!isNaN(parsed) && parsed > 0) {
      // recalculate BSA = sqrt((height * weight) / 3600)
      const bsa = Math.sqrt((patient.heightCm * parsed) / 3600);
      updatePatient({
        weightKg: parsed,
        isWeightOutdated: false,
        bodySurfaceArea: parseFloat(bsa.toFixed(2))
      });
      setShowWeightModal(false);
    }
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllergen.trim()) return;
    const item = {
      id: 'all-' + Date.now(),
      allergen: newAllergen.trim(),
      reaction: newReaction.trim() || 'Not specified',
      severity: newSeverity,
      recordedDate: new Date().toISOString().split('T')[0]
    };
    updatePatient({
      allergies: [...patient.allergies, item],
      allergyStatus: 'RECORDED_ALLERGIES'
    });
    setNewAllergen('');
    setNewReaction('');
  };

  const handleRemoveAllergy = (id: string) => {
    const updated = patient.allergies.filter(a => a.id !== id);
    updatePatient({
      allergies: updated,
      allergyStatus: updated.length === 0 ? 'NKDA' : 'RECORDED_ALLERGIES'
    });
  };

  return (
    <div className="bg-white border-b border-slate-300 text-slate-900 font-sans shadow-sm">
      {/* Top Patient Master Index Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 text-xs border-b border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        {/* Name, Demographics & Address */}
        <div className="md:col-span-5 px-3 py-2">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black tracking-wide text-slate-900 uppercase">
                {patient.lastName}, {patient.firstName}
              </span>
              <span className="text-slate-500 font-medium">
                Born <span className="font-semibold text-slate-800">{patient.dob}</span> ({patient.age} y)
              </span>
            </div>
            <span className="font-semibold text-slate-700">Gender <strong className="text-slate-900">{patient.gender}</strong></span>
          </div>
          <div className="mt-1 text-[11px] text-slate-600 truncate">
            Address: <span className="font-mono text-slate-800">{patient.address}</span>
          </div>
        </div>

        {/* Hospital Identifier & Identifiers */}
        <div className="md:col-span-3 px-3 py-2 flex flex-col justify-center">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Hospital No.:</span>
            <span className="font-mono font-bold text-slate-800">{patient.hospitalNumber}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] mt-0.5">
            <span className="text-slate-500">National No.:</span>
            <span className="font-mono text-slate-700">{patient.nationalNumber}</span>
          </div>
        </div>

        {/* Allergy Status Pill (Prominent Red / Amber) */}
        <div className="md:col-span-4 px-3 py-2 flex items-center justify-between bg-amber-50/50">
          <div>
            <span className="text-[11px] text-slate-600 block">Allergy Status:</span>
            <button
              id="btn-allergy-status"
              onClick={() => setShowAllergyModal(true)}
              className="mt-0.5 inline-flex items-center gap-1.5 rounded font-bold text-xs hover:underline cursor-pointer"
            >
              {patient.allergyStatus === 'RECORDED_ALLERGIES' ? (
                <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 border border-red-300 px-2 py-0.5 rounded font-bold">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Recorded allergies ({patient.allergies.length})
                </span>
              ) : patient.allergyStatus === 'NKDA' ? (
                <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded font-bold">
                  <CheckCircle className="h-3.5 w-3.5" />
                  No Known Drug Allergies (NKDA)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded font-bold">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Not Recorded
                </span>
              )}
            </button>
          </div>
          <button
            onClick={() => setShowAllergyModal(true)}
            className="text-[11px] text-teal-700 hover:text-teal-900 font-medium underline cursor-pointer"
          >
            Details
          </button>
        </div>
      </div>

      {/* Second Row: Clinical Context (Consultant, Ward, Bed, Weight, Height, BSA) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 text-xs bg-slate-50/70 border-b border-slate-200 divide-x divide-slate-200 py-1.5 px-1">
        <div className="px-2 py-0.5">
          <span className="text-slate-500 text-[10px] uppercase block">Consultant</span>
          <span className="font-semibold text-slate-900 truncate block">{patient.consultant}</span>
        </div>
        <div className="px-2 py-0.5">
          <span className="text-slate-500 text-[10px] uppercase block">Ward / Bed</span>
          <span className="font-semibold text-slate-900">{patient.ward} • {patient.bayBed}</span>
        </div>
        <div className="px-2 py-0.5">
          <span className="text-slate-500 text-[10px] uppercase block">Body Surface Area</span>
          <span className="font-semibold text-slate-900">{patient.bodySurfaceArea} sqm (e)</span>
        </div>
        <div className="px-2 py-0.5 flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-[10px] uppercase block">Weight</span>
            <span className="font-semibold text-slate-900">{patient.weightKg} kg (e)</span>
          </div>
          <button
            id="btn-edit-weight"
            onClick={() => setShowWeightModal(true)}
            className="text-teal-700 hover:text-teal-900 p-0.5 cursor-pointer"
            title="Edit patient weight"
          >
            <Edit2 className="h-3 w-3" />
          </button>
        </div>
        <div className="px-2 py-0.5">
          <span className="text-slate-500 text-[10px] uppercase block">Height</span>
          <span className="font-semibold text-slate-900">{patient.heightCm} cm</span>
        </div>
        <div className="px-2 py-0.5">
          <span className="text-slate-500 text-[10px] uppercase block">Renal (eGFR / Cr)</span>
          <span className={`font-semibold ${patient.eGFR < 30 ? 'text-red-700 font-bold' : 'text-slate-900'}`}>
            {patient.eGFR} mL/min • {patient.creatinine} µmol/L
          </span>
        </div>
      </div>

      {/* Outdated / Missing Weight Alert Bar (Screenshot 1 Authentic Replication) */}
      {patient.isWeightOutdated && (
        <div className="flex items-center justify-between bg-amber-50 border-b border-amber-200 px-3 py-1 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>The weight is missing or outdated.</strong> You should record a weight before prescribing or administering medicines.
            </span>
          </div>
          <button
            onClick={() => setShowWeightModal(true)}
            className="rounded bg-amber-200 hover:bg-amber-300 text-amber-900 px-2 py-0.5 font-semibold text-[11px] border border-amber-300 cursor-pointer"
          >
            Record Weight
          </button>
        </div>
      )}

      {/* Interactive Communication Zone Toggle (Screenshot 3 Replication) */}
      <div className="border-b border-slate-200 bg-slate-100/60 px-3 py-0.5 text-xs text-slate-700">
        <button
          onClick={() => setShowCommZone(!showCommZone)}
          className="flex items-center justify-between w-full text-[11px] text-slate-600 hover:text-slate-900 font-medium py-0.5 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-teal-600" />
            Communication Zone & Clinical Handover Summary
          </span>
          {showCommZone ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        {showCommZone && (
          <div className="mt-1.5 p-2 bg-white rounded border border-slate-200 text-xs text-slate-800 space-y-1 animate-fadeIn">
            <p><strong>Clinical Summary:</strong> {patient.clinicalSummary}</p>
            <div className="flex flex-wrap gap-4 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <span><strong>Admitted:</strong> {patient.admitDate}</span>
              <span><strong>Resuscitation Status:</strong> <strong className="text-emerald-700">{patient.resuscitationStatus}</strong></span>
              {patient.vitals && (
                <span>
                  <strong>Latest Vitals:</strong> BP {patient.vitals.bp} | HR {patient.vitals.heartRate} | SpO2 {patient.vitals.oxygenSat}% ({patient.vitals.oxygenDelivery}) | NEWS2: <strong className="text-amber-700">{patient.vitals.news2Score}</strong>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Green/Amber/Red Action Success Banner (Exact Screenshot 2 Replication) */}
      {bannerMessage && (
        <div
          className={`flex items-center justify-between px-3 py-1.5 text-xs font-semibold border-b transition-all ${
            bannerMessage.type === 'success'
              ? 'bg-teal-100/90 text-teal-900 border-teal-300'
              : bannerMessage.type === 'error'
              ? 'bg-red-100 text-red-900 border-red-300'
              : bannerMessage.type === 'warning'
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-blue-100 text-blue-900 border-blue-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {bannerMessage.type === 'success' && <CheckCircle className="h-4 w-4 text-teal-700 flex-shrink-0" />}
            {bannerMessage.type === 'error' && <XCircle className="h-4 w-4 text-red-700 flex-shrink-0" />}
            {bannerMessage.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-700 flex-shrink-0" />}
            {bannerMessage.type === 'info' && <Info className="h-4 w-4 text-blue-700 flex-shrink-0" />}
            <span>{bannerMessage.text}</span>
          </div>
          <button
            onClick={clearBanner}
            className="text-slate-600 hover:text-slate-900 p-0.5 cursor-pointer"
            title="Dismiss notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Edit Weight Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Record Patient Weight & Height</h3>
            <p className="mt-1 text-xs text-slate-600">
              Accurate weight is essential for dosing narrow therapeutic index drugs (e.g. Paracetamol IV, Gentamicin, Enoxaparin).
            </p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-sm font-mono focus:border-teal-600 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWeightModal(false)}
                  className="rounded px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateWeight}
                  className="rounded bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 shadow cursor-pointer"
                >
                  Save Weight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allergy Management Modal */}
      {showAllergyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-600" />
                Patient Allergy & Adverse Drug Reaction Record
              </h3>
              <button
                onClick={() => setShowAllergyModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Current Recorded Allergies:</span>
              {patient.allergies.length === 0 ? (
                <div className="rounded bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
                  No Known Drug Allergies (NKDA) recorded for this patient.
                </div>
              ) : (
                <div className="space-y-2">
                  {patient.allergies.map(a => (
                    <div key={a.id} className="flex items-start justify-between rounded border border-red-200 bg-red-50 p-2.5 text-xs">
                      <div>
                        <strong className="text-red-900 block text-xs">{a.allergen}</strong>
                        <span className="text-red-800 block text-[11px]">Reaction: {a.reaction}</span>
                        <span className="text-[10px] text-red-700 font-mono mt-0.5 block">Severity: {a.severity} • Recorded: {a.recordedDate}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveAllergy(a.id)}
                        className="text-red-600 hover:text-red-900 text-[11px] font-semibold underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Allergy Form */}
            <form onSubmit={handleAddAllergy} className="mt-4 border-t pt-3 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Add New Drug Allergy:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-600">Allergen / Drug Name</label>
                  <input
                    type="text"
                    value={newAllergen}
                    onChange={(e) => setNewAllergen(e.target.value)}
                    placeholder="e.g. Penicillin, Latex, NSAIDs"
                    className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600">Reaction</label>
                  <input
                    type="text"
                    value={newReaction}
                    onChange={(e) => setNewReaction(e.target.value)}
                    placeholder="e.g. Anaphylaxis, Rash, Angioedema"
                    className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <label className="text-[11px] text-slate-600 mr-2">Severity:</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="rounded border border-slate-300 px-2 py-1 text-xs"
                  >
                    <option value="MILD">Mild (Rash / Nausea)</option>
                    <option value="MODERATE">Moderate (Urticaria / Bronchospasm)</option>
                    <option value="SEVERE_ANAPHYLAXIS">Severe (Anaphylaxis / Airway compromise)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-1 rounded bg-teal-600 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700 shadow"
                >
                  <Plus className="h-3 w-3" /> Add Allergy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
