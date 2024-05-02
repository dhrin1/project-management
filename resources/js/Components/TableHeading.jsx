import { router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import React from "react";

export default function TableHeading({ name, isSortable, table, children }) {
    const query = isSortable;
    const sortChanged = (field) => {
        if (typeof query === "undefined") return;
        if (field === query.sort_field) {
            if (query.sort_direction == "asc") {
                query.sort_direction = "desc";
            } else {
                query.sort_direction = "asc";
            }
        } else {
            query.sort_field = field;
            query.sort_direction = "asc";
        }
        router.get(route(`${table}.index`), query);
    };
    return (
        <th onClick={() => sortChanged(name)} className="text-start">
            {children}
            {Object.keys(isSortable || {}).length > 0 && (
                <button className="ms-1 inline-grid items-center ">
                    <ChevronUpIcon
                        size={11}
                        className={`${
                            query.sort_field === name &&
                            query.sort_direction === "asc"
                                ? "font-semibold text-gray-500"
                                : ""
                        }  `}
                    />
                    <ChevronDownIcon
                        size={11}
                        className={`${
                            query.sort_field === name &&
                            query.sort_direction === "desc"
                                ? "font-semibold text-gray-500"
                                : ""
                        }  `}
                    />
                </button>
            )}
        </th>
    );
}
