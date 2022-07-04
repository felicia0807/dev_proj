import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import UserForm from "../../components/UserForm";

export default function CreateUser() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = useCallback(async (user) => {
    setIsLoading(true);

    await fetch("/api/createUser/", {
      method: "POST",
      body: JSON.stringify(user)
    });

    setIsLoading(false);
    router.push("/users");
  }, [router]);

  return <UserForm onSave={handleSave} isLoading={isLoading} />;
}