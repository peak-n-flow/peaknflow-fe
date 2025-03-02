import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return <main>{JSON.stringify(session)}</main>;
}
