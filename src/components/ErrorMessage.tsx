export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div style={{ padding: 24 }}>
      <p style={{ color: "red" }}>Error: {message}</p>
    </div>
  );
}