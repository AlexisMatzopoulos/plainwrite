export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentifizierungsfehler</h1>
        <p className="text-gray-600 mb-4">
          Bei der Anmeldung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </p>
        <a
          href="/signin"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Zurück zur Anmeldung
        </a>
      </div>
    </div>
  )
}
