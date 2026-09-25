export type SupportedLanguage = "en" | "ta" | "hi" | "te";

export interface TranslationDict {
  appName: string;
  emergencyTag: string;
  oneTapSos: string;
  sosSubtitle: string;
  sendingSos: string;
  call112: string;
  selectProblem: string;
  floodRooftop: string;
  medicalEmergency: string;
  collapseTrapped: string;
  roadSubmerged: string;
  peopleCount: string;
  adultsKids: string;
  needBoat: string;
  needDoctor: string;
  speakSos: string;
  listening: string;
  snapPhoto: string;
  rescueOnTheWay: string;
  rescueEta: string;
  sheltersTitle: string;
  callCamp: string;
  directions: string;
  readAloud: string;
  statusSubmitted: string;
  statusDispatched: string;
  statusEnRoute: string;
  statusRescued: string;
  tapToSpeak: string;
  speakInstruction: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  en: {
    appName: "CrisisLens Emergency SOS",
    emergencyTag: "EMERGENCY AID",
    oneTapSos: "PRESS FOR HELP",
    sosSubtitle: "Instant GPS Rescue Dispatch",
    sendingSos: "Sending Emergency Beacon...",
    call112: "Call Police (112)",
    selectProblem: "Tap Your Problem:",
    floodRooftop: "Water Rising / Rooftop",
    medicalEmergency: "Severe Injury / Patient",
    collapseTrapped: "Building Collapse / Trapped",
    roadSubmerged: "Vehicle Flooded / Road",
    peopleCount: "How Many People with You?",
    adultsKids: "Persons Needing Rescue",
    needBoat: "Need Boat",
    needDoctor: "Need Doctor / Insulin",
    speakSos: "Hold & Speak Voice SOS",
    listening: "Listening... Speak now",
    snapPhoto: "Take Photo of Water / Damage",
    rescueOnTheWay: "Help is on the way to your GPS location!",
    rescueEta: "Rescue Team Arrival in",
    sheltersTitle: "Nearby Safe Shelters & Food Camps",
    callCamp: "Call Shelter",
    directions: "Show Path",
    readAloud: "Listen",
    statusSubmitted: "Request Received",
    statusDispatched: "Rescue Team Assigned",
    statusEnRoute: "Boat / Ambulance On the Way",
    statusRescued: "Safe & Rescued",
    tapToSpeak: "Tap microphone to speak your emergency in any language",
    speakInstruction: "Tell us where you are and what you need. AI will transcribe and dispatch help.",
  },
  ta: {
    appName: "அவசர உதவி (CrisisLens)",
    emergencyTag: "அவசர உதவி",
    oneTapSos: "உதவிக்கு அழுத்தவும்",
    sosSubtitle: "உடனடி மீட்புக் குழு வரும்",
    sendingSos: "உதவி கோரப்படுகிறது...",
    call112: "காவல்துறை (112)",
    selectProblem: "உங்கள் ஆபத்தைத் தொடுங்கள்:",
    floodRooftop: "வெள்ளம் / வீட்டின் கூரை",
    medicalEmergency: "மருத்துவ அவசரம் / காயம்",
    collapseTrapped: "கட்டிடம் இடிந்தது / சிக்கியவர்கள்",
    roadSubmerged: "வாகனம் / சாலை மூழ்கியது",
    peopleCount: "உங்களுடன் எத்தனை பேர்?",
    adultsKids: "காப்பாற்ற வேண்டிய நபர்கள்",
    needBoat: "படகு தேவை",
    needDoctor: "மருத்துவர் / மருந்து தேவை",
    speakSos: "பேசி உதவி கேளுங்கள்",
    listening: "கேட்கிறது... பேசுங்கள்",
    snapPhoto: "வெள்ளத்தைப் படம் எடுக்கவும்",
    rescueOnTheWay: "மீட்புக் குழு உங்கள் இடத்திற்கு புறப்பட்டுவிட்டது!",
    rescueEta: "மீட்புக் குழு வர ஆகும் நேரம்",
    sheltersTitle: "அருகிலுள்ள பாதுகாப்பு முகாம்கள் & உணவு",
    callCamp: "முகாமை அழைக்க",
    directions: "வழி பார்க்க",
    readAloud: "கேட்கவும்",
    statusSubmitted: "கோரிக்கை பெறப்பட்டது",
    statusDispatched: "மீட்புக் குழு நியமிக்கப்பட்டது",
    statusEnRoute: "படகு / ஆம்புலன்ஸ் வருகிறது",
    statusRescued: "பாதுகாப்பாக மீட்கப்பட்டார்",
    tapToSpeak: "மைக்ரோஃபோனைத் தொட்டு உங்கள் அவசரத்தைப் பேசுங்கள்",
    speakInstruction: "நீங்கள் இருக்கும் இடம் மற்றும் தேவைப்படும் உதவியைக் கூறுங்கள்.",
  },
  hi: {
    appName: "आपातकालीन सहायता (CrisisLens)",
    emergencyTag: "आपातकालीन मदद",
    oneTapSos: "मदद के लिए दबाएं",
    sosSubtitle: "तुरंत बचाव दल भेजा जाएगा",
    sendingSos: "मदद भेजी जा रही है...",
    call112: "पुलिस (112)",
    selectProblem: "अपनी समस्या चुनें:",
    floodRooftop: "बाढ़ / छत पर फंसे हैं",
    medicalEmergency: "गंभीर चोट / मरीज",
    collapseTrapped: "मकान गिरा / फंसे हुए हैं",
    roadSubmerged: "गाड़ी फंसी / सड़क बंद",
    peopleCount: "आपके साथ कितने लोग हैं?",
    adultsKids: "बचाव के लिए लोग",
    needBoat: "नाव चाहिए",
    needDoctor: "डॉक्टर / दवा चाहिए",
    speakSos: "बोलकर मदद मांगें",
    listening: "सुन रहे हैं... बोलिए",
    snapPhoto: "पानी / नुकसान की फोटो लें",
    rescueOnTheWay: "बचाव दल आपकी लोकेशन पर आ रहा है!",
    rescueEta: "बचाव दल के पहुंचने का समय",
    sheltersTitle: "पास के सुरक्षित राहत शिविर और भोजन",
    callCamp: "कैंप को कॉल करें",
    directions: "रास्ता देखें",
    readAloud: "सुनें",
    statusSubmitted: "अनुरोध प्राप्त हुआ",
    statusDispatched: "बचाव दल तैयार",
    statusEnRoute: "नाव / एम्बुलेंस आ रही है",
    statusRescued: "सुरक्षित बचा लिया गया",
    tapToSpeak: "माइक दबाकर अपनी भाषा में परेशानी बताएं",
    speakInstruction: "बताएं कि आप कहां हैं और आपको क्या चाहिए।",
  },
  te: {
    appName: "అత్యవసర సహాయం (CrisisLens)",
    emergencyTag: "అత్యవసర సహాయం",
    oneTapSos: "సహాయం కోసం నొక్కండి",
    sosSubtitle: "తక్షణ రెస్క్యూ బృందం వస్తుంది",
    sendingSos: "సహాయం అభ్యర్థిస్తోంది...",
    call112: "పోలీస్ (112)",
    selectProblem: "మీ సమస్యను ఎంచుకోండి:",
    floodRooftop: "వరద / పైకప్పుపై చిక్కుకున్నారు",
    medicalEmergency: "తీవ్ర గాయం / రోగి",
    collapseTrapped: "భవనం కూలింది / చిక్కుకున్నారు",
    roadSubmerged: "వాహనం మునిగింది / రోడ్డు బంద్",
    peopleCount: "మీతో ఎంత మంది ఉన్నారు?",
    adultsKids: "రక్షించాల్సిన వ్యక్తులు",
    needBoat: "పడవ కావాలి",
    needDoctor: "డాక్టర్ / మందులు కావాలి",
    speakSos: "మాట్లాడి సహాయం అడగండి",
    listening: "వింటోంది... మాట్లాడండి",
    snapPhoto: "వరద ఫోటో తీయండి",
    rescueOnTheWay: "రెస్క్యూ టీమ్ మీ వద్దకు వస్తోంది!",
    rescueEta: "రెస్క్యూ టీమ్ చేరుకునే సమయం",
    sheltersTitle: "సమీపంలోని సురక్షిత పునరావాస కేంద్రాలు",
    callCamp: "క్యాంప్‌కు కాల్ చేయండి",
    directions: "దారి చూడండి",
    readAloud: "వినండి",
    statusSubmitted: "అభ్యర్థన అందింది",
    statusDispatched: "రెస్క్యూ టీమ్ కేటాయించబడింది",
    statusEnRoute: "పడవ / అంబులెన్స్ వస్తోంది",
    statusRescued: "సురక్షితంగా రక్షించబడ్డారు",
    tapToSpeak: "మైక్ నొక్కి మీ సమస్యను మాట్లాడండి",
    speakInstruction: "మీరు ఎక్కడ ఉన్నారు మరియు ఏమి కావాలో చెప్పండి.",
  },
};
