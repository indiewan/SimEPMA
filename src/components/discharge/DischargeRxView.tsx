import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DischargeMedicationItem } from '../../types/epma';
import { DischargePrintModal } from './DischargePrintModal';
import {
  FileCheck,
  PlusCircle,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Printer,
  ShieldCheck,
  Trash2,
  Edit3,
  UserCheck,
  Send,
  HelpCircle
} from 'lucide-react';

export const DischargeRxView: React.FC = () => {
  const {
    dischargeMedications,
    addDischargeMedication,
    approveDischargeMedication,
    removeDischargeMedication,
    populateDischargeFromInpatient,
    patient,
    role,
    simulatedDate,
    setBannerMessage
  } = useSimulation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [filterAction, setFilterAction] = useState<string>('ALL');

  // New TTO Form State
  const [drugName, setDrugName] = useState('');
  const [dose, setDose] = useState('');
  const [route, setRoute] = useState('Oral');
  const [frequency, setFrequency] = useState('ONCE a day in the morning');
  const [directions, setDirections] = useState('Take as directed with water');
  const [supplyDays, setSupplyDays] = useState(14);
  const [quantityText, setQuantityText] = useState('28 Tablets');
  const [action, setAction] = useState<'CONTINUE' | 'NEW_MEDICATION' | 'DOSE_CHANGED' | 'DISCONTINUE_AT_DISCHARGE'>('NEW_MEDICATION');
  const [gpActionRequired, setGpActionRequired] = useState('Continue on repeat prescription');

  const filteredMeds = dischargeMedications.filter(m => {
    if (filterAction === 'ALL') return true;
    return m.action === filterAction;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName.trim()) return;

    addDischargeMedication({
      drugName: drugName.trim().toUpperCase(),
      dose: dose.trim() || '1 dose',
      route,
      frequency,
      directions,
      supplyDays,
      quantityText: quantityText.trim() || `${supplyDays * 2} units`,
      action,
      gpActionRequired: gpActionRequired.trim()
    });

    setShowAddModal(false);
    setDrugName('');
    setDose('');
  };

  const handleAuthorizeAll = () => {
    dischargeMedications.forEach(m => approveDischargeMedication(m.id));
    setBannerMessage({
      type: 'success',
      text: 'All Discharge (TTO) prescriptions authorized and sent to Hospital Pharmacy for dispensing.'
    });
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto p-3 sm:p-4 space-y-3">
      {/* Top Header & TTO Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white p-3 rounded-lg shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-teal-800 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
              Discharge Prescribing (TTO / To Take Out)
            </span>
            <span className="text-xs font-bold text-slate-600">
              Patient: {patient.lastName}, {patient.firstName} ({patient.hospitalNumber})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Reconcile hospital discharge medicines, specify GP handover instructions, and authorize take-home dispensing packs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-import-inpatient"
            onClick={populateDischargeFromInpatient}
            className="flex items-center gap-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer"
            title="Import current active regular inpatient medications"
          >
            <Download className="h-3.5 w-3.5 text-teal-700" />
            <span>Import Active Inpatient Rx</span>
          </button>

          <button
            id="btn-add-tto"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded bg-teal-700 hover:bg-teal-800 text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add Discharge Drug</span>
          </button>

          <button
            id="btn-authorize-tto"
            onClick={handleAuthorizeAll}
            className="flex items-center gap-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <CheckCircle className="h-3.5 w-3.5 text-emerald-200" />
            <span>Authorize & Send to Pharmacy</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 text-xs">
        <span className="text-slate-500 font-semibold mr-1">Filter Action:</span>
        {(['ALL', 'CONTINUE', 'NEW_MEDICATION', 'DOSE_CHANGED', 'DISCONTINUE_AT_DISCHARGE'] as const).map((act) => (
          <button
            key={act}
            onClick={() => setFilterAction(act)}
            className={`rounded px-2.5 py-1 font-semibold transition-colors cursor-pointer ${
              filterAction === act
                ? 'bg-teal-700 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {act === 'ALL'
              ? `All Medications (${dischargeMedications.length})`
              : act === 'CONTINUE'
              ? 'Continued'
              : act === 'NEW_MEDICATION'
              ? 'New Started'
              : act === 'DOSE_CHANGED'
              ? 'Dose Modified'
              : 'Stopped at Discharge'}
          </button>
        ))}
      </div>

      {/* Discharge Medications Table */}
      <div className="rounded-lg border border-slate-300 bg-white shadow-xs overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-100 border-b border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          <div className="col-span-4">Medication & Regimen</div>
          <div className="col-span-2">Discharge Supply</div>
          <div className="col-span-2">Clinical Action</div>
          <div className="col-span-3">GP / Primary Care Action</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {filteredMeds.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            <p className="font-semibold">No discharge prescriptions recorded yet.</p>
            <p className="mt-1">Click "Import Active Inpatient Rx" or "Add Discharge Drug" to prepare the TTO chart.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 text-xs">
            {filteredMeds.map((item) => (
              <div key={item.id} className="grid grid-cols-12 px-3 py-2.5 items-center hover:bg-slate-50">
                {/* Medication Details */}
                <div className="col-span-4 pr-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <strong className="text-slate-900 font-bold">{item.drugName}</strong>
                    {item.isHighAlert && (
                      <span className="rounded bg-amber-100 text-amber-800 border border-amber-300 px-1 py-0.2 text-[10px] font-bold">
                        HIGH ALERT
                      </span>
                    )}
                    {item.isControlledDrug && (
                      <span className="rounded bg-red-100 text-red-800 border border-red-300 px-1 py-0.2 text-[10px] font-bold">
                        CD
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    <span>{item.dose} • {item.route} • </span>
                    <strong className="text-slate-800">{item.frequency}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 italic mt-0.5">
                    Directions: {item.directions}
                  </div>
                </div>

                {/* Supply Duration & Quantity */}
                <div className="col-span-2 text-slate-700">
                  <div className="font-bold text-teal-900">{item.supplyDays} Days Supply</div>
                  <div className="text-[11px] text-slate-500">{item.quantityText}</div>
                  <span
                    className={`mt-1 inline-block rounded px-1.5 py-0.2 text-[10px] font-bold ${
                      item.status === 'PHARMACY_APPROVED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {item.status === 'PHARMACY_APPROVED' ? '✓ Pharmacy Approved' : '⏳ Pending Check'}
                  </span>
                </div>

                {/* Action Tag */}
                <div className="col-span-2">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[11px] font-bold ${
                      item.action === 'CONTINUE'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : item.action === 'NEW_MEDICATION'
                        ? 'bg-purple-50 text-purple-800 border border-purple-200'
                        : item.action === 'DOSE_CHANGED'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {item.action.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* GP Instructions */}
                <div className="col-span-3 text-[11px] text-slate-700 pr-2">
                  <p className="bg-slate-50 p-1.5 rounded border border-slate-200 leading-snug">
                    {item.gpActionRequired}
                  </p>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-1.5">
                  {item.status !== 'PHARMACY_APPROVED' && (
                    <button
                      onClick={() => approveDischargeMedication(item.id)}
                      title="Verify and approve for pharmacy dispensing"
                      className="p-1 rounded text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeDischargeMedication(item.id)}
                    title="Remove from discharge list"
                    className="p-1 rounded text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discharge Summary Banner */}
      <div className="rounded-lg bg-teal-900 text-white p-3 flex flex-wrap items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-amber-300" />
          <div>
            <strong className="block font-bold">Electronic TTO Discharge Summary</strong>
            <span className="text-teal-200 text-[11px]">
              Ready for transmission to General Practitioner (GP) via NHS MESH messaging & Community Pharmacy.
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowPrintModal(true)}
          className="flex items-center gap-1.5 rounded bg-teal-800 hover:bg-teal-700 border border-teal-600 px-3 py-1.5 font-bold cursor-pointer transition-colors shadow-xs"
        >
          <Printer className="h-3.5 w-3.5 text-amber-300" />
          <span>Print Discharge Prescription Copy</span>
        </button>
      </div>

      {/* Discharge Printable Prescription Document Modal */}
      {showPrintModal && (
        <DischargePrintModal
          dischargeItems={dischargeMedications}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {/* Add Discharge Drug Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-teal-700" />
              Add Discharge / Take-Home Medication (TTO)
            </h3>

            <form onSubmit={handleAddSubmit} className="mt-3 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Medication Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AMOXICILLIN Capsules 500mg"
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Dose</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500 mg"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Route</label>
                  <select
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                  >
                    <option value="Oral">Oral</option>
                    <option value="Inhaled">Inhaled</option>
                    <option value="Subcutaneous">Subcutaneous</option>
                    <option value="Topical">Topical</option>
                    <option value="Eye Drops">Eye Drops</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Frequency</label>
                <input
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. THREE times a day for 5 days"
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-0.5">Take-Home Directions (Label)</label>
                <input
                  type="text"
                  value={directions}
                  onChange={(e) => setDirections(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Supply Duration</label>
                  <select
                    value={supplyDays}
                    onChange={(e) => {
                      const days = parseInt(e.target.value);
                      setSupplyDays(days);
                      setQuantityText(`${days * 2} Tablets`);
                    }}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                  >
                    <option value={7}>7 Days (Short Course / Analgesia)</option>
                    <option value={14}>14 Days (Standard Hospital Supply)</option>
                    <option value={28}>28 Days (1 Month Supply)</option>
                    <option value={84}>84 Days (3 Months Supply)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-0.5">Clinical Action</label>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value as any)}
                    className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                  >
                    <option value="CONTINUE">CONTINUE (Pre-existing)</option>
                    <option value="NEW_MEDICATION">NEW MEDICATION (Started in hospital)</option>
                    <option value="DOSE_CHANGED">DOSE CHANGED (Modified)</option>
                    <option value="DISCONTINUE_AT_DISCHARGE">DISCONTINUE AT DISCHARGE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-0.5">GP / Primary Care Follow-up Instructions</label>
                <input
                  type="text"
                  value={gpActionRequired}
                  onChange={(e) => setGpActionRequired(e.target.value)}
                  placeholder="e.g. Complete 5-day antibiotic course. Review renal function in 2 weeks."
                  className="w-full rounded border border-slate-300 px-3 py-1.5 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded px-3 py-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-1.5 cursor-pointer shadow-xs"
                >
                  Add to Discharge TTO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
