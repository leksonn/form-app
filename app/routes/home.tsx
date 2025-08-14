import { DateInput } from "~/components/ui/DateInput";
import { Select } from "~/components/ui/Select/Select";
import { PasswordInput } from "../components/ui/PasswordInput/PasswordInput";
import type { Route } from "./+types/home";

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
      <DateInput
        placeholder="Select a date"
        size="small"
        variant="subtle"
        helperText="Select a date from the calendar."
        error={false}
      />
      <DateInput
        placeholder="Birthdate"
        size="medium"
        variant="subtle"
        helperText="Birthdate."
        error={false}
      />
      <DateInput
        placeholder="Select a date"
        size="large"
        variant="subtle"
        helperText="Select a date from the calendar."
        error={false}
      />
      <Select
        label="Choose a fruit"
        variant="outline"
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Cherry", value: "cherry" },
        ]}
      />
      <Select
        label="Choose a fruit"
        variant="subtle"
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Cherry", value: "cherry" },
        ]}
      />
      <Select
        label="Choose a fruit"
        placeholder="Select a fruit"
        variant="subtle"
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Cherry", value: "cherry" },
        ]}
      />
    </div>
  );
}
