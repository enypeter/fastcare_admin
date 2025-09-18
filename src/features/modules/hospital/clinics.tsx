
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const Clinics = () => {
  // Dummy data for now
  const clinics = [
    { id: 1, name: "Dentisty", head: "Dr. Smith" },
    { id: 2, name: "Opthalmology", head: "Dr. Johnson" },
    { id: 3, name: "Cardiology", head: "Dr. Williams" },
    { id: 4, name: "General Medicine", head: "Dr. Williams" },
    { id: 5, name: "Gyneacology", head: "Dr. Williams" },
    { id: 6, name: "Paediatrics", head: "Dr. Williams" },
    { id: 7, name: "Ear, Nose & Throat (ENT)", head: "Dr. Williams" },
    
  ];

  return (
    <div className="mx-4">
     

      <Table className="border border-gray-200 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">S/N</TableHead>
            <TableHead className="w-72">Clinic</TableHead>
            <TableHead >Clinic Head</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clinics.map((clinic, index) => (
            <TableRow key={clinic.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{clinic.name}</TableCell>
              <TableCell>{clinic.head}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Clinics;
