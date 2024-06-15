import { Plus } from 'lucide-react';

type TAddToDoButtonProperties = {
  onClick: () => void;
};

export const AddToDoButton = ({ onClick }: TAddToDoButtonProperties) => {
  return (
    <div
      className="w-[300px] h-[300px] border-2 rounded-lg border-gray-300 bg-white shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gray-400 hover:bg-slate-100 transition-all"
      onClick={onClick}
    >
      <Plus className="w-8 h-8 text-gray-400" />
      <h3 className="text-2xl font-bold text-gray-400">Add To Do</h3>
    </div>
  );
};
