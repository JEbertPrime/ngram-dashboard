import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Creatable from "react-select/creatable";
import { createText } from "~/models/text.server";

import { getUser, requireUser, requireUserId } from "~/session.server";
export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return user;
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = await requireUserId(request);
  console.log(userId);
  const args = {
    title: formData.get("title"),
    text: formData.get("text"),
    nValues: formData.getAll("nValues").map((string) => parseInt(string)),
    delimiter: formData.get("delimiter"),
    corpusId: formData.get("corpusId"),
    userId,
  };
  console.log(args);
  const response = createText(args);
  return response;
};
const UploadForm = (props) => {
  const user = useLoaderData();
  console.log(user);

  const corpusOptions = user.corpora.map((c) => {
    return { value: c.id, label: c.title };
  });
  const [textType, setTextType] = useState("text");
  return (
    <Form method="POST">
      <h2 className=" text-lg">Upload new text</h2>
      <hr className=" mb-6" />
      <p>Corpus</p>
      <Creatable
        name="corpusId"
        className=" w-36 text-black"
        options={corpusOptions}
      />
      <p>Title</p>
      <input
        className="border-black rounded-md border-2 text-black"
        type="text"
        name="title"
      />
      <p>Text</p>
      <textarea
        type="textarea"
        name="text"
        className="border-black rounded-md border-2 text-black"
      ></textarea>
      <p>NGram length(s)?</p>
      <Creatable
        name="nValues"
        className=" w-36 text-black"
        isMulti
        options={[
          {
            value: 2,
            label: 2,
          },
          { value: 3, label: 3 },
        ]}
      />

      <hr />
      <input type="submit" value={"submit"} />
    </Form>
  );
};

export default UploadForm;
