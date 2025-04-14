import React from "react";
import { FaEdit } from "react-icons/fa";

const ProfileInfoCard = ({ data = [], editable = false, onEdit }) => {
  return (
    <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-700 rounded-md relative">
      {editable && (
        <div
          className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer"
          onClick={onEdit}
        >
          <FaEdit />
        </div>
      )}

      {data.map(({ label, value, className = "" }) => (
        <div className="flex gap-2" key={label}>
          <p>
            <span>{label}: </span>
            <span className={className}>{value}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfileInfoCard;
