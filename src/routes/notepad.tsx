import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { API } from "../API";

export default function NotepadScreen() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [noteContent, setNoteContent] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();
  const [didSave, setDidSave] = useState(false);

  useEffect(() => {
    if (token === null) return;
    API.getUserNote()
      .then((content) => {
        setNoteContent(content ?? "");
      })
      .catch((err) => {
        alert(
          "Failed to get note content: " +
            (err instanceof Error ? err.message : String(err))
        );
      });
  }, [token]);

  if (token === null) {
    return <Navigate to={{ pathname: "/" }} />;
  }

  const saveNote = async (content: string) => {
    if (savingNote) return;
    setSavingNote(true);

    try {
      await API.updateUserNote(content);
    } catch (err) {
      alert(
        "Failed to save note: " +
          (err instanceof Error ? err.message : String(err))
      );
    }

    setDidSave(true);
    setTimeout(() => {
      setDidSave(false);
    }, 800);

    setSavingNote(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <button
        style={{
          position: "absolute",
          right: 20,
          top: 20,
        }}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
      <h1 style={{ margin: 0 }}>Notepad</h1>
      <textarea
        style={{
          resize: "none",
          width: 300,
          height: 500,
          padding: 10,
          fontFamily: '"Roboto", sans-serif',
          outline: "none",
        }}
        value={noteContent}
        placeholder="Type here..."
        onChange={(ev) => {
          setNoteContent(ev.target.value);

          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          setTimeoutId(
            setTimeout(() => {
              saveNote(ev.target.value);
              setTimeoutId(undefined);
            }, 300)
          );
        }}
      ></textarea>
      <div
        style={{
          display: "flex",
          gap: 5,
        }}
      >
        <button onClick={() => saveNote(noteContent)}>
          {didSave ? "Saved!" : "Save"}
        </button>
        <button
          onClick={async () => {
            try {
              const id = await API.shareNote(noteContent);
              window.open(`${API.BASE_URL}/api/v1/note/${id}`, "_blank");
            } catch (err) {
              alert(
                "Failed to share note: " +
                  (err instanceof Error ? err.message : String(err))
              );
            }
          }}
        >
          Share
        </button>
      </div>
    </div>
  );
}
