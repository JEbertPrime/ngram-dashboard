import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "react-router";

import { getTexts } from "~/models/text.server";
import { getUser } from "~/session.server";
import Accordion from "~/components/Accordion";
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const texts = await getTexts({ userId: user.id });
  return texts;
};
const Texts = (props) => {
  const data = useLoaderData();

  const groupedTexts = data.reduce((accumulator, value) => {
    if (value.corpus) {
      if (accumulator[value.corpus.id]) {
        accumulator[value.corpus.id].push(value);
      } else {
        accumulator[value.corpus.id] = [value];
      }
    } else {
      if (accumulator["No Corpus"]) {
        accumulator["No Corpus"].push(value);
      } else {
        accumulator["No Corpus"] = [value];
      }
    }
    return accumulator;
  }, {});
  return (
    <ul>
      {Object.keys(groupedTexts).map((key) => {
        const title = groupedTexts[key][0].corpus
          ? groupedTexts[key][0].corpus.title
          : "No Corpus";

        return (
          <li key={key}>
            <h2>{title}</h2>
            <ul>
              {groupedTexts[key].map((text) => (
                <li key={text.id}>{text.title}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
export default Texts;
