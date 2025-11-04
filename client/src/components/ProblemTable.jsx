import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useSelector, useDispatch } from 'react-redux';
import { toggleProblemStatus } from '../features/auth/authSlice';
import {
  FiCheck,
  FiYoutube,
  FiCode,
  FiFileText,
  FiArrowUp,
  FiArrowDown,
  FiChevronsUp,
} from 'react-icons/fi';

// A "cell" component for the level
const LevelCell = ({ level }) => {
  const levelColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Tough: 'bg-red-100 text-red-800',
  };
  const levelIcon = {
    Easy: <FiArrowDown className="w-4 h-4" />,
    Medium: <FiArrowUp className="w-4 h-4" />,
    Tough: <FiChevronsUp className="w-4 h-4" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
        levelColor[level] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {levelIcon[level]}
      {level}
    </span>
  );
};

// A "cell" component for the checkbox
const StatusCell = ({ problemId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isCompleted = user.completedProblems.includes(problemId);

  const handleToggle = () => {
    dispatch(toggleProblemStatus(problemId));
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
        className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
      />
    </div>
  );
};

// A "cell" component for the links
const LinksCell = ({ links }) => (
  <div className="flex items-center gap-3">
    <a
      href={links.practiceLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Practice Link"
      className="text-gray-500 hover:text-blue-600 transition-colors"
    >
      <FiCode className="w-5 h-5" />
    </a>
    <a
      href={links.youtubeLink}
      target="_blank"
      rel="noopener noreferrer"
      title="YouTube Tutorial"
      className="text-gray-500 hover:text-red-600 transition-colors"
    >
      <FiYoutube className="w-5 h-5" />
    </a>
    <a
      href={links.articleLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Article"
      className="text-gray-500 hover:text-green-600 transition-colors"
    >
      <FiFileText className="w-5 h-5" />
    </a>
  </div>
);

function ProblemTable({ data }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'Status',
        cell: ({ row }) => <StatusCell problemId={row.original._id} />,
        size: 80, // % width
      },
      {
        accessorKey: 'title',
        header: 'Problem',
        cell: (info) => (
          <span className="font-medium text-gray-900">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'level',
        header: 'Difficulty',
        cell: (info) => <LevelCell level={info.getValue()} />,
      },
      {
        id: 'links',
        header: 'Resources',
        cell: ({ row }) => <LinksCell links={row.original} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: header.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`transition-colors ${
                row.original.isCompleted ? 'bg-green-50' : ''
              } hover:bg-cyan-50`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemTable;
