export function Toast({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="animate-fade-in fixed bottom-0 left-1/2 w-full -translate-x-1/2 bg-neutral-900/50 p-8 text-center backdrop-blur"
    >
      <p className="text-sm tracking-wide text-neutral-100">{message}</p>
    </div>
  );
}
