import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const text = await getText(params.textId);
  console.log(text);
  return text;
};
const Text = (props) => {
  return <div></div>;
};
export default Text;
