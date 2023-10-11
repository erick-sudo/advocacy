export default function Case({ casex }) {
  return (
    <div className="text-sm">
      <h4>
        <span>Case Number</span>
        <span>{casex.case_number}</span>
      </h4>
      <h4>{casex.title}</h4>
      <div>{casex.description}</div>
    </div>
  );
}
