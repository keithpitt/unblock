import Head from "next/head";
import { useTheme } from "next-themes";
import styles from "../styles/Home.module.css";
import React, { useEffect } from "react";
import { EmojiContext } from "../context/EmojiContext";

import Flow from "components/Flow";

import { generateGraphFromBuildSteps } from "utils/graph";

const response = {
  data: {
    build: {
      message:
        "Merge pull request #10001 from buildkite/fdn-1119-update-pwned-gem-and-ensure-were\n\nConfigure pwned with timeout",
      steps: {
        edges: [
          {
            node: {
              __typename: "StepCommand",
              uuid: "01836784-c4c2-47d3-b777-686384af5a8b",
              label: ":pipeline: Upload Pipeline",
              key: null,
              dependencies: {
                edges: [],
              },
            },
          },
          {
            node: {
              __typename: "StepCommand",
              uuid: "01836784-ffb1-425e-a85e-a84be7ce1295",
              label: ":docker: Build Docker Image",
              key: "docker",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "9657f88d-2a93-4f24-b264-7c5a0408f96d",
                      allow_failure: false,
                      key: "01836784-c4c2-47d3-b777-686384af5a8b",
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: "StepGroup",
              uuid: "01836784-ffb2-4e03-8797-5971abf7b4dd",
              label: ":broom: Linting",
              key: "linting",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "ee5e5367-df13-4b02-8118-c3c28d54cd7a",
                      allow_failure: false,
                      key: "docker",
                    },
                  },
                ],
              },
              steps: {
                edges: [
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb2-4d4e-8ae8-3b9191403a0f",
                      label: ":rubocop: RuboCop",
                      key: null,
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb3-4d2e-8af1-f9c8ddb60b20",
                      label: ":eslint: ESlint",
                      key: null,
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb3-4c5d-b540-b1b0bc04f672",
                      label: ":flowtype: Flow",
                      key: null,
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: "StepGroup",
              uuid: "01836784-ffb4-4f78-b23c-0779ee1c61f7",
              label: ":lock_with_ink_pen: Security Audits",
              key: "security_audits",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "ecff6fbe-aabf-4d2e-a125-d76047c4e007",
                      allow_failure: false,
                      key: "docker",
                    },
                  },
                ],
              },
              steps: {
                edges: [
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb4-45d0-8a95-1f51477e1c8a",
                      label: ":brakeman: Brakeman",
                      key: null,
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb5-416a-905b-522ecf3158b7",
                      label: ":fsociety: Bundle Audit",
                      key: null,
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb5-40b5-a7a9-f72275552e3f",
                      label: ":yarnpkg: Yarn Audit",
                      key: null,
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb6-4c3c-9d1e-54375f53e99c",
                      label: ":yarnpkg: Outdated Check",
                      key: null,
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: "StepGroup",
              uuid: "01836784-ffb6-4d22-a76b-b5832d313d8e",
              label:
                ":face_with_open_eyes_and_hand_over_mouth::graphql: API Verification",
              key: "api_verification",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "18d41d1d-5c55-4f39-8dd5-0d98a59c35d6",
                      allow_failure: false,
                      key: "docker",
                    },
                  },
                ],
              },
              steps: {
                edges: [
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb6-4744-a8b2-c17e4f5be408",
                      label: ":graphql: GraphQL",
                      key: null,
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: "StepGroup",
              uuid: "01836784-ffb7-4433-bee6-4766b12748d1",
              label: ":rspec: RSpec",
              key: "rspec",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "a0b6a59a-defe-43cd-8881-1c92940af95f",
                      allow_failure: false,
                      key: "docker",
                    },
                  },
                ],
              },
              steps: {
                edges: [
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb7-477e-b1dc-972b3d059516",
                      label: ":mag: Discover",
                      key: "rspec_discover",
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb7-4b3c-91ab-bfe5268deb54",
                      label: ":rspec: Run",
                      key: "rspec_run",
                      dependencies: {
                        edges: [],
                      },
                    },
                  },
                  {
                    node: {
                      __typename: "StepCommand",
                      uuid: "01836784-ffb8-4084-b509-f7a90df93142",
                      label: ":clipboard: Verify",
                      key: "rspec_verify",
                      dependencies: {
                        edges: [
                          {
                            node: {
                              uuid: "d65db9c1-e987-40b3-b65f-758c5a01feaa",
                              allow_failure: false,
                              key: "rspec_run",
                            },
                          },
                          {
                            node: {
                              uuid: "296d3fcf-0354-4e5a-8114-6e11ea1b55be",
                              allow_failure: false,
                              key: "rspec_discover",
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: "StepCommand",
              uuid: "01836784-ffb8-4abb-bb57-241fc5250fb4",
              label: ":jest: Jest",
              key: "jest",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "5bcd49da-3fa9-4a11-8262-f5527e6316b8",
                      allow_failure: false,
                      key: "docker",
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: "StepCommand",
              uuid: "01836784-ffb9-4d9a-853e-14cb7b9d8a2a",
              label: ":coverage: Code Coverage",
              key: "code_coverage",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "1fe461de-5467-41e8-844a-81dfe991cc3c",
                      allow_failure: true,
                      key: "rspec_run",
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: "StepCommand",
              uuid: "01836784-ffba-44db-a905-7789e34d0902",
              label: ":webpack: Bundle Analysis",
              key: "bundle_analysis",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "60cd0e1c-e451-461b-b123-06482bad07d6",
                      allow_failure: false,
                      key: "docker",
                    },
                  },
                ],
              },
            },
          },
          {
            node: {
              __typename: "StepTrigger",
              uuid: "01836784-ffba-429c-9b20-13dc0207e6dd",
              label: ":rocket: Deploy to Production",
              key: "deploy",
              dependencies: {
                edges: [
                  {
                    node: {
                      uuid: "e191c2ab-e9a9-4830-9ef6-4665464b15d5",
                      allow_failure: false,
                      key: "jest",
                    },
                  },
                  {
                    node: {
                      uuid: "ab10ba92-cd11-494d-812e-7c70bc0adf1d",
                      allow_failure: false,
                      key: "rspec",
                    },
                  },
                  {
                    node: {
                      uuid: "7076b654-6229-4dd7-a1aa-2bcc1fc0c5a8",
                      allow_failure: false,
                      key: "security_audits",
                    },
                  },
                  {
                    node: {
                      uuid: "da341fc9-1fb7-4f3f-9ddd-7ae02c06c3f2",
                      allow_failure: false,
                      key: "linting",
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
};

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
  let roomId = context.query["room"];
  if (
    roomId === null ||
    roomId === undefined ||
    (roomId && roomId.trim() === "")
  ) {
    roomId = "default";
  }

  const res = await fetch(
    `https://api.liveblocks.io/v2/rooms/${encodeURIComponent(roomId)}/storage`,
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

  return { props: { roomId, build: response.data.build, emoji } };
}

export default function Home({ roomId, build, emoji }) {
  const { nodes, edges } = generateGraphFromBuildSteps(build.steps);

  return (
    <div className={styles.container}>
      <Head>
        <title>🎮</title>
      </Head>
      <EmojiContext.Provider value={emoji}>
        <Flow roomId={roomId} initialNodes={nodes} initialEdges={edges} />
      </EmojiContext.Provider>
    </div>
  );
}
