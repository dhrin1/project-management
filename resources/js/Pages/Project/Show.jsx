import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_TEXT_MAP } from "@/Utils/constants";
import { Head } from "@inertiajs/react";
import React from "react";
import TasksTable from "../Task/Partials/TasksTable";

export default function Show({ auth, project, tasks, queryParams = null }) {
    queryParams = queryParams || {};
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {`Project Name ${project.name}`}
                </h2>
            }
        >
            <Head title={`Project ${project.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid gap-5">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-3">
                        <div>
                            <img
                                src={project.image_path}
                                className="w-24 h-16"
                            />
                        </div>
                        <div className="grid grid-cols-2 mb-2">
                            <div className="flex flex-col space-y-2">
                                <div>
                                    <label className="font-medium">
                                        Project ID
                                    </label>
                                    <p>{project.id}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Project Name
                                    </label>
                                    <p>{project.name}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Project Status
                                    </label>
                                    <p>
                                        {
                                            PROJECT_STATUS_TEXT_MAP[
                                                project.status
                                            ]
                                        }
                                    </p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Created By
                                    </label>
                                    <p>{project.createdBy.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div>
                                    <label className="font-medium">
                                        Due date
                                    </label>
                                    <p>{project.due_date}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Created Date
                                    </label>
                                    <p>{project.created_at}</p>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Updated By
                                    </label>
                                    <p>{project.updatedBy.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div>
                                <label className="font-medium">
                                    Project Description
                                </label>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-3">
                        <TasksTable data={tasks} query={queryParams} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
