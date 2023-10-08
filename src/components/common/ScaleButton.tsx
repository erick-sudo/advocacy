export function ScaleButton({ text = "", className = "", onClick = () => {} }) {

    return (
        <button onClick={onClick} className={`hover:scale-110 hover:shadow-lg hover:shadow-black duration-200 px-2 py-1 rounded shadow shadow-black ${className}`}>{text}</button>
    )
}