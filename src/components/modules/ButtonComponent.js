export default function AllButton({ text, className, onClick }) {
  return (
    <button className={className} type="submit" onClick={onClick}>
      {text}
    </button>
  );
}
