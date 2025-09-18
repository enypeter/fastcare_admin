import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from './button';
import {Checkbox} from './checkbox';
import {ChevronDown} from 'lucide-react';

export type FilterOptionsT = {
  label: string;
  value: string;
};
type FilterProps = {
  name: string;
  options: FilterOptionsT[];
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
};
export const Filter = ({name, options, values, setValues}: FilterProps) => {
  const selectOption = (value: string) => {
    if (values.includes(value)) {
      return setValues(values.filter(v => v !== value));
    }
    setValues([...values, value]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          className="h-11 justify-between gap-8 font-normal border px-2.5 hover:bg-neutral-50"
        >
          {values.length > 0 ? (
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-neutral-900">{name}:</span>
              <div className="flex items-center gap-1">
                {values.slice(0, 1).map((value, index) => (
                  <span key={index} className="text-neutral-600 ">
                    {options.find(option => option.value === value)?.label}
                  </span>
                ))}
              </div>
              {values.length > 1 && (
                <span className="text-xs text-neutral-400">
                  + {values.length - 1} more
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-neutral-400">{name}</span>
          )}
          {values.length === 0 && (
            <ChevronDown className="h-5 w-5 text-neutral-500" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-fit min-w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={currentValue => {
                    selectOption(currentValue);
                  }}
                  className="whitespace-nowrap justify-start"
                >
                  <Checkbox checked={values.includes(option.value)} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
