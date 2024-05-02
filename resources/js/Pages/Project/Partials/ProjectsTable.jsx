import Pagination from "@/Components/Pagination";
import Select from "@/Components/Select";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/Utils/constants";
import { Link, router } from "@inertiajs/react";
import React from "react";

export default function ProjectsTable(props) {
    const { data, query } = props;

    const searhFieldChanged = (field, value) => {
        if (value) {
            query[field] = value;
        } else {
            delete query[field];
        }

        router.get(route("project.index"), query);
    };

    const onKeypress = (field, e) => {
        if (e.key !== "Enter") return;
        searhFieldChanged(field, e.target.value);
    };

    const deleteProject = (project) => {
        router.delete(route("project.destroy", project.id), {
            preserveScroll: true,
        });
    };

    const onChangeStatus = (project, e) => {
        router.put(
            `project/${project.id}`,
            {
                status: e.target.value,
            },
            { preserveScroll: true }
        );
    };

    return (
        <div className="w-full p-2">
            <table className="table-auto w-full table-condensed text-sm">
                <thead>
                    <tr className="border-tb ">
                        <TableHeading
                            name="name"
                            table="project"
                            isSortable={query}
                        >
                            Name
                        </TableHeading>
                        <TableHeading
                            name="status"
                            table="project"
                            isSortable={query}
                        >
                            Status
                        </TableHeading>
                        <TableHeading
                            name="created_at"
                            table="project"
                            isSortable={query}
                        >
                            Created Date
                        </TableHeading>
                        <TableHeading
                            name="due_date"
                            table="project"
                            isSortable={query}
                        >
                            Due Date
                        </TableHeading>
                        <TableHeading
                            name="due_date"
                            table="project"
                            isSortable={query}
                        >
                            Created By
                        </TableHeading>
                        <TableHeading name="actions">Actions</TableHeading>
                    </tr>
                    <tr className="py-2">
                        <th className="text-start px-2">
                            <TextInput
                                placeholder="Project Name"
                                defaultValue={query.name}
                                onBlur={(e) =>
                                    searhFieldChanged("name", e.target.value)
                                }
                                onKeyPress={(e) => onKeypress("name", e)}
                            />
                        </th>
                        <th className="text-start px-2">
                            <Select
                                defaultValue={query.status}
                                onChange={(e) =>
                                    searhFieldChanged("status", e.target.value)
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Select>
                        </th>
                        <th className="text-center px-2"></th>
                        <th className="text-start px-2"></th>
                        <th className="text-start px-2"></th>
                        <th className="text-start px-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((project, idx) => (
                        <tr
                            key={idx}
                            className="hover:bg-gray-100 transition-colors duration-100 border-b"
                        >
                            <td className="text-start p-2 flex items-center ">
                                <img
                                    src={project.image_path}
                                    className="w-16 h-9 mr-2"
                                />
                                <Link
                                    href={route("project.show", project.id)}
                                    className="hover:text-blue-500 hover:underline"
                                >
                                    {project.name}
                                </Link>
                            </td>
                            <td className={`text-start p-2 `}>
                                <select
                                    className={`text-start px-2 py-1 rounded-md text-white text-sm font-medium ${
                                        PROJECT_STATUS_CLASS_MAP[project.status]
                                    }`}
                                    onChange={(e) => onChangeStatus(project, e)}
                                    defaultValue={project.status}
                                >
                                    {[
                                        "pending",
                                        "in_progress",
                                        "completed",
                                    ].map((status, idx) => (
                                        <option key={idx} value={status}>
                                            {PROJECT_STATUS_TEXT_MAP[status]}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="text-center text-nowrap p-2">
                                {project.created_at}
                            </td>
                            <td className="text-start text-nowrap  p-2">
                                {project.due_date}
                            </td>
                            <td className="text-start p-2">
                                {project.createdBy.name}
                            </td>
                            <td className="h-13">
                                <div className="inline-flex space-x-2 h-full items-center">
                                    <Link
                                        href={route("project.edit", project.id)}
                                        className=" py-1 text-green-500 text-sm hover:text-green-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => deleteProject(project)}
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
