# UFC 2026 Backend API Routes

Base URL: `http://localhost:8000`

---

## Health & Info

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "whisper_available": true
}
```

---

### `GET /`
Root endpoint.

**Response:**
```json
{
  "message": "UFC 2026 Backend"
}
```

---

## Speech-to-Text (STT)

### `POST /stt`
Transcribe audio file to text using whisper-server.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `audio` (file) - Audio file to transcribe (mp3, wav, etc.)

**Response:**
```json
{
  "success": true,
  "text": "transcribed text here"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "error message"
}
```

**Constraints:**
- Max file size: 10MB
- Audio is converted to 16kHz mono 16bit WAV internally

---

## Text-to-Speech (TTS)

### `POST /tts`
Synthesize text to audio using Piper TTS.

**Request:**
```json
{
  "text": "Hello, this is a test."
}
```

**Response:**
```json
{
  "success": true,
  "audio_path": "/path/to/tts.wav"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "error message"
}
```

---

### `GET /get_newest_audio`
Fetch the most recent TTS audio file.

**Response:**
- Content-Type: `audio/wav`
- Body: Audio file binary (tts.wav)

---

## Medical Triager

Base URL: `/triager`

### `POST /triager/select_clinic`
Determine appropriate clinic based on patient symptoms.

**Request:**
```json
{
  "body_parts": "string",
  "duration": "string",
  "severity": "string",
  "description": "string",
  "other_relevant_info": []
}
```

**Response:**
```json
{
  "success": true,
  "clinic_id": "string"
}
```

---

### `POST /triager/collect_condition`
Collect medical condition conclusions from user description.

**Request:**
```json
{
  "previous_conclusions": [],
  "description_from_user": "string"
}
```

**Response:**
```json
{
  "success": true,
  "duration": "string",
  "severity": "string",
  "body_parts": "string",
  "description": "string",
  "other_relevant_info": []
}
```

---

### `POST /triager/collect_requirement`
Collect medical requirements from user description.

**Request:**
```json
{
  "description_from_user": "string"
}
```

**Response:**
```json
{
  "success": true,
  "requirements": [
    {
      "when": "string",
      "what": "string"
    }
  ]
}
```

---

### `POST /triager/patch_route`
Patch existing route with new destination clinic.

**Request:**
```json
{
  "destination_clinic_id": "string",
  "requirement_summary": [
    {
      "when": "string",
      "what": "string"
    }
  ],
  "origin_route": []
}
```

**Response:**
```json
{
  "success": true,
  "patched_route": ["string", "string", ...]
}
```

---

## Response Envelope Format

All API endpoints return JSON with consistent structure:

**Success:**
```json
{
  "success": true,
  ...data_fields
}
```

**Error:**
```json
{
  "success": false,
  "error": "error message"
}
```