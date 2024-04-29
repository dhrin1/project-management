import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4 space-x-1">
            {links.map((link) => (
                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={`inline-block px-2 py-1 rounded-md text-sm ${
                        link.active ? "bg-gray-900 text-white" : ""
                    } ${
                        !link.url
                            ? `!text-gray-500 cursor-not-allowed`
                            : `hover:bg-gray-900 hover:text-white`
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
}
