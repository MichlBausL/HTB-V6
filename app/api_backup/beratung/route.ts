import { NextResponse } from 'next/server';

const heizungsTypLabels: Record<string, string> = {
  oel: 'Öl-Heizung',
  gas: 'Gas-Heizung',
  nachtspeicher: 'Nachtspeicheröfen',
  holz: 'Holzheizung',
  pellets: 'Pelletheizung',
};

const neuesSystemLabels: Record<string, string> = {
  waermepumpe: 'Wärmepumpe',
  pellets: 'Pelletheizung',
  holz: 'Holzheizung',
  hybrid: 'Hybrid-Wärmepumpe (Kombination mit Öl oder Gas)',
};

const pvStatusLabels: Record<string, string> = {
  vorhanden: 'PV-Anlage vorhanden',
  geplant: 'PV-Anlage geplant',
  nicht_vorhanden: 'Keine PV-Anlage',
};

const eAutoStatusLabels: Record<string, string> = {
  vorhanden: 'E-Auto vorhanden',
  geplant: 'E-Auto geplant',
  nicht_vorhanden: 'Kein E-Auto',
};

const erreichbarkeitLabels: Record<string, string> = {
  vormittag: 'Vormittags (8:00 - 12:00 Uhr)',
  mittag: 'Mittags (12:00 - 14:00 Uhr)',
  nachmittag: 'Nachmittags (14:00 - 18:00 Uhr)',
  abend: 'Abends (18:00 - 20:00 Uhr)',
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Build consumption info based on heating type
    let verbrauchInfo = '';
    switch (data.heizungsTyp) {
      case 'oel':
        verbrauchInfo = data.verbrauchOel ? `${data.verbrauchOel} Liter Heizöl/Jahr` : 'Nicht angegeben';
        break;
      case 'gas':
        if (data.verbrauchGasM3) {
          verbrauchInfo = `${data.verbrauchGasM3} m³ Erdgas/Jahr`;
        } else if (data.verbrauchGasLiter) {
          verbrauchInfo = `${data.verbrauchGasLiter} Liter Flüssiggas/Jahr`;
        } else {
          verbrauchInfo = 'Nicht angegeben';
        }
        break;
      case 'nachtspeicher':
        verbrauchInfo = data.verbrauchNachtspeicher ? `${data.verbrauchNachtspeicher} kWh Heizstrom/Jahr` : 'Nicht angegeben';
        break;
      case 'holz':
        verbrauchInfo = data.verbrauchHolz ? `${data.verbrauchHolz} Ster ${data.holzArt === 'hartholz' ? 'Hartholz' : 'Weichholz'}/Jahr` : 'Nicht angegeben';
        break;
      case 'pellets':
        verbrauchInfo = data.verbrauchPellets ? `${data.verbrauchPellets} Tonnen Pellets/Jahr` : 'Nicht angegeben';
        break;
      default:
        verbrauchInfo = 'Nicht angegeben';
    }

    // Build PV info
    let pvInfo = pvStatusLabels[data.pvStatus] || 'Nicht angegeben';
    if (data.pvStatus === 'vorhanden') {
      pvInfo += `<br>• Stromspeicher: ${data.stromspeicherVorhanden ? 'Ja' : 'Nein'}`;
      if (data.eegAblauf) {
        pvInfo += `<br>• EEG-Vergütung endet: ${data.eegAblauf}`;
      }
    } else if (data.pvStatus === 'nicht_vorhanden' && data.pvInteresse) {
      pvInfo += '<br>• <strong>Interesse an PV-Anlage: Ja</strong>';
    }

    // Build E-Auto info
    let eAutoInfo = eAutoStatusLabels[data.eAutoStatus] || 'Nicht angegeben';
    if ((data.eAutoStatus === 'vorhanden' || data.eAutoStatus === 'geplant') && data.wallboxInteresse) {
      eAutoInfo += '<br>• <strong>Interesse an Wallbox mit Energiemanagement: Ja</strong>';
    }

    // Build contact preference info
    let kontaktInfo = data.kontaktArt === 'telefon' ? 'Telefonisch' : data.kontaktArt === 'email' ? 'Per E-Mail' : 'Nicht angegeben';
    if (data.kontaktArt === 'telefon' && data.erreichbarkeit) {
      kontaktInfo += `<br>• Beste Erreichbarkeit: ${erreichbarkeitLabels[data.erreichbarkeit] || data.erreichbarkeit}`;
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: #8DC63F; color: white; padding: 25px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🎫 Neue Beratungsgutschein-Anfrage</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Eingegangen am ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}</p>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
          
          <h2 style="color: #4B5D3F; border-bottom: 2px solid #8DC63F; padding-bottom: 10px; margin-top: 0;">📋 Kundendaten</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr><td style="padding: 10px 0; color: #666; width: 180px;">Name:</td><td style="padding: 10px 0; font-weight: bold;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; color: #666;">Adresse:</td><td style="padding: 10px 0;">${data.strasse}<br>${data.plzOrt}</td></tr>
            <tr><td style="padding: 10px 0; color: #666;">E-Mail:</td><td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #8DC63F;">${data.email}</a></td></tr>
            <tr><td style="padding: 10px 0; color: #666;">Telefon:</td><td style="padding: 10px 0; font-weight: bold;"><a href="tel:${data.telefon}" style="color: #4B5D3F;">${data.telefon}</a></td></tr>
          </table>

          <h2 style="color: #4B5D3F; border-bottom: 2px solid #8DC63F; padding-bottom: 10px;">🏠 Beratungsobjekt</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr><td style="padding: 10px 0; color: #666; width: 180px;">Adresse:</td><td style="padding: 10px 0;">${data.objektStrasse}<br>${data.objektPlzOrt}${data.gleicheAdresse ? ' <em>(gleiche wie Kundenadresse)</em>' : ''}</td></tr>
          </table>

          <h2 style="color: #4B5D3F; border-bottom: 2px solid #8DC63F; padding-bottom: 10px;">🔥 Bisherige Heizung</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr><td style="padding: 10px 0; color: #666; width: 180px;">Heizungstyp:</td><td style="padding: 10px 0; font-weight: bold;">${heizungsTypLabels[data.heizungsTyp] || 'Nicht angegeben'}</td></tr>
            <tr><td style="padding: 10px 0; color: #666;">Jahresverbrauch:</td><td style="padding: 10px 0;">${verbrauchInfo}</td></tr>
          </table>

          <h2 style="color: #4B5D3F; border-bottom: 2px solid #8DC63F; padding-bottom: 10px;">🏡 Gebäudedaten</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr><td style="padding: 10px 0; color: #666; width: 180px;">Personenanzahl:</td><td style="padding: 10px 0;">${data.personenAnzahl || 'Nicht angegeben'}</td></tr>
            <tr><td style="padding: 10px 0; color: #666;">Wohnfläche:</td><td style="padding: 10px 0;">${data.wohnflaeche ? data.wohnflaeche + ' m²' : 'Nicht angegeben'}</td></tr>
            <tr><td style="padding: 10px 0; color: #666;">Baujahr:</td><td style="padding: 10px 0;">${data.baujahr || 'Nicht angegeben'}</td></tr>
          </table>

          <h2 style="color: #4B5D3F; border-bottom: 2px solid #8DC63F; padding-bottom: 10px;">🌡️ Interesse an neuem Heizsystem</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr><td style="padding: 10px 0; color: #666; width: 180px;">Gewünschtes System:</td><td style="padding: 10px 0; font-weight: bold; color: #8DC63F;">${neuesSystemLabels[data.neuesSystem] || 'Nicht angegeben'}</td></tr>
          </table>

          <h2 style="color: #4B5D3F; border-bottom: 2px solid #8DC63F; padding-bottom: 10px;">☀️ Photovoltaik</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr><td style="padding: 10px 0; color: #666; width: 180px;">Status:</td><td style="padding: 10px 0;">${pvInfo}</td></tr>
          </table>

          <h2 style="color: #4B5D3F; border-bottom: 2px solid #8DC63F; padding-bottom: 10px;">🚗 E-Mobilität</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr><td style="padding: 10px 0; color: #666; width: 180px;">E-Auto:</td><td style="padding: 10px 0;">${eAutoInfo}</td></tr>
          </table>

          <h2 style="color: #4B5D3F; border-bottom: 2px solid #8DC63F; padding-bottom: 10px;">📞 Kontaktpräferenz</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr><td style="padding: 10px 0; color: #666; width: 180px;">Kontakt via:</td><td style="padding: 10px 0; font-weight: bold;">${kontaktInfo}</td></tr>
          </table>

        </div>
        
        <p style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
          Diese Anfrage wurde über das Beratungsgutschein-Formular auf der Website gesendet.
        </p>
      </div>
    `;

    const appUrl = process.env.NEXTAUTH_URL || '';
    const appName = 'Haustechnik Bielmeier';

    const response = await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        app_id: process.env.WEB_APP_ID,
        notification_id: process.env.NOTIF_ID_BERATUNGSGUTSCHEIN_ANFRAGE,
        subject: `🎫 Beratungsgutschein-Anfrage von ${data.name}`,
        body: htmlBody,
        is_html: true,
        recipient_email: 'info@bielmeier-haustechnik.de',
        sender_email: appUrl ? `noreply@${new URL(appUrl).hostname}` : 'noreply@bielmeier-haustechnik.de',
        sender_alias: appName,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      if (result.notification_disabled) {
        console.log('Notification disabled by user, skipping email');
        return NextResponse.json({ success: true, message: 'Anfrage erhalten (Benachrichtigung deaktiviert)' });
      }
      throw new Error(result.message || 'Fehler beim Senden der Benachrichtigung');
    }

    return NextResponse.json({ success: true, message: 'Anfrage erfolgreich gesendet' });
  } catch (error) {
    console.error('Error processing consultation request:', error);
    return NextResponse.json(
      { success: false, message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
