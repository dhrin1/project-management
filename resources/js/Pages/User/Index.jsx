import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UsersTable from "./Partials/UsersTable";
import { Link, Head } from "@inertiajs/react";

export default function Index({
    auth,
    users,
    queryParams = null,
    success,
    error,
}) {
    queryParams = queryParams || {};

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between w-full items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>

                    <Link
                        href={route("user.create")}
                        className="px-2 shadow text-sm py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                        New Account
                    </Link>
                </div>
            }
        >
            <Head title="Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
                            {error}
                        </div>
                    )}
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg">
                        <UsersTable data={users} query={queryParams} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
