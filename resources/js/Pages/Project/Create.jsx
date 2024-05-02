import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Select from "@/Components/Select";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Create({ auth, success }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
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
        post(route("project.store"));
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between w-full items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        New Project
                    </h2>
                </div>
            }
        >
            <Head title="Create Project" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg p-5">
                        <h2 className="font-semibold text-2xl mb-2">Form</h2>
                        <form
                            onSubmit={onSubmit}
                            className="flex flex-col gap-y-3"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="image_file"
                                    value="Image"
                                />
                                <TextInput
                                    type="file"
                                    id="image_file"
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
                                <InputLabel htmlFor="status" value="Status" />
                                <Select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={handleOnChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </Select>
                                <InputError
                                    message={errors.status}
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
                                    htmlFor="desc"
                                    value="Description"
                                />
                                <TextAreaInput
                                    name="description"
                                    id="desc"
                                    rows={3}
                                    value={data.description}
                                    onChange={handleOnChange}
                                />
                                <InputError
                                    message={errors.description}
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
                                    href={route("project.index")}
                                    className="px-2 w-24 rounded py-1 text-center bg-white hover:bg-gray-100 border shadow"
                                >
                                    Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
