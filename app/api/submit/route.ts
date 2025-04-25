import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const auth = new google.auth.JWT(
            process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            undefined,
            process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets']
        );

        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = 'https://docs.google.com/spreadsheets/d/13sJgbyifcUKU1i6DZTeu-qE1iX9ojhjwuSgPPIqcFhk/edit?usp=sharing';
        const sheetName = 'Sheet1';

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${sheetName}!A1`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        body.name || '',
                        body.email || '',
                        body.score || '',
                        new Date().toISOString()
                    ]
                ]
            }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Ошибка при отправке в Google Таблицу:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
