"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateScript } from "@/server/master/mst-script"; // Ganti dengan path yang sesuai
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/froala_editor.pkgd.min.js";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), { ssr: false });

export default function CreateScriptPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [editorContent, setEditorContent] = useState(""); // State for editor content

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      title: data.title,
      script: editorContent,
      isActive: data.isActive === "true" ? 1 : 0, // Mengubah nilai isActive menjadi 1 atau 0
    };

    try {
      // console.log("data dikirim:", formattedData);
      const response = await CreateScript(formattedData); // Kirim data ke API untuk create
      if (response.message?.toLowerCase().includes("successfully")) {
        setMessage("Script berhasil dibuat!");
        setTimeout(() => {
          router.back();
          setTimeout(() => {
            window.location.reload(); // Reload the page
          }, 100); // Memuat ulang halaman sebelumnya
        }, 1000);
      } else {
        setMessage("Gagal membuat script. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error creating script:", error);
      setMessage("Terjadi kesalahan saat membuat script.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Create Script</p>
      </div>
      <br />
      <hr />
      <br />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Judul
          </label>
          <input
            id="title"
            {...register("title")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Script (Froala Editor) */}
        <div className="form-group">
          <label htmlFor="script" className="block text-sm font-medium text-gray-700">
            Script
          </label>
          <FroalaEditor
            tag="textarea"
            model={editorContent}
            onModelChange={setEditorContent} // Update editor content
            config={{
              heightMin: 300, // Set the height of the editor to be more visible
              placeholderText: "Tulis script di sini... tambahkan # di setiap topik judul topik",
              toolbarInline: false, // Use a full toolbar
              charCounterCount: true,
              toolbarButtons: [
                "undo",
                "redo",
                "|",
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "|",
                "fontSize",
                "color",
                "inlineStyle",
                "|",
                "paragraphFormat",
                "align",
                "|",
                "formatOL",
                "formatUL",
                "outdent",
                "indent",
                "|",
                "clearFormatting",
              ],
              fontFamily: {
                arial: "Arial",
                times: "Times New Roman",
                courier: "Courier New",
                georgia: "Georgia",
                verdana: "Verdana",
              },
              fontSize: ["12", "14", "16", "18", "24", "36"],
            }}
          />
        </div>

        {/* Status Aktif */}
        <div className="form-group">
          <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">
            Status Aktif
          </label>
          <select
            id="isActive"
            {...register("isActive")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            required
          >
            <option value="false">Tidak Aktif</option>
            <option value="true">Aktif</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Create
          </button>
        </div>
      </form>

      {/* Message after submission */}
      {message && (
        <div className="mt-4 text-center text-lg font-semibold">
          <p>{message}</p>
        </div>
      )}
      <br />
      <br />
    </div>
  );
}
