import Head from "next/head";
import { useTheme } from "next-themes";
import styles from "../styles/Home.module.css";
import React, { useEffect } from "react";
import { EmojiContext } from "../context/EmojiContext";

import fsPromises from 'fs/promises';
import path from 'path'

import Flow from "components/Flow";
import ThemeSwitch from "components/ThemeSwitch";

import { generateGraphFromBuildSteps } from "utils/graph";

function buildEmojiLookupTable(json) {
  var emojis = {};

  json.forEach(function (emoji) {
    emojis[emoji.name] = emoji.url;

    if (emoji.aliases) {
      emoji.aliases.forEach(function (alias) {
        emojis[alias] = emoji.url;
      });
    }
  });

  return emojis;
}

export async function getServerSideProps(context) {
  let buildSlug = context.query["build"];
  if (
    buildSlug === null ||
    buildSlug === undefined ||
    (buildSlug && buildSlug.trim() === "")
  ) {
    buildSlug = "default";
  }

  // worst validation ever
  if (buildSlug != 'default' || buildSlug != 'b1' || buildSlug != 'b2') {
    buildSlug == 'default';
  }

  const filePath = path.join(process.cwd(), 'json', buildSlug + '.json');
  const jsonData = await fsPromises.readFile(filePath);
  const buildResponse = JSON.parse(jsonData);

  const res = await fetch(
    `https://api.liveblocks.io/v2/rooms/${encodeURIComponent(buildSlug)}/storage`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LIVEBLOCKS_PRIVATE_KEY}`,
      },
    }
  );
  const json = await res.json();

  const emoji_res = await fetch(
    `https://api.buildkite.com/v2/organizations/${process.env.BUILDKITE_ORG}/emojis?access_token=${process.env.BUILDKITE_ACCESS_TOKEN}`
  );
  const emoji_json = await emoji_res.json();
  const emoji = buildEmojiLookupTable(emoji_json);

  return { props: { build: buildResponse.data.build, emoji } };
}

export default function Home({ build, emoji }) {
  const { nodes, edges } = generateGraphFromBuildSteps(build.steps);

  return (
    <div className={styles.container}>
      <Head>
        <title>🎮</title>
      </Head>
      <EmojiContext.Provider value={emoji}>
        <ThemeSwitch />
        <Flow roomId={build.uuid} initialNodes={nodes} initialEdges={edges} />
      </EmojiContext.Provider>
    </div>
  );
}
