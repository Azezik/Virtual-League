type GameCardProps = {
  title: string;
  sport: string;
  location: string;
  onClick: () => void;
};

export default function GameCard({ title, sport, location, onClick }: GameCardProps) {
  return (
    <div 
      className="bg-white border border-gray-200 p-4 rounded-md mb-4 cursor-pointer hover:border-blue-400 transition-colors" 
      data-sport={sport}
      onClick={onClick}
    >
      <div className="font-bold text-lg">{title}</div>
      <div className="text-gray-600">Sport: {sport}<br />Location: {location}</div>
      <div className="text-blue-500 text-sm mt-2">Click for details</div>
    </div>
  );
}
