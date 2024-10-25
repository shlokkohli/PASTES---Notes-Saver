import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../features/paste/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Paste() {
  const [searchTerm, setSearchTerm] = useState("");

  const pastes = useSelector((state) => state.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((eachVal) =>
    eachVal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteID) => {
    dispatch(removeFromPastes(pasteID));
  };

  const handleCopy = (pasteID) => {
    navigator.clipboard.writeText(pasteID);
    toast.success("Copied To Clipboard");
  };

  const handleShare = (title, content) => {
    if(navigator.share){
      navigator.share({
        title: title,
        text: content
      })
    }
  }

  return (
    <div>
      <input
        className="p-3 rounded-xl min-w-[550px] mt-5"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((eachVal) => (
            <div key={eachVal._id} className="border">
              <div className="text-2xl font-bold mb-2">
                {eachVal.title}
                </div>
              <div className="text-base text-gray-500 max-w-[500px] max-h-[100px] overflow-hidden m-auto">
                {eachVal.content}
                </div>

              {/* Buttons */}

              <div className="flex flex-row gap-4 place-content-center p-2">
                <button className="bg-blue-300">
                  <Link to={`/?pasteId=${eachVal._id}`}>Edit</Link>
                </button>

                <button className="bg-green-300">
                  <Link to={`/pastes/${eachVal._id}`}>View</Link>
                </button>

                <button
                  className="bg-red-500"
                  onClick={() => handleDelete(eachVal._id)}
                >
                  Delete
                </button>

                <button
                  className="bg-yellow-400"
                  onClick={() => handleCopy(eachVal.content)}
                >
                  Copy
                </button>

                <button
                className="bg-purple-400"
                onClick={() => handleShare(eachVal.title, eachVal.content)}
                >Share
                </button>
              </div>

              <div>{eachVal.createdAt}</div>
            </div>
          ))
        ) : (
          // If there is no pastes to display
          <Link
          className="text-white hover:text-white"
          to={'/'}>
            Create new Paste
          </Link>
        )}
      </div>
    </div>
  );
}

export default Paste;
