import { cn } from '@/libs/utils';

const Counter = ({ 
    className,
    count, 
    onAdd, 
    onMinus 
} : { 
    className?: string,
    count: number, 
    onAdd: () => void, 
    onMinus: () => void 
}) => {
  return (
    <div className='flex flex-row gap-2 items-center'>
        <button 
        disabled={count === 0}
        className={cn(
          'flex items-center justify-center w-5 h-5 bg-white text-[18px] font-semibold text-textSecondary-400 p-1 cursor-pointer hover:shadow-sm', 
          className,
          count === 0 && className && 'border-2 border-primary-light-200 bg-white cursor-not-allowed'
        )}
        onClick={onMinus} 
        >-</button>
        <span>{count}</span>
        <button 
        className={cn(
          'flex items-center justify-center w-5 h-5 bg-white text-[18px] font-semibold text-textSecondary-400 p-1 cursor-pointer hover:shadow-sm', 
          className
        )}
        onClick={onAdd} 
        >+</button>
    </div>
  )
}

export default Counter