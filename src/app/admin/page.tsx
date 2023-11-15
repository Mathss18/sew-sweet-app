"use client";

import { FaPlus } from "react-icons/fa6";

export default function DashboardPage() {
  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg" data-testid="baseDiv">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-center h-24 rounded bg-gray-200">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
        <div className="flex items-center justify-center h-24 rounded bg-gray-200">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
        <div className="flex items-center justify-center h-24 rounded bg-gray-200">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-200">
        <p className="text-2xl text-gray-400">
          <FaPlus />
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-200">
        <p className="text-2xl text-gray-400">
          <FaPlus />
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
        <div className="flex items-center justify-center rounded bg-gray-200 h-28">
          <p className="text-2xl text-gray-400">
            <FaPlus />
          </p>
        </div>
      </div>
    </div>
  );
}
