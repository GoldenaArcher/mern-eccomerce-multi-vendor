import React from "react";
import ActionIcon from "../../../components/shared/ActionIcon";

const ProfileInfoCard = ({ data = [], editable = false, onEdit }) => {
  return (
    <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-700 rounded-md relative">
      {editable && (
        <ActionIcon
          type="edit"
          className="absolute right-2 top-2"
          onClick={onEdit}
        />
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
