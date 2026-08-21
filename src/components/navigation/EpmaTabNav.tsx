import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Pill, Activity, ShieldAlert, CheckSquare, Clock, FileSpreadsheet, FileCheck2 } from 'lucide-react';
import { EpmaTabKey } from '../../types/epma';

interface Props {
  activeTab: EpmaTabKey;
  onTabChange: (tab: EpmaTabKey) => void;
}

export const EpmaTabNav: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const { prescriptions, currentScenario, dischargeMedications, homeMedications } = useSimulation();

  const activeRxCount = prescriptions.filter(p => p.status === 'ACTIVE').length;
  const discontinuedCount = prescriptions.filter(p => p.status === 'DISCONTINUED').length;
  const pendingMedsRec = homeMedications.filter(m => m.status === 'UNRECONCILED').length;

  return (
    <div className="flex flex-wrap items-end justify-between border-b border-slate-300 bg-slate-200/90 px-3 pt-2 text-xs">
      {/* Left Prescribing & Orders Tabs */}
      <div className="flex flex-wrap gap-1">
        <button
          id="tab-inpatient-rx"
          onClick={() => onTabChange('Inpatient Rx')}
          className={`flex items-center gap-1.5 rounded-t px-3.5 py-2 font-bold transition-all border-t border-x cursor-pointer ${
            activeTab === 'Inpatient Rx'
              ? 'bg-white text-teal-900 border-slate-300 border-b-white -mb-[1px] shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-white border-transparent'
          }`}
        >
          <Pill className="h-3.5 w-3.5 text-teal-700" />
          <span>Inpatient Rx</span>
          <span className="ml-1 rounded-full bg-teal-100 px-1.5 py-0.2 text-[10px] text-teal-800 font-mono">
            {activeRxCount}
          </span>
        </button>

        <button
          id="tab-meds-rec"
          onClick={() => onTabChange('Medicines Reconciliation')}
          className={`flex items-center gap-1.5 rounded-t px-3 py-2 font-bold transition-all border-t border-x cursor-pointer ${
            activeTab === 'Medicines Reconciliation'
              ? 'bg-white text-sky-900 border-slate-300 border-b-white -mb-[1px] shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-white border-transparent'
          }`}
        >
          <FileCheck2 className="h-3.5 w-3.5 text-sky-700" />
          <span>Meds Rec</span>
          {pendingMedsRec > 0 && (
            <span className="ml-0.5 rounded-full bg-amber-200 text-amber-900 px-1.5 py-0.2 text-[9px] font-bold">
              {pendingMedsRec}
            </span>
          )}
        </button>

        <button
          id="tab-discharge-rx"
          onClick={() => onTabChange('Discharge Rx')}
          className={`flex items-center gap-1.5 rounded-t px-3 py-2 font-bold transition-all border-t border-x cursor-pointer ${
            activeTab === 'Discharge Rx'
              ? 'bg-white text-teal-900 border-slate-300 border-b-white -mb-[1px] shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-white border-transparent'
          }`}
        >
          <span>Discharge Rx (TTO)</span>
          {dischargeMedications.length > 0 && (
            <span className="ml-0.5 rounded-full bg-slate-200 text-slate-700 px-1.5 py-0.2 text-[9px] font-bold">
              {dischargeMedications.length}
            </span>
          )}
        </button>

        <button
          id="tab-short-term-leave"
          onClick={() => onTabChange('Short Term Leave Rx')}
          className={`hidden sm:flex items-center gap-1.5 rounded-t px-3 py-2 font-bold transition-all border-t border-x cursor-pointer ${
            activeTab === 'Short Term Leave Rx'
              ? 'bg-white text-teal-900 border-slate-300 border-b-white -mb-[1px] shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-white border-transparent'
          }`}
        >
          <span>Short Term Leave Rx</span>
        </button>

        <button
          id="tab-discontinued-rx"
          onClick={() => onTabChange('Discontinued Rx')}
          className={`flex items-center gap-1.5 rounded-t px-3 py-2 font-bold transition-all border-t border-x cursor-pointer ${
            activeTab === 'Discontinued Rx'
              ? 'bg-white text-teal-900 border-slate-300 border-b-white -mb-[1px] shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-white border-transparent'
          }`}
        >
          <span>Discontinued Rx</span>
          {discontinuedCount > 0 && (
            <span className="ml-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 px-1.5 py-0.2 text-[10px] font-mono font-bold">
              {discontinuedCount}
            </span>
          )}
        </button>
      </div>

      {/* Right Clinical Assessment, Conflicts & Administration eMAR Tabs */}
      <div className="flex flex-wrap gap-1 mt-1 sm:mt-0">
        <button
          id="tab-monitoring"
          onClick={() => onTabChange('Monitoring & Assessment')}
          className={`flex items-center gap-1.5 rounded-t px-3 py-2 font-bold transition-all border-t border-x cursor-pointer ${
            activeTab === 'Monitoring & Assessment'
              ? 'bg-white text-teal-900 border-slate-300 border-b-white -mb-[1px] shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-white border-transparent'
          }`}
        >
          <Activity className="h-3.5 w-3.5 text-teal-600" />
          <span>Monitoring & Assessment</span>
        </button>

        <button
          id="tab-conflict-log"
          onClick={() => onTabChange('Conflict Log')}
          className={`flex items-center gap-1.5 rounded-t px-3 py-2 font-bold transition-all border-t border-x cursor-pointer ${
            activeTab === 'Conflict Log'
              ? 'bg-white text-teal-900 border-slate-300 border-b-white -mb-[1px] shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-white border-transparent'
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
          <span>Conflict Log</span>
        </button>

        <button
          id="tab-administration"
          onClick={() => onTabChange('Administration')}
          className={`flex items-center gap-1.5 rounded-t px-4 py-2 font-black tracking-wide transition-all border-t border-x cursor-pointer ${
            activeTab === 'Administration'
              ? 'bg-teal-700 text-white border-teal-800 border-b-teal-700 -mb-[1px] shadow-sm'
              : 'bg-teal-600/20 text-teal-950 hover:bg-teal-600/30 border-teal-300'
          }`}
        >
          <CheckSquare className="h-4 w-4 text-amber-300" />
          <span className="text-sm">Administration (eMAR)</span>
        </button>
      </div>
    </div>
  );
};
