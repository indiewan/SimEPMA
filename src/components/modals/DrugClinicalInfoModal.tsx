import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DrugFormularyItem, Prescription } from '../../types/epma';
import { BookOpen, X, Search, ShieldAlert, Pill, CheckCircle, Info } from 'lucide-react';

interface Props {
  initialDrug?: Prescription | null;
  onClose: () => void;
}

export const DrugClinicalInfoModal: React.FC<Props> = ({ initialDrug, onClose }) => {
  const { formulary } = useSimulation();
  const [search, setSearch] = useState('');
  
  const defaultSelected = initialDrug
    ? formulary.find(f => initialDrug.genericName.toLowerCase().includes(f.genericName.toLowerCase()) || initialDrug.drugName.toLowerCase().includes(f.name.toLowerCase())) || formulary[0]
    : formulary[0];

  const [selectedDrug, setSelectedDrug] = useState<DrugFormularyItem>(defaultSelected);

  const filtered = formulary.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.genericName.toLowerCase().includes(search.toLowerCase()) ||
    f.bnfChapter.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-400" />
            <h3 className="font-bold text-sm tracking-wide">
              BNF Drug Clinical Information & Monograph Reference
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Drug List */}
          <div className="md:col-span-5 border-r border-slate-200 bg-slate-50 flex flex-col overflow-hidden">
            <div className="p-2.5 border-b border-slate-200 bg-white">
              <div className="relative">
                <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search BNF monographs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded border border-slate-300 pl-7 pr-2 py-1 text-xs bg-white focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
              {filtered.map(drug => (
                <button
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`w-full text-left p-2.5 transition-colors cursor-pointer ${
                    selectedDrug.id === drug.id
                      ? 'bg-teal-100 border-l-4 border-teal-700'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <strong className="text-xs font-bold text-slate-900 block">{drug.name}</strong>
                  <span className="text-[11px] text-slate-600 block">{drug.genericName}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{drug.bnfChapter}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Monograph Details */}
          <div className="md:col-span-7 p-4 overflow-y-auto bg-white space-y-3 text-xs leading-relaxed">
            <div className="border-b pb-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-slate-900">{selectedDrug.name}</h4>
                <div className="flex items-center gap-1">
                  {selectedDrug.isControlledDrug && (
                    <span className="rounded bg-red-100 text-red-800 font-bold px-1.5 py-0.2 text-[10px]">
                      CD SCHEDULE 2
                    </span>
                  )}
                  {selectedDrug.isTimeCritical && (
                    <span className="rounded bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 text-[10px]">
                      TIME CRITICAL
                    </span>
                  )}
                </div>
              </div>
              <p className="text-slate-600 font-mono text-xs">{selectedDrug.genericName}</p>
              <span className="text-[11px] text-teal-800 font-medium">{selectedDrug.bnfChapter}</span>
            </div>

            {/* Standard Routes & Formulations */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Standard Routes</span>
                <span className="text-slate-800 font-semibold">{selectedDrug.standardRoutes.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Formulations</span>
                <span className="text-slate-800 font-semibold">{selectedDrug.standardFormulations.join(', ')}</span>
              </div>
            </div>

            {/* Clinical Cautions & Warnings */}
            <div>
              <strong className="text-amber-900 font-bold flex items-center gap-1 mb-1">
                <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                BNF Cautions & Monitoring Requirements
              </strong>
              <div className="space-y-1">
                {selectedDrug.cautions.map((c, i) => (
                  <div key={i} className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-950 text-[11px]">
                    {c}
                  </div>
                ))}
              </div>
            </div>

            {/* Contraindications */}
            <div>
              <strong className="text-red-900 font-bold flex items-center gap-1 mb-1">
                <ShieldAlert className="h-3.5 w-3.5 text-red-600" />
                Contraindications
              </strong>
              <div className="space-y-1">
                {selectedDrug.contraindications.map((c, i) => (
                  <div key={i} className="p-2 rounded bg-red-50 border border-red-200 text-red-950 text-[11px]">
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
