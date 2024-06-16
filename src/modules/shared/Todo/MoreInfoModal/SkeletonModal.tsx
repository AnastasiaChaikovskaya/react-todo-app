import { Skeleton } from '@/components/ui/skeleton';

function SkeletonModal() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-[20px] w-[250px]" />
      <Skeleton className="h-[200px] w-[250px]" />
      <div className="flex flex-row justify-between items-center">
        <Skeleton className="h-[10px] w-[30px]" />
        <Skeleton className="h-[20px] w-[30px]" />
      </div>
    </div>
  );
}

export default SkeletonModal;
