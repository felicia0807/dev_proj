import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import UserForm from "../../../components/UserForm";

export default function UpdateUser() {
  const { query } = useRouter();
  const { id } = query;

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    country: ""
  });

  useEffect(() => {
    const getUser = async () => {
      if (!id) {
        return;
      }
  
      const res = await fetch("/api/getUser?_id=" + id);
      setUser(await res.json());
      setIsLoading(false);
    }

    getUser();
  }, [id]);

  const handleSave = useCallback(async (updatedUser) => {
    setIsLoading(true);

    await fetch("/api/updateUser/", {
      method: "PUT",
      body: JSON.stringify({
        ...updatedUser,
        _id: id
      })
    });

    setIsLoading(false);
  }, [id]);

  return (
    <>
      {user.name && (
        <UserForm
          name={user.name}
          country={user.country}
          onSave={handleSave}
          isLoading={isLoading}
        />
      )}
    </>
  );
}