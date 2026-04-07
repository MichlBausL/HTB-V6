'use client';

import { useState } from 'react';
import { CheckCircle, Send, Loader2, ArrowRight, ArrowLeft, Circle } from 'lucide-react';

type HeizungsTyp = '' | 'oel' | 'gas' | 'nachtspeicher' | 'holz' | 'pellets';
type NeuesSystem = '' | 'waermepumpe' | 'pellets' | 'holz' | 'hybrid';
type PVStatus = '' | 'vorhanden' | 'geplant' | 'nicht_vorhanden';
type EAutoStatus = '' | 'vorhanden' | 'geplant' | 'nicht_vorhanden';
type KontaktArt = '' | 'telefon' | 'email';

const STEPS = [
  'Heizung',
  'Hausdaten',
  'Neues System',
  'PV & E-Auto',
  'Kontaktdaten',
  'Objektadresse',
  'Kontaktpräferenz',
];

export default function BeratungPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Kundendaten
  const [name, setName] = useState('');
  const [strasse, setStrasse] = useState('');
  const [plzOrt, setPlzOrt] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');

  // Beratungsobjekt
  const [gleicheAdresse, setGleicheAdresse] = useState(true);
  const [objektStrasse, setObjektStrasse] = useState('');
  const [objektPlzOrt, setObjektPlzOrt] = useState('');

  // Heizung
  const [heizungsTyp, setHeizungsTyp] = useState<HeizungsTyp>('');
  const [verbrauchOel, setVerbrauchOel] = useState('');
  const [verbrauchGasM3, setVerbrauchGasM3] = useState('');
  const [verbrauchGasLiter, setVerbrauchGasLiter] = useState('');
  const [verbrauchNachtspeicher, setVerbrauchNachtspeicher] = useState('');
  const [verbrauchHolz, setVerbrauchHolz] = useState('');
  const [holzArt, setHolzArt] = useState('');
  const [verbrauchPellets, setVerbrauchPellets] = useState('');

  // Hausdaten
  const [personenAnzahl, setPersonenAnzahl] = useState('');
  const [wohnflaeche, setWohnflaeche] = useState('');
  const [baujahr, setBaujahr] = useState('');

  // Neues Heizsystem
  const [neuesSystem, setNeuesSystem] = useState<NeuesSystem>('');

  // PV
  const [pvStatus, setPvStatus] = useState<PVStatus>('');
  const [stromspeicherVorhanden, setStromspeicherVorhanden] = useState(false);
  const [eegAblauf, setEegAblauf] = useState('');
  const [pvInteresse, setPvInteresse] = useState(false);

  // E-Auto
  const [eAutoStatus, setEAutoStatus] = useState<EAutoStatus>('');
  const [wallboxInteresse, setWallboxInteresse] = useState(false);

  // Kontakt
  const [kontaktArt, setKontaktArt] = useState<KontaktArt>('');
  const [erreichbarkeit, setErreichbarkeit] = useState('');

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 4:
        return name && strasse && plzOrt && email && telefon;
      case 5:
        return gleicheAdresse || (objektStrasse && objektPlzOrt);
      default:
        return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Erstelle E-Mail-Body
    let body = `BERATUNGSGUTSCHEIN ANFRAGE\n\n`;
    body += `=== KONTAKTDATEN ===\n`;
    body += `Name: ${name}\n`;
    body += `Adresse: ${strasse}, ${plzOrt}\n`;
    body += `Telefon: ${telefon}\n`;
    body += `E-Mail: ${email}\n\n`;
    
    body += `=== BERATUNGSOBJEKT ===\n`;
    if (gleicheAdresse) {
      body += `Identisch mit Kundenadresse\n\n`;
    } else {
      body += `Adresse: ${objektStrasse}, ${objektPlzOrt}\n\n`;
    }
    
    body += `=== BESTEHENDE HEIZUNG ===\n`;
    body += `Heizungstyp: ${heizungsTyp}\n`;
    if (heizungsTyp === 'Öl' && verbrauchOel) body += `Ölverbrauch: ${verbrauchOel} Liter/Jahr\n`;
    if (heizungsTyp === 'Gas' && verbrauchGasM3) body += `Gasverbrauch: ${verbrauchGasM3} m³/Jahr\n`;
    if (heizungsTyp === 'Gas' && verbrauchGasLiter) body += `Flüssiggasverbrauch: ${verbrauchGasLiter} Liter/Jahr\n`;
    if (heizungsTyp === 'Nachtspeicher' && verbrauchNachtspeicher) body += `Stromverbrauch: ${verbrauchNachtspeicher} kWh/Jahr\n`;
    if (heizungsTyp === 'Holz') {
      if (verbrauchHolz) body += `Holzverbrauch: ${verbrauchHolz} Ster/Jahr\n`;
      if (holzArt) body += `Holzart: ${holzArt}\n`;
    }
    if (heizungsTyp === 'Pellets' && verbrauchPellets) body += `Pelletverbrauch: ${verbrauchPellets} Tonnen/Jahr\n`;
    body += `\n`;
    
    body += `=== HAUSDATEN ===\n`;
    body += `Bewohner: ${personenAnzahl}\n`;
    body += `Wohnfläche: ${wohnflaeche} m²\n`;
    body += `Baujahr: ${baujahr}\n\n`;
    
    body += `=== INTERESSE AN ===\n`;
    body += neuesSystem.join(', ') + '\n\n';
    
    body += `=== PHOTOVOLTAIK ===\n`;
    body += `PV vorhanden: ${pvStatus}\n`;
    if (pvStatus === 'Ja' && stromspeicherVorhanden) body += `Stromspeicher: ${stromspeicherVorhanden}\n`;
    if (pvStatus === 'Ja' && eegAblauf) body += `EEG-Vergütung endet: ${eegAblauf}\n`;
    if (pvStatus === 'Nein' && pvInteresse) body += `Interesse an PV: ${pvInteresse}\n`;
    body += `\n`;
    
    body += `=== E-MOBILITÄT ===\n`;
    body += `E-Auto vorhanden: ${eAutoStatus}\n`;
    if (wallboxInteresse) body += `Interesse an Wallbox: ${wallboxInteresse}\n`;
    body += `\n`;
    
    body += `=== KONTAKTPRÄFERENZ ===\n`;
    body += `Bevorzugt: ${kontaktArt}\n`;
    if (erreichbarkeit) body += `Erreichbarkeit: ${erreichbarkeit}\n`;

    const subject = `Beratungsgutschein Anfrage - ${name}`;
    const mailtoLink = `mailto:info@haustechnik-bielmeier.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-14 h-14 text-brand-green" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Vielen Dank!</h1>
            <p className="text-2xl text-gray-600 leading-relaxed mb-6">
              Ihr E-Mail-Programm sollte sich geöffnet haben.<br />
              Bitte senden Sie die E-Mail ab, um Ihre Anfrage zu übermitteln.
            </p>
            <p className="text-lg text-gray-500">
              Falls sich kein E-Mail-Programm geöffnet hat, senden Sie Ihre Anfrage bitte direkt an:<br/>
              <a href="mailto:info@haustechnik-bielmeier.de" className="text-brand-green font-semibold">
                info@haustechnik-bielmeier.de
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-5 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 outline-none transition-all";
  const labelClass = "block text-xl font-semibold text-gray-800 mb-3";
  const radioClass = "w-6 h-6 text-brand-green border-2 border-gray-400 focus:ring-brand-green focus:ring-4";
  const checkboxClass = "w-7 h-7 text-brand-green border-2 border-gray-400 rounded focus:ring-brand-green focus:ring-4";
  const sectionClass = "bg-white rounded-2xl shadow-lg p-8";
  const headingClass = "text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-brand-green";

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className={sectionClass}>
            <h2 className={headingClass}>Ihre bisherige Heizung</h2>
            <p className="text-lg text-gray-600 mb-6">Welches Heizsystem ist derzeit vorhanden?</p>
            <div className="space-y-4 mb-8">
              {[
                { value: 'oel', label: 'Öl-Heizung' },
                { value: 'gas', label: 'Gas-Heizung' },
                { value: 'nachtspeicher', label: 'Nachtspeicheröfen' },
                { value: 'holz', label: 'Holzheizung' },
                { value: 'pellets', label: 'Pelletheizung' },
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="radio"
                    name="heizungsTyp"
                    value={option.value}
                    checked={heizungsTyp === option.value}
                    onChange={(e) => setHeizungsTyp(e.target.value as HeizungsTyp)}
                    className={radioClass}
                  />
                  <span className="text-xl text-gray-800">{option.label}</span>
                </label>
              ))}
            </div>

            {heizungsTyp && (
              <div className="pt-6 border-t-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ihr bisheriger Jahresverbrauch</h3>
                {heizungsTyp === 'oel' && (
                  <div>
                    <label className={labelClass}>Verbrauch in Liter Heizöl pro Jahr</label>
                    <input
                      type="number"
                      value={verbrauchOel}
                      onChange={(e) => setVerbrauchOel(e.target.value)}
                      className={inputClass}
                      placeholder="z.B. 3000"
                    />
                  </div>
                )}
                {heizungsTyp === 'gas' && (
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Verbrauch in m³ Erdgas pro Jahr</label>
                      <input
                        type="number"
                        value={verbrauchGasM3}
                        onChange={(e) => setVerbrauchGasM3(e.target.value)}
                        className={inputClass}
                        placeholder="z.B. 2500"
                      />
                    </div>
                    <p className="text-xl text-gray-600 text-center">— oder —</p>
                    <div>
                      <label className={labelClass}>Verbrauch in Liter Flüssiggas pro Jahr</label>
                      <input
                        type="number"
                        value={verbrauchGasLiter}
                        onChange={(e) => setVerbrauchGasLiter(e.target.value)}
                        className={inputClass}
                        placeholder="z.B. 1500"
                      />
                    </div>
                  </div>
                )}
                {heizungsTyp === 'nachtspeicher' && (
                  <div>
                    <label className={labelClass}>Verbrauch in kWh Heizstrom pro Jahr</label>
                    <input
                      type="number"
                      value={verbrauchNachtspeicher}
                      onChange={(e) => setVerbrauchNachtspeicher(e.target.value)}
                      className={inputClass}
                      placeholder="z.B. 15000"
                    />
                  </div>
                )}
                {heizungsTyp === 'holz' && (
                  <div className="space-y-6">
                    <div>
                      <label className={labelClass}>Verbrauch in Ster Holz pro Jahr</label>
                      <input
                        type="number"
                        value={verbrauchHolz}
                        onChange={(e) => setVerbrauchHolz(e.target.value)}
                        className={inputClass}
                        placeholder="z.B. 15"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Art des Holzes</label>
                      <div className="flex space-x-6 mt-3">
                        <label className="flex items-center space-x-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex-1">
                          <input
                            type="radio"
                            name="holzArt"
                            value="weichholz"
                            checked={holzArt === 'weichholz'}
                            onChange={(e) => setHolzArt(e.target.value)}
                            className={radioClass}
                          />
                          <span className="text-xl text-gray-800">Weichholz</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex-1">
                          <input
                            type="radio"
                            name="holzArt"
                            value="hartholz"
                            checked={holzArt === 'hartholz'}
                            onChange={(e) => setHolzArt(e.target.value)}
                            className={radioClass}
                          />
                          <span className="text-xl text-gray-800">Hartholz</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {heizungsTyp === 'pellets' && (
                  <div>
                    <label className={labelClass}>Verbrauch in Tonnen Pellets pro Jahr</label>
                    <input
                      type="number"
                      step="0.1"
                      value={verbrauchPellets}
                      onChange={(e) => setVerbrauchPellets(e.target.value)}
                      className={inputClass}
                      placeholder="z.B. 4.5"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className={sectionClass}>
            <h2 className={headingClass}>Angaben zu Ihrem Haus</h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Wie viele Personen leben im Haus?</label>
                <input
                  type="number"
                  value={personenAnzahl}
                  onChange={(e) => setPersonenAnzahl(e.target.value)}
                  className={inputClass}
                  placeholder="z.B. 4"
                />
              </div>
              <div>
                <label className={labelClass}>Wohnfläche in m²</label>
                <input
                  type="number"
                  value={wohnflaeche}
                  onChange={(e) => setWohnflaeche(e.target.value)}
                  className={inputClass}
                  placeholder="z.B. 150"
                />
              </div>
              <div>
                <label className={labelClass}>Baujahr des Hauses</label>
                <input
                  type="number"
                  value={baujahr}
                  onChange={(e) => setBaujahr(e.target.value)}
                  className={inputClass}
                  placeholder="z.B. 1985"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={sectionClass}>
            <h2 className={headingClass}>Interesse an neuem Heizsystem</h2>
            <p className="text-lg text-gray-600 mb-6">Für welches Heizsystem interessieren Sie sich?</p>
            <div className="space-y-4">
              {[
                { value: 'waermepumpe', label: 'Wärmepumpe' },
                { value: 'pellets', label: 'Pelletheizung' },
                { value: 'holz', label: 'Holzheizung' },
                { value: 'hybrid', label: 'Hybrid-Wärmepumpe (Kombination mit Öl oder Gas)' },
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="radio"
                    name="neuesSystem"
                    value={option.value}
                    checked={neuesSystem === option.value}
                    onChange={(e) => setNeuesSystem(e.target.value as NeuesSystem)}
                    className={radioClass}
                  />
                  <span className="text-xl text-gray-800">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {/* PV-Anlage */}
            <div className={sectionClass}>
              <h2 className={headingClass}>Photovoltaik-Anlage</h2>
              <p className="text-lg text-gray-600 mb-6">Ist eine PV-Anlage vorhanden oder geplant?</p>
              <div className="space-y-4">
                {[
                  { value: 'vorhanden', label: 'Ja, PV-Anlage ist vorhanden' },
                  { value: 'geplant', label: 'Ja, PV-Anlage ist geplant' },
                  { value: 'nicht_vorhanden', label: 'Nein, keine PV-Anlage vorhanden' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      name="pvStatus"
                      value={option.value}
                      checked={pvStatus === option.value}
                      onChange={(e) => setPvStatus(e.target.value as PVStatus)}
                      className={radioClass}
                    />
                    <span className="text-xl text-gray-800">{option.label}</span>
                  </label>
                ))}
              </div>

              {pvStatus === 'vorhanden' && (
                <div className="mt-8 p-6 bg-brand-green/5 rounded-xl space-y-6">
                  <div>
                    <label className="flex items-center space-x-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stromspeicherVorhanden}
                        onChange={(e) => setStromspeicherVorhanden(e.target.checked)}
                        className={checkboxClass}
                      />
                      <span className="text-xl text-gray-800">Stromspeicher ist vorhanden</span>
                    </label>
                  </div>
                  <div>
                    <label className={labelClass}>In welchem Jahr läuft die EEG-Vergütung aus?</label>
                    <input
                      type="number"
                      value={eegAblauf}
                      onChange={(e) => setEegAblauf(e.target.value)}
                      className={inputClass}
                      placeholder="z.B. 2030"
                    />
                  </div>
                </div>
              )}

              {pvStatus === 'nicht_vorhanden' && (
                <div className="mt-8 p-6 bg-brand-green/5 rounded-xl">
                  <label className="flex items-center space-x-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pvInteresse}
                      onChange={(e) => setPvInteresse(e.target.checked)}
                      className={checkboxClass}
                    />
                    <span className="text-xl text-gray-800">Ja, ich interessiere mich für eine PV-Anlage</span>
                  </label>
                </div>
              )}
            </div>

            {/* E-Auto */}
            <div className={sectionClass}>
              <h2 className={headingClass}>Elektrofahrzeug</h2>
              <p className="text-lg text-gray-600 mb-6">Ist ein E-Auto vorhanden oder geplant?</p>
              <div className="space-y-4">
                {[
                  { value: 'vorhanden', label: 'Ja, E-Auto ist vorhanden' },
                  { value: 'geplant', label: 'Ja, E-Auto ist geplant' },
                  { value: 'nicht_vorhanden', label: 'Nein' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      name="eAutoStatus"
                      value={option.value}
                      checked={eAutoStatus === option.value}
                      onChange={(e) => setEAutoStatus(e.target.value as EAutoStatus)}
                      className={radioClass}
                    />
                    <span className="text-xl text-gray-800">{option.label}</span>
                  </label>
                ))}
              </div>

              {(eAutoStatus === 'vorhanden' || eAutoStatus === 'geplant') && (
                <div className="mt-8 p-6 bg-brand-green/5 rounded-xl">
                  <label className="flex items-center space-x-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wallboxInteresse}
                      onChange={(e) => setWallboxInteresse(e.target.checked)}
                      className={checkboxClass}
                    />
                    <span className="text-xl text-gray-800">Ich interessiere mich für eine Wallbox</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className={sectionClass}>
            <h2 className={headingClass}>Ihre Kontaktdaten</h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Vor- und Nachname"
                />
              </div>
              <div>
                <label className={labelClass}>Straße und Hausnummer *</label>
                <input
                  type="text"
                  value={strasse}
                  onChange={(e) => setStrasse(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Musterstraße 123"
                />
              </div>
              <div>
                <label className={labelClass}>PLZ und Ort *</label>
                <input
                  type="text"
                  value={plzOrt}
                  onChange={(e) => setPlzOrt(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="94234 Viechtach"
                />
              </div>
              <div>
                <label className={labelClass}>E-Mail-Adresse *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="ihre.email@beispiel.de"
                />
              </div>
              <div>
                <label className={labelClass}>Telefonnummer *</label>
                <input
                  type="tel"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="09942 1234567"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={sectionClass}>
            <h2 className={headingClass}>Adresse des Beratungsobjektes</h2>
            <div className="mb-6">
              <label className="flex items-center space-x-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gleicheAdresse}
                  onChange={(e) => setGleicheAdresse(e.target.checked)}
                  className={checkboxClass}
                />
                <span className="text-xl text-gray-800">Gleiche Adresse wie meine Kontaktdaten</span>
              </label>
            </div>
            {!gleicheAdresse && (
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Straße und Hausnummer des Objektes *</label>
                  <input
                    type="text"
                    value={objektStrasse}
                    onChange={(e) => setObjektStrasse(e.target.value)}
                    required={!gleicheAdresse}
                    className={inputClass}
                    placeholder="Objektstraße 456"
                  />
                </div>
                <div>
                  <label className={labelClass}>PLZ und Ort des Objektes *</label>
                  <input
                    type="text"
                    value={objektPlzOrt}
                    onChange={(e) => setObjektPlzOrt(e.target.value)}
                    required={!gleicheAdresse}
                    className={inputClass}
                    placeholder="94234 Viechtach"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className={sectionClass}>
            <h2 className={headingClass}>Wie sollen wir Sie kontaktieren?</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <input
                  type="radio"
                  name="kontaktArt"
                  value="telefon"
                  checked={kontaktArt === 'telefon'}
                  onChange={(e) => setKontaktArt(e.target.value as KontaktArt)}
                  className={radioClass}
                />
                <span className="text-xl text-gray-800">Telefonisch zur Terminvereinbarung</span>
              </label>
              <label className="flex items-center space-x-4 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <input
                  type="radio"
                  name="kontaktArt"
                  value="email"
                  checked={kontaktArt === 'email'}
                  onChange={(e) => setKontaktArt(e.target.value as KontaktArt)}
                  className={radioClass}
                />
                <span className="text-xl text-gray-800">Per E-Mail zur Terminvereinbarung</span>
              </label>
            </div>

            {kontaktArt === 'telefon' && (
              <div className="mt-8 p-6 bg-brand-green/5 rounded-xl">
                <label className={labelClass}>Wann sind Sie am besten telefonisch erreichbar?</label>
                <div className="space-y-3 mt-4">
                  {[
                    { value: 'vormittag', label: 'Vormittags (8:00 - 12:00 Uhr)' },
                    { value: 'mittag', label: 'Mittags (12:00 - 14:00 Uhr)' },
                    { value: 'nachmittag', label: 'Nachmittags (14:00 - 18:00 Uhr)' },
                    { value: 'abend', label: 'Abends (18:00 - 20:00 Uhr)' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-4 cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="erreichbarkeit"
                        value={option.value}
                        checked={erreichbarkeit === option.value}
                        onChange={(e) => setErreichbarkeit(e.target.value)}
                        className={radioClass}
                      />
                      <span className="text-xl text-gray-800">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-green to-brand-green-dark text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Beratungsgutschein</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Ihre persönliche Energieberatung – kostenlos und unverbindlich
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white shadow-md sticky top-20 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-700">
              Schritt {currentStep + 1} von {STEPS.length}
            </span>
            <span className="text-lg font-semibold text-brand-green">
              {STEPS[currentStep]}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {STEPS.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-3 rounded-full transition-all ${
                  index <= currentStep ? 'bg-brand-green' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-xl">
            {error}
          </div>
        )}

        {/* Current Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-200 text-gray-700 text-xl font-semibold rounded-xl hover:bg-gray-300 transition-all"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Zurück
            </button>
          ) : (
            <div />
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className="inline-flex items-center justify-center px-10 py-4 bg-brand-green text-white text-xl font-semibold rounded-xl hover:bg-brand-green-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter
              <ArrowRight className="w-6 h-6 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-10 py-4 bg-brand-green text-white text-xl font-bold rounded-xl hover:bg-brand-green-dark transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 mr-2" />
                  Absenden
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
