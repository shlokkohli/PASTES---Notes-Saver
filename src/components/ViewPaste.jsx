import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from '../features/paste/pasteSlice'
import toast from "react-hot-toast";

function ViewPaste() {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.pastes)
  
  const paste = allPastes.filter((eachVal) => eachVal._id == id)[0]
  const [content, setContent] = useState(paste.content)

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied To Clipboard")
  }

  return (
    <div>
    <div className="flex flex-row gap-7 place-content-between">
      <input
        className="p-2 rounded-xl mt-2 pl-5 w-[65%]"
        type="text"
        placeholder="Enter Title"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div className="flex flex-col-reverse align-top mt-6">
      <textarea
        className="rounded-xl mt-4 min-w-[500px] p-4"
        placeholder="Enter Content Here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        disabled
      />
      <button
      className="max-h-[40px]"
      onClick={handleCopy}
      >Copy Content</button>
    </div>
  </div>
  )
}

export default ViewPaste