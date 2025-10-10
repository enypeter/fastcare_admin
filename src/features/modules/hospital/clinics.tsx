import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from 'react';
import apiClient from '@/services/axiosInstance';
import { cn } from '@/lib/utils';

// Shape of clinic item from API
interface ClinicItem {
  id: string;
  name: string;
  useForVirtualConsultation: boolean;
  useForRegistration: boolean;
}

interface ClinicsProps {
  hospitalId?: number | string; // optional; will attempt fallback
  className?: string;
}

const Clinics = ({ hospitalId, className }: ClinicsProps) => {
  const [data, setData] = useState<ClinicItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback strategy: attempt to read currently selected hospital from localStorage (adjust key as needed)
  const effectiveHospitalId = hospitalId ?? (() => {
    try {
      const stored = localStorage.getItem('selectedHospitalId');
      if (!stored) return undefined;
      return /^(\d+)$/.test(stored) ? Number(stored) : stored; // number if pure digits
    } catch {
      return undefined;
    }
  })();

  useEffect(() => {
    if (effectiveHospitalId === undefined || effectiveHospitalId === null || effectiveHospitalId === '') return; // guard
    let isMounted = true;
    const fetchClinics = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.get('/Hospitals/clinics', { params: { hospitalId: effectiveHospitalId } });
        if (isMounted) setData(res.data as ClinicItem[]);
      } catch (err: unknown) {
        if (!isMounted) return;
        let message = 'Failed to load clinics';
        if (typeof err === 'string') message = err;
        else if (err && typeof err === 'object') {
          const anyErr = err as { response?: { data?: unknown } ; message?: string };
          const resp = anyErr.response?.data;
            if (typeof resp === 'string') message = resp;
            else if (resp && typeof resp === 'object') {
              const respObj = resp as { message?: unknown; error?: unknown; data?: unknown };
              const cand = respObj.message || respObj.error || respObj.data;
              if (typeof cand === 'string') message = cand;
            } else if (anyErr.message) message = anyErr.message;
        }
        setError(message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchClinics();
    return () => { isMounted = false; };
  }, [effectiveHospitalId]);

  return (
    <div className={cn('mx-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Clinics</h2>
        {loading && <span className="text-sm text-gray-500">Loading...</span>}
      </div>
      {effectiveHospitalId == null && (
        <div className="mb-4 text-sm text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
          No hospital selected.
        </div>
      )}
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
          {error}
        </div>
      )}
      {!loading && !error && data.length === 0 && (
        <div className="text-sm text-gray-500">No clinics found.</div>
      )}
      {data.length > 0 && (
        <Table className="border border-gray-200 rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">S/N</TableHead>
              <TableHead className="w-96">Name</TableHead>
              <TableHead>Virtual Consultation</TableHead>
              <TableHead>Registration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((clinic, index) => (
              <TableRow key={clinic.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{clinic.name}</TableCell>
                <TableCell>
                  {clinic.useForVirtualConsultation ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </TableCell>
                <TableCell>
                  {clinic.useForRegistration ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Clinics;
