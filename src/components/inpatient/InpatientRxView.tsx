import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Prescription, RxType } from '../../types/epma';
import {
  Clock,
  AlertCircle,
  FileText,
  Trash2,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  Info,
  ShieldCheck,
  Zap,
  ArrowUpDown
} from 'lucide-react';

interface Props {
  onOpenChartModal: (rx: Prescription, scheduledDate?: string, scheduledTime?: string) => void;
  onOpenDrugInfo: (rx: Prescription) => void;
}

export const InpatientRxView: React.FC<Props> = ({ onOpenChartModal, onOpenDrugInfo }) => {
  const {
    prescriptions,
    discontinuePrescription,
    pharmacyScreenPrescription,
    role,
    simulatedDate,
    simulatedTime
  } = useSimulation();

  const [sortBy, setSortBy] = useState<'MODIFY_DATE' | 'A_Z' | 'BNF_CHAPTER' | 'START_DATE' | 'TYPE'>('TYPE');
  const [showDiscontinueModal, setShowDiscontinueModal] = useState<string | null>(null);
  const [discontinueReason, setDiscontinueReason] = useState('');
  const [showLegend, setShowLegend] = useState(false);

  const activePrescriptions = prescriptions.filter(p => p.status === 'ACTIVE');

  // Sorting
  const sortedPrescriptions = [...activePrescriptions].sort((a, b) => {
    if (sortBy === 'A_Z') return a.drugName.localeCompare(b.drugName);
    if (sortBy === 'BNF_CHAPTER') return (a.bnfChapter || '').localeCompare(b.bnfChapter || '');
    if (sortBy === 'START_DATE') return a.prescribedDate.localeCompare(b.prescribedDate);
    return 0;
  });

  const prnList = sortedPrescriptions.filter(p => p.rxType === 'PRN');
  const regularList = sortedPrescriptions.filter(p => p.rxType === 'REGULAR');
  const statList = sortedPrescriptions.filter(p => p.rxType === 'STAT');
  const infusionList = sortedPrescriptions.filter(p => p.rxType === 'INFUSION');

  const handleDiscontinueSubmit = () => {
    if (showDiscontinueModal && discontinueReason.trim()) {
      discontinuePrescription(showDiscontinueModal, discontinueReason.trim());
      setShowDiscontinueModal(null);
      setDiscontinueReason('');
    }
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto">
      {/* Secondary Sort & Filter Toolbar (Exact Screenshot 1 Replication) */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-300 bg-slate-200/80 px-3 py-1.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700">Sort items by:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSortBy('TYPE')}
              className={`rounded px-2 py-0.5 font-medium transition-colors cursor-pointer ${
                sortBy === 'TYPE' ? 'bg-teal-700 text-white font-bold' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              Order Type
            </button>
            <button
              onClick={() => setSortBy('MODIFY_DATE')}
              className={`rounded px-2 py-0.5 font-medium transition-colors cursor-pointer ${
                sortBy === 'MODIFY_DATE' ? 'bg-teal-700 text-white font-bold' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              Order Add/Modify date
            </button>
            <button
              onClick={() => setSortBy('A_Z')}
              className={`rounded px-2 py-0.5 font-medium transition-colors cursor-pointer ${
                sortBy === 'A_Z' ? 'bg-teal-700 text-white font-bold' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              A-Z
            </button>
            <button
              onClick={() => setSortBy('BNF_CHAPTER')}
              className={`rounded px-2 py-0.5 font-medium transition-colors cursor-pointer ${
                sortBy === 'BNF_CHAPTER' ? 'bg-teal-700 text-white font-bold' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              BNF Chapter
            </button>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="flex items-center gap-1 rounded bg-white hover:bg-slate-100 border border-slate-300 px-2 py-0.5 font-semibold text-slate-700 cursor-pointer"
          >
            <span>Legend</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showLegend && (
            <div className="absolute right-0 top-full mt-1 z-40 w-64 rounded-md border border-slate-300 bg-white p-3 shadow-lg text-xs space-y-1.5">
              <div className="font-bold border-b pb-1 text-slate-900">EPMA Chart Legend</div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-teal-600"></span>
                <span>Regular / Active scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-amber-500"></span>
                <span>PRN As-required protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1 py-0.2 rounded bg-red-100 text-red-800 font-bold text-[10px]">CD</span>
                <span>Controlled Drug (Dual sign-off)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1 py-0.2 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">TIME</span>
                <span>Time-Critical (Strict schedule)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Prescription Sections */}
      <div className="divide-y divide-slate-300">
        {/* PRN MEDICINES SECTION (Screenshot 1 Authentic Layout) */}
        {prnList.length > 0 && (
          <div>
            {/* PRN Section Header with Badges */}
            <div className="flex items-center justify-between bg-slate-700 text-white px-3 py-1 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-wider">PRN (As Required Medicines)</span>
                <span className="rounded bg-teal-600 px-1.5 py-0.2 text-[10px] text-white">MODIFIED</span>
                <span className="rounded bg-slate-600 px-1.5 py-0.2 text-[10px] text-slate-200">EITHER/OR PROTOCOL</span>
              </div>
              <span className="text-[11px] font-normal text-slate-300">Max cumulative doses strictly enforced</span>
            </div>

            {/* PRN Rows */}
            <div className="divide-y divide-slate-200 bg-white">
              {prnList.map(rx => (
                <div
                  key={rx.id}
                  className="grid grid-cols-1 lg:grid-cols-12 text-xs hover:bg-slate-50 transition-colors"
                >
                  {/* Drug Info & Prescription Details */}
                  <div className="lg:col-span-6 p-2.5 border-r border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <strong className="text-sm font-bold text-slate-900">{rx.drugName}</strong>
                          {rx.isControlledDrug && (
                            <span className="rounded bg-red-100 text-red-800 border border-red-300 px-1.5 py-0.2 font-bold text-[10px]">
                              CONTROLLED DRUG
                            </span>
                          )}
                          {rx.isHighAlert && !rx.isControlledDrug && (
                            <span className="rounded bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.2 font-bold text-[10px]">
                              HIGH ALERT
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-1 text-[11px] text-slate-600">
                          <div><span className="text-slate-400">Dose:</span> <strong className="text-slate-900">{rx.dose}</strong></div>
                          <div><span className="text-slate-400">Rx Date:</span> <span>{rx.prescribedDate} {rx.prescribedTime}</span></div>
                          <div><span className="text-slate-400">Route:</span> <strong className="text-slate-900">{rx.route}</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Directions, Timing, Last Administration */}
                  <div className="lg:col-span-4 p-2.5 border-r border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-700">
                        <span className="text-slate-400 font-medium">Directions:</span> {rx.directions}
                      </div>
                      {rx.prnMaxDailyDose && (
                        <div className="text-[11px] text-amber-900 font-semibold mt-0.5">
                          Max Daily: {rx.prnMaxDailyDose} (Min {rx.prnMinIntervalHours || 4}h interval)
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1 border-t border-slate-100">
                      <span>
                        Last administration: <strong className="text-slate-800">{rx.lastAdministration ? `${rx.lastAdministration.date} ${rx.lastAdministration.time}` : 'None recorded'}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="lg:col-span-2 p-2.5 flex flex-col justify-center gap-1.5 bg-slate-50/50">
                    <button
                      id={`btn-chart-prn-${rx.id}`}
                      onClick={() => onOpenChartModal(rx, simulatedDate, 'PRN')}
                      className="w-full rounded bg-teal-700 hover:bg-teal-800 text-white font-bold py-1 px-2 text-xs shadow-xs cursor-pointer"
                    >
                      Chart PRN Dose
                    </button>
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <button
                        onClick={() => onOpenDrugInfo(rx)}
                        className="text-teal-700 hover:underline cursor-pointer"
                      >
                        BNF Info
                      </button>
                      <button
                        onClick={() => setShowDiscontinueModal(rx.id)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Discontinue
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REGULAR MEDICINES SECTION (Screenshot 1 & 2 Layout) */}
        {regularList.length > 0 && (
          <div>
            {/* Section Header */}
            <div className="bg-slate-700 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Regular Inpatient Prescriptions ({regularList.length})</span>
              <span className="text-[11px] font-normal text-slate-300">Scheduled Ward Drug Rounds</span>
            </div>

            {/* Regular Rows */}
            <div className="divide-y divide-slate-200 bg-white">
              {regularList.map(rx => (
                <div
                  key={rx.id}
                  className="grid grid-cols-1 lg:grid-cols-12 text-xs hover:bg-slate-50 transition-colors"
                >
                  <div className="lg:col-span-6 p-2.5 border-r border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <strong className="text-sm font-bold text-slate-900">{rx.drugName}</strong>
                          {rx.isTimeCritical && (
                            <span className="rounded bg-purple-100 text-purple-800 border border-purple-300 px-1.5 py-0.2 font-bold text-[10px] animate-pulse">
                              TIME CRITICAL
                            </span>
                          )}
                          {rx.isNonStock && (
                            <span className="rounded bg-slate-200 text-slate-700 px-1.5 py-0.2 font-bold text-[10px]">
                              NON STOCK
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-1 text-[11px] text-slate-600">
                          <div><span className="text-slate-400">Dose:</span> <strong className="text-slate-900">{rx.dose}</strong></div>
                          <div><span className="text-slate-400">Route:</span> <strong className="text-slate-900">{rx.route}</strong></div>
                          <div><span className="text-slate-400">Prescriber:</span> <span>{rx.prescriberName}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-2.5 border-r border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-700">
                        <span className="text-slate-400 font-medium">Frequency:</span> <strong className="text-slate-900">{rx.frequency}</strong>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        <span className="text-slate-400 font-medium">Directions:</span> {rx.directions}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px]">
                      <span className="text-slate-400">Scheduled times:</span>
                      {rx.timesOfDay.map(t => (
                        <span key={t} className="rounded bg-teal-50 text-teal-800 border border-teal-200 px-1 py-0.2 font-mono font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-2.5 flex flex-col justify-center gap-1.5 bg-slate-50/50">
                    <button
                      id={`btn-chart-reg-${rx.id}`}
                      onClick={() => onOpenChartModal(rx, simulatedDate, rx.timesOfDay[0] || '08:00')}
                      className="w-full rounded bg-teal-700 hover:bg-teal-800 text-white font-bold py-1 px-2 text-xs shadow-xs cursor-pointer"
                    >
                      Chart Administration
                    </button>
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <button
                        onClick={() => onOpenDrugInfo(rx)}
                        className="text-teal-700 hover:underline cursor-pointer"
                      >
                        BNF Monograph
                      </button>
                      <button
                        onClick={() => setShowDiscontinueModal(rx.id)}
                        className="text-red-600 hover:underline cursor-pointer"
                      >
                        Discontinue
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAT (ONCE ONLY) SECTION */}
        {statList.length > 0 && (
          <div>
            <div className="bg-slate-700 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
              STAT (Once Only / Emergency Orders) ({statList.length})
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              {statList.map(rx => (
                <div key={rx.id} className="grid grid-cols-1 lg:grid-cols-12 text-xs p-2.5 hover:bg-slate-50">
                  <div className="lg:col-span-6">
                    <strong className="text-sm font-bold text-slate-900">{rx.drugName}</strong>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Dose: <strong>{rx.dose}</strong> • Route: <strong>{rx.route}</strong> • Prescribed: {rx.prescribedDate} {rx.prescribedTime}
                    </div>
                  </div>
                  <div className="lg:col-span-4 text-[11px] text-slate-700">
                    <div>{rx.directions}</div>
                  </div>
                  <div className="lg:col-span-2 flex items-center justify-end">
                    <button
                      onClick={() => onOpenChartModal(rx, simulatedDate, 'STAT')}
                      className="rounded bg-teal-700 text-white font-bold px-3 py-1 text-xs cursor-pointer"
                    >
                      Chart STAT Dose
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Discontinue Modal */}
      {showDiscontinueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-red-600" />
              Discontinue Inpatient Prescription
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Provide a clear clinical rationale for stopping this medication. This will be audited on the patient chart.
            </p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Clinical Reason for Discontinuation</label>
                <select
                  value={discontinueReason}
                  onChange={(e) => setDiscontinueReason(e.target.value)}
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                >
                  <option value="">-- Select reason --</option>
                  <option value="Course Completed">Course Completed</option>
                  <option value="Adverse Reaction / Allergy Identified">Adverse Reaction / Allergy Identified</option>
                  <option value="Ineffective / Clinical Change">Ineffective / Clinical Change</option>
                  <option value="Switched to Oral Formulation">Switched to Oral Formulation</option>
                  <option value="Patient Discharged">Patient Discharged</option>
                  <option value="Prescribing Error / Duplicate Order">Prescribing Error / Duplicate Order</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDiscontinueModal(null)}
                  className="rounded px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!discontinueReason}
                  onClick={handleDiscontinueSubmit}
                  className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                >
                  Confirm Discontinue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
