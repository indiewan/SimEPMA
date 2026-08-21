import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { UserRole } from '../../types/epma';
import {
  AlertTriangle,
  Clock,
  UserCheck,
  RotateCcw,
  BookOpen,
  GraduationCap,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Stethoscope,
  Activity,
  Pill,
  Lock,
  Unlock,
  KeyRound
} from 'lucide-react';

export const SimulationWatermarkBanner: React.FC = () => {
  const {
    mode,
    setMode,
    isInstructorAuthenticated,
    requestInstructorMode,
    logoutInstructor,
    role,
    setRole,
    scenarios,
    currentScenario,
    selectScenario,
    resetScenario,
    showScenarioModal,
    setShowScenarioModal,
    simulatedDate,
    simulatedTime,
    setSimulatedTime,
    advanceToRound,
    safetyScore,
    objectivesCompletedCount,
    totalObjectivesCount,
    setShowHelpGuide,
    openHelpGuide
  } = useSimulation();

  return (
    <header className="relative z-30 flex flex-col border-b border-amber-300/80 bg-amber-500 text-slate-900 shadow-md">
      {/* Primary Simulation Warning Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 text-xs font-bold tracking-wide uppercase">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded bg-slate-950 px-2 py-0.5 text-amber-300 font-mono shadow-sm animate-pulse">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            TRAINING SIMULATION (NON-LIVE)
          </span>
          <span className="hidden sm:inline-block text-slate-950 font-semibold opacity-90">
            DO NOT USE FOR ACTUAL CLINICAL CARE • SIMULATED PATIENT DATA ONLY
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Safety & Objective Score Pill */}
          <div className="flex items-center gap-2 rounded bg-amber-600/30 px-2 py-0.5 text-slate-950 border border-amber-600/40">
            <span className="font-semibold">Safety Score:</span>
            <span className={`font-mono font-bold ${safetyScore >= 90 ? 'text-emerald-950' : safetyScore >= 70 ? 'text-amber-950' : 'text-red-950'}`}>
              {safetyScore}%
            </span>
            <span className="text-amber-800">|</span>
            <span className="font-semibold">Objectives:</span>
            <span className="font-mono font-bold">
              {objectivesCompletedCount}/{totalObjectivesCount}
            </span>
          </div>

          <button
            id="btn-epma-guide"
            onClick={() => openHelpGuide('OVERVIEW')}
            className="flex items-center gap-1 rounded bg-slate-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            title="Learn how real NHS EPMA systems work and view reference architecture"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-400" />
            <span>EPMA Guide & Architecture</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Mode, Scenario Switcher, Role Selector, Simulation Clock */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-amber-600/30 bg-slate-900 px-3 py-2 text-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Switcher with Password Protection */}
          <div className="flex items-center gap-1.5">
            <div className="flex rounded-md bg-slate-800 p-0.5 border border-slate-700">
              <button
                id="btn-mode-trainee"
                onClick={() => {
                  setMode('trainee');
                }}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  mode === 'trainee'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Trainee View
              </button>
              <button
                id="btn-mode-instructor"
                onClick={() => {
                  if (isInstructorAuthenticated) {
                    setMode('instructor');
                  } else {
                    requestInstructorMode();
                  }
                }}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  isInstructorAuthenticated && mode === 'instructor'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : isInstructorAuthenticated
                    ? 'bg-slate-700 text-amber-300 hover:bg-slate-600'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
                title={isInstructorAuthenticated ? 'Instructor Mode active' : 'Instructor Mode (Requires authorization)'}
              >
                {isInstructorAuthenticated ? (
                  <Unlock className="h-3.5 w-3.5 text-amber-300" />
                ) : (
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                )}
                <span>Instructor Mode</span>
              </button>
            </div>

            {isInstructorAuthenticated && (
              <button
                onClick={logoutInstructor}
                title="Lock Instructor Mode"
                className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2 py-1 text-[11px] text-amber-300 hover:text-amber-200 cursor-pointer"
              >
                <Lock className="h-3 w-3" />
                <span>Lock</span>
              </button>
            )}
          </div>

          {/* Active Scenario Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Scenario:</span>
            <select
              id="select-scenario"
              value={currentScenario.id}
              onChange={(e) => selectScenario(e.target.value)}
              className="rounded bg-slate-800 border border-slate-700 px-2 py-1 text-xs font-medium text-amber-300 focus:border-amber-400 focus:outline-none max-w-[220px] md:max-w-xs truncate cursor-pointer"
            >
              {scenarios.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.title} ({sc.difficulty})
                </option>
              ))}
            </select>

            <button
              id="btn-open-scenario-hub"
              onClick={() => setShowScenarioModal(true)}
              title="Browse, Create and Author custom training scenarios"
              className="flex items-center gap-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2 py-1 text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>Author & Cases</span>
            </button>

            <button
              id="btn-reset-scenario"
              onClick={resetScenario}
              title="Reset scenario state"
              className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3 text-slate-400" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Role Switcher (in Trainee Mode) */}
          {mode === 'trainee' && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">Role:</span>
              <div className="flex rounded bg-slate-800 p-0.5 border border-slate-700">
                <button
                  id="role-nurse"
                  onClick={() => setRole('nurse')}
                  className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium cursor-pointer ${
                    role === 'nurse'
                      ? 'bg-teal-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Nurse / Drug Administration (eMAR charting)"
                >
                  <Activity className="h-3 w-3" />
                  Nurse
                </button>
                <button
                  id="role-doctor"
                  onClick={() => setRole('doctor')}
                  className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium cursor-pointer ${
                    role === 'doctor'
                      ? 'bg-blue-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Doctor / Prescribing (Order writing, formulary search)"
                >
                  <Stethoscope className="h-3 w-3" />
                  Doctor
                </button>
                <button
                  id="role-pharmacist"
                  onClick={() => setRole('pharmacist')}
                  className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium cursor-pointer ${
                    role === 'pharmacist'
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Pharmacist / Clinical verification & screening"
                >
                  <Pill className="h-3 w-3" />
                  Pharmacist
                </button>
              </div>
            </div>
          )}

          {/* Simulation Clock & Rounds Fast-Forward */}
          <div className="flex items-center gap-2 rounded bg-slate-800/90 border border-slate-700 px-2 py-1 text-xs">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono text-amber-300 font-bold">{simulatedTime}</span>
            <span className="text-slate-500">|</span>
            <span className="text-[11px] text-slate-400 hidden lg:inline">Rounds:</span>
            <div className="flex items-center gap-1">
              {(['08:00', '12:00', '18:00', '22:00'] as const).map((r) => (
                <button
                  key={r}
                  id={`round-${r.replace(':', '')}`}
                  onClick={() => advanceToRound(r)}
                  className={`rounded px-1.5 py-0.5 font-mono text-[11px] cursor-pointer transition-colors ${
                    simulatedTime === r
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                  title={`Fast forward simulation time to ${r} medication round`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
