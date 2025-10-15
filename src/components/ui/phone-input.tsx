import * as React from 'react';
import { Input } from '@/components/ui/input';
import apiClient from '@/services/axiosInstance';
import { fetchWithCache } from '@/lib/cache';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';

interface Country {
  id: string;
  nativeId?: number | null;
  name: string;
  shortName?: string;
  phoneCode: string; // e.g. "234"
}

export interface PhoneValue {
  countryCode: string; // with + e.g. +234
  phoneNumber: string; // digits only
}

interface PhoneInputProps {
  value: PhoneValue;
  onChange: (val: PhoneValue) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string | null;
  helperText?: string;
  countryCodeLabel?: string;
  phoneNumberLabel?: string;
  maxPhoneLength?: number; // default 15
  forceRefresh?: boolean; // bypass cache
}

// Cache key / TTL 24h
const COUNTRY_CACHE_KEY = 'countries_cache_v2';
const COUNTRY_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  className,
  disabled,
  required,
  error,
  helperText,
  countryCodeLabel = 'Code',
  phoneNumberLabel = 'Phone Number',
  maxPhoneLength = 15,
  forceRefresh = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Default Nigeria if empty
  React.useEffect(() => {
    if (!value.countryCode) {
      onChange({ ...value, countryCode: '+234' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      const data = await fetchWithCache<Country[]>(
        COUNTRY_CACHE_KEY,
        COUNTRY_TTL_MS,
        async () => {
          const res = await apiClient.get<Country[]>('/Common/countries');
          return res.data;
        },
        forceRefresh,
      );
      setCountries(data);
    } catch (e) {
      console.error('Failed to load countries', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open && countries.length === 0) {
      loadCountries();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, forceRefresh]);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = countries.filter(c => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.shortName && c.shortName.toLowerCase().includes(q)) ||
      c.phoneCode.includes(q)
    );
  });

  const selectCountry = (c: Country) => {
    onChange({ ...value, countryCode: `+${c.phoneCode}` });
    setOpen(false);
  };

  const setPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, maxPhoneLength);
    onChange({ ...value, phoneNumber: digits });
  };

  return (
    <div ref={containerRef} className={cn('flex gap-2 w-full', className)}>
      <div className="relative w-[35%]">
        <Input
          label={countryCodeLabel}
          value={value.countryCode}
          readOnly
          // country code not validated; do not pass required/error state for it
          onClick={() => setOpen(o => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
        />
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100"
          aria-label="Toggle country list"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        {open && (
          <div className="absolute z-50 mt-2 w-64 rounded-md border bg-white shadow-lg p-2">
            <div className="flex items-center gap-2 mb-2 px-2 py-1 border rounded">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                className="w-full text-sm outline-none"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="max-h-64 overflow-auto text-sm">
              {loading && <div className="py-2 px-2">Loading...</div>}
              {!loading && filtered.length === 0 && (
                <div className="py-2 px-2 text-gray-500">No results</div>
              )}
              {!loading && filtered.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectCountry(c)}
                  className={cn(
                    'w-full flex items-center justify-between px-2 py-1 rounded hover:bg-gray-100',
                    value.countryCode === `+${c.phoneCode}` && 'bg-gray-100 font-medium'
                  )}
                >
                  <span className="truncate text-left pr-2">{c.name}</span>
                  <span className="text-gray-700">+{c.phoneCode}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1">
        <Input
          label={phoneNumberLabel}
          value={value.phoneNumber}
          onChange={e => setPhone(e.target.value)}
          required={required}
          error={error || undefined}
          disabled={disabled}
          inputMode="numeric"
          maxLength={maxPhoneLength}
          placeholder="8012345678"
        />
        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    </div>
  );
};

PhoneInput.displayName = 'PhoneInput';
