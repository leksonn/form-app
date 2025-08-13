import { PasswordInput } from "../components/ui/PasswordInput/PasswordInput";
import { Input } from "../components/ui/Input/Input";

import type { Route } from "./+types/home";
import { FiSearch } from "react-icons/fi";

export default function Home() {
  const _dummyRoute: Route.ComponentProps | null = null;

  const variants = [
    "solid",
    "subtle",
    "surface",
    "outline",
    "ghost",
    "plain",
  ] as const;
  const colors = ["blue", "green", "red", "pink", "yellow", "gray"] as const;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        margin: "1rem",
      }}
    >
      <PasswordInput
        placeholder="Enter your password"
        size="small"
        variant="subtle"
        helperText="Must be at least 8 characters."
        error={false}
      />
      <PasswordInput
        placeholder="Enter your password"
        size="medium"
        variant="subtle"
        helperText="Must be at least 8 characters."
        error={false}
      />
      <PasswordInput
        placeholder="Enter your password"
        size="large"
        variant="subtle"
        helperText="Must be at least 8 characters."
        error={false}
      />
      
    </div>
  );
}
