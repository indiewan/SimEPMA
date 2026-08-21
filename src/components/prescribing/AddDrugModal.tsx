import React, { useState, useMemo } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DrugFormularyItem, RxType, ClinicalConflict } from '../../types/epma';
import {
  Search,
  Plus,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  X,
  Pill,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const AddDrugModal: React.FC<Props> = ({ onClose }) => {
  const { formulary, addPrescription, runConflictCheck, patient } = useSimulation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugFormularyItem | null>(null);

  // Form State
  const [formulation, setFormulation] = useState('');
  const [strength, setStrength] = useState('');
  const [dose, setDose] = useState('');
  const [route, setRoute] = useState('');
  const [rxType, setRxType] = useState<RxType>('REGULAR');
  const [frequencyLabel, setFrequencyLabel] = useState('');
  const [timesOfDay, setTimesOfDay] = useState<string[]>(['08:00']);
  const [directions, setDirections] = useState('');
  const [prnMinInterval, setPrnMinInterval] = useState('4');
  const [prnMaxDaily, setPrnMaxDaily] = useState('4000 mg in 24 hours');

  // Conflict Modal State
  const [conflicts, setConflicts] = useState<ClinicalConflict[]>([]);
  const [showConflictDialog, setShowConflictDialog] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');

  // Filter Formulary
  const filteredFormulary = useMemo(() => {
    if (!searchQuery.trim()) return formulary;
    const q = searchQuery.toLowerCase();
    return formulary.filter(
      d =>
        d.name.toLowerCase().includes(q) ||
        d.genericName.toLowerCase().includes(q) ||
        d.bnfChapter.toLowerCase().includes(q)
    );
  }, [formulary, searchQuery]);

  const handleSelectDrug = (drug: DrugFormularyItem) => {
    setSelectedDrug(drug);
    setFormulation(drug.standardFormulations[0] || 'Tablets');
    setStrength(drug.standardStrengths[0] || '');
    setDose(drug.defaultDoses[0] || '');
    setRoute(drug.standardRoutes[0] || 'Oral');
    
    if (drug.typicalFrequencies.length > 0) {
      const firstFreq = drug.typicalFrequencies[0];
      setFrequencyLabel(firstFreq.label);
      setTimesOfDay(firstFreq.times);
      setRxType(firstFreq.type);
    } else {
      setFrequencyLabel('ONCE a day in morning at 08:00');
      setTimesOfDay(['08:00']);
      setRxType('REGULAR');
    }

    setDirections(drug.cautions[0] || 'Take as directed.');
  };

  const handleFrequencyChange = (freqObj: { label: string; times: string[]; type: RxType }) => {
    setFrequencyLabel(freqObj.label);
    setTimesOfDay(freqObj.times);
    setRxType(freqObj.type);
  };

  const handleValidateAndPrescribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDrug) return;

    // Run real-time CDS conflict check
    const detectedConflicts = runConflictCheck(selectedDrug);

    if (detectedConflicts.length > 0) {
      setConflicts(detectedConflicts);
      setShowConflictDialog(true);
    } else {
      submitPrescription();
    }
  };

  const submitPrescription = () => {
    if (!selectedDrug) return;

    addPrescription({
      drugName: `${selectedDrug.name} ${strength || formulation}`,
      genericName: selectedDrug.genericName,
      formulation,
      strength,
      dose,
      route,
      rxType,
      frequency: frequencyLabel,
      timesOfDay: rxType === 'PRN' ? ['PRN'] : rxType === 'STAT' ? ['STAT'] : timesOfDay,
      directions: directions + (overrideReason ? ` [Prescriber Override: ${overrideReason}]` : ''),
      prnMinIntervalHours: rxType === 'PRN' ? parseInt(prnMinInterval) || 4 : undefined,
      prnMaxDailyDose: rxType === 'PRN' ? prnMaxDaily : undefined,
      isControlledDrug: selectedDrug.isControlledDrug,
      isHighAlert: selectedDrug.isHighAlert,
      isTimeCritical: selectedDrug.isTimeCritical,
      preAdminRequirement: selectedDrug.preAdminRequirement,
      bnfChapter: selectedDrug.bnfChapter
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-lg bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-teal-400" />
            <h3 className="font-bold text-sm tracking-wide">
              EPMA Prescribing Wizard • Add Inpatient Medication
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Split: Left Search Formulary, Right Prescribing Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: BNF Formulary Search & Selection (5 cols) */}
          <div className="md:col-span-5 border-r border-slate-200 bg-slate-50 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-slate-200 bg-white">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Search BNF Hospital Formulary
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-slate-400" />
                <input
                  id="input-search-bnf"
                  type="text"
                  placeholder="Search drug name, e.g. Salbutamol, Amoxicillin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-slate-900 bg-white focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            {/* List of BNF Drugs */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
              {filteredFormulary.map((drug) => {
                const isSelected = selectedDrug?.id === drug.id;
                return (
                  <button
                    key={drug.id}
                    id={`drug-item-${drug.id}`}
                    type="button"
                    onClick={() => handleSelectDrug(drug)}
                    className={`w-full text-left p-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-teal-100/80 border-l-4 border-teal-700'
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-slate-900">{drug.name}</strong>
                      <div className="flex items-center gap-1">
                        {drug.isControlledDrug && (
                          <span className="rounded bg-red-100 text-red-800 font-bold px-1 py-0.2 text-[9px]">
                            CD
                          </span>
                        )}
                        {drug.isTimeCritical && (
                          <span className="rounded bg-purple-100 text-purple-800 font-bold px-1 py-0.2 text-[9px]">
                            TIME
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">{drug.genericName}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{drug.bnfChapter}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Prescribing Form & Parameters (7 cols) */}
          <div className="md:col-span-7 p-4 overflow-y-auto bg-white flex flex-col justify-between">
            {!selectedDrug ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <Pill className="h-10 w-10 text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-600">Select a drug from the BNF formulary catalogue</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                  Review BNF monograph cautions, choose formulation, route, dosage schedule, and verify clinical safety rules.
                </p>
              </div>
            ) : (
              <form onSubmit={handleValidateAndPrescribe} className="space-y-3">
                {/* Drug Header */}
                <div className="p-2.5 rounded bg-slate-100 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-black text-slate-900">{selectedDrug.name}</strong>
                    <span className="text-xs text-slate-600 font-mono">{selectedDrug.genericName}</span>
                  </div>
                  {selectedDrug.cautions.length > 0 && (
                    <div className="text-[11px] text-amber-900 mt-1 bg-amber-50 p-1.5 rounded border border-amber-200">
                      <strong>BNF Clinical Warning:</strong> {selectedDrug.cautions[0]}
                    </div>
                  )}
                  {selectedDrug.preAdminRequirement && (
                    <div className="text-[11px] text-teal-900 mt-1 bg-teal-50 p-1.5 rounded border border-teal-200 flex items-center gap-1.5">
                      <span className="font-bold text-teal-800 uppercase">Pre-Admin Protocol:</span>
                      <span>Requires bedside check of {selectedDrug.preAdminRequirement.label} ({selectedDrug.preAdminRequirement.unit}) prior to each nurse administration.</span>
                    </div>
                  )}
                </div>

                {/* Formulation & Strength */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Formulation</label>
                    <select
                      value={formulation}
                      onChange={(e) => setFormulation(e.target.value)}
                      className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-xs bg-white"
                    >
                      {selectedDrug.standardFormulations.map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Strength</label>
                    <select
                      value={strength}
                      onChange={(e) => setStrength(e.target.value)}
                      className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-xs bg-white"
                    >
                      {selectedDrug.standardStrengths.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dose & Route */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Dose</label>
                    <input
                      id="input-prescribed-dose"
                      type="text"
                      value={dose}
                      onChange={(e) => setDose(e.target.value)}
                      className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-xs font-mono font-bold text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Route</label>
                    <select
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-xs bg-white"
                    >
                      {selectedDrug.standardRoutes.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Order Type & Frequency Preset */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Frequency & Schedule
                  </label>
                  <div className="space-y-1">
                    {selectedDrug.typicalFrequencies.map((freq, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 p-2 rounded border text-xs cursor-pointer ${
                          frequencyLabel === freq.label
                            ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="frequencyOption"
                          checked={frequencyLabel === freq.label}
                          onChange={() => handleFrequencyChange(freq)}
                          className="text-teal-600"
                        />
                        <span>{freq.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* PRN Limits (if PRN) */}
                {rxType === 'PRN' && (
                  <div className="grid grid-cols-2 gap-2 bg-amber-50/70 p-2 rounded border border-amber-200">
                    <div>
                      <label className="block text-[10px] font-bold text-amber-900">Minimum Interval (Hours)</label>
                      <input
                        type="number"
                        value={prnMinInterval}
                        onChange={(e) => setPrnMinInterval(e.target.value)}
                        className="mt-0.5 w-full rounded border border-amber-300 px-2 py-1 text-xs bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-amber-900">Max 24h Ceiling Dose</label>
                      <input
                        type="text"
                        value={prnMaxDaily}
                        onChange={(e) => setPrnMaxDaily(e.target.value)}
                        className="mt-0.5 w-full rounded border border-amber-300 px-2 py-1 text-xs bg-white font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* Directions & Specific Instructions */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700">Clinical Directions</label>
                  <textarea
                    value={directions}
                    onChange={(e) => setDirections(e.target.value)}
                    rows={2}
                    className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1 text-xs"
                    placeholder="e.g. Take with or after food, swallow whole with water..."
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    id="btn-prescribe-submit"
                    type="submit"
                    className="flex items-center gap-1.5 rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-1.5 text-xs shadow-sm cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    Prescribe & Validate Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Clinical Decision Support (CDS) Conflict Warning Dialog */}
      {showConflictDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-2xl border-2 border-red-500 overflow-hidden animate-bounce-short">
            {/* Warning Header */}
            <div className="bg-red-700 text-white px-4 py-3 flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-white flex-shrink-0 animate-pulse" />
              <div>
                <h3 className="font-black text-sm uppercase tracking-wide">
                  Clinical Decision Support Warning
                </h3>
                <p className="text-[11px] text-red-100">
                  Potential patient harm or severe contraindication detected.
                </p>
              </div>
            </div>

            {/* List of Detected Conflicts */}
            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {conflicts.map((c, i) => (
                <div
                  key={i}
                  className={`p-3 rounded border text-xs ${
                    c.severity === 'HIGH_CONTRAINDICATION'
                      ? 'bg-red-50 border-red-300 text-red-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <strong className="block text-xs font-bold">{c.title}</strong>
                  <p className="mt-1 text-[11px] leading-relaxed">{c.description}</p>
                </div>
              ))}

              {/* Prescriber Override Rationale Input */}
              <div className="border-t border-slate-200 pt-3">
                <label className="block text-xs font-bold text-slate-800">
                  Clinical Override Justification (Mandatory for Audit Trail)
                </label>
                <textarea
                  id="input-override-reason"
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  rows={2}
                  placeholder="State clinical reason for overriding this safety alert..."
                  className="mt-1 w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="bg-slate-100 px-4 py-3 border-t border-slate-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowConflictDialog(false)}
                className="rounded bg-slate-200 hover:bg-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-800 cursor-pointer"
              >
                Back / Cancel Prescribing
              </button>

              <button
                id="btn-confirm-override"
                type="button"
                disabled={!overrideReason.trim()}
                onClick={() => {
                  setShowConflictDialog(false);
                  submitPrescription();
                }}
                className="rounded bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-bold px-4 py-1.5 text-xs transition-colors cursor-pointer"
              >
                Override Warning & Prescribe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
