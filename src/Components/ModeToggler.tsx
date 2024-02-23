import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ModeToggle = () => {
  const [light, setLight] = useState<boolean>(
    JSON.parse(localStorage.getItem("mode") || "false") || false
  );
  const handleMode = () => {
    if (light) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(light));
    handleMode();
  }, [light]);
  return (
    <button onClick={() => setLight((prev) => !prev)} className="mode--btn">
      {light ? <FaMoon /> : <FaSun />}
    </button>
  );
};
