const fs = require('fs');

const reg = [{label: 'ONCE a day at 08:00', times: ['08:00'], type: 'REGULAR'}];
const bd = [{label: 'TWICE a day (08:00, 20:00)', times: ['08:00', '20:00'], type: 'REGULAR'}];
const tds = [{label: 'THREE times a day', times: ['08:00', '14:00', '20:00'], type: 'REGULAR'}];
const qds = [{label: 'FOUR times a day', times: ['08:00', '12:00', '18:00', '22:00'], type: 'REGULAR'}];
const prn = [{label: 'When required (PRN)', times: ['PRN'], type: 'PRN'}];
const stat = [{label: 'STAT Once Only', times: ['STAT'], type: 'STAT'}];
const cont = [{label: 'CONTINUOUS IV Infusion', times: ['CONTINUOUS'], type: 'REGULAR'}];

const bpReq = {type:'BLOOD_PRESSURE', label:'Systolic BP', unit:'mmHg', minNormal:90, warningText:'BP < 90. Risk of hypotension.', hardStop:false};
const hrReq = {type:'PULSE', label:'Heart Rate', unit:'bpm', minNormal:55, warningText:'HR < 55. Risk of bradycardia.', hardStop:false};
const rrReq = {type:'RESP_RATE', label:'Resp Rate', unit:'breaths/min', minNormal:10, warningText:'RR < 10. Risk of respiratory depression.', hardStop:true};

const makeDrug = (name, gen, chap, forms, str, routes, doses, freq, cd, alert, req, cautions, contra, allergy) => ({
  id: 'bnf-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  name, genericName: gen, bnfChapter: chap,
  standardFormulations: forms, standardStrengths: str, standardRoutes: routes,
  defaultDoses: doses, typicalFrequencies: freq,
  isControlledDrug: cd, isHighAlert: alert, preAdminRequirement: req,
  cautions, contraindications: contra, allergyGroup: allergy
});

const newDrugs = [
  makeDrug('HYDROMORPHONE', 'Hydromorphone', '4.7.2 Opioids', ['2mg Tab', '2mg/1mL IV'], ['2mg'], ['Oral', 'IV', 'SC'], ['1mg', '2mg'], prn, true, true, rrReq, ['Highly potent opioid'], ['Respiratory depression'], 'OPIOID'),
  makeDrug('CEFEPIME', 'Cefepime', '5.1.2 Cephalosporins', ['1g IV', '2g IV'], ['1g', '2g'], ['IV'], ['1g', '2g'], bd, false, true, undefined, ['Neurotoxicity in renal failure'], ['Cephalosporin allergy']),
  makeDrug('METOPROLOL', 'Metoprolol', '2.4 Beta-blockers', ['50mg Tab', '100mg Tab', '5mg/5mL IV'], ['50mg', '100mg', '5mg'], ['Oral', 'IV'], ['50mg'], bd, false, false, hrReq, ['Masks hypoglycaemia'], ['Asthma', 'Heart block']),
  makeDrug('LISINOPRIL', 'Lisinopril', '2.5.5.1 ACEi', ['5mg Tab', '10mg Tab', '20mg Tab'], ['5mg', '10mg', '20mg'], ['Oral'], ['10mg'], reg, false, false, bpReq, ['Dry cough', 'Hyperkalaemia'], ['Angioedema']),
  makeDrug('PREDNISONE', 'Prednisone', '6.3.2 Corticosteroids', ['5mg Tab', '10mg Tab', '20mg Tab'], ['5mg', '10mg', '20mg'], ['Oral'], ['40mg'], reg, false, false, undefined, ['Hyperglycaemia'], ['Systemic fungal infection']),
  makeDrug('METHYLPREDNISOLONE', 'Methylprednisolone', '6.3.2 Corticosteroids', ['40mg IV', '125mg IV', '500mg IV'], ['40mg', '125mg', '500mg'], ['IV'], ['40mg', '125mg'], reg, false, false, undefined, ['Rapid IV push can cause arrhythmias'], []),
  makeDrug('PROPOFOL', 'Propofol', '15.1.1 Intravenous anaesthetics', ['1% (10mg/mL) IV', '2% (20mg/mL) IV'], ['10mg/mL', '20mg/mL'], ['IV'], ['10-50mg/hr (Infusion)', '1-2mg/kg (Induction)'], cont, false, true, rrReq, ['Propofol infusion syndrome', 'Respiratory depression'], ['Egg/soy allergy']),
  makeDrug('DEXMEDETOMIDINE', 'Dexmedetomidine', '15.1.4 Sedatives', ['100mcg/mL IV'], ['100mcg/mL'], ['IV'], ['0.2-1.4mcg/kg/hr'], cont, false, true, hrReq, ['Bradycardia', 'Hypotension'], ['Advanced heart block']),
  makeDrug('SODIUM CHLORIDE 0.9%', 'Sodium Chloride', '9.2.2 IV Fluids', ['500mL Bag', '1000mL Bag'], ['0.9%'], ['IV'], ['500mL', '1000mL'], stat, false, false, undefined, ['Fluid overload', 'Hyperchloraemic acidosis'], ['Pulmonary oedema']),
  makeDrug('LACTATED RINGERS (HARTMANNS)', 'Compound Sodium Lactate', '9.2.2 IV Fluids', ['500mL Bag', '1000mL Bag'], ['Compound'], ['IV'], ['500mL', '1000mL'], stat, false, false, undefined, ['Contains potassium (caution in renal failure)'], ['Severe hyperkalaemia']),
  makeDrug('DEXTROSE 5% (GLUCOSE 5%)', 'Glucose', '9.2.2 IV Fluids', ['500mL Bag', '1000mL Bag'], ['5%'], ['IV'], ['500mL', '1000mL'], stat, false, false, undefined, ['Hyponatraemia if given excessively without sodium'], ['Water intoxication']),
  makeDrug('NOREPINEPHRINE (LEVOPHED)', 'Noradrenaline', '2.7.3 Vasopressors', ['4mg/4mL Ampoule', '8mg/8mL Ampoule'], ['1mg/mL'], ['IV (Central Line Only)'], ['0.01-3mcg/kg/min'], cont, false, true, bpReq, ['Tissue necrosis if extravasation occurs (Requires Central Line)'], ['Hypovolaemia (uncorrected)']),
  makeDrug('NICARDIPINE', 'Nicardipine', '2.6.2 Calcium-channel blockers', ['10mg/10mL Ampoule'], ['1mg/mL'], ['IV'], ['5-15mg/hr (Infusion)'], cont, false, true, bpReq, ['Reflex tachycardia'], ['Advanced aortic stenosis'])
];

const bnfPath = 'src/data/bnfFormulary.ts';
let content = fs.readFileSync(bnfPath, 'utf8');

const searchStr = '];\n\nexport function findBNFDrug';
if (content.includes(searchStr)) {
  const replacement = ',\n' + newDrugs.map(d => '  ' + JSON.stringify(d)).join(',\n') + '\n' + searchStr;
  content = content.replace(searchStr, replacement);
  fs.writeFileSync(bnfPath, content);
  console.log('Added ' + newDrugs.length + ' missing checklist drugs.');
} else {
  console.error('Could not find injection point');
}
