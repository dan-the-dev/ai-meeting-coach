// recorder.ts
// @ts-expect-error No declaration file found for module 'node-record-lpcm16'.
import record from 'node-record-lpcm16';
import fs from 'fs';

const mic = record.record({ 
    sampleRate: 16000,
    channels: 1,
    audioType: 'wav',
    verbose: false,
    recorder: 'sox'
  });

export const startRecording = (filename = 'meeting-audio.wav') => {
  const file = fs.createWriteStream(filename, { encoding: 'binary' });

  mic.stream().pipe(file);
  console.log('🎙️ Registrazione avviata...');

  return mic; // restituiamo l’oggetto per poterlo fermare dopo
};

export const stopRecording = (_mic: ReturnType<typeof record.start>) => {
  mic.stop();
  console.log('🛑 Registrazione terminata.');
};