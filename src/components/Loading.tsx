export default function Loading({ message = "Loading..." }: { message?: string }) {
  return (
    <div style={{ padding: 24 }}>
      <p>{message}</p>
    </div>
  );
}