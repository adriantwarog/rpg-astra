export default function Skill({ title, points, color, onClick, index }) {
  return (
    <div className="p-4 py-2 skill flex items-center">
      <div className="font-medium w-36">{title}</div>
      <div className="bar border-2 border-gray-500 rounded-md h-4 flex w-full">
        <div
          className={`bg-${color}-400 rounded-md transition-all duration-500`}
          style={{
            width: `${points * 4}%`,
          }}
        ></div>
      </div>
      <div className="p-2 font-medium leading-none ml-2">{points}</div>
      <div
        className="p-2 bg-gray-600 select-none hover:bg-gray-500 rounded-md leading-none ml-2 cursor-pointer"
        onClick={() => onClick(index)}
      >
        +
      </div>
    </div>
  );
}
