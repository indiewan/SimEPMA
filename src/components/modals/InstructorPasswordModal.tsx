import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Lock, ShieldAlert, KeyRound, Eye, EyeOff, X, CheckCircle2, AlertCircle } from 'lucide-react';

export const InstructorPasswordModal: React.FC = () => {
  const {
    showInstructorPasswordModal,
    setShowInstructorPasswordModal,
    loginInstructor,
    setShowScenarioModal
  } = useSimulation();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!showInstructorPasswordModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = loginInstructor(password);
    if (!success) {
      setError("Incorrect instructor password. Please enter the designated faculty passcode.");
    } else {
      setPassword('');
      // Optionally open the scenario modal directly so instructor can author
      setShowScenarioModal(true);
    }
  };

  const handleClose = () => {
    setError(null);
    setPassword('');
    setShowInstructorPasswordModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl border border-slate-300 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between bg-amber-600 px-4 py-3 text-white">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-700 shadow-inner">
              <KeyRound className="h-4 w-4 text-amber-200" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">Faculty & Instructor Authentication</h2>
              <p className="text-[11px] text-amber-100">Administrative authorization required</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded p-1 text-amber-100 hover:bg-amber-700 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="text-xs text-slate-600 leading-relaxed">
            Entering <strong>Instructor Mode</strong> unlocks the <strong>Author Custom Scenario</strong> design studio, initial prescription chart builder, and <strong>Import / Export JSON</strong> tools in the Author & Cases hub.
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Instructor Passcode
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter faculty passcode"
                autoFocus
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-rose-800 text-xs animate-shake">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 active:bg-amber-800 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Unlock Instructor Mode</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
