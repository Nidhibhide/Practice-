"use client";

import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session) {
    return <p>You must be logged in</p>;
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <p>ID: {session.user?.id}</p>
      <p>Verified: {session.user?.isVerified ? "Yes" : "No"}</p>
    </div>
  );
};
export default page;
