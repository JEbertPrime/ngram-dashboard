import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { getUser } from "~/session.server";
import { getTexts } from "~/models/text.server";
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const texts = await getTexts({ userId: user.id });
  return texts;
};
const Texts = (props) => {
  const data = useLoaderData();
  console.log(data);
  return <div>{data.map((text) => JSON.stringify(text))}</div>;
};
export default Texts;
