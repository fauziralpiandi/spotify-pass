export function Toast({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="animate-fade-in fixed bottom-8 left-8 border-l-4 border-neutral-900 bg-neutral-50/80 px-8 py-4 backdrop-blur md:left-1/2 md:-translate-x-1/2"
    >
      <p className="text-sm tracking-wide text-red-500">{message}</p>
    </div>
  );
}
