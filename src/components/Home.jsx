import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from '../features/paste/pasteSlice'
import toast from "react-hot-toast";

function Home() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const pasteId = searchParams.get("pasteId");

  const allPastes = useSelector((state) => state.pastes)

  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((eachVal) => eachVal._id.toString() === pasteId);
      setTitle(paste.title)
      setContent(paste.content)
    }
  }, [pasteId]);

  const createPaste = () => {
    const paste = {
      title: title,
      content: content,
      _id: pasteId || Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    }

    if(pasteId){
      // it means we are updating the paste
      dispatch(updateToPastes(paste));
    }
    else{
      // it means we are creating a paste
      dispatch(addToPastes(paste));
    }

    // after creation or updating
    setTitle('')
    setContent('')
    setSearchParams('')

    if(pasteId){
      navigate('/pastes')
    }
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-xl mt-2 pl-5 w-[65%]"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
        className="p-2 rounded-xl mt-2"
        onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          className="rounded-xl mt-4 min-w-[500px] p-4"
          placeholder="Enter Content Here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
}

export default Home;