import * as React from "react";

import { NextPage } from "next";
import { default as Link } from "next/link";

const IndexPage: NextPage = () => {
  return (
    <div>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </div>
  );
};

export default IndexPage;
