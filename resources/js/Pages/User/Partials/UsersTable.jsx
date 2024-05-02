import Pagination from "@/Components/Pagination";

import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";

import { Link, router } from "@inertiajs/react";
import React from "react";

export default function UsersTable(props) {
    const { data, query } = props;

    const searhFieldChanged = (field, value) => {
        if (value) {
            query[field] = value;
        } else {
            delete query[field];
        }

        router.get(route("user.index"), query);
    };

    const onKeypress = (field, e) => {
        if (e.key !== "Enter") return;
        searhFieldChanged(field, e.target.value);
    };

    const deleteUser = (user) => {
        router.delete(
            route("user.destroy", user.id),
            {},
            {
                preserveState: true,
            }
        );
    };

    return (
        <div className="w-full p-2">
            <table className="table-auto w-full table-condensed text-sm">
                <thead>
                    <tr className="border-tb ">
                        <TableHeading
                            name="name"
                            table="user"
                            isSortable={query}
                        >
                            Name
                        </TableHeading>
                        <TableHeading
                            name="email"
                            table="user"
                            isSortable={query}
                        >
                            Email
                        </TableHeading>
                        <TableHeading
                            name="created_at"
                            table="user"
                            isSortable={query}
                        >
                            Created Date
                        </TableHeading>

                        <TableHeading name="actions">Actions</TableHeading>
                    </tr>
                    <tr className="py-2">
                        <th className="text-start px-2">
                            <TextInput
                                placeholder="Search Name"
                                defaultValue={query.name}
                                onBlur={(e) =>
                                    searhFieldChanged("name", e.target.value)
                                }
                                onKeyPress={(e) => onKeypress("name", e)}
                            />
                        </th>
                        <th className="text-center px-2"></th>
                        <th className="text-start px-2"></th>
                        <th className="text-start px-2"></th>
                        <th className="text-start px-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((user, idx) => (
                        <tr
                            key={idx}
                            className="hover:bg-gray-100 transition-colors duration-100 border-b"
                        >
                            <td className="text-start p-2 flex items-center ">
                                <Link
                                    href={route("project.show", user.id)}
                                    className="hover:text-blue-500 hover:underline"
                                >
                                    {user.name}
                                </Link>
                            </td>
                            <td className="text-start text-nowrap p-2">
                                {user.email}
                            </td>
                            <td className="text-start text-nowrap p-2">
                                {user.created_at}
                            </td>
                            <td className="h-13">
                                <div className="inline-flex space-x-2 h-full items-center">
                                    <Link
                                        href={route("user.edit", user.id)}
                                        className=" py-1 text-green-500 text-sm hover:text-green-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => deleteUser(user)}
                                        className=" py-1 text-red-500 text-sm   hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination links={data.meta.links} />
        </div>
    );
}
