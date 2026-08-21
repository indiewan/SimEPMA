import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Award, CheckCircle, Circle, X, BookOpen, AlertCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const CaseObjectivesModal: React.FC<Props> = ({ onClose }) => {
  const { currentScenario, safetyScore } = useSimulation();

  const completedCount = currentScenario.objectives.filter(o => o.completed).length;
  const totalCount = currentScenario.objectives.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold text-sm tracking-wide">
              Clinical Scenario Learning Objectives & Evaluation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs text-slate-800">
          {/* Scenario Overview */}
          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-bold text-slate-900">{currentScenario.title}</strong>
              <span className="rounded bg-amber-100 text-amber-900 font-bold px-2 py-0.5 text-[10px]">
                {currentScenario.difficulty}
              </span>
            </div>
            <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
              {currentScenario.description}
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between px-1">
            <span className="font-bold text-slate-700">
              Completed Competencies: {completedCount} / {totalCount}
            </span>
            <span className="font-mono font-bold text-amber-600">
              Safety Score: {safetyScore}%
            </span>
          </div>

          {/* Objectives List */}
          <div className="space-y-2">
            {currentScenario.objectives.map((obj) => (
              <div
                key={obj.id}
                className={`p-3 rounded-lg border transition-all ${
                  obj.completed
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {obj.completed ? (
                    <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block font-bold text-xs">{obj.title}</strong>
                    <p className="text-[11px] text-slate-600 mt-0.5">{obj.description}</p>
                    {obj.completed && (
                      <p className="text-[11px] text-emerald-700 font-medium mt-1">
                        ✓ {obj.clinicalFeedback}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-100 border-t border-slate-200 px-4 py-2.5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-1.5 text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
