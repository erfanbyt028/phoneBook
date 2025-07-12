import React, { useReducer, useRef, useState } from "react";
import {
  phonebookReducer,
  initialState,
  addContact,
  removeContact,
  editContact,
} from "../reducers/phonebookReducer";

export default function Phonebook() {
  const [state, dispatch] = useReducer(phonebookReducer, initialState);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const fileRef = useRef(null);

  const readFileAsDataURL = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

  const handleAdd = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    const photo = file ? await readFileAsDataURL(file) : null;

    dispatch(
      addContact({
        id: crypto.randomUUID(),
        name,
        phone,
        photo,
      })
    );

    setName("");
    setPhone("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleEdit = (id) => {
    const newName = prompt("نام جدید را وارد کنید:");
    if (newName) {
      dispatch(editContact(id, { name: newName }));
    }
  };

  return (
    <div dir="rtl" className="p-6 max-w-xl mx-auto space-y-8">
      {/* فرم افزودن مخاطب */}
      <form
        onSubmit={handleAdd}
        className="space-y-4 bg-white shadow rounded-xl p-4"
      >
        <h2 className="text-xl font-bold text-gray-800">افزودن مخاطب</h2>
        <input
          className="border border-gray-300 p-2 w-full rounded"
          placeholder="نام مخاطب"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border border-gray-300 p-2 w-full rounded"
          placeholder="شماره تلفن"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="w-full text-sm text-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          افزودن مخاطب
        </button>
      </form>

      {/* لیست مخاطبین */}
      <ul className="space-y-4">
        {state.contacts.map((c) => (
          <li
            key={c.id}
            className="bg-white shadow p-4 rounded-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              {c.photo ? (
                <img
                  src={c.photo}
                  alt={c.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  بدون عکس
                </div>
              )}
              <div>
                <p className="font-semibold text-lg">{c.name}</p>
                <p className="text-sm text-gray-500">{c.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(c.id)}
                className="text-sm text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded"
              >
                ویرایش
              </button>
              <button
                onClick={() => dispatch(removeContact(c.id))}
                className="text-sm text-red-600 hover:text-red-800 bg-red-50 px-3 py-1 rounded"
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
