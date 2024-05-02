import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_TEXT_MAP } from "@/Utils/constants";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Show({ auth, task, queryParams = null }) {
    queryParams = queryParams || {};
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {`Task Name ${task.name}`}
                </h2>
            }
        >
            <Head title={`Project ${task.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-5">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-3">
                        <div>
                            <img src={task.image_path} className="w-24 h-16" />
                        </div>
                        <div className="grid grid-cols-2 mb-2">
                            <div className="flex flex-col space-y-2">
                                <div>
                                    <label className="font-medium">
                                        Project ID
                                    </label>
                                    <p>{task.project.name}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Task ID
                                    </label>
                                    <p>{task.id}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Task Name
                                    </label>
                                    <p>{task.name}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Task Status
                                    </label>
                                    <p>{TASK_STATUS_TEXT_MAP[task.status]}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Created By
                                    </label>
                                    <p>{task.createdBy.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div>
                                    <label className="font-medium">
                                        Due date
                                    </label>
                                    <p>{task.due_date}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Created Date
                                    </label>
                                    <p>{task.created_at}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Updated By
                                    </label>
                                    <p>{task.updatedBy.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div>
                                <label className="font-medium">
                                    Project Description
                                </label>
                                <p>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
