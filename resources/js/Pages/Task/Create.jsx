import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Select from "@/Components/Select";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_TEXT_MAP } from "@/Utils/constants";
import { status } from "@/Utils/data";
import { Head, useForm, Link } from "@inertiajs/react";
import React from "react";

export default function Create({ auth, projects, users }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        project_id: "",
        due_date: "",
        assigned_user_id: "",
        priority: "",
    });

    const handleOnChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === "file") {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("task.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Head title="Create" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg">
                        <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-5">
                            <h2 className="font-semibold text-2xl mb-2">
                                Task Form
                            </h2>
                            <form
                                onSubmit={onSubmit}
                                className="flex flex-col gap-y-3"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="project"
                                        value="Project Name"
                                    />
                                    <Select
                                        id="project"
                                        name="project_id"
                                        value={data.project_id}
                                        onChange={handleOnChange}
                                    >
                                        <option>Select Project</option>
                                        {projects.map((project, idx) => (
                                            <option
                                                key={idx}
                                                value={project.id}
                                            >
                                                {project.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.project_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="image" value="Image" />
                                    <TextInput
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleOnChange}
                                    />
                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleOnChange}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={handleOnChange}
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <Select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={handleOnChange}
                                    >
                                        <option>Select status</option>
                                        {status.map((stat, idx) => (
                                            <option key={idx} value={stat}>
                                                {TASK_STATUS_TEXT_MAP[stat]}
                                            </option>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="priority"
                                        value="Priority"
                                    />
                                    <Select
                                        id="priority"
                                        name="priority"
                                        value={data.priority}
                                        onChange={handleOnChange}
                                    >
                                        <option>Select priority</option>
                                        {["low", "high", "medium"].map(
                                            (priority, idx) => (
                                                <option
                                                    key={idx}
                                                    value={priority}
                                                >
                                                    {priority}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                    <InputError
                                        message={errors.priority}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="due_date"
                                        value="Due Date"
                                    />
                                    <TextInput
                                        type="date"
                                        id="due_date"
                                        name="due_date"
                                        value={data.due_date}
                                        onChange={handleOnChange}
                                    />
                                    <InputError
                                        message={errors.due_date}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="assigned_user_id"
                                        value="Assinged to"
                                    />
                                    <Select
                                        id="assigned_user_id"
                                        name="assigned_user_id"
                                        value={data.assigned_user_id}
                                        onChange={handleOnChange}
                                    >
                                        <option>Select User</option>
                                        {users.map((user, idx) => (
                                            <option key={idx} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.assigned_user_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="inline-flex space-x-2">
                                    <button
                                        type="submit"
                                        className="px-2 w-24 rounded py-1 bg-blue-600 hover:bg-blue-700 text-white shadow"
                                    >
                                        Save
                                    </button>

                                    <Link
                                        href={route("task.index")}
                                        className="px-2 w-24 rounded py-1 text-center bg-white hover:bg-gray-100 border shadow"
                                    >
                                        Back
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
