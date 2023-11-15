"use client";

import { Breadcrumb, Button, ServerTable } from "@/components";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaCheck, FaHouse, FaPencil, FaPlus, FaTrash, FaUser, FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { BaseHttpResponse, UserModel } from "@/domain/models";
import { useQuery } from "react-query";
import { userService } from "@/services";
import { AxiosResponse } from "axios";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const itemsPerPage = 10;
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery<unknown, unknown, AxiosResponse<BaseHttpResponse<UserModel[]>>>(
    "users",
    () => userService.getAll({ page: currentPage, take: itemsPerPage, search })
  );

  useEffect(() => {
    refetch();
  }, [search, currentPage]);

  useEffect(() => {
    setTotalItems(data?.data.total || 0);
  }, [data]);

  const columns: ColumnDef<UserModel>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (props: CellContext<UserModel, any>) => <span>{props.getValue()}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (props: CellContext<UserModel, any>) => <span>{props.getValue()}</span>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (props: CellContext<UserModel, any>) => <span>{props.getValue()}</span>,
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: (props: CellContext<UserModel, any>) => <span>{props.getValue() ? <FaCheck /> : <FaXmark />}</span>,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: (props: CellContext<UserModel, any>) => (
        <span>{format(new Date(props.getValue()), "MM/dd/yyyy HH:mm:ss")}</span>
      ),
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: (props: CellContext<UserModel, any>) => (
        <div className="flex gap-1 text-lg">
          <Button
            data-testid="update-button"
            variant="outlined"
            color="blue"
            onClick={() => router.push(`/admin/users/update/${props.getValue()}`)}
          >
            <FaPencil />
          </Button>
          <Button
            data-testid="delete-button"
            variant="outlined"
            onClick={async () => {
              const option = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                confirmButtonAriaLabel: "confirm-button",
                cancelButtonAriaLabel: "cancel-button",
              });
              if (option.isConfirmed) {
                alert("Not implemented yet");
              }
            }}
          >
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div data-testid="table">
      <Breadcrumb
        className="mb-2"
        items={[
          { title: "Home", icon: <FaHouse />, link: "/admin" },
          {
            title: "Users",
            icon: <FaUser />,
            active: true,
          },
        ]}
      />
      <ServerTable
        columns={columns}
        data={data?.data.data || []}
        total={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        nextPageCallback={() => {
          setCurrentPage((prev: number) => prev + 1);
        }}
        previousPageCallback={() => {
          setCurrentPage((prev: number) => prev - 1);
        }}
        searchCallback={(e) => {
          setSearch(e.target.value);
        }}
        isLoading={isLoading}
        rightAccessory={
          <Button
            data-testid="new-button"
            className="m-2"
            onClick={() => router.push("/admin/users/create")}
            leftAccessory={<FaPlus />}
          >
            New
          </Button>
        }
      />
    </div>
  );
}
