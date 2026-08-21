import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Ban,
  RotateCcw,
  Search,
  AlertTriangle,
  Calendar,
  UserX,
  FileSpreadsheet,
  CheckCircle2,
  Info
} from 'lucide-react';

export const DiscontinuedRxView: React.FC = () => {
  const { prescriptions, addPrescription, patient, simulatedDate, simulatedTime, role, setBannerMessage } = useSimulation();
  const [searchTerm, setSearchTerm] = useState('');

  const discontinuedPrescriptions = prescriptions.filter(p => p.status === 'DISCONTINUED');

  const filtered = discontinuedPrescriptions.filter(p => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.drugName.toLowerCase().includes(term) ||
      p.genericName.toLowerCase().includes(term) ||
      (p.discontinuedReason && p.discontinuedReason.toLowerCase().includes(term))
    );
  });

  const handleRestartDrug = (p: typeof prescriptions[0]) => {
    addPrescription({
      drugName: p.drugName,
      genericName: p.genericName,
      formulation: p.formulation,
      strength: p.strength,
      dose: p.dose,
      route: p.route,
      rxType: p.rxType,
      frequency: p.frequency,
      timesOfDay: p.timesOfDay,
      directions: p.directions,
      isHighAlert: p.isHighAlert,
      isControlledDrug: p.isControlledDrug,
      isTimeCritical: p.isTimeCritical
    });
    setBannerMessage({
      type: 'success',
      text: `Restarted prescription for ${p.drugName} on inpatient chart.`
    });
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto p-3 sm:p-4 space-y-3">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white p-3 rounded-lg shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-rose-800 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
              Discontinued / Stopped Prescriptions History
            </span>
            <span className="text-xs font-bold text-slate-600">
              Total Stopped: {discontinuedPrescriptions.length} items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete audit trail of all ceased medications, recorded discontinuation rationales, and clinician restart tools.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search discontinued medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-slate-300 bg-slate-50 pl-8 pr-3 py-1.5 text-xs focus:border-rose-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Discontinued Medications Table */}
      <div className="rounded-lg border border-slate-300 bg-white shadow-xs overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-100 border-b border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          <div className="col-span-4">Medication & Regimen</div>
          <div className="col-span-2">Prescribed Period</div>
          <div className="col-span-3">Discontinuation Rationale</div>
          <div className="col-span-2">Stopped By</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            <Ban className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <p className="font-semibold text-slate-700">No discontinued prescriptions matching search.</p>
            <p className="mt-1">Medications stopped on the inpatient chart will appear here with clinical reasons.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 text-xs">
            {filtered.map((item) => (
              <div key={item.id} className="grid grid-cols-12 px-3 py-3 items-center hover:bg-slate-50">
                {/* Drug Details */}
                <div className="col-span-4 pr-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="line-through font-bold text-slate-700">{item.drugName}</span>
                    <span className="rounded bg-rose-100 text-rose-800 border border-rose-300 px-1.5 py-0.2 text-[10px] font-bold uppercase">
                      STOPPED
                    </span>
                    {item.isHighAlert && (
                      <span className="rounded bg-amber-100 text-amber-800 border border-amber-300 px-1 py-0.2 text-[10px] font-bold">
                        HIGH ALERT
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {item.dose} • {item.route} • <strong className="text-slate-800">{item.frequency}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    Original Prescriber: {item.prescriberName} ({item.prescriberGrade})
                  </div>
                </div>

                {/* Period */}
                <div className="col-span-2 text-slate-700">
                  <div className="text-[11px]">
                    <span className="text-slate-500">Started:</span> {item.prescribedDate}
                  </div>
                  <div className="text-[11px] font-semibold text-rose-900 mt-0.5">
                    <span className="text-slate-500">Stopped:</span> {item.discontinuedDate || `${simulatedDate} ${simulatedTime}`}
                  </div>
                </div>

                {/* Stated Reason */}
                <div className="col-span-3 pr-2">
                  <div className="bg-rose-50 border border-rose-200 rounded p-1.5 text-[11px] text-rose-900 leading-snug">
                    <strong>Reason:</strong> {item.discontinuedReason || 'Course completed / Clinician review'}
                  </div>
                </div>

                {/* Discontinued By */}
                <div className="col-span-2 text-slate-700 text-[11px]">
                  <div className="font-semibold text-slate-900">{item.discontinuedBy || 'DOCTOR'}</div>
                  <div className="text-slate-500">Audit trail verified</div>
                </div>

                {/* Restart Action */}
                <div className="col-span-1 flex items-center justify-end">
                  <button
                    onClick={() => handleRestartDrug(item)}
                    title="Restart / Re-prescribe medication to active inpatient chart"
                    className="flex items-center gap-1 rounded bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-800 px-2 py-1 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Restart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
