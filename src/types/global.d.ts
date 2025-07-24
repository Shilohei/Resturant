declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// This empty export is needed to treat this file as a module.
export {};
