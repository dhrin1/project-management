import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import TasksTable from "./Partials/TasksTable";

export default function Index({ auth, tasks, queryParams = null, success }) {
    queryParams = queryParams || {};

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between w-full items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tasks
                    </h2>

                    <Link
                        // href="/task"
                        // only={["users"]}
                        href={route("task.create")}
                        className="px-2 shadow text-sm py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                        New Task
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg">
                        <TasksTable data={tasks} query={queryParams} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
