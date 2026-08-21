import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Prescription, RxType, AdministrationEvent } from '../../types/epma';
import {
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  Info,
  Zap,
  Filter
} from 'lucide-react';

interface Props {
  onOpenChartModal: (rx: Prescription, scheduledDate: string, scheduledTime: string) => void;
}

export const AdministrationGridView: React.FC<Props> = ({ onOpenChartModal }) => {
  const { prescriptions, simulatedDate, simulatedTime } = useSimulation();

  const [subFilter, setSubFilter] = useState<'REGULAR' | 'PRN' | 'INFUSION'>('REGULAR');
  const [showLegend, setShowLegend] = useState(false);

  // Generate 14-day sliding calendar window centered on simulatedDate
  // e.g. Day -5 to Day +8
  const currentDateObj = new Date(simulatedDate);
  const daysWindow: { dateStr: string; dayNum: number; isToday: boolean; monthLabel: string }[] = [];

  for (let i = -5; i <= 8; i++) {
    const d = new Date(currentDateObj);
    d.setDate(currentDateObj.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const monthLabel = d.toLocaleString('en-US', { month: 'short' });
    daysWindow.push({
      dateStr,
      dayNum: d.getDate(),
      isToday: i === 0,
      monthLabel
    });
  }

  const filteredPrescriptions = prescriptions.filter(p => {
    if (p.status !== 'ACTIVE') return false;
    if (subFilter === 'REGULAR') return p.rxType === 'REGULAR' || p.rxType === 'VARIABLE';
    if (subFilter === 'PRN') return p.rxType === 'PRN';
    if (subFilter === 'INFUSION') return p.rxType === 'INFUSION';
    return true;
  });

  const getCellStatus = (rx: Prescription, dateStr: string, timeStr: string): {
    type: 'ADMINISTERED' | 'OMITTED' | 'DUE' | 'DEFERRED' | 'BLANK';
    event?: AdministrationEvent;
    label?: string;
  } => {
    const event = rx.administrationEvents.find(
      e => e.scheduledDate === dateStr && e.scheduledTime === timeStr
    );

    if (event) {
      if (event.status === 'ADMINISTERED') return { type: 'ADMINISTERED', event, label: '✓' };
      if (event.status === 'OMITTED') return { type: 'OMITTED', event, label: event.nonAdminCode || 'OM' };
      if (event.status === 'DEFERRED') return { type: 'DEFERRED', event, label: 'DEF' };
    }

    // Is it scheduled on this day and time?
    const isToday = dateStr === simulatedDate;
    const isPast = dateStr < simulatedDate;
    const isFuture = dateStr > simulatedDate;

    if (isToday) {
      // Due dose slot
      return { type: 'DUE', label: '!' };
    }

    if (isPast) {
      return { type: 'OMITTED', label: '!' };
    }

    return { type: 'BLANK', label: '' };
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sub-navigation & Filters (Exact Screenshot 2 Replication) */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-300 bg-slate-200/90 px-3 py-1 text-xs">
        {/* Medicine Group Pills */}
        <div className="flex items-center gap-1">
          <button
            id="subfilter-regular"
            onClick={() => setSubFilter('REGULAR')}
            className={`rounded px-3 py-1 font-bold transition-all cursor-pointer ${
              subFilter === 'REGULAR'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-300'
            }`}
          >
            Regular Medicines ({prescriptions.filter(p => p.status === 'ACTIVE' && p.rxType === 'REGULAR').length})
          </button>
          <button
            id="subfilter-prn"
            onClick={() => setSubFilter('PRN')}
            className={`rounded px-3 py-1 font-bold transition-all cursor-pointer ${
              subFilter === 'PRN'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-300'
            }`}
          >
            PRN Medicines ({prescriptions.filter(p => p.status === 'ACTIVE' && p.rxType === 'PRN').length})
          </button>
          <button
            id="subfilter-infusions"
            onClick={() => setSubFilter('INFUSION')}
            className={`rounded px-3 py-1 font-bold transition-all cursor-pointer ${
              subFilter === 'INFUSION'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-300'
            }`}
          >
            Infusions ({prescriptions.filter(p => p.status === 'ACTIVE' && p.rxType === 'INFUSION').length})
          </button>
        </div>

        {/* View icons & Legend dropdown */}
        <div className="relative flex items-center gap-2">
          <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
            <span className="text-slate-500 font-medium">View:</span>
            <button className="p-1 rounded bg-white text-slate-800 border border-slate-300 shadow-xs">
              <Clock className="h-3.5 w-3.5" />
            </button>
            <button className="p-1 rounded text-slate-600 hover:bg-slate-300">
              <Calendar className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            id="btn-grid-legend"
            onClick={() => setShowLegend(!showLegend)}
            className="flex items-center gap-1 rounded bg-white hover:bg-slate-100 border border-slate-300 px-2 py-0.5 font-semibold text-slate-700 cursor-pointer"
          >
            <span>Legend</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showLegend && (
            <div className="absolute right-0 top-full mt-1 z-40 w-72 rounded-md border border-slate-300 bg-white p-3 shadow-xl text-xs space-y-2">
              <div className="font-bold border-b pb-1 text-slate-900">eMAR Administration Icons</div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-teal-600 bg-white flex items-center justify-center font-bold text-teal-800 text-xs">
                  !
                </div>
                <span><strong>Due / Scheduled:</strong> Ready for charting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span><strong>Administered:</strong> Dose given successfully</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <span><strong>Omitted / Non-Admin:</strong> (e.g. 01 Refused, 03 NBM)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-xs">
                  —
                </div>
                <span><strong>Not Scheduled:</strong> Outside active prescription</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid Container with Horizontal Scrolling */}
      <div className="flex-1 overflow-auto bg-slate-100">
        <div className="min-w-[960px]">
          {filteredPrescriptions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No active prescriptions found under this filter category.
            </div>
          ) : (
            filteredPrescriptions.map(rx => (
              <div key={rx.id} className="mb-2 bg-white border-b border-slate-300 shadow-xs">
                {/* Drug Header Strip */}
                <div className="flex items-center justify-between bg-slate-700/90 text-white px-3 py-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-900 px-1.5 py-0.2 font-mono text-[10px] text-teal-300 font-bold">
                      {rx.rxType}
                    </span>
                    {rx.isNonStock && (
                      <span className="rounded bg-slate-600 px-1.5 py-0.2 font-mono text-[10px] text-slate-200">
                        NON STOCK
                      </span>
                    )}
                    {rx.isTimeCritical && (
                      <span className="rounded bg-purple-600 px-1.5 py-0.2 font-mono text-[10px] text-white font-bold animate-pulse">
                        TIME CRITICAL
                      </span>
                    )}
                    {rx.isControlledDrug && (
                      <span className="rounded bg-red-600 px-1.5 py-0.2 font-mono text-[10px] text-white font-bold">
                        CONTROLLED DRUG
                      </span>
                    )}
                    {rx.preAdminRequirement && (
                      <span className="rounded bg-teal-600 px-1.5 py-0.2 font-mono text-[10px] text-white font-bold">
                        REQ: {rx.preAdminRequirement.label}
                      </span>
                    )}
                    <span className="font-bold text-slate-100">{rx.drugName}</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono">
                    Rx: {rx.prescribedDate}
                  </span>
                </div>

                {/* Grid Table for this Drug */}
                <div className="grid grid-cols-12 text-xs divide-x divide-slate-200">
                  {/* Left Column: Drug Dose, Route, Frequency (4 cols) */}
                  <div className="col-span-4 p-2 bg-slate-50/70 flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">{rx.drugName}</div>
                      <div className="grid grid-cols-2 gap-2 mt-1 text-[11px] text-slate-700">
                        <div><span className="text-slate-400">Dose:</span> <strong>{rx.dose}</strong></div>
                        <div><span className="text-slate-400">Route:</span> <strong>{rx.route}</strong></div>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1">
                        <span className="text-slate-400">Frequency:</span> <strong>{rx.frequency}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenChartModal(rx, simulatedDate, rx.timesOfDay[0] || '08:00')}
                      className="mt-2 w-full rounded bg-teal-700 hover:bg-teal-800 text-white font-bold py-1 text-xs cursor-pointer shadow-xs"
                    >
                      Quick Chart Dose
                    </button>
                  </div>

                  {/* Right Calendar Grid Columns (8 cols) */}
                  <div className="col-span-8 overflow-x-auto">
                    <table className="w-full border-collapse text-center">
                      <thead>
                        {/* Month Header */}
                        <tr className="bg-slate-200/90 text-slate-700 font-bold border-b border-slate-300 text-[10px]">
                          <th className="py-0.5 px-1 border-r border-slate-300 w-14">Time</th>
                          {daysWindow.map((d, i) => (
                            <th
                              key={d.dateStr}
                              className={`py-0.5 px-1 border-r border-slate-300 ${
                                d.isToday ? 'bg-teal-600 text-white font-bold' : ''
                              }`}
                            >
                              {d.dayNum === 1 || i === 0 ? d.monthLabel : ''}
                            </th>
                          ))}
                        </tr>
                        {/* Day Number Header */}
                        <tr className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300 text-[11px]">
                          <th className="py-0.5 px-1 border-r border-slate-300 text-slate-500 font-normal">Slot</th>
                          {daysWindow.map((d) => (
                            <th
                              key={d.dateStr}
                              className={`py-1 px-1 border-r border-slate-300 font-mono ${
                                d.isToday ? 'bg-teal-600 text-white font-black' : ''
                              }`}
                            >
                              {d.dayNum}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(rx.timesOfDay.length > 0 ? rx.timesOfDay : ['08:00']).map((timeSlot) => (
                          <tr key={timeSlot} className="border-b border-slate-200 hover:bg-teal-50/30">
                            {/* Time Slot Label */}
                            <td className="py-1 px-1 font-mono font-bold text-slate-700 bg-slate-50 border-r border-slate-300 text-[11px]">
                              {timeSlot}
                            </td>

                            {/* Daily Dose Cells */}
                            {daysWindow.map((d) => {
                              const cell = getCellStatus(rx, d.dateStr, timeSlot);
                              return (
                                <td
                                  key={d.dateStr}
                                  className={`p-0.5 border-r border-slate-200 relative ${
                                    d.isToday ? 'bg-teal-50/60' : ''
                                  }`}
                                >
                                  {cell.type === 'ADMINISTERED' ? (
                                    <button
                                      onClick={() => onOpenChartModal(rx, d.dateStr, timeSlot)}
                                      className="w-full h-7 rounded bg-teal-700 text-white font-bold flex flex-col items-center justify-center hover:bg-teal-800 transition-colors shadow-2xs cursor-pointer text-xs leading-none"
                                      title={`Administered by ${cell.event?.administeredBy} at ${cell.event?.actualAdminTime}${cell.event?.preAdminRecordedValue ? ` [${cell.event.preAdminCheckType || 'Pre-Check'}: ${cell.event.preAdminRecordedValue} ${cell.event.preAdminRecordedUnit || ''}]` : ''}`}
                                    >
                                      <span>✓</span>
                                      {cell.event?.preAdminRecordedValue && (
                                        <span className="text-[8px] opacity-90 font-mono font-normal">
                                          {cell.event.preAdminRecordedValue}
                                        </span>
                                      )}
                                    </button>
                                  ) : cell.type === 'OMITTED' ? (
                                    <button
                                      onClick={() => onOpenChartModal(rx, d.dateStr, timeSlot)}
                                      className="w-full h-7 rounded bg-red-600 text-white font-black font-mono flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer text-xs"
                                      title={`Omitted: ${cell.event?.nonAdminReasonText || cell.label}`}
                                    >
                                      {cell.label}
                                    </button>
                                  ) : cell.type === 'DUE' ? (
                                    <button
                                      onClick={() => onOpenChartModal(rx, d.dateStr, timeSlot)}
                                      className="w-full h-7 rounded border-2 border-teal-600 bg-teal-50 text-teal-800 font-black font-mono flex items-center justify-center hover:bg-teal-200 transition-all cursor-pointer text-sm animate-pulse shadow-xs"
                                      title="Due for administration - Click to chart"
                                    >
                                      !
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => onOpenChartModal(rx, d.dateStr, timeSlot)}
                                      className="w-full h-7 text-slate-300 hover:bg-slate-200/60 font-mono flex items-center justify-center transition-colors cursor-pointer text-xs"
                                    >
                                      —
                                    </button>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
