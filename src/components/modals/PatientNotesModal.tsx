import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { FileText, X, Plus, Clock, User, ShieldAlert } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const PatientNotesModal: React.FC<Props> = ({ onClose }) => {
  const { patient, simulatedDate, simulatedTime } = useSimulation();

  const [notes, setNotes] = useState([
    {
      id: '1',
      author: 'Dr. S. Miller (Consultant Acute Medicine)',
      timestamp: `${simulatedDate} 08:30`,
      category: 'Medical Ward Round',
      content: patient.clinicalSummary || 'Patient admitted with acute exacerbation. Continue regular inhalers and optimize fluid balance.'
    },
    {
      id: '2',
      author: 'SN R. Thompson (Staff Nurse)',
      timestamp: `${simulatedDate} 07:45`,
      category: 'Nursing Handover',
      content: 'Morning obs stable. Patient reports mild shortness of breath on mobilization. Nil by mouth status confirmed for pending endoscopy.'
    },
    {
      id: '3',
      author: 'Pharm. K. Patel (Lead Clinical Pharmacist)',
      timestamp: `${simulatedDate} 10:15`,
      category: 'Medicines Reconciliation',
      content: 'Medication history reconciled with GP record (SCR). Please note patient has severe allergy to Penicillin (Anaphylaxis 2021). Avoid co-amoxiclav and piperacillin-tazobactam.'
    }
  ]);

  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('Nursing Progress Note');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setNotes([
      {
        id: Date.now().toString(),
        author: 'Clinical Trainee / User',
        timestamp: `${simulatedDate} ${simulatedTime}`,
        category: newNoteCategory,
        content: newNoteText.trim()
      },
      ...notes
    ]);

    setNewNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-teal-400" />
            <h3 className="font-bold text-sm tracking-wide">
              Clinical Progress Notes & Pharmacist Handover Log
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* New Note Form */}
          <form onSubmit={handleAddNote} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">Record Clinical Progress Entry</span>
              <select
                value={newNoteCategory}
                onChange={(e) => setNewNoteCategory(e.target.value)}
                className="rounded border border-slate-300 px-2 py-0.5 text-xs bg-white"
              >
                <option value="Nursing Progress Note">Nursing Progress Note</option>
                <option value="Medical Ward Round">Medical Ward Round</option>
                <option value="Pharmacy Review">Pharmacy Review</option>
                <option value="Drug Administration Note">Drug Administration Note</option>
              </select>
            </div>
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              rows={2}
              placeholder="Type clinical observation, patient response to medication, or handover detail..."
              className="w-full rounded border border-slate-300 p-2 text-xs bg-white focus:border-teal-600 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-3 py-1 text-xs cursor-pointer shadow-xs"
              >
                Save Progress Note
              </button>
            </div>
          </form>

          {/* Notes Feed */}
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="p-3 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 text-[11px] border-b pb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <User className="h-3.5 w-3.5 text-teal-700" />
                    <span>{note.author}</span>
                  </div>
                  <span className="font-mono text-slate-400">{note.timestamp}</span>
                </div>
                <div className="text-[11px] font-semibold text-teal-900 bg-teal-50 px-1.5 py-0.5 rounded inline-block">
                  {note.category}
                </div>
                <p className="text-slate-800 leading-relaxed text-xs pt-1">{note.content}</p>
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
