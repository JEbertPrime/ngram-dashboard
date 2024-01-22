import { User } from "@prisma/client";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { deleteUserByEmail } from "~/models/user.server";
import { getUser } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  return user;
};

const UploadForm = (props) => {
  const user = useLoaderData();
  return (
    <Form method="POST">
      {JSON.stringify(user)}
      <input
        type="text"
        name="title"
        className="border-black rounded-md border-2"
      />
      <select className="border-black rounded-md border-2">
        {user?.corpora ? (
          user.corpora.map((corpus) => (
            <option key={corpus.id}>{corpus.title}</option>
          ))
        ) : (
          <option>default</option>
        )}
      </select>
    </Form>
  );
};

export default UploadForm;
