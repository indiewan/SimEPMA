import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Prescription, NON_ADMIN_REASONS } from '../../types/epma';
import { Clock, CheckCircle, AlertTriangle, ChevronRight, X, ShieldAlert, Lock, UserCheck } from 'lucide-react';

interface Props {
  onClose: () => void;
  onOpenSpecificChart: (rx: Prescription, date: string, time: string) => void;
}

export const AdministrationRoundModal: React.FC<Props> = ({ onClose, onOpenSpecificChart }) => {
  const { prescriptions, simulatedDate, simulatedTime, chartAdministration } = useSimulation();

  const [selectedSlot, setSelectedSlot] = useState<'08:00' | '12:00' | '18:00' | '22:00'>('08:00');
  const [witnessName, setWitnessName] = useState('');

  // Find all active prescriptions scheduled for this time slot
  const duePrescriptions = prescriptions.filter(p => {
    if (p.status !== 'ACTIVE') return false;
    return p.timesOfDay.includes(selectedSlot) || (p.rxType === 'REGULAR' && p.timesOfDay.length === 0);
  });

  const handleQuickAdminister = (rx: Prescription) => {
    if (rx.isControlledDrug && !witnessName.trim()) {
      onOpenSpecificChart(rx, simulatedDate, selectedSlot);
      return;
    }

    chartAdministration({
      prescriptionId: rx.id,
      scheduledDate: simulatedDate,
      scheduledTime: selectedSlot,
      status: 'ADMINISTERED',
      doseAdministered: rx.dose,
      isWardStock: !rx.isNonStock,
      witnessUsername: witnessName.trim() || undefined
    });
  };

  const handleQuickOmit = (rx: Prescription, code: string) => {
    const reason = NON_ADMIN_REASONS.find(r => r.code === code);
    chartAdministration({
      prescriptionId: rx.id,
      scheduledDate: simulatedDate,
      scheduledTime: selectedSlot,
      status: 'OMITTED',
      nonAdminCode: code,
      nonAdminReasonText: reason?.label,
      isWardStock: !rx.isNonStock
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-teal-400" />
            <h3 className="font-bold text-sm tracking-wide">
              Ward Drug Administration Round Stepper
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Round Slot Selector */}
        <div className="flex border-b border-slate-200 bg-slate-100 p-2 gap-2 text-xs font-bold justify-center">
          {(['08:00', '12:00', '18:00', '22:00'] as const).map(slot => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-4 py-1.5 rounded transition-all cursor-pointer ${
                selectedSlot === slot
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              {slot === '08:00' ? 'Morning Round (08:00)' : slot === '12:00' ? 'Lunch Round (12:00)' : slot === '18:00' ? 'Evening Round (18:00)' : 'Night Round (22:00)'}
            </button>
          ))}
        </div>

        {/* Content List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="font-semibold">
              Medications Due for <strong>{selectedSlot}</strong> Round ({duePrescriptions.length})
            </span>
            <span className="font-mono text-slate-500">Date: {simulatedDate}</span>
          </div>

          {duePrescriptions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              No scheduled medications found for this time slot.
            </div>
          ) : (
            duePrescriptions.map(rx => {
              const event = rx.administrationEvents.find(
                e => e.scheduledDate === simulatedDate && e.scheduledTime === selectedSlot
              );

              return (
                <div
                  key={rx.id}
                  className={`p-3 rounded-lg border transition-all ${
                    event?.status === 'ADMINISTERED'
                      ? 'bg-emerald-50 border-emerald-300'
                      : event?.status === 'OMITTED'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-white border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-slate-900">{rx.drugName}</strong>
                        <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-1 rounded">
                          {rx.route}
                        </span>
                        {rx.isControlledDrug && (
                          <span className="font-mono text-[10px] bg-red-100 text-red-800 font-bold px-1 rounded">
                            CD
                          </span>
                        )}
                        {rx.isTimeCritical && (
                          <span className="font-mono text-[10px] bg-purple-100 text-purple-800 font-bold px-1 rounded animate-pulse">
                            TIME CRITICAL
                          </span>
                        )}
                      </div>
                      <div className="text-slate-600 mt-0.5">
                        Dose: <strong className="text-slate-900">{rx.dose}</strong> • Frequency: {rx.frequency}
                      </div>
                    </div>

                    {/* Chart Actions */}
                    <div className="flex items-center gap-1.5">
                      {event?.status === 'ADMINISTERED' ? (
                        <div className="flex items-center gap-1 bg-emerald-600 text-white font-bold px-2 py-1 rounded text-xs">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Given ({event.actualAdminTime})</span>
                        </div>
                      ) : event?.status === 'OMITTED' ? (
                        <div className="flex items-center gap-1 bg-red-600 text-white font-bold px-2 py-1 rounded text-xs">
                          <span>Omitted ({event.nonAdminCode})</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleQuickAdminister(rx)}
                            className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-3 py-1 rounded text-xs shadow-xs cursor-pointer"
                          >
                            ✓ Administer
                          </button>
                          <button
                            onClick={() => handleQuickOmit(rx, '01')}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium px-2 py-1 rounded text-xs cursor-pointer"
                            title="Omit: Refused"
                          >
                            Omit (Refused)
                          </button>
                          <button
                            onClick={() => onOpenSpecificChart(rx, simulatedDate, selectedSlot)}
                            className="bg-slate-100 hover:bg-slate-200 text-teal-800 font-bold px-2 py-1 rounded border border-slate-300 text-xs cursor-pointer"
                          >
                            Detailed...
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2.5 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Dual Nurse Witness (if CD):</span>
            <input
              type="text"
              placeholder="e.g. SN J. Davies"
              value={witnessName}
              onChange={(e) => setWitnessName(e.target.value)}
              className="rounded border border-slate-300 px-2 py-0.5 text-xs bg-white"
            />
          </div>
          <button
            onClick={onClose}
            className="rounded bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-1.5 text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
