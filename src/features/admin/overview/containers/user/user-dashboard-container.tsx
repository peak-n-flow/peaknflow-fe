"use client";
import { Pagination } from "@/components/pagination";
import { SearchInput } from "@/components/search/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchQuery } from "@/hooks/use-search-query";

export default function UserDashboardContainer({
  users,
}: {
  users: {
    users: User[];
    meta: Meta;
  };
}) {
  const handleSearchChange = useSearchQuery("search", 300);
  return (
    <main className="flex flex-col gap-5 overflow-x-auto">
      <div className="flex w-full flex-col md:flex-row gap-8 justify-between items-center h-8 py-9">
        <h2 className="text-h5">User</h2>
        <SearchInput onChange={handleSearchChange} />
      </div>

      <div className="bg-white rounded-2xl flex flex-col gap-4 p-6">
        <span className="text-body-lg">List</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Id Pengguna</TableHead>
              <TableHead className="text-center">Nama Pengguna</TableHead>
              <TableHead className="text-center">Nomor Telepon</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.users.length > 0 ? (
              users.users.map((user, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="text-center">{user.id}</TableCell>
                    <TableCell className="text-center">{user.name}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">
                      {user.phone_number}
                    </TableCell>
                    <TableCell className="text-center">{user.role}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Data Is Empty
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination meta={users.meta} />
      </div>
    </main>
  );
}
