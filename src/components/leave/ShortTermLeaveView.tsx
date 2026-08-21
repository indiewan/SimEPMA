import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ShortTermLeaveRecord } from '../../types/epma';
import {
  Calendar,
  Clock,
  PlusCircle,
  CheckCircle,
  Package,
  MapPin,
  FileText,
  UserCheck,
  AlertCircle,
  ArrowRightLeft
} from 'lucide-react';

export const ShortTermLeaveView: React.FC = () => {
  const {
    shortTermLeaveRecords,
    addShortTermLeaveRecord,
    updateLeaveStatus,
    patient,
    prescriptions,
    simulatedDate,
    simulatedTime,
    role
  } = useSimulation();

  const [showModal, setShowModal] = useState(false);
  const [leaveStartDate, setLeaveStartDate] = useState(simulatedDate);
  const [leaveStartTime, setLeaveStartTime] = useState('10:00');
  const [leaveReturnDate, setLeaveReturnDate] = useState('2026-08-23');
  const [leaveReturnTime, setLeaveReturnTime] = useState('18:00');
  const [destination, setDestination] = useState('Home address with family / Weekend Pass');
  const [notes, setNotes] = useState('Medically fit for trial weekend leave. Carer informed of medication times.');

  const [selectedMeds, setSelectedMeds] = useState<{
    drugName: string;
    dose: string;
    frequency: string;
    dosesSupplied: number;
    directions: string;
  }[]>([]);

  const handleOpenModal = () => {
    // Prefill from active regular inpatient meds
    const active = prescriptions
      .filter(p => p.status === 'ACTIVE' && (p.rxType === 'REGULAR' || p.rxType === 'PRN'))
      .map(p => ({
        drugName: p.drugName,
        dose: p.dose,
        frequency: p.frequency,
        dosesSupplied: p.rxType === 'REGULAR' ? 4 : 2,
        directions: p.directions
      }));
    setSelectedMeds(active);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addShortTermLeaveRecord({
      leaveStartDate,
      leaveStartTime,
      leaveReturnDate,
      leaveReturnTime,
      destination,
      authorizedBy: role === 'doctor' ? 'Dr. Trainee (FY1)' : 'Consultant / Lead Prescriber',
      leaveMedicines: selectedMeds,
      notes,
      status: 'AUTHORIZED'
    });
    setShowModal(false);
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto p-3 sm:p-4 space-y-3">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white p-3 rounded-lg shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-800 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
              Short Term Leave Prescriptions & Passes
            </span>
            <span className="text-xs font-bold text-slate-600">
              Ward: {patient.ward} • Bed: {patient.bayBed}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Authorize temporary patient leave (day pass / weekend leave), pack required take-home doses, and record leave administration.
          </p>
        </div>

        <button
          id="btn-create-leave"
          onClick={handleOpenModal}
          className="flex items-center gap-1.5 rounded bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>New Leave Pass & Med Pack</span>
        </button>
      </div>

      {/* Leave Passes List */}
      <div className="space-y-3">
        {shortTermLeaveRecords.length === 0 ? (
          <div className="rounded-lg border border-slate-300 bg-white p-8 text-center text-xs text-slate-500 shadow-xs">
            <Calendar className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <p className="font-semibold text-slate-700">No short term leave passes currently recorded for this patient.</p>
            <p className="mt-1">Click "New Leave Pass & Med Pack" to schedule temporary weekend or day leave.</p>
          </div>
        ) : (
          shortTermLeaveRecords.map((record) => (
            <div
              key={record.id}
              className="rounded-lg border border-slate-300 bg-white p-4 shadow-xs text-xs space-y-3"
            >
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 font-bold uppercase text-[10px] ${
                      record.status === 'RETURNED'
                        ? 'bg-slate-100 text-slate-700 border border-slate-300'
                        : record.status === 'MEDS_PACKED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    }`}
                  >
                    {record.status.replace(/_/g, ' ')}
                  </span>
                  <strong className="text-slate-900 font-bold text-sm">
                    {record.destination}
                  </strong>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-semibold">Authorized by:</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-mono">{record.authorizedBy}</span>
                </div>
              </div>

              {/* Timing details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                <div>
                  <span className="block text-[11px] text-slate-500">Departure:</span>
                  <strong className="text-slate-800">{record.leaveStartDate} at {record.leaveStartTime}</strong>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500">Expected Return:</span>
                  <strong className="text-slate-800">{record.leaveReturnDate} at {record.leaveReturnTime}</strong>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500">eMAR Status:</span>
                  <span className="text-amber-800 font-semibold">Code 11 (Short Term Leave)</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500">Medications Packed:</span>
                  <strong className="text-teal-800">{record.leaveMedicines.length} Medication Packs</strong>
                </div>
              </div>

              {/* Packed Medications Table */}
              <div>
                <h4 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 text-indigo-700" />
                  Leave Medication Packs Issued to Patient / Escort:
                </h4>
                <div className="rounded border border-slate-200 overflow-hidden divide-y divide-slate-200 bg-white">
                  {record.leaveMedicines.map((med, idx) => (
                    <div key={idx} className="p-2 flex flex-wrap items-center justify-between gap-2 hover:bg-slate-50">
                      <div>
                        <strong className="text-slate-900 font-bold">{med.drugName}</strong>
                        <span className="text-slate-600 ml-2">({med.dose} • {med.frequency})</span>
                        <div className="text-[11px] text-slate-500 mt-0.5">Instructions: {med.directions}</div>
                      </div>
                      <div className="text-right">
                        <span className="rounded bg-indigo-50 border border-indigo-200 px-2 py-0.5 font-bold text-indigo-900">
                          {med.dosesSupplied} doses supplied
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200">
                <div className="text-[11px] text-slate-600 italic">
                  Notes: {record.notes}
                </div>

                <div className="flex items-center gap-2">
                  {record.status === 'AUTHORIZED' && (
                    <button
                      onClick={() => updateLeaveStatus(record.id, 'MEDS_PACKED')}
                      className="flex items-center gap-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 font-bold cursor-pointer transition-colors"
                    >
                      <Package className="h-3.5 w-3.5" />
                      Mark Meds Packed & Dispatched
                    </button>
                  )}
                  {record.status === 'MEDS_PACKED' && (
                    <button
                      onClick={() => updateLeaveStatus(record.id, 'RETURNED')}
                      className="flex items-center gap-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 font-bold cursor-pointer transition-colors"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      Sign Patient Returned to Ward
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Pass Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-700" />
              Authorize Short Term Patient Leave Pass
            </h3>

            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Departure Date</label>
                  <input
                    type="date"
                    value={leaveStartDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Departure Time</label>
                  <input
                    type="time"
                    value={leaveStartTime}
                    onChange={(e) => setLeaveStartTime(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Expected Return Date</label>
                  <input
                    type="date"
                    value={leaveReturnDate}
                    onChange={(e) => setLeaveReturnDate(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Expected Return Time</label>
                  <input
                    type="time"
                    value={leaveReturnTime}
                    onChange={(e) => setLeaveReturnTime(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Leave Destination / Purpose</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Clinical Notes & Escort Details</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Medications to Pack ({selectedMeds.length} items from Inpatient Chart)
                </label>
                <div className="max-h-36 overflow-y-auto rounded border border-slate-200 p-2 space-y-1.5 bg-slate-50">
                  {selectedMeds.map((med, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] bg-white p-1.5 rounded border border-slate-200">
                      <span className="font-semibold text-slate-800">{med.drugName} ({med.dose})</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500">Doses:</span>
                        <input
                          type="number"
                          min={1}
                          max={20}
                          value={med.dosesSupplied}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            setSelectedMeds(prev => prev.map((m, i) => (i === idx ? { ...m, dosesSupplied: val } : m)));
                          }}
                          className="w-12 rounded border border-slate-300 px-1 py-0.5 text-center font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded px-3 py-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-4 py-1.5 cursor-pointer shadow-xs"
                >
                  Authorize Leave Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
