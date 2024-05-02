import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Edit({ auth, user, success }) {
    const { data, setData, post, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        _method: "PUT",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("user.update", user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between w-full items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Update "{user.name}"
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
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <TextInput
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirmed Password"
                                />
                                <TextInput
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={handleOnChange}
                                />
                                <InputError
                                    message={errors.password_confirmation}
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
                                    href={route("user.index")}
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
