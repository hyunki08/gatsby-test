import React, { createRef, useEffect } from 'react';
import styled from '@emotion/styled';

const src = 'https://utteranc.es/client.js';
const repo = 'hyunki08/hyunki08.gatsby-test.github.io';

type UttrancesAttributesType = {
  src: string;
  repo: string;
  'issue-term': string;
  label: string;
  theme: string;
  crossorigin: string;
  async: string;
};

const UttrancesWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const CommentWidget = () => {
  const element = createRef<HTMLDivElement>();

  useEffect(() => {
    if (element.current === null) return;
    const utterances: HTMLScriptElement = document.createElement('script');
    const attributes: UttrancesAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'Comment',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: 'true',
    };
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    element.current.appendChild(utterances);
  }, []);
  return <UttrancesWrapper ref={element} />;
};

export default CommentWidget;
