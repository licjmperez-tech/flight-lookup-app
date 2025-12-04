# Flight Lookup App

A Next.js application for tracking flight information using the AviationStack API.

## Features

- Search flights by flight number
- View real-time flight status and details
- Display departure and arrival information
- Show flight route and timing information

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- AviationStack API key (stored in `.env.local`)

### Installation

1. Navigate to the project directory:

```bash
cd c:\Users\Usuario\Desktop\Flightapp\Test2\flight-lookup
```

2. Install dependencies (if not already installed):

```bash
npm install
```

3. Ensure you have a `.env.local` file with your API key:

```
AVIATION_STACK_API_KEY=your_api_key_here
```

### Running the Development Server

**Method 1: Using cmd (Recommended for Windows)**

```bash
cmd /c "npm run dev"
```

**Method 2: Using PowerShell (if execution policy allows)**

```powershell
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### Troubleshooting

#### Port Already in Use

If you see an error that port 3000 is already in use:

1. Find the process using port 3000:

```powershell
netstat -ano | findstr :3000
```

2. Kill the process (replace `<PID>` with the process ID from step 1):

```powershell
taskkill /PID <PID> /F
```

3. Try starting the server again

#### PowerShell Script Execution Error

If you see "execution of scripts is disabled", use the cmd method:

```bash
cmd /c "npm run dev"
```

#### Lock File Error

If you see "Unable to acquire lock":

1. Find and kill the Next.js process (see "Port Already in Use" above)
2. Delete the lock file:

```powershell
Remove-Item .next\dev\lock -Force
```

3. Start the server again

## Project Structure

```
flight-lookup/
├── app/
│   ├── api/flights/      # API route for flight data
│   ├── page.tsx          # Main page component
│   └── layout.tsx        # Root layout
├── components/
│   ├── FlightSearchForm.tsx   # Search form component
│   └── FlightResults.tsx      # Results display component
├── lib/
│   └── aviation-stack.ts      # AviationStack API integration
└── public/               # Static assets
```

## API Integration

This app uses the [AviationStack API](https://aviationstack.com/) to fetch real-time flight data. The API key is stored securely in the `.env.local` file.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **AviationStack API** - Flight data source

## Building for Production

To create a production build:

```bash
npm run build
npm start
```

## License

Private project
