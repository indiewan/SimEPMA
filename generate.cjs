const fs = require('fs');

const reg = [{label: 'ONCE a day at 08:00', times: ['08:00'], type: 'REGULAR'}];
const regNight = [{label: 'ONCE a day at 22:00', times: ['22:00'], type: 'REGULAR'}];
const bd = [{label: 'TWICE a day (08:00, 20:00)', times: ['08:00', '20:00'], type: 'REGULAR'}];
const tds = [{label: 'THREE times a day', times: ['08:00', '14:00', '20:00'], type: 'REGULAR'}];
const qds = [{label: 'FOUR times a day', times: ['08:00', '12:00', '18:00', '22:00'], type: 'REGULAR'}];
const prn = [{label: 'When required (PRN)', times: ['PRN'], type: 'PRN'}];
const stat = [{label: 'STAT Once Only', times: ['STAT'], type: 'STAT'}];

const bpReq = {type:'BLOOD_PRESSURE', label:'Systolic BP', unit:'mmHg', minNormal:90, warningText:'BP < 90. Risk of hypotension.', hardStop:false};
const hrReq = {type:'PULSE', label:'Heart Rate', unit:'bpm', minNormal:55, warningText:'HR < 55. Risk of bradycardia.', hardStop:false};
const cbgReq = {type:'BLOOD_GLUCOSE', label:'CBG', unit:'mmol/L', minNormal:4.0, warningText:'CBG < 4.0. Treat hypo.', hardStop:true};
const rrReq = {type:'RESP_RATE', label:'Resp Rate', unit:'breaths/min', minNormal:10, warningText:'RR < 10. Risk of respiratory depression.', hardStop:true};
const inrReq = {type:'INR', label:'INR', unit:'Ratio', maxNormal:4.5, warningText:'INR > 4.5. Bleeding risk.', hardStop:false};
const tdmReq = {type:'RENAL_TDM', label:'Trough Level', unit:'mg/L', maxNormal:20, warningText:'Toxic level. Withhold.', hardStop:false};

const makeDrug = (name, gen, chap, forms, str, routes, doses, freq, cd, alert, req, cautions, contra, allergy) => ({
  id: 'bnf-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  name, genericName: gen, bnfChapter: chap,
  standardFormulations: forms, standardStrengths: str, standardRoutes: routes,
  defaultDoses: doses, typicalFrequencies: freq,
  isControlledDrug: cd, isHighAlert: alert, preAdminRequirement: req,
  cautions, contraindications: contra, allergyGroup: allergy
});

const drugs = [
  // A
  makeDrug('AMLODIPINE', 'Amlodipine', '2.6.2 Calcium-channel blockers', ['5mg Tab', '10mg Tab'], ['5mg', '10mg'], ['Oral'], ['5mg', '10mg'], reg, false, false, bpReq, ['Ankle oedema'], []),
  makeDrug('AMOXICILLIN', 'Amoxicillin', '5.1.1 Penicillins', ['500mg Cap', '250mg/5mL Susp'], ['500mg', '250mg'], ['Oral', 'IV'], ['500mg', '1g'], tds, false, false, undefined, ['Rash'], ['Penicillin allergy'], 'PENICILLIN'),
  makeDrug('APIXABAN', 'Apixaban', '2.8.2 DOACs', ['2.5mg Tab', '5mg Tab'], ['2.5mg', '5mg'], ['Oral'], ['5mg', '2.5mg'], bd, false, true, undefined, ['Bleeding risk'], ['Active bleeding']),
  makeDrug('ASPIRIN', 'Aspirin', '2.9 Antiplatelets', ['75mg Tab', '300mg Tab'], ['75mg', '300mg'], ['Oral'], ['75mg'], reg, false, false, undefined, ['GI bleed'], ['Active ulcer'], 'NSAID'),
  makeDrug('ATORVASTATIN', 'Atorvastatin', '2.12 Statins', ['20mg Tab', '40mg Tab', '80mg Tab'], ['20mg', '40mg', '80mg'], ['Oral'], ['20mg', '40mg'], regNight, false, false, undefined, ['Myopathy'], ['Active liver disease']),
  makeDrug('ADRENALINE 1:1000', 'Adrenaline', '3.4.3 Anaphylaxis', ['500mcg/0.5mL IM'], ['500mcg'], ['IM'], ['500mcg'], stat, false, true, undefined, ['Tachycardia'], []),

  // B
  makeDrug('BISOPROLOL', 'Bisoprolol', '2.4 Beta-blockers', ['1.25mg Tab', '2.5mg Tab', '5mg Tab'], ['1.25mg', '2.5mg', '5mg'], ['Oral'], ['2.5mg', '5mg'], reg, false, false, hrReq, ['Masks hypo'], ['Asthma']),
  makeDrug('BUMETANIDE', 'Bumetanide', '2.2.2 Loop diuretics', ['1mg Tab', '5mg Tab'], ['1mg', '5mg'], ['Oral'], ['1mg', '2mg'], reg, false, false, bpReq, ['Hypokalaemia'], ['Anuria']),
  makeDrug('BECLOMETASONE', 'Beclometasone', '3.2 Inhaled steroids', ['100mcg Inhaler', '200mcg Inhaler'], ['100mcg', '200mcg'], ['Inhaled'], ['200mcg', '400mcg'], bd, false, false, undefined, ['Oral thrush'], []),
  makeDrug('BUPRENORPHINE PATCH', 'Buprenorphine', '4.7.2 Opioids', ['5mcg/hr Patch', '10mcg/hr Patch'], ['5mcg/hr', '10mcg/hr'], ['Transdermal'], ['5mcg/hr'], reg, true, true, rrReq, ['Remove old patch'], ['Opioid naive'], 'OPIOID'),

  // C
  makeDrug('CITALOPRAM', 'Citalopram', '4.3.3 SSRIs', ['10mg Tab', '20mg Tab'], ['10mg', '20mg'], ['Oral'], ['20mg', '10mg'], reg, false, false, undefined, ['QT prolongation'], ['Long QT']),
  makeDrug('CLOPIDOGREL', 'Clopidogrel', '2.9 Antiplatelets', ['75mg Tab'], ['75mg'], ['Oral'], ['75mg'], reg, false, false, undefined, ['Bleeding risk'], ['Active bleeding']),
  makeDrug('CODEINE', 'Codeine', '4.7.2 Opioids', ['15mg Tab', '30mg Tab'], ['15mg', '30mg'], ['Oral'], ['30mg'], prn, false, false, rrReq, ['Constipation'], ['Respiratory depression'], 'OPIOID'),
  makeDrug('CO-AMOXICLAV', 'Co-amoxiclav', '5.1.1 Penicillins', ['625mg Tab', '1.2g IV'], ['625mg', '1.2g'], ['Oral', 'IV'], ['625mg', '1.2g'], tds, false, false, undefined, ['Cholestatic jaundice'], ['Penicillin allergy'], 'PENICILLIN'),
  makeDrug('CYCLIZINE', 'Cyclizine', '1.6.1 Antihistamines', ['50mg Tab', '50mg IV'], ['50mg'], ['Oral', 'IV'], ['50mg'], tds, false, false, undefined, ['Urinary retention'], ['Severe heart failure']),

  // D
  makeDrug('DIAZEPAM', 'Diazepam', '4.1.2 Benzodiazepines', ['2mg Tab', '5mg Tab', '10mg PR'], ['2mg', '5mg', '10mg'], ['Oral', 'Rectal', 'IV'], ['5mg', '10mg'], prn, true, false, undefined, ['Sedation'], ['Respiratory depression']),
  makeDrug('DIGOXIN', 'Digoxin', '2.1.1 Cardiac glycosides', ['62.5mcg Tab', '125mcg Tab'], ['62.5mcg', '125mcg'], ['Oral'], ['125mcg'], reg, false, true, hrReq, ['Toxicity in hypokalaemia'], ['Heart block']),
  makeDrug('DOXYCYCLINE', 'Doxycycline', '5.1.3 Tetracyclines', ['100mg Cap'], ['100mg'], ['Oral'], ['100mg', '200mg'], reg, false, false, undefined, ['Oesophagitis - sit upright'], ['Pregnancy']),
  makeDrug('DEXAMETHASONE', 'Dexamethasone', '6.3.2 Corticosteroids', ['2mg Tab', '4mg Tab', '6mg IV'], ['2mg', '4mg', '6mg'], ['Oral', 'IV'], ['4mg', '6mg'], reg, false, false, undefined, ['Hyperglycaemia'], ['Systemic infection']),

  // E
  makeDrug('ENOXAPARIN', 'Enoxaparin', '2.8.1 LMWH', ['20mg SC', '40mg SC', '80mg SC'], ['40mg', '80mg'], ['SC'], ['40mg'], regNight, false, true, undefined, ['Reduce dose in CKD'], ['Bleeding']),
  makeDrug('EMPAGLIFLOZIN', 'Empagliflozin', '6.1.2.3 SGLT2i', ['10mg Tab', '25mg Tab'], ['10mg', '25mg'], ['Oral'], ['10mg'], reg, false, false, undefined, ['Euglycaemic DKA risk'], []),
  makeDrug('ERYTHROMYCIN', 'Erythromycin', '5.1.5 Macrolides', ['250mg Tab', '500mg Tab'], ['250mg', '500mg'], ['Oral'], ['500mg'], qds, false, false, undefined, ['CYP3A4 inhibitor'], ['QT prolongation'], 'MACROLIDE'),
  makeDrug('ESOMEPRAZOLE', 'Esomeprazole', '1.3.5 PPIs', ['20mg Cap', '40mg Cap'], ['20mg', '40mg'], ['Oral', 'IV'], ['40mg'], reg, false, false, undefined, ['Masks gastric cancer'], []),

  // F
  makeDrug('FUROSEMIDE', 'Furosemide', '2.2.2 Loop diuretics', ['20mg Tab', '40mg Tab', '40mg IV'], ['20mg', '40mg'], ['Oral', 'IV'], ['40mg', '80mg'], reg, false, false, bpReq, ['Hypokalaemia'], ['Anuria']),
  makeDrug('FLUCLOXACILLIN', 'Flucloxacillin', '5.1.1 Penicillins', ['500mg Cap', '1g IV'], ['500mg', '1g'], ['Oral', 'IV'], ['500mg', '1g'], qds, false, false, undefined, ['Take on empty stomach'], ['Penicillin allergy'], 'PENICILLIN'),
  makeDrug('FLUOXETINE', 'Fluoxetine', '4.3.3 SSRIs', ['20mg Cap', '40mg Cap'], ['20mg', '40mg'], ['Oral'], ['20mg'], reg, false, false, undefined, ['Insomnia'], []),
  makeDrug('FENTANYL PATCH', 'Fentanyl', '4.7.2 Opioids', ['12mcg/hr Patch', '25mcg/hr Patch'], ['12mcg', '25mcg'], ['Transdermal'], ['12mcg/hr'], reg, true, true, rrReq, ['Remove old patch'], ['Opioid naive'], 'OPIOID'),

  // G
  makeDrug('GLICLAZIDE', 'Gliclazide', '6.1.2.1 Sulfonylureas', ['40mg Tab', '80mg Tab'], ['40mg', '80mg'], ['Oral'], ['40mg', '80mg'], reg, false, false, cbgReq, ['Hypoglycaemia risk'], ['Type 1 Diabetes']),
  makeDrug('GENTAMICIN', 'Gentamicin', '5.1.4 Aminoglycosides', ['80mg/2mL IV', '5mg/kg IV'], ['80mg', '5mg/kg'], ['IV'], ['5mg/kg'], stat, false, true, tdmReq, ['Ototoxicity', 'Nephrotoxicity'], []),
  makeDrug('GABAPENTIN', 'Gabapentin', '4.8.1 Antiepileptics', ['100mg Cap', '300mg Cap'], ['100mg', '300mg'], ['Oral'], ['300mg'], tds, false, false, undefined, ['Sedation'], []),
  makeDrug('GLYCERYL TRINITRATE', 'GTN', '2.6.1 Nitrates', ['400mcg Spray'], ['400mcg'], ['Sublingual'], ['2 sprays'], prn, false, false, bpReq, ['Headache', 'Hypotension'], ['Sildenafil use']),

  // H
  makeDrug('HALOPERIDOL', 'Haloperidol', '4.2.1 Antipsychotics', ['500mcg Tab', '5mg IM'], ['500mcg', '5mg'], ['Oral', 'IM'], ['500mcg'], prn, false, true, undefined, ['QT prolongation'], ['Parkinson disease']),
  makeDrug('HYDROCORTISONE', 'Hydrocortisone', '6.3.2 Corticosteroids', ['10mg Tab', '100mg IV'], ['10mg', '100mg'], ['Oral', 'IV'], ['10mg', '100mg'], tds, false, true, undefined, ['Sick day rules'], []),
  makeDrug('HEPARIN (UNFRACTIONATED)', 'Heparin', '2.8.1 Anticoagulants', ['5000 units SC'], ['5000 units'], ['SC', 'IV'], ['5000 units'], bd, false, true, undefined, ['HIT risk'], ['Active bleeding']),

  // I
  makeDrug('IBUPROFEN', 'Ibuprofen', '4.7.1 NSAIDs', ['200mg Tab', '400mg Tab'], ['200mg', '400mg'], ['Oral'], ['400mg'], tds, false, false, undefined, ['Take with food', 'AKI risk'], ['Peptic ulcer'], 'NSAID'),
  makeDrug('IPRATROPIUM', 'Ipratropium', '3.1.2 Antimuscarinics', ['500mcg Nebules'], ['500mcg'], ['Nebulised'], ['500mcg'], qds, false, false, undefined, ['Glaucoma risk'], []),
  makeDrug('INSULIN LISPRO', 'Insulin Lispro (Humalog)', '6.1.1 Insulins', ['100 units/mL Pen'], ['100 units/mL'], ['SC'], ['6 units'], tds, false, true, cbgReq, ['Time critical with meals'], ['Hypoglycaemia']),

  // K
  makeDrug('KETAMINE', 'Ketamine', '15.1.1 Anaesthetics', ['50mg/mL IV'], ['50mg/mL'], ['IV', 'IM'], ['0.5mg/kg'], stat, true, true, undefined, ['Emergence delirium'], ['Raised ICP']),
  makeDrug('KETOROLAC', 'Ketorolac', '4.7.1 NSAIDs', ['30mg IV/IM'], ['30mg'], ['IV', 'IM'], ['30mg'], tds, false, false, undefined, ['Max 2 days use'], ['Renal impairment'], 'NSAID'),

  // L
  makeDrug('LANSOPRAZOLE', 'Lansoprazole', '1.3.5 PPIs', ['15mg Cap', '30mg Cap'], ['15mg', '30mg'], ['Oral'], ['30mg'], reg, false, false, undefined, ['Safe with Clopidogrel'], []),
  makeDrug('LEVOTHYROXINE', 'Levothyroxine', '6.2.1 Thyroid hormones', ['25mcg Tab', '50mcg Tab', '100mcg Tab'], ['25mcg', '50mcg', '100mcg'], ['Oral'], ['100mcg'], reg, false, false, undefined, ['Empty stomach'], ['Thyrotoxicosis']),
  makeDrug('LORAZEPAM', 'Lorazepam', '4.1.2 Benzodiazepines', ['1mg Tab', '4mg IV'], ['1mg', '4mg'], ['Oral', 'IV'], ['1mg'], prn, true, true, undefined, ['Status epilepticus'], ['Respiratory depression']),
  makeDrug('LOPERAMIDE', 'Loperamide', '1.7.2 Antimotility', ['2mg Cap'], ['2mg'], ['Oral'], ['2mg', '4mg'], prn, false, false, undefined, ['Cardiac arrhythmias in OD'], ['Active colitis']),

  // M
  makeDrug('METFORMIN', 'Metformin', '6.1.2.2 Biguanides', ['500mg Tab', '1g Tab'], ['500mg', '1g'], ['Oral'], ['500mg', '1g'], bd, false, false, undefined, ['Withhold in AKI'], ['eGFR < 30']),
  makeDrug('MORPHINE SULFATE', 'Morphine', '4.7.2 Opioids', ['10mg/5mL Liquid', '10mg IV'], ['10mg', '10mg/5mL'], ['Oral', 'IV', 'SC'], ['5mg', '10mg'], prn, true, true, rrReq, ['Constipation'], ['Respiratory depression'], 'OPIOID'),
  makeDrug('MACROGOL (MOVICOL)', 'Macrogol', '1.8.4 Laxatives', ['13.8g Sachet'], ['1 Sachet'], ['Oral'], ['1 Sachet', '2 Sachets'], bd, false, false, undefined, ['Hydration'], ['Obstruction']),
  makeDrug('METOCLOPRAMIDE', 'Metoclopramide', '1.6.4 Antiemetics', ['10mg Tab', '10mg IV'], ['10mg'], ['Oral', 'IV'], ['10mg'], tds, false, false, undefined, ['EPSE risk'], ['Parkinson disease']),

  // N
  makeDrug('NAPROXEN', 'Naproxen', '4.7.1 NSAIDs', ['250mg Tab', '500mg Tab'], ['250mg', '500mg'], ['Oral'], ['500mg'], bd, false, false, undefined, ['Lowest CV risk NSAID'], ['Peptic ulcer'], 'NSAID'),
  makeDrug('NALOXONE', 'Naloxone', '4.7.2 Opioid antagonists', ['400mcg IV'], ['400mcg'], ['IV', 'IM'], ['400mcg'], stat, false, true, undefined, ['Short half life'], []),
  makeDrug('NITROFURANTOIN', 'Nitrofurantoin', '5.1.13 Antibacterials', ['50mg Cap', '100mg M/R'], ['50mg', '100mg'], ['Oral'], ['100mg', '50mg'], bd, false, false, undefined, ['Ineffective in renal failure'], ['eGFR < 45']),
  makeDrug('NIFEDIPINE', 'Nifedipine', '2.6.2 Calcium-channel blockers', ['5mg Cap', '30mg M/R Tab'], ['5mg', '30mg'], ['Oral'], ['30mg'], reg, false, false, bpReq, ['Flushing'], ['Cardiogenic shock']),

  // O
  makeDrug('OMEPRAZOLE', 'Omeprazole', '1.3.5 PPIs', ['20mg Cap', '40mg Cap'], ['20mg', '40mg'], ['Oral', 'IV'], ['20mg', '40mg'], reg, false, false, undefined, ['Masks gastric cancer'], []),
  makeDrug('ONDANSETRON', 'Ondansetron', '1.6.2 Antiemetics', ['4mg Tab', '4mg IV'], ['4mg', '8mg'], ['Oral', 'IV'], ['4mg'], tds, false, false, undefined, ['QT prolongation'], ['Long QT syndrome']),
  makeDrug('OXYCODONE', 'Oxycodone', '4.7.2 Opioids', ['5mg Cap', '10mg M/R'], ['5mg', '10mg'], ['Oral', 'SC'], ['5mg'], prn, true, true, rrReq, ['2x potent as morphine'], ['Resp depression'], 'OPIOID'),
  makeDrug('OLANZAPINE', 'Olanzapine', '4.2.1 Antipsychotics', ['5mg Tab', '10mg Tab'], ['5mg', '10mg'], ['Oral', 'IM'], ['5mg', '10mg'], regNight, false, false, undefined, ['Weight gain'], []),

  // P
  makeDrug('PARACETAMOL', 'Paracetamol', '4.7.1 Analgesics', ['500mg Tab', '1g IV'], ['500mg', '1g'], ['Oral', 'IV'], ['1g'], qds, false, false, undefined, ['Max 4g/day'], ['Liver failure']),
  makeDrug('PANTOPRAZOLE', 'Pantoprazole', '1.3.5 PPIs', ['40mg Tab', '40mg IV'], ['40mg'], ['Oral', 'IV'], ['40mg'], reg, false, false, undefined, ['Reconstitute in Saline'], []),
  makeDrug('PREDNISOLONE', 'Prednisolone', '6.3.2 Corticosteroids', ['5mg Tab', '20mg Tab'], ['5mg', '20mg'], ['Oral'], ['40mg'], reg, false, false, undefined, ['Take in morning'], []),
  makeDrug('PIPERACILLIN/TAZOBACTAM', 'Tazocin', '5.1.1 Penicillins', ['4.5g IV'], ['4.5g'], ['IV'], ['4.5g'], tds, false, true, undefined, ['Broad spectrum'], ['Penicillin allergy'], 'PENICILLIN'),

  // Q
  makeDrug('QUETIAPINE', 'Quetiapine', '4.2.1 Antipsychotics', ['25mg Tab', '100mg Tab'], ['25mg', '100mg'], ['Oral'], ['25mg', '100mg'], bd, false, false, undefined, ['Sedation'], []),
  makeDrug('QUININE', 'Quinine Sulfate', '5.4.1 Antimalarials', ['300mg Tab'], ['300mg'], ['Oral'], ['300mg'], regNight, false, false, undefined, ['Tinnitus'], ['Optic neuritis']),

  // R
  makeDrug('RAMIPRIL', 'Ramipril', '2.5.5.1 ACEi', ['2.5mg Cap', '5mg Cap'], ['2.5mg', '5mg'], ['Oral'], ['2.5mg', '5mg'], reg, false, false, bpReq, ['Dry cough'], ['Angioedema']),
  makeDrug('RIVAROXABAN', 'Rivaroxaban', '2.8.2 DOACs', ['15mg Tab', '20mg Tab'], ['15mg', '20mg'], ['Oral'], ['20mg'], reg, false, true, undefined, ['Take with food'], ['Active bleeding']),
  makeDrug('RISPERIDONE', 'Risperidone', '4.2.1 Antipsychotics', ['1mg Tab', '2mg Tab'], ['1mg', '2mg'], ['Oral'], ['1mg'], reg, false, false, undefined, ['Hyperprolactinaemia'], []),

  // S
  makeDrug('SALBUTAMOL', 'Salbutamol', '3.1.1 SABA', ['100mcg Inhaler', '2.5mg Nebules'], ['100mcg', '2.5mg'], ['Inhaled', 'Nebulised'], ['2 puffs', '2.5mg'], prn, false, false, undefined, ['Tremor'], []),
  makeDrug('SENNA', 'Senna', '1.8.1 Laxatives', ['7.5mg Tab'], ['7.5mg', '15mg'], ['Oral'], ['15mg'], regNight, false, false, undefined, ['Abdominal cramps'], ['Obstruction']),
  makeDrug('SERTRALINE', 'Sertraline', '4.3.3 SSRIs', ['50mg Tab', '100mg Tab'], ['50mg', '100mg'], ['Oral'], ['50mg', '100mg'], reg, false, false, undefined, ['GI bleed risk'], []),
  makeDrug('SPIRONOLACTONE', 'Spironolactone', '2.2.3 Diuretics', ['25mg Tab', '50mg Tab'], ['25mg', '50mg'], ['Oral'], ['25mg', '50mg'], reg, false, true, undefined, ['Hyperkalaemia'], ['K > 5.0']),
  makeDrug('SIMVASTATIN', 'Simvastatin', '2.12 Statins', ['20mg Tab', '40mg Tab'], ['20mg', '40mg'], ['Oral'], ['40mg'], regNight, false, false, undefined, ['Myopathy', 'Macrolide interaction'], ['Liver disease']),

  // T
  makeDrug('TIOTROPIUM', 'Tiotropium', '3.1.2 LAMA', ['18mcg Cap (Inhaled)'], ['18mcg'], ['Inhaled'], ['18mcg'], reg, false, false, undefined, ['Do not swallow capsule'], []),
  makeDrug('TRAMADOL', 'Tramadol', '4.7.2 Opioids', ['50mg Cap'], ['50mg'], ['Oral'], ['50mg', '100mg'], prn, true, true, rrReq, ['Lowers seizure threshold'], ['Uncontrolled epilepsy'], 'OPIOID'),
  makeDrug('TRIMETHOPRIM', 'Trimethoprim', '5.1.8 Antibacterials', ['200mg Tab'], ['200mg'], ['Oral'], ['200mg'], bd, false, false, undefined, ['Raises potassium'], ['Pregnancy 1st trimester']),
  makeDrug('TAZOCIN', 'Tazocin (Pip/Taz)', '5.1.1 Penicillins', ['4.5g IV'], ['4.5g'], ['IV'], ['4.5g'], tds, false, true, undefined, ['Broad spectrum'], ['Penicillin allergy'], 'PENICILLIN'),

  // U
  makeDrug('URSODEOXYCHOLIC ACID', 'Ursodeoxycholic Acid', '1.9.1 Biliary', ['250mg Cap', '500mg Tab'], ['250mg', '500mg'], ['Oral'], ['250mg', '500mg'], bd, false, false, undefined, ['Monitor LFTs'], ['Acute cholecystitis']),

  // V
  makeDrug('VANCOMYCIN', 'Vancomycin', '5.1.7 Glycopeptides', ['1g IV', '125mg Cap'], ['1g', '125mg'], ['IV', 'Oral'], ['1g IV', '125mg Oral'], bd, false, true, tdmReq, ['Red man syndrome (infuse slowly)'], []),
  makeDrug('VALSARTAN', 'Valsartan', '2.5.5.2 ARBs', ['40mg Tab', '80mg Tab'], ['40mg', '80mg'], ['Oral'], ['40mg', '80mg'], reg, false, false, bpReq, ['Hyperkalaemia'], ['Pregnancy']),

  // W
  makeDrug('WARFARIN', 'Warfarin', '2.8.2 Anticoagulants', ['1mg Tab', '3mg Tab', '5mg Tab'], ['1mg', '3mg', '5mg'], ['Oral'], ['Variable'], regNight, false, true, inrReq, ['Check INR'], ['Active bleeding']),

  // X
  makeDrug('XYLOMETAZOLINE', 'Xylometazoline', '12.2.2 Decongestants', ['0.1% Nasal Spray'], ['0.1%'], ['Intranasal'], ['1 spray'], prn, false, false, undefined, ['Rebound congestion (>7 days)'], []),

  // Z
  makeDrug('ZOPICLONE', 'Zopiclone', '4.1.1 Hypnotics', ['3.75mg Tab', '7.5mg Tab'], ['3.75mg', '7.5mg'], ['Oral'], ['7.5mg'], regNight, true, false, undefined, ['Bitter taste', 'Max 4 weeks'], ['Respiratory depression']),
  makeDrug('ZINC SULFATE', 'Zinc Sulfate', '9.5.4 Minerals', ['220mg Cap (50mg Zinc)'], ['220mg'], ['Oral'], ['220mg'], tds, false, false, undefined, ['Take with food'], [])
];

const fileContent = `import { BNFFormularyItem } from '../types/epma';

export const BNF_FORMULARY: BNFFormularyItem[] = ${JSON.stringify(drugs, null, 2)};

export function findBNFDrug(nameOrId: string): BNFFormularyItem | undefined {
  const query = nameOrId.toLowerCase().trim();
  return BNF_FORMULARY.find(d => 
    d.id.toLowerCase() === query || 
    d.name.toLowerCase() === query || 
    d.genericName.toLowerCase() === query || 
    d.name.toLowerCase().includes(query) || 
    d.genericName.toLowerCase().includes(query)
  );
}

export function searchBNFFormulary(keyword: string): BNFFormularyItem[] {
  if (!keyword || keyword.trim() === '') return BNF_FORMULARY;
  const q = keyword.toLowerCase().trim();
  return BNF_FORMULARY.filter(item => 
    item.name.toLowerCase().includes(q) || 
    item.genericName.toLowerCase().includes(q) || 
    item.bnfChapter.toLowerCase().includes(q) || 
    (item.cautions && item.cautions.some(c => c.toLowerCase().includes(q))) || 
    (item.contraindications && item.contraindications.some(ci => ci.toLowerCase().includes(q)))
  );
}
`;

fs.writeFileSync('src/data/bnfFormulary.ts', fileContent);
